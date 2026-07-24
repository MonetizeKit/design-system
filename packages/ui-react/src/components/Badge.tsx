import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import type { BadgeContract, Tone } from "../contract.js";
import { cn } from "./cn.js";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, BadgeContract {}

function toneClass(tone: Tone | undefined): string | undefined {
  if (!tone || tone === "neutral") return undefined;
  return `mk-badge--${tone}`;
}

/** Small mono tag chip. For decision outcomes use `VerdictPill` instead. */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { tone = "neutral", className, ...rest },
  ref,
) {
  return <span ref={ref} className={cn("mk-badge", toneClass(tone), className)} {...rest} />;
});
