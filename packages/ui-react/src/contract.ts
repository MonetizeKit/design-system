/**
 * @monetizekit/ui-react/contract — the frozen shared component contract (Brand Direction v0.8).
 *
 * These types are the interop surface every renderer (React today; Web Components / Vue / Svelte
 * later) agrees on, and they are composed along the three brand axes: theme × palette × mode.
 * Keeping them in a dedicated, side-effect-free module lets non-React consumers depend on the
 * contract without pulling in React.
 */

import type { Mode, PaletteName, ResolvedMode, ThemeName } from "@monetizekit/design-tokens";

/** The three brand composition axes (§00). `theme` is currently the single "brand" theme. */
export type { ThemeName, PaletteName, Mode, ResolvedMode };
/** Mode as authored (`"system"` resolves against prefers-color-scheme). */
export type ModeSetting = Mode;

/** Visual emphasis shared across interactive surfaces. */
export type Variant = "primary" | "secondary" | "ghost";

/** Semantic tone — maps to the accent/wash token families. */
export type Tone = "neutral" | "action" | "violet" | "mint" | "red" | "yellow" | "cyan";

export type Size = "sm" | "md" | "lg";

/** The verdict vocabulary (§01/§10). */
export type Verdict = "ALLOW" | "DENY" | "REQUIRE_TOP_UP" | "DEGRADE" | "RECORDED";

export interface ButtonContract {
  variant?: Variant;
  tone?: Tone;
  size?: Size;
  disabled?: boolean;
}

export interface BadgeContract {
  tone?: Tone;
}

export interface CardContract {
  /** Signature slight tilt (§04); straightens on hover. */
  tilt?: boolean;
  /** Hard-shadow depth. */
  elevation?: "none" | "sm" | "md" | "lg";
}

export interface SectionContract {
  /** Named brand ground (§03). Saturated grounds become fixed light-islands (see `island`). */
  ground?: "cream" | "paper" | "lavender" | "orange" | "action" | "yellow" | "violet" | "pink" | "cyan" | "mint" | "footer";
  /** Overlay texture (§03). */
  texture?: "none" | "dots" | "dots-soft" | "stripe";
  /** Pin neutrals to their fixed light values so a saturated ground stays a light-island in dark mode (§12). */
  island?: boolean;
}

export interface InputContract {
  size?: Size;
  invalid?: boolean;
}

export interface VerdictContract {
  verdict: Verdict;
}

/** Theme-provider contract — sets the three axes on a subtree. */
export interface ThemeContract {
  theme?: ThemeName;
  palette?: PaletteName;
  mode?: ModeSetting;
}

/**
 * Documentation callout tones (§13b), mapped to the brand status-color family:
 * `note` → yellow, `tip` → mint, `info` → cyan, `warn` → pink, `danger` → red.
 */
export type CalloutTone = "note" | "tip" | "info" | "warn" | "danger";

export interface CalloutContract {
  tone?: CalloutTone;
}

/** HTTP method vocabulary for the docs API kit (§13c). */
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface MethodContract {
  method: HttpMethod;
}

/** Documentation page-shell header (§13a): title + optional lede on the brand display scale. */
export interface DocPageHeaderContract {
  title: string;
  description?: string;
}

/** A single tab in a documentation code block (§13d). */
export interface DocCodeTab {
  /** Tab label (e.g. "cURL", "Node", "Python"); also used as the language chip when untabbed. */
  label: string;
  /** Source to render (and copy). */
  code: string;
  /** Language hint for the corner chip / aria label. */
  language?: string;
}
