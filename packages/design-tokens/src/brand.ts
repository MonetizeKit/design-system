import type { BrandTokens } from "./types.js";

/**
 * Frozen Brand Direction v0.7 tokens. This is the single source of truth for brand values;
 * nothing downstream re-defines these. See the canonical reference in
 * `docs/engineering/brand-standardization-plan.md`.
 */
export const BRAND: BrandTokens = {
  colors: {
    cream: "#FFFEF3",
    paper: "#FFFFFF",
    ink: "#1A1A1A",
    orange: "#FF6B35",
    action: "#ED7445",
    violet: "#932CE7",
    pink: "#EA336F",
    yellow: "#F8D45D",
    lavender: "#E6E6F8",
    cyan: "#62D6FA",
    mint: "#C5FDBC",
    peach: "#F4BB92",
    "signal-yellow": "#FFD240",
    muted: "#5C5C55",
    faint: "#8C8C83",
    "line-soft": "#D9D8CA",
    green: "#16A34A",
    red: "#E5322D",
    "mint-wash": "#DCFBE6",
    "pink-wash": "#FBE6EE",
    "lavender-wash": "#EDEBFC",
    "yellow-wash": "#FDF1D2",
    "cyan-wash": "#DAF4FD",
    "red-wash": "#FBE6E5",
  },
  typography: {
    fontSans: '"Inter", system-ui, -apple-system, sans-serif',
    fontMono: '"JetBrains Mono", ui-monospace, "SFMono-Regular", monospace',
    displayWeight: "900",
    bodyWeight: "400",
    displayTracking: "-0.03em",
    labelTracking: "0.08em",
  },
  radius: "0",
  border: {
    panel: "3px",
    chip: "2px",
  },
  shadow: {
    sm: "4px 4px 0 0 #1A1A1A",
    md: "6px 6px 0 0 #1A1A1A",
    lg: "9px 9px 0 0 #1A1A1A",
  },
  tilt: {
    badge: "-12deg",
    small: "12deg",
    panelMin: "-2deg",
    panelMax: "2deg",
    zero: "0deg",
  },
  texture: {
    dotColor: "#CBAE4E",
    dotColorSoft: "rgba(26, 26, 26, 0.07)",
    dotSize: "2.4px",
    gridSize: "26px",
  },
};
