import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  ASSETS,
  ASSET_BASE,
  CATEGORY_LINE,
  ICON_ASSETS,
  LOGO_ASSETS,
  OG_SIZE,
  RASTER_ICONS,
  VERDICTS,
  assetImport,
  ogTemplate,
  verdictClass,
} from "../src/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const pkgDir = resolve(here, "..");
const srcCss = (name: string) => readFileSync(resolve(pkgDir, "src", name), "utf8");

describe("brand.css", () => {
  const css = srcCss("brand.css");

  it("is built on design-tokens (imports its css)", () => {
    expect(css).toContain('@import "@monetizekit/design-tokens/css";');
  });

  it("routes hard shadows through the mode-aware `shade` vars, never a literal ink hex (§12)", () => {
    expect(css).toContain("box-shadow: var(--mk-shadow-sm)");
    expect(css).toContain("box-shadow: var(--mk-shadow-md)");
    expect(css).toContain("box-shadow: var(--mk-shadow-lg)");
    // no hard-coded black shadow offsets in the utilities
    expect(css).not.toMatch(/box-shadow:\s*\d+px\s+\d+px\s+0\s+0\s+#1A1A1A/i);
  });

  it("uses token vars for edges, grounds, radius, and tilt", () => {
    expect(css).toContain("border: var(--mk-border-panel) solid var(--mk-ink)");
    expect(css).toContain("border-radius: var(--mk-radius)");
    expect(css).toContain("background: var(--mk-cream)");
    expect(css).toContain("transform: rotate(var(--mk-tilt-badge))");
  });

  it("straightens tilted objects on hover and squares panels ≤900px", () => {
    expect(css).toContain(".tilt-badge:hover");
    expect(css).toContain("@media (max-width: 900px)");
  });
});

describe("primitives.css", () => {
  const css = srcCss("primitives.css");
  it("defines the full verdict-pill vocabulary", () => {
    for (const v of VERDICTS) {
      expect(css).toContain(`.mk-verdict--${v.toLowerCase().replace(/_/g, "-")}`);
    }
  });
  it("defines console window, stat card, and decor primitives", () => {
    expect(css).toContain(".mk-console");
    expect(css).toContain(".mk-statcard__value");
    expect(css).toContain(".mk-decor--triangle");
  });
});

describe("verdictClass", () => {
  it("maps verdicts to modifier classes", () => {
    expect(verdictClass("ALLOW")).toBe("mk-verdict mk-verdict--allow");
    expect(verdictClass("REQUIRE_TOP_UP")).toBe("mk-verdict mk-verdict--require-top-up");
  });
});

describe("asset manifest", () => {
  it("exposes logo, icon, and raster entries with importable subpaths", () => {
    expect(assetImport(LOGO_ASSETS.badgeTilted)).toBe(`${ASSET_BASE}/logo/mk-badge-tilted.svg`);
    expect(assetImport(ICON_ASSETS.maskable)).toBe(`${ASSET_BASE}/icons/maskable.svg`);
    expect(RASTER_ICONS.some((a) => a.path === "icons/apple-touch-icon.png")).toBe(true);
  });

  it("every SVG source referenced by the manifest exists on disk", () => {
    for (const a of ASSETS) {
      if (a.type !== "image/svg+xml") continue;
      expect(existsSync(resolve(pkgDir, "assets", a.path)), `missing ${a.path}`).toBe(true);
    }
  });
});

describe("ogTemplate", () => {
  it("produces a 1200×630 satori-compatible node with the title + category line", () => {
    expect(OG_SIZE).toEqual({ width: 1200, height: 630 });
    const node = ogTemplate({ title: "Pricing" });
    expect(node.type).toBe("div");
    const children = node.props.children as Array<{ props: { children: unknown } }>;
    const texts = children.map((c) => c.props.children);
    expect(texts).toContain("Pricing");
    expect(texts).toContain(CATEGORY_LINE);
  });

  it("does not invert grounds (OG is a fixed light island): cream ground stays cream", () => {
    const node = ogTemplate();
    expect(node.props.style?.background).toBe("#FFFEF3");
    expect(node.props.style?.border).toContain("#1A1A1A");
  });
});

/** Built-artifact checks (require `pnpm build` first; CI runs build before test). */
describe("built artifacts", () => {
  const dist = resolve(pkgDir, "dist");
  it("ships brand.css, primitives.css, and assets.json", () => {
    expect(existsSync(resolve(dist, "brand.css"))).toBe(true);
    expect(existsSync(resolve(dist, "primitives.css"))).toBe(true);
    expect(existsSync(resolve(dist, "assets.json"))).toBe(true);
  });
  it("rasterizes non-empty icon + OG PNG exports", () => {
    for (const rel of ["icons/favicon-32.png", "icons/icon-512.png", "icons/maskable-512.png", "og/og-default.png"]) {
      const p = resolve(dist, "assets", rel);
      expect(existsSync(p), `missing ${rel}`).toBe(true);
      expect(statSync(p).size).toBeGreaterThan(100);
    }
  });
});
