/*
 * @monetizekit/brand — icon registry (§07/§08 Brand Direction v0.8).
 *
 * The canonical, framework-agnostic source of truth for the MonetizeKit line-icon set. Each glyph
 * is authored on a 24×24 grid with the board's stroke geometry (fill:none, stroke:currentColor,
 * stroke-width 2.2, round caps/joins) so it renders identically whether inlined by a React
 * component (see `@monetizekit/ui-react`'s `Icon`) or emitted as a standalone `.svg` asset by the
 * build (see `scripts/build-assets.mjs`). Nothing downstream re-authors this geometry.
 */

/** A single stroked child element of a glyph. */
export type GlyphNode =
  | { tag: "path"; d: string }
  | { tag: "circle"; cx: number; cy: number; r: number }
  | { tag: "rect"; x: number; y: number; width: number; height: number };

/** The MonetizeKit brand icon names (capabilities §08 + pillars §10). */
export type IconName =
  | "catalog"
  | "enforcement"
  | "credits"
  | "usage"
  | "metering"
  | "approvals"
  | "workflows"
  | "experiments"
  | "contracts"
  | "code"
  | "shield";

/** Category tile colors (a subset of the brand ramp) that a glyph sits on (§07). */
export type IconCategory = "orange" | "violet" | "pink" | "cyan" | "yellow" | "green" | "mint" | "peach";

/** viewBox + stroke contract shared by every glyph, matching the board's `.tile svg`. */
export const ICON_VIEWBOX = "0 0 24 24" as const;
export const ICON_STROKE_WIDTH = 2.2 as const;

/** Stroked geometry for each glyph, taken verbatim from the v0.8 board. */
export const ICON_GLYPHS: Record<IconName, GlyphNode[]> = {
  catalog: [
    { tag: "path", d: "M12 4 21 9 12 14 3 9 12 4Z" },
    { tag: "path", d: "M3 14 12 19 21 14" },
  ],
  enforcement: [{ tag: "path", d: "M13 3 4 14h7l-1 7 9-11h-7l1-7Z" }],
  credits: [
    { tag: "circle", cx: 9, cy: 10, r: 5 },
    { tag: "circle", cx: 15, cy: 14, r: 5 },
  ],
  usage: [{ tag: "path", d: "M3 12h4l3-8 4 16 3-8h4" }],
  metering: [
    { tag: "path", d: "M4 18a8 8 0 1 1 16 0" },
    { tag: "path", d: "M12 18 16 11" },
  ],
  approvals: [
    { tag: "circle", cx: 12, cy: 12, r: 9 },
    { tag: "path", d: "M8 12l3 3 5-6" },
  ],
  workflows: [
    { tag: "rect", x: 3, y: 4, width: 6, height: 5 },
    { tag: "rect", x: 15, y: 15, width: 6, height: 5 },
    { tag: "path", d: "M9 6h4a2 2 0 0 1 2 2v9" },
  ],
  experiments: [
    { tag: "path", d: "M9 3v6l-5 8a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-5-8V3" },
    { tag: "path", d: "M8 3h8" },
  ],
  contracts: [
    { tag: "rect", x: 5, y: 11, width: 14, height: 9 },
    { tag: "path", d: "M8 11V7a4 4 0 0 1 8 0v4" },
  ],
  code: [{ tag: "path", d: "M8 8l-4 4 4 4M16 8l4 4-4 4" }],
  shield: [
    { tag: "path", d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3Z" },
    { tag: "path", d: "M9 12l2 2 4-4" },
  ],
};

export interface IconMeta {
  /** Default category tile color for this capability (§07/§08). */
  category: IconCategory;
  /** Human label for accessibility / captions. */
  label: string;
}

/** Default tile color + label per icon, mirroring the board's capability tiles. */
export const ICON_META: Record<IconName, IconMeta> = {
  catalog: { category: "orange", label: "Catalog" },
  enforcement: { category: "violet", label: "Enforcement" },
  credits: { category: "pink", label: "Credits" },
  usage: { category: "cyan", label: "Usage" },
  metering: { category: "yellow", label: "Metering" },
  approvals: { category: "green", label: "Approvals" },
  workflows: { category: "yellow", label: "Workflows" },
  experiments: { category: "violet", label: "Experiments" },
  contracts: { category: "pink", label: "Contracts" },
  code: { category: "violet", label: "Code" },
  shield: { category: "green", label: "Governance" },
};

/** Categories whose fill is saturated enough to require a white (cream) stroke (§07/§12). */
export const SATURATED_CATEGORIES: readonly IconCategory[] = ["orange", "violet", "pink", "green"];

/** All icon names, in board order. */
export const ICON_NAMES = Object.keys(ICON_GLYPHS) as IconName[];

/** Serialize a glyph's nodes to inner SVG markup (used by the asset build; deterministic). */
export function glyphToSvgChildren(nodes: GlyphNode[]): string {
  return nodes
    .map((node) => {
      switch (node.tag) {
        case "path":
          return `<path d="${node.d}"/>`;
        case "circle":
          return `<circle cx="${node.cx}" cy="${node.cy}" r="${node.r}"/>`;
        case "rect":
          return `<rect x="${node.x}" y="${node.y}" width="${node.width}" height="${node.height}"/>`;
        default: {
          const _exhaustive: never = node;
          return _exhaustive;
        }
      }
    })
    .join("");
}
