/*
 * @monetizekit/brand — social icon registry (§footer, Brand Direction v0.8).
 *
 * Filled (not stroked) social glyphs on a 24×24 grid, each destined for a tilted social tile with
 * a soc-* ground and an ink (onlight) fill. Same single-source-of-truth model as `icons.ts`.
 */

/** Supported social glyphs. */
export type SocialName = "twitter" | "github" | "linkedin" | "reddit";

/** The soc-* tile ground each social glyph sits on by default (§footer). */
export type SocialTone = "cyan" | "yellow" | "green" | "orange";

export const SOCIAL_VIEWBOX = "0 0 24 24" as const;

/** Filled path geometry per social glyph, taken verbatim from the v0.8 board footer. */
export const SOCIAL_GLYPHS: Record<SocialName, string> = {
  twitter:
    "M22 5.9c-.7.3-1.5.5-2.3.6.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.9-2.6 1.1a3.9 3.9 0 0 0-6.7 3.6A11.1 11.1 0 0 1 3.9 4.8a3.9 3.9 0 0 0 1.2 5.2c-.6 0-1.2-.2-1.7-.4v.1c0 1.9 1.3 3.5 3.1 3.8-.5.2-1.1.2-1.8.1a3.9 3.9 0 0 0 3.6 2.7A7.9 7.9 0 0 1 2 18.3a11.1 11.1 0 0 0 6 1.8c7.2 0 11.2-6 11.2-11.2v-.5c.8-.6 1.4-1.3 2-2.1z",
  github:
    "M12 2A10 10 0 0 0 8.8 21.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.4-2.2-.2-4.5-1.1-4.5-4.9 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.3 9.3 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.8-2.3 4.7-4.6 4.9.4.3.7.9.7 1.9v2.7c0 .3.2.6.7.5A10 10 0 0 0 12 2z",
  linkedin:
    "M6.9 8.8H3.7V21h3.2V8.8zM5.3 3.6a1.9 1.9 0 1 0 0 3.7 1.9 1.9 0 0 0 0-3.7zM21 21h-3.2v-6c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21H10V8.8h3.1v1.7h.1c.4-.8 1.5-1.7 3.1-1.7 3.3 0 3.9 2.2 3.9 5V21z",
  reddit:
    "M12 0C5.373 0 0 5.373 0 12c0 3.314 1.343 6.314 3.515 8.485l-2.286 2.286C.775 23.225 1.097 24 1.738 24H12c6.627 0 12-5.373 12-12S18.627 0 12 0Zm4.388 3.199c1.104 0 1.999.895 1.999 1.999 0 1.105-.895 2-1.999 2-.946 0-1.739-.657-1.947-1.539v.002c-1.147.162-2.032 1.15-2.032 2.341v.007c1.776.067 3.4.567 4.686 1.363.473-.363 1.064-.58 1.707-.58 1.547 0 2.802 1.254 2.802 2.802 0 1.117-.655 2.081-1.601 2.531-.088 3.256-3.637 5.876-7.997 5.876-4.361 0-7.905-2.617-7.998-5.87-.954-.447-1.614-1.415-1.614-2.538 0-1.548 1.255-2.802 2.803-2.802.645 0 1.239.218 1.712.585 1.275-.79 2.881-1.291 4.64-1.365v-.01c0-1.663 1.263-3.034 2.88-3.207.188-.911.993-1.595 1.959-1.595Zm-8.085 8.376c-.784 0-1.459.78-1.506 1.797-.047 1.016.64 1.429 1.426 1.429.786 0 1.371-.369 1.418-1.385.047-1.017-.553-1.841-1.338-1.841Zm7.406 0c-.786 0-1.385.824-1.338 1.841.047 1.017.634 1.385 1.418 1.385.785 0 1.473-.413 1.426-1.429-.046-1.017-.721-1.797-1.506-1.797Zm-3.703 4.013c-.974 0-1.907.048-2.77.135-.147.015-.241.168-.183.305.483 1.154 1.622 1.964 2.953 1.964 1.33 0 2.47-.81 2.953-1.964.057-.137-.037-.29-.184-.305-.863-.087-1.795-.135-2.769-.135Z",
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
  reddit: { tone: "orange", label: "Reddit" },
};

export const SOCIAL_NAMES = Object.keys(SOCIAL_GLYPHS) as SocialName[];
