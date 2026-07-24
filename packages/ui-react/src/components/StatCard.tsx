import type { HTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import { cn } from "./cn.js";

export interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  value: ReactNode;
}

/** The signature stat card (§01): mono label + a big display figure on a panel. */
export const StatCard = forwardRef<HTMLDivElement, StatCardProps>(function StatCard(
  { label, value, className, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cn("mk-statcard", className)} {...rest}>
      <div className="mk-statcard__label">{label}</div>
      <div className="mk-statcard__value">{value}</div>
    </div>
  );
});
