/**
 * @monetizekit/brand — brand identity built on @monetizekit/design-tokens (Brand Direction v0.8).
 *
 * CSS is shipped as side-effect stylesheets (import the subpath exports):
 *   import "@monetizekit/brand/css";             // brand.css (utilities + tokens + §12 dark)
 *   import "@monetizekit/brand/primitives.css";  // verdict pill, console window, stat card, decor
 *
 * This entry exports the media asset manifest and the shared OG template.
 */

export type { AssetEntry, AssetKind } from "./assets.js";
export {
  ASSET_BASE,
  LOGO_ASSETS,
  ICON_ASSETS,
  RASTER_ICONS,
  GLYPH_ICON_ASSETS,
  SOCIAL_ICON_ASSETS,
  SOCIAL_ASSETS,
  ASSETS,
  assetImport,
} from "./assets.js";

export type { GlyphNode, IconName, IconCategory, IconMeta } from "./icons.js";
export {
  ICON_VIEWBOX,
  ICON_STROKE_WIDTH,
  ICON_GLYPHS,
  ICON_META,
  ICON_NAMES,
  SATURATED_CATEGORIES,
  glyphToSvgChildren,
} from "./icons.js";

export type { SocialName, SocialTone, SocialMeta } from "./social.js";
export { SOCIAL_VIEWBOX, SOCIAL_GLYPHS, SOCIAL_META, SOCIAL_NAMES } from "./social.js";

export type { OgNode, OgTemplateProps } from "./og/template.js";
export { OG_SIZE, ogTemplate } from "./og/template.js";

/** The MonetizeKit category line (§10 voice). */
export const CATEGORY_LINE = "The monetization control plane." as const;

/** Verdict vocabulary (§01/§10) — the canonical decision outcomes. */
export const VERDICTS = ["ALLOW", "DENY", "REQUIRE_TOP_UP", "DEGRADE", "RECORDED"] as const;
export type Verdict = (typeof VERDICTS)[number];

/** Map a verdict to its `.mk-verdict--*` modifier class (primitives.css). */
export function verdictClass(verdict: Verdict): string {
  return `mk-verdict mk-verdict--${verdict.toLowerCase().replace(/_/g, "-")}`;
}
