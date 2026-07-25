import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  cssVarsToDeclarations,
  onColorCssVars,
  resolveBrand,
  resolveTokens,
  tokensToCssVars,
} from "../src/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const distTokensCss = resolve(here, "../dist/tokens.css");

/** The mode-aware brand ramp (Brand Direction v0.8 §12). */
describe("§12 dark mode — brand ramp inverts", () => {
  const light = resolveTokens({ mode: "light" }).brand.colors;
  const dark = resolveTokens({ mode: "dark" }).brand.colors;

  it("inverts the neutral set to the authoritative §12 dark values", () => {
    expect(dark.cream).toBe("#191811");
    expect(dark.paper).toBe("#242318");
    expect(dark.ink).toBe("#FFFEF3");
    expect(dark.muted).toBe("#A8A695");
    expect(dark.faint).toBe("#7E7C6D");
    expect(dark.lavender).toBe("#242238");
    expect(dark.stripe).toBe("#34324D");
    expect(dark["line-soft"]).toBe("#3A3830");
    expect(dark.dotsoft).toBe("rgba(255, 254, 243, 0.09)");
    expect(dark["footer-bg"]).toBe("#0E0E09");
  });

  it("keeps the light neutral set at the authoritative §12 light values", () => {
    expect(light.cream).toBe("#FFFEF3");
    expect(light.paper).toBe("#FFFFFF");
    expect(light.ink).toBe("#1A1A1A");
    expect(light.muted).toBe("#5C5C55");
    expect(light.faint).toBe("#8C8C83");
    expect(light.lavender).toBe("#E6E6F8");
    expect(light.stripe).toBe("#D1D1E2");
    expect(light["line-soft"]).toBe("#D9D8CA");
    expect(light.dotsoft).toBe("rgba(26, 26, 26, 0.07)");
    expect(light["footer-bg"]).toBe("#1A1A1A");
  });

  it("makes `shade` mode-aware and DISTINCT from `ink` in dark (dimmed hard shadow)", () => {
    // Light: shade == ink == #1A1A1A.
    expect(light.shade).toBe("#1A1A1A");
    expect(light.shade).toBe(light.ink);
    // Dark: ink lifts to cream, but shade dims to #AFAD98 — they must differ.
    expect(dark.ink).toBe("#FFFEF3");
    expect(dark.shade).toBe("#AFAD98");
    expect(dark.shade).not.toBe(dark.ink);
  });

  it("routes all shadow output through `shade`, never `ink`", () => {
    expect(resolveBrand("light").shadow).toEqual({
      sm: "4px 4px 0 0 #1A1A1A",
      md: "6px 6px 0 0 #1A1A1A",
      lg: "9px 9px 0 0 #1A1A1A",
    });
    expect(resolveBrand("dark").shadow).toEqual({
      sm: "4px 4px 0 0 #AFAD98",
      md: "6px 6px 0 0 #AFAD98",
      lg: "9px 9px 0 0 #AFAD98",
    });
  });

  it("lifts the accent text colors in dark for legibility", () => {
    expect(light["violet-txt"]).toBe("#932CE7");
    expect(light["purple-txt"]).toBe("#4F46E5");
    expect(dark["violet-txt"]).toBe("#BB86FC");
    expect(dark["purple-txt"]).toBe("#9A93FF");
  });

  it("does NOT invert saturated brand grounds (orange, yellow) between modes", () => {
    expect(dark.orange).toBe(light.orange);
    expect(dark.orange).toBe("#FF6B35");
    expect(dark.yellow).toBe(light.yellow);
    expect(dark.yellow).toBe("#F8D45D");
  });
});

/** The non-inverting `.on-color` light-island set (§12). */
describe("§12 dark mode — `.on-color` light islands", () => {
  it("re-pins neutrals to the FIXED light values in both modes", () => {
    const light = resolveTokens({ mode: "light" }).onColor;
    const dark = resolveTokens({ mode: "dark" }).onColor;
    // Identical regardless of page mode — this is the whole point of an island.
    expect(dark).toEqual(light);
    expect(light.cream).toBe("#FFFEF3");
    expect(light.paper).toBe("#FFFFFF");
    expect(light.ink).toBe("#1A1A1A");
    expect(light.shade).toBe("#1A1A1A"); // black hard shadow even on a dark page
    expect(light.muted).toBe("#5C5C55");
    expect(light.faint).toBe("#8C8C83");
    expect(light["line-soft"]).toBe("#D9D8CA");
    expect(light.dotsoft).toBe("rgba(26, 26, 26, 0.07)");
    expect(light["violet-txt"]).toBe("#932CE7");
    expect(light["purple-txt"]).toBe("#4F46E5");
    expect(light.text).toBe("#1A1A1A"); // onlight — black text on saturated fills
  });

  it("emits `--mk-*` re-pins with a black hard shadow (islands never inherit the dimmed dark shade)", () => {
    const vars = onColorCssVars(resolveTokens({ mode: "dark" }).onColor);
    expect(vars["--mk-ink"]).toBe("#1A1A1A");
    expect(vars["--mk-shade"]).toBe("#1A1A1A");
    expect(vars["--mk-shadow-sm"]).toBe("4px 4px 0 0 #1A1A1A");
    expect(vars["--mk-violet-txt"]).toBe("#932CE7");
  });
});

/** The `onlight` fixed token never inverts. */
describe("§12 dark mode — fixed `onlight`", () => {
  it("stays #1A1A1A in both modes", () => {
    expect(resolveTokens({ mode: "light" }).brand.colors.onlight).toBe("#1A1A1A");
    expect(resolveTokens({ mode: "dark" }).brand.colors.onlight).toBe("#1A1A1A");
  });
});

/** Snapshots of the resolved token vars for both modes + the island set. */
describe("§12 dark mode — snapshots", () => {
  it("snapshots the brand default DARK custom properties", () => {
    const vars = tokensToCssVars(resolveTokens({ palette: "default", mode: "dark" }));
    expect(cssVarsToDeclarations(vars)).toMatchSnapshot();
  });

  it("snapshots the `.on-color` island custom properties", () => {
    expect(cssVarsToDeclarations(onColorCssVars(resolveTokens().onColor))).toMatchSnapshot();
  });
});

/**
 * Built-artifact assertions — tokens.css ships the §12 structure. Requires `pnpm build` first
 * (CI runs build before test; see .github/workflows/ci.yml).
 */
describe("§12 dark mode — built tokens.css artifact", () => {
  const css = readFileSync(distTokensCss, "utf8");

  it("includes the :root, dark (attribute + .dark class), .on-color, and [data-palette] blocks", () => {
    expect(css).toContain(":root {");
    // Dark is emitted under BOTH the attribute and the .dark class alias (centralized so consumers
    // never hand-mirror it) — see paletteModeSelector.
    expect(css).toContain('[data-theme="dark"], .dark {');
    expect(css).toContain(".on-color {");
    expect(css).toContain('[data-palette="nord"] {');
    expect(css).toContain('[data-palette="nord"][data-theme="dark"], [data-palette="nord"].dark {');
  });

  it("inverts the ramp + dims the shadow inside the default dark block", () => {
    const dark = css.slice(css.indexOf('[data-theme="dark"], .dark {'));
    const darkBlock = dark.slice(0, dark.indexOf("}"));
    expect(darkBlock).toContain("--mk-cream: #191811;");
    expect(darkBlock).toContain("--mk-ink: #FFFEF3;");
    expect(darkBlock).toContain("--mk-shade: #AFAD98;");
    expect(darkBlock).toContain("--mk-shadow-sm: 4px 4px 0 0 #AFAD98;");
    expect(darkBlock).toContain("--mk-violet-txt: #BB86FC;");
  });
});
