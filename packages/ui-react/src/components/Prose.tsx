import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import { cn } from "./cn.js";

export type ProseProps = HTMLAttributes<HTMLDivElement>;

/**
 * Long-form documentation prose scale (§13e): applies the brand type rhythm to headings,
 * paragraphs, lists, links, inline code, and blockquotes via the `.mk-prose` class
 * (token-driven, from `@monetizekit/brand/primitives.css`).
 */
export const Prose = forwardRef<HTMLDivElement, ProseProps>(function Prose(
  { className, ...rest },
  ref,
) {
  return <div ref={ref} className={cn("mk-prose", className)} {...rest} />;
});
