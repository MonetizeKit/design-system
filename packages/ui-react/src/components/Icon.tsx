import type { SVGAttributes } from "react";
import { forwardRef } from "react";
import { ICON_GLYPHS, ICON_STROKE_WIDTH, ICON_VIEWBOX, type GlyphNode, type IconName } from "@monetizekit/brand";
import { cn } from "./cn.js";

function GlyphShape({ node }: { node: GlyphNode }) {
  switch (node.tag) {
    case "path":
      return <path d={node.d} />;
    case "circle":
      return <circle cx={node.cx} cy={node.cy} r={node.r} />;
    case "rect":
      return <rect x={node.x} y={node.y} width={node.width} height={node.height} />;
    default: {
      const _exhaustive: never = node;
      return _exhaustive;
    }
  }
}

export interface IconProps extends Omit<SVGAttributes<SVGSVGElement>, "viewBox"> {
  /** Brand glyph name (§07/§08). */
  name: IconName;
  /** Convenience square sizing (sets both width and height). */
  size?: number | string;
  /** Accessible name. When omitted the icon is `aria-hidden` (decorative). */
  title?: string;
}

/**
 * A MonetizeKit line icon (§07/§08), rendered inline from the `@monetizekit/brand` glyph registry
 * so it inherits `currentColor` (stroke) and needs no asset fetch. Purely decorative unless `title`.
 */
export const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
  { name, size, title, className, width, height, ...rest },
  ref,
) {
  const nodes = ICON_GLYPHS[name];
  return (
    <svg
      ref={ref}
      className={cn("mk-icon", className)}
      viewBox={ICON_VIEWBOX}
      width={size ?? width}
      height={size ?? height}
      fill="none"
      stroke="currentColor"
      strokeWidth={ICON_STROKE_WIDTH}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      {...rest}
    >
      {nodes.map((node) => (
        <GlyphShape key={JSON.stringify(node)} node={node} />
      ))}
    </svg>
  );
});
