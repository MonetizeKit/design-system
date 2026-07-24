import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import { cn } from "./cn.js";

export interface DecorShapeProps extends HTMLAttributes<HTMLSpanElement> {
  shape?: "circle" | "square" | "triangle";
  /** Edge length / diameter. */
  size?: number;
}

/** A low-opacity decorative shape (§03): drifts in margins, never over body/panels. Decorative only. */
export const DecorShape = forwardRef<HTMLSpanElement, DecorShapeProps>(function DecorShape(
  { shape = "circle", size = 48, className, style, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn("mk-decor", `mk-decor--${shape}`, className)}
      style={shape === "triangle" ? { fontSize: size, ...style } : { width: size, height: size, ...style }}
      {...rest}
    />
  );
});
