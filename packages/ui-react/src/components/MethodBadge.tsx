import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import type { HttpMethod, MethodContract } from "../contract.js";
import { cn } from "./cn.js";

export interface MethodBadgeProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "children">,
    MethodContract {}

const METHOD_MODIFIER: Record<HttpMethod, string> = {
  GET: "mk-method--get",
  POST: "mk-method--post",
  PUT: "mk-method--put",
  PATCH: "mk-method--patch",
  DELETE: "mk-method--delete",
};

/**
 * HTTP method badge for the docs API kit (§13c): a mono, edged chip color-coded per method
 * (GET→green, POST→violet, PUT→yellow, PATCH→action, DELETE→pink). Token-driven.
 */
export const MethodBadge = forwardRef<HTMLSpanElement, MethodBadgeProps>(function MethodBadge(
  { method, className, ...rest },
  ref,
) {
  return (
    <span ref={ref} className={cn("mk-method", METHOD_MODIFIER[method], className)} {...rest}>
      {method}
    </span>
  );
});
