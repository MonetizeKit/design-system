import { describe, expect, it } from "vitest";
import {
  BRAND,
  PALETTE_NAMES,
  mkContractVars,
  resolveMode,
  resolveTokens,
  tokensToCssVars,
} from "../src/index.js";
import type { Mode, SemanticVar } from "../src/index.js";

const SEMANTIC_KEYS: SemanticVar[] = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "destructive-foreground",
  "border",
  "input",
  "ring",
  "success",
  "success-foreground",
  "warning",
  "warning-foreground",
  "sidebar",
  "sidebar-foreground",
  "sidebar-primary",
  "sidebar-primary-foreground",
  "sidebar-accent",
  "sidebar-accent-foreground",
  "sidebar-border",
  "sidebar-ring",
];

const MODES: Mode[] = ["light", "dark", "system"];

describe("resolveMode", () => {
  it("maps light/dark directly", () => {
    expect(resolveMode("light")).toBe("light");
    expect(resolveMode("dark")).toBe("dark");
  });

  it("resolves system via prefersDark", () => {
    expect(resolveMode("system", false)).toBe("light");
    expect(resolveMode("system", true)).toBe("dark");
  });
});

describe("resolveTokens", () => {
  it("defaults to brand / default / light", () => {
    const r = resolveTokens();
    expect(r.theme).toBe("brand");
    expect(r.palette).toBe("default");
    expect(r.mode).toBe("light");
    expect(r.resolvedMode).toBe("light");
  });

  it("produces a complete semantic set for every palette × mode combination", () => {
    for (const palette of PALETTE_NAMES) {
      for (const mode of MODES) {
        const r = resolveTokens({ palette, mode }, { prefersDark: true });
        for (const key of SEMANTIC_KEYS) {
          expect(r.semantic[key], `${palette}/${mode} missing ${key}`).toBeTruthy();
        }
      }
    }
  });

  it("inherits brand success/warning on non-default palettes (CSS-cascade parity)", () => {
    const brandLight = resolveTokens({ palette: "default", mode: "light" });
    const nordLight = resolveTokens({ palette: "nord", mode: "light" });
    expect(nordLight.semantic.success).toBe(brandLight.semantic.success);
    expect(nordLight.semantic.warning).toBe(brandLight.semantic.warning);
    // ...but the palette overrides its own background.
    expect(nordLight.semantic.background).not.toBe(brandLight.semantic.background);
  });

  it("carries the frozen brand ramp/structure regardless of palette, mode-aware for neutrals (§12)", () => {
    const light = resolveTokens({ palette: "dracula", mode: "light" });
    expect(light.brand).toEqual(BRAND); // the default BRAND export is the light identity
    expect(light.brand.colors.orange).toBe("#FF6B35");
    expect(light.brand.radius).toBe("0");
    expect(light.brand.shadow.sm).toBe("4px 4px 0 0 #1A1A1A");

    const dark = resolveTokens({ palette: "dracula", mode: "dark" });
    expect(dark.brand.colors.orange).toBe("#FF6B35"); // saturated colors are constant
    expect(dark.brand.radius).toBe("0"); // structure is constant
    expect(dark.brand.shadow.sm).toBe("4px 4px 0 0 #AFAD98"); // shadow references the dimmed shade
  });

  it("system mode collapses to a concrete resolvedMode but preserves the request", () => {
    const r = resolveTokens({ mode: "system" }, { prefersDark: true });
    expect(r.mode).toBe("system");
    expect(r.resolvedMode).toBe("dark");
  });
});

describe("tokensToCssVars", () => {
  it("emits both --mk-* brand vars and --<semantic> vars", () => {
    const vars = tokensToCssVars(resolveTokens());
    expect(vars["--mk-cream"]).toBe("#FFFEF3");
    expect(vars["--mk-radius"]).toBe("0");
    expect(vars["--background"]).toBe("#FFFEF3");
    expect(vars["--foreground"]).toBe("#1A1A1A");
  });
});

describe("mkContractVars (SDK --mk-* appearance contract)", () => {
  it("maps the brand default light look for the SDK", () => {
    const vars = mkContractVars(resolveTokens({ palette: "default", mode: "light" }));
    expect(vars["--mk-bg"]).toBe("#FFFEF3");
    expect(vars["--mk-fg"]).toBe("#1A1A1A");
    expect(vars["--mk-primary"]).toBe("#FF6B35");
    expect(vars["--mk-radius"]).toBe("0");
    expect(vars["--mk-font"]).toContain("Inter");
  });
});
