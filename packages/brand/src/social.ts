/*
 * @monetizekit/brand — social icon registry (§footer, Brand Direction v0.8).
 *
 * Filled (not stroked) social glyphs on a 24×24 grid, each destined for a tilted social tile with
 * a soc-* ground and an ink (onlight) fill. Same single-source-of-truth model as `icons.ts`.
 */

/** Supported social glyphs. */
export type SocialName = "twitter" | "github" | "linkedin";

/** The soc-* tile ground each social glyph sits on by default (§footer). */
export type SocialTone = "cyan" | "yellow" | "green";

export const SOCIAL_VIEWBOX = "0 0 24 24" as const;

/** Filled path geometry per social glyph, taken verbatim from the v0.8 board footer. */
export const SOCIAL_GLYPHS: Record<SocialName, string> = {
  twitter:
    "M22 5.9c-.7.3-1.5.5-2.3.6.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.9-2.6 1.1a3.9 3.9 0 0 0-6.7 3.6A11.1 11.1 0 0 1 3.9 4.8a3.9 3.9 0 0 0 1.2 5.2c-.6 0-1.2-.2-1.7-.4v.1c0 1.9 1.3 3.5 3.1 3.8-.5.2-1.1.2-1.8.1a3.9 3.9 0 0 0 3.6 2.7A7.9 7.9 0 0 1 2 18.3a11.1 11.1 0 0 0 6 1.8c7.2 0 11.2-6 11.2-11.2v-.5c.8-.6 1.4-1.3 2-2.1z",
  github:
    "M12 2A10 10 0 0 0 8.8 21.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.4-2.2-.2-4.5-1.1-4.5-4.9 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.3 9.3 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.8-2.3 4.7-4.6 4.9.4.3.7.9.7 1.9v2.7c0 .3.2.6.7.5A10 10 0 0 0 12 2z",
  linkedin:
    "M6.9 8.8H3.7V21h3.2V8.8zM5.3 3.6a1.9 1.9 0 1 0 0 3.7 1.9 1.9 0 0 0 0-3.7zM21 21h-3.2v-6c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21H10V8.8h3.1v1.7h.1c.4-.8 1.5-1.7 3.1-1.7 3.3 0 3.9 2.2 3.9 5V21z",
};

export interface SocialMeta {
  tone: SocialTone;
  label: string;
}

/** Default soc-* tone + accessible label per social glyph. */
export const SOCIAL_META: Record<SocialName, SocialMeta> = {
  twitter: { tone: "cyan", label: "Twitter / X" },
  github: { tone: "yellow", label: "GitHub" },
  linkedin: { tone: "green", label: "LinkedIn" },
};

export const SOCIAL_NAMES = Object.keys(SOCIAL_GLYPHS) as SocialName[];
