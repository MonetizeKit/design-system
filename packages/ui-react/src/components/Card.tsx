import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import type { CardContract } from "../contract.js";
import { cn } from "./cn.js";

export interface CardProps extends HTMLAttributes<HTMLDivElement>, CardContract {}

const ELEVATION_CLASS = {
  none: undefined,
  sm: "mk-shadow-sm",
  md: "mk-shadow-md",
  lg: "mk-shadow-lg",
} as const;

/** A panel: paper ground, 3px edge, radius 0, hard shadow (§09). Optional signature tilt (§04). */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { tilt = false, elevation = "md", className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn("mk-card", ELEVATION_CLASS[elevation], tilt && "tilt-panel", className)}
      {...rest}
    />
  );
});
