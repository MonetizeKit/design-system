import { describe, expect, it } from "vitest";
import {
  cssVarsToDeclarations,
  mkContractVars,
  paletteModeSelector,
  resolveTokens,
  semanticCssVars,
  tokensToCssVars,
} from "../src/index.js";

describe("CSS serialization", () => {
  it("serializes custom properties deterministically (sorted)", () => {
    const decls = cssVarsToDeclarations({ "--b": "2", "--a": "1" });
    expect(decls).toBe("  --a: 1;\n  --b: 2;");
  });

  it("snapshots the brand default light custom properties", () => {
    const vars = tokensToCssVars(resolveTokens({ palette: "default", mode: "light" }));
    expect(cssVarsToDeclarations(vars)).toMatchSnapshot();
  });

  it("snapshots the SDK mk-contract for light and dark", () => {
    const light = cssVarsToDeclarations(mkContractVars(resolveTokens({ mode: "light" })));
    const dark = cssVarsToDeclarations(mkContractVars(resolveTokens({ mode: "dark" })));
    expect({ light, dark }).toMatchSnapshot();
  });

  it("emits a valid --<var> for every semantic slot", () => {
    const vars = semanticCssVars(resolveTokens({ palette: "unicorn", mode: "dark" }).semantic);
    for (const [key, value] of Object.entries(vars)) {
      expect(key.startsWith("--")).toBe(true);
      expect(value.length).toBeGreaterThan(0);
    }
  });
});

describe("paletteModeSelector — centralized dark contract", () => {
  it("emits :root for default light and the plain attribute for palette light", () => {
    expect(paletteModeSelector("default", "light")).toBe(":root");
    expect(paletteModeSelector("nord", "light")).toBe('[data-palette="nord"]');
  });

  it("emits BOTH [data-theme=dark] and the .dark class alias for default dark", () => {
    expect(paletteModeSelector("default", "dark")).toBe('[data-theme="dark"], .dark');
  });

  it("composes the palette with both the attribute and the .dark class in dark", () => {
    expect(paletteModeSelector("dracula", "dark")).toBe(
      '[data-palette="dracula"][data-theme="dark"], [data-palette="dracula"].dark',
    );
  });
});
