// Emits the non-JS brand artifacts: copies the CSS + SVG sources into dist, rasterizes the icon
// and OG PNG exports with sharp, and writes the flat asset manifest (dist/assets.json).
// Runs after `tsup` (which produces dist/index.js). See package.json "build".
import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = dirname(fileURLToPath(import.meta.url));
const pkgDir = resolve(here, "..");
const distDir = resolve(pkgDir, "dist");
const srcDir = resolve(pkgDir, "src");
const assetsSrc = resolve(pkgDir, "assets");
const assetsDist = resolve(distDir, "assets");

const { ASSETS } = await import(resolve(distDir, "index.js"));

await mkdir(distDir, { recursive: true });

// 1) Ship the stylesheets.
await cp(resolve(srcDir, "brand.css"), resolve(distDir, "brand.css"));
await cp(resolve(srcDir, "primitives.css"), resolve(distDir, "primitives.css"));

// 2) Ship the SVG sources (preserve structure under dist/assets).
await cp(assetsSrc, assetsDist, { recursive: true });

// 3) Rasterize PNG exports.
const CREAM = "#FFFEF3";
const iconSvg = await readFile(resolve(assetsSrc, "logo/icon.svg"));
const maskableSvg = await readFile(resolve(assetsSrc, "icons/maskable.svg"));
const ogSvg = await readFile(resolve(assetsSrc, "og/og-default.svg"));

async function rasterize(svg, size, outRel, { flatten = false } = {}) {
  let pipe = sharp(svg, { density: 384 }).resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } });
  if (flatten) pipe = pipe.flatten({ background: CREAM });
  await pipe.png().toFile(resolve(assetsDist, outRel));
}

await mkdir(resolve(assetsDist, "icons"), { recursive: true });
await mkdir(resolve(assetsDist, "og"), { recursive: true });

await Promise.all([
  rasterize(iconSvg, 16, "icons/favicon-16.png"),
  rasterize(iconSvg, 32, "icons/favicon-32.png"),
  rasterize(iconSvg, 48, "icons/favicon-48.png"),
  rasterize(iconSvg, 180, "icons/apple-touch-icon.png", { flatten: true }),
  rasterize(iconSvg, 192, "icons/icon-192.png"),
  rasterize(iconSvg, 512, "icons/icon-512.png"),
  rasterize(maskableSvg, 512, "icons/maskable-512.png"),
]);

// OG PNG (1200×630, non-square).
await sharp(ogSvg, { density: 192 }).resize(1200, 630, { fit: "contain", background: CREAM }).png().toFile(resolve(assetsDist, "og/og-default.png"));

// 4) Machine-readable manifest.
await writeFile(
  resolve(distDir, "assets.json"),
  `${JSON.stringify({ $description: "MonetizeKit brand asset manifest (Brand Direction v0.8).", assets: ASSETS }, null, 2)}\n`,
  "utf8",
);

console.log(`brand: shipped brand.css, primitives.css, ${ASSETS.length} assets, and rasterized icon/OG PNGs`);
