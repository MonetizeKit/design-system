import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import type { SectionContract } from "../contract.js";
import { cn } from "./cn.js";

export interface SectionProps extends HTMLAttributes<HTMLElement>, SectionContract {}

const GROUND_CLASS = {
  cream: "g-cream",
  paper: "g-paper",
  lavender: "g-lavender",
  orange: "g-orange",
  action: "g-action",
  yellow: "g-yellow",
  violet: "g-violet",
  pink: "g-pink",
  cyan: "g-cyan",
  mint: "g-mint",
  footer: "g-footer",
} as const;

const TEXTURE_CLASS = {
  none: undefined,
  dots: "tex-dots",
  "dots-soft": "tex-dots-soft",
  stripe: "tex-stripe",
} as const;

const SATURATED = new Set(["orange", "action", "yellow", "violet", "pink", "cyan", "mint"]);

/**
 * A full-bleed ground band (§03): one ground color + optional texture, separated by a 3px rule.
 * Saturated grounds default to fixed light-islands (`.on-color`, §12) unless `island={false}`.
 */
export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { ground = "cream", texture = "none", island, className, children, ...rest },
  ref,
) {
  const useIsland = island ?? SATURATED.has(ground);
  return (
    <section
      ref={ref}
      className={cn("mk-section", GROUND_CLASS[ground], TEXTURE_CLASS[texture], useIsland && "on-color", className)}
      {...rest}
    >
      {children}
    </section>
  );
});
