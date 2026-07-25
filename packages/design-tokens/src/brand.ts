import type { BrandColors, BrandShadowScale, BrandTokens, OnColorTokens, ResolvedMode } from "./types.js";

/**
 * Frozen Brand Direction v0.8 tokens. This is the single source of truth for brand values;
 * nothing downstream re-defines these. See the canonical reference (incl. the §12 dark table) in
 * `docs/engineering/brand-standardization-plan.md`.
 *
 * The brand model is **mode-aware** (§12): the neutral set inverts between light and dark, the
 * hard-shadow color `shade` dims in dark (so the lit cream edge still reads brighter than its
 * shadow), and accent text lifts. Saturated brand colors (orange, yellow, …) do **not** invert.
 */

/** Saturated brand colors + fixed neutrals that are identical in every mode. */
const CONSTANT_COLORS = {
  onlight: "#1A1A1A",
  orange: "#FF6B35",
  action: "#ED7445",
  violet: "#932CE7",
  pink: "#EA336F",
  yellow: "#F8D45D",
  cyan: "#62D6FA",
  mint: "#C5FDBC",
  peach: "#F4BB92",
  "signal-yellow": "#FFD240",
  purple: "#4F46E5",
  "purple-d": "#3730B5",
  "soc-cyan": "#02D9FF",
  "soc-yellow": "#FFD240",
  "soc-green": "#B6FFB6",
  green: "#16A34A",
  red: "#E5322D",
  "mint-wash": "#DCFBE6",
  "pink-wash": "#FBE6EE",
  "lavender-wash": "#EDEBFC",
  "yellow-wash": "#FDF1D2",
  "cyan-wash": "#DAF4FD",
  "red-wash": "#FBE6E5",
} as const;

/** Mode-aware neutral set — light values (§12). */
export const BRAND_NEUTRALS_LIGHT = {
  cream: "#FFFEF3",
  paper: "#FFFFFF",
  ink: "#1A1A1A",
  shade: "#1A1A1A",
  muted: "#5C5C55",
  faint: "#8C8C83",
  lavender: "#E6E6F8",
  stripe: "#D1D1E2",
  "line-soft": "#D9D8CA",
  dotsoft: "rgba(26, 26, 26, 0.07)",
  "footer-bg": "#1A1A1A",
  "violet-txt": "#932CE7",
  "purple-txt": "#4F46E5",
} as const;

/** Mode-aware neutral set — dark values (§12): warm near-black grounds, cream edges, dimmed shade. */
export const BRAND_NEUTRALS_DARK = {
  cream: "#191811",
  paper: "#242318",
  ink: "#FFFEF3",
  shade: "#AFAD98",
  muted: "#A8A695",
  faint: "#7E7C6D",
  lavender: "#242238",
  stripe: "#34324D",
  "line-soft": "#3A3830",
  dotsoft: "rgba(255, 254, 243, 0.09)",
  "footer-bg": "#0E0E09",
  "violet-txt": "#BB86FC",
  "purple-txt": "#9A93FF",
} as const;

/**
 * The fixed `.on-color` light-island set (§12): the neutral tokens re-pinned to their fixed
 * light values (identical in both modes) plus `text` = `onlight`. Applied to saturated grounds
 * and small saturated objects so they keep a black edge + black text on a dark page.
 */
export const ON_COLOR: OnColorTokens = {
  cream: BRAND_NEUTRALS_LIGHT.cream,
  paper: BRAND_NEUTRALS_LIGHT.paper,
  ink: BRAND_NEUTRALS_LIGHT.ink,
  shade: BRAND_NEUTRALS_LIGHT.shade,
  muted: BRAND_NEUTRALS_LIGHT.muted,
  faint: BRAND_NEUTRALS_LIGHT.faint,
  "line-soft": BRAND_NEUTRALS_LIGHT["line-soft"],
  dotsoft: BRAND_NEUTRALS_LIGHT.dotsoft,
  "violet-txt": BRAND_NEUTRALS_LIGHT["violet-txt"],
  "purple-txt": BRAND_NEUTRALS_LIGHT["purple-txt"],
  text: CONSTANT_COLORS.onlight,
};

const TYPOGRAPHY = {
  fontSans: '"Inter", system-ui, -apple-system, sans-serif',
  fontMono: '"JetBrains Mono", ui-monospace, "SFMono-Regular", monospace',
  displayWeight: "900",
  bodyWeight: "400",
  displayTracking: "-0.03em",
  labelTracking: "0.08em",
} as const;

const BORDER = { panel: "3px", chip: "2px" } as const;

const TILT = {
  badge: "-12deg",
  small: "12deg",
  panelMin: "-2deg",
  panelMax: "2deg",
  zero: "0deg",
} as const;

/** Build the hard-shadow scale from the mode-aware `shade` color (never `ink`) (§12). */
export function brandShadow(shade: string): BrandShadowScale {
  return {
    sm: `4px 4px 0 0 ${shade}`,
    md: `6px 6px 0 0 ${shade}`,
    lg: `9px 9px 0 0 ${shade}`,
  };
}

/** Resolve the full brand color ramp for a concrete mode (saturated constant, neutrals inverted). */
export function resolveBrandColors(mode: ResolvedMode): BrandColors {
  const neutrals = mode === "dark" ? BRAND_NEUTRALS_DARK : BRAND_NEUTRALS_LIGHT;
  return { ...CONSTANT_COLORS, ...neutrals };
}

/** Resolve the full brand identity for a concrete mode (colors, shadow, and soft texture invert). */
export function resolveBrand(mode: ResolvedMode): BrandTokens {
  const colors = resolveBrandColors(mode);
  return {
    colors,
    typography: { ...TYPOGRAPHY },
    radius: "0",
    border: { ...BORDER },
    shadow: brandShadow(colors.shade),
    tilt: { ...TILT },
    texture: {
      dotColor: "#CBAE4E",
      dotColorSoft: colors.dotsoft,
      dotSize: "2.4px",
      gridSize: "26px",
    },
  };
}

/** The light-mode brand identity — the default/back-compat export. */
export const BRAND: BrandTokens = resolveBrand("light");
