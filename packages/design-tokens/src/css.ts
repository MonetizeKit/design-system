import { brandShadow } from "./brand.js";
import type {
  BrandTokens,
  OnColorTokens,
  PaletteName,
  ResolvedMode,
  ResolvedTokens,
  SemanticColors,
} from "./types.js";

/**
 * The CSS selector a `palette × mode` block is emitted under in `tokens.css`.
 *
 * Dark is emitted under BOTH the `[data-theme="dark"]` attribute AND the `.dark` class alias, so a
 * consumer can drive dark mode with either strategy and still get the complete brand dark contract:
 *   - `[data-theme="dark"]` — the attribute the SDK/brand cascade keys on.
 *   - `.dark` — the class Tailwind's `dark:` variant and `next-themes`' class strategy key on.
 *
 * Emitting both centralizes what consumers previously had to hand-mirror per app (the reused
 * shadcn content chrome only repainted reliably on a `.dark` class toggle, not on the attribute
 * alone). Palettes compose with each: `[data-palette="x"][data-theme="dark"], [data-palette="x"].dark`.
 */
export function paletteModeSelector(palette: PaletteName, mode: ResolvedMode): string {
  const isDefault = palette === "default";
  if (mode === "light") {
    return isDefault ? ":root" : `[data-palette="${palette}"]`;
  }
  return isDefault
    ? '[data-theme="dark"], .dark'
    : `[data-palette="${palette}"][data-theme="dark"], [data-palette="${palette}"].dark`;
}

/** Brand ramp / structure tokens as `--mk-*` custom properties (palette-independent). */
export function brandCssVars(brand: BrandTokens): Record<string, string> {
  const vars: Record<string, string> = {};

  for (const [name, value] of Object.entries(brand.colors)) {
    vars[`--mk-${name}`] = value;
  }

  vars["--mk-radius"] = brand.radius;
  vars["--mk-border-panel"] = brand.border.panel;
  vars["--mk-border-chip"] = brand.border.chip;
  vars["--mk-shadow-sm"] = brand.shadow.sm;
  vars["--mk-shadow-md"] = brand.shadow.md;
  vars["--mk-shadow-lg"] = brand.shadow.lg;
  vars["--mk-tilt-badge"] = brand.tilt.badge;
  vars["--mk-tilt-small"] = brand.tilt.small;
  vars["--mk-tilt-panel-min"] = brand.tilt.panelMin;
  vars["--mk-tilt-panel-max"] = brand.tilt.panelMax;
  vars["--mk-font-sans"] = brand.typography.fontSans;
  vars["--mk-font-mono"] = brand.typography.fontMono;
  vars["--mk-display-weight"] = brand.typography.displayWeight;
  vars["--mk-body-weight"] = brand.typography.bodyWeight;
  vars["--mk-tracking-display"] = brand.typography.displayTracking;
  vars["--mk-tracking-label"] = brand.typography.labelTracking;
  vars["--mk-texture-dot-color"] = brand.texture.dotColor;
  vars["--mk-texture-dot-color-soft"] = brand.texture.dotColorSoft;
  vars["--mk-texture-dot-size"] = brand.texture.dotSize;
  vars["--mk-texture-grid-size"] = brand.texture.gridSize;

  return vars;
}

/** Semantic UI slots as `--<var>` custom properties (e.g. `--background`). */
export function semanticCssVars(semantic: SemanticColors): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const [name, value] of Object.entries(semantic)) {
    vars[`--${name}`] = value;
  }
  return vars;
}

/**
 * The `.on-color` light-island re-pin as `--mk-*` custom properties (§12). Emitted inside a
 * `.on-color` block so saturated grounds and small saturated objects keep the fixed light
 * neutrals — black edge + black hard shadow — regardless of page mode. Also re-pins the
 * precomputed shadow strings to `shade` (`#1A1A1A`) so islands never inherit the dimmed dark shade.
 */
export function onColorCssVars(onColor: OnColorTokens): Record<string, string> {
  const shadow = brandShadow(onColor.shade);
  return {
    "--mk-cream": onColor.cream,
    "--mk-paper": onColor.paper,
    "--mk-ink": onColor.ink,
    "--mk-shade": onColor.shade,
    "--mk-muted": onColor.muted,
    "--mk-faint": onColor.faint,
    "--mk-line-soft": onColor["line-soft"],
    "--mk-dotsoft": onColor.dotsoft,
    "--mk-texture-dot-color-soft": onColor.dotsoft,
    "--mk-violet-txt": onColor["violet-txt"],
    "--mk-purple-txt": onColor["purple-txt"],
    "--mk-shadow-sm": shadow.sm,
    "--mk-shadow-md": shadow.md,
    "--mk-shadow-lg": shadow.lg,
  };
}

/**
 * The SDK `--mk-*` appearance contract consumed by `@monetizekit/react`
 * (see `TOKEN_TO_CSS_VAR` in the SDK). Derived from the resolved semantic + brand tokens.
 */
export function mkContractVars(resolved: ResolvedTokens): Record<string, string> {
  const { semantic, brand } = resolved;
  return {
    "--mk-bg": semantic.background,
    "--mk-fg": semantic.foreground,
    "--mk-muted": semantic["muted-foreground"],
    "--mk-primary": semantic.primary,
    "--mk-primary-fg": semantic["primary-foreground"],
    "--mk-accent": semantic.accent,
    "--mk-border": semantic.border,
    "--mk-card": semantic.card,
    "--mk-card-fg": semantic["card-foreground"],
    "--mk-success": semantic.success,
    "--mk-warning": semantic.warning,
    "--mk-danger": semantic.destructive,
    "--mk-radius": brand.radius,
    "--mk-shadow": brand.shadow.sm,
    "--mk-font": brand.typography.fontSans,
  };
}

/**
 * All CSS custom properties for a resolved token set: semantic slots + brand ramp/structure.
 * Suitable for spreading onto an element's inline style (e.g. a Storybook decorator) so a
 * surface restyles live when theme/palette/mode change.
 */
export function tokensToCssVars(resolved: ResolvedTokens): Record<string, string> {
  return {
    ...brandCssVars(resolved.brand),
    ...semanticCssVars(resolved.semantic),
  };
}

/** Serialize a custom-property map into a CSS declaration body (sorted for determinism). */
export function cssVarsToDeclarations(vars: Record<string, string>, indent = "  "): string {
  return Object.keys(vars)
    .sort()
    .map((key) => `${indent}${key}: ${vars[key]};`)
    .join("\n");
}
