/**
 * Type contract for the MonetizeKit design-token composition model.
 *
 * Theming composes three orthogonal axes:
 *   - `theme`   — brand identity (structure + brand color ramp). `brand` for v0.7.
 *   - `palette` — a named semantic color scheme (brand `default` + 8 experimentation palettes).
 *   - `mode`    — `light` | `dark` | `system` (`system` follows `prefers-color-scheme`).
 */

/** Brand identity. Only `brand` exists for v0.7; the union is intentionally extensible. */
export type ThemeName = "brand";

/** Named semantic color schemes. `default` is the on-brand look; the rest are for experimentation. */
export type PaletteName =
  | "default"
  | "nord"
  | "solarized"
  | "dracula"
  | "github"
  | "rose-pine"
  | "blue"
  | "green"
  | "unicorn";

/** Requested color mode. `system` resolves to light/dark via `prefersDark`. */
export type Mode = "light" | "dark" | "system";

/** The concrete mode a resolution collapses to. */
export type ResolvedMode = "light" | "dark";

/**
 * Semantic UI slots (kebab-cased to match the emitted CSS custom properties, e.g. `--background`).
 * Every palette's `default` provides the complete set; other palettes override a subset and
 * inherit the remainder from `default` (mirroring the CSS `:root` → `[data-palette]` cascade).
 */
export type SemanticVar =
  | "background"
  | "foreground"
  | "card"
  | "card-foreground"
  | "popover"
  | "popover-foreground"
  | "primary"
  | "primary-foreground"
  | "secondary"
  | "secondary-foreground"
  | "muted"
  | "muted-foreground"
  | "accent"
  | "accent-foreground"
  | "destructive"
  | "destructive-foreground"
  | "border"
  | "input"
  | "ring"
  | "success"
  | "success-foreground"
  | "warning"
  | "warning-foreground"
  | "sidebar"
  | "sidebar-foreground"
  | "sidebar-primary"
  | "sidebar-primary-foreground"
  | "sidebar-accent"
  | "sidebar-accent-foreground"
  | "sidebar-border"
  | "sidebar-ring";

/** A complete semantic color set for one palette in one mode. */
export type SemanticColors = Record<SemanticVar, string>;

/** A palette definition: complete for `default`, partial overrides for the rest. */
export interface PaletteVariants {
  light: Partial<SemanticColors>;
  dark: Partial<SemanticColors>;
}

/** Brand color ramp — the frozen Brand Direction v0.8 palette. */
export interface BrandColors {
  cream: string;
  paper: string;
  ink: string;
  /**
   * Hard-shadow color — mode-aware and **distinct from `ink`** (§12). Light `#1A1A1A`;
   * dark `#AFAD98` (dimmed so the lit cream edge still reads brighter than its shadow).
   * All shadow output references `shade`, never `ink`.
   */
  shade: string;
  /** Fixed on-light neutral (`#1A1A1A`) that **never inverts** — text/edges on saturated fills. */
  onlight: string;
  orange: string;
  action: string;
  violet: string;
  /** Accent violet text — lifts to `#BB86FC` in dark so code tokens stay legible (§12). */
  "violet-txt": string;
  /** Accent purple text — lifts to `#9A93FF` in dark (§12). */
  "purple-txt": string;
  pink: string;
  yellow: string;
  lavender: string;
  /** Stripe-texture line color (mode-aware). */
  stripe: string;
  cyan: string;
  mint: string;
  peach: string;
  "signal-yellow": string;
  muted: string;
  faint: string;
  "line-soft": string;
  /** Footer ground — deeper than the page ground (mode-aware). */
  "footer-bg": string;
  /** Soft dot-texture color (mode-aware). */
  dotsoft: string;
  green: string;
  red: string;
  /** Verdict-pill washes. */
  "mint-wash": string;
  "pink-wash": string;
  "lavender-wash": string;
  "yellow-wash": string;
  "cyan-wash": string;
  "red-wash": string;
}

/**
 * The non-inverting `.on-color` "light island" set (§12). Saturated brand grounds (orange,
 * yellow) and small saturated objects do **not** invert in dark mode; they re-pin these neutrals
 * locally to their fixed light values (identical in both modes) and set text to `onlight`, so a
 * yellow/orange section keeps a black edge + black text on a dark page.
 */
export interface OnColorTokens {
  cream: string;
  paper: string;
  ink: string;
  shade: string;
  muted: string;
  faint: string;
  "line-soft": string;
  dotsoft: string;
  "violet-txt": string;
  "purple-txt": string;
  /** Text color for saturated fills — the fixed `onlight` (`#1A1A1A`). */
  text: string;
}

export interface BrandTypography {
  fontSans: string;
  fontMono: string;
  displayWeight: string;
  bodyWeight: string;
  displayTracking: string;
  labelTracking: string;
}

export interface BrandShadowScale {
  sm: string;
  md: string;
  lg: string;
}

export interface BrandBorderWidths {
  panel: string;
  chip: string;
}

export interface BrandTilt {
  badge: string;
  small: string;
  panelMin: string;
  panelMax: string;
  zero: string;
}

export interface BrandTexture {
  dotColor: string;
  dotColorSoft: string;
  dotSize: string;
  gridSize: string;
}

/** Theme-level (palette-independent) brand identity tokens. */
export interface BrandTokens {
  colors: BrandColors;
  typography: BrandTypography;
  radius: string;
  border: BrandBorderWidths;
  shadow: BrandShadowScale;
  tilt: BrandTilt;
  texture: BrandTexture;
}

export interface ResolveInput {
  theme?: ThemeName;
  palette?: PaletteName;
  mode?: Mode;
}

export interface ResolveOptions {
  /** For `system` mode: whether the OS currently prefers dark. Defaults to `false`. */
  prefersDark?: boolean;
}

/** Fully resolved token set for one theme × palette × mode combination. */
export interface ResolvedTokens {
  theme: ThemeName;
  palette: PaletteName;
  /** The requested mode (may be `system`). */
  mode: Mode;
  /** The concrete mode this resolved to (`system` collapsed via `prefersDark`). */
  resolvedMode: ResolvedMode;
  /** Brand identity resolved for `resolvedMode` (neutrals inverted + `shade` dimmed in dark). */
  brand: BrandTokens;
  /**
   * The fixed `.on-color` light-island neutral set — identical in both modes, for saturated
   * fills that must not invert (§12).
   */
  onColor: OnColorTokens;
  semantic: SemanticColors;
}
