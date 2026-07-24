import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import type { Verdict, VerdictContract } from "../contract.js";
import { cn } from "./cn.js";

export interface VerdictPillProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "children">,
    VerdictContract {}

const VERDICT_MODIFIER: Record<Verdict, string> = {
  ALLOW: "mk-verdict--allow",
  DENY: "mk-verdict--deny",
  REQUIRE_TOP_UP: "mk-verdict--require-top-up",
  DEGRADE: "mk-verdict--degrade",
  RECORDED: "mk-verdict--recorded",
};

/** The signature verdict pill (§01/§10): ALLOW · DENY · REQUIRE_TOP_UP · DEGRADE · RECORDED. */
export const VerdictPill = forwardRef<HTMLSpanElement, VerdictPillProps>(function VerdictPill(
  { verdict, className, ...rest },
  ref,
) {
  return (
    <span ref={ref} className={cn("mk-verdict", VERDICT_MODIFIER[verdict], className)} {...rest}>
      {verdict}
    </span>
  );
});
