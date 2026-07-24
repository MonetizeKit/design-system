import type { ButtonHTMLAttributes } from "react";
import { forwardRef } from "react";
import type { ButtonContract, Tone, Variant } from "../contract.js";
import { cn } from "./cn.js";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonContract {}

const VARIANT_CLASS: Record<Variant, string> = {
  primary: "mk-btn--primary",
  secondary: "mk-btn--secondary",
  ghost: "mk-btn--ghost",
};

function toneClass(tone: Tone | undefined): string | undefined {
  if (!tone || tone === "neutral" || tone === "action") return undefined;
  return `mk-btn--tone-${tone}`;
}

/** Primary/secondary/ghost action button (§09) — mono label, 3px chip edge, hard shadow. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", tone = "action", size = "md", className, type = "button", ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        "mk-btn",
        VARIANT_CLASS[variant],
        variant !== "ghost" && toneClass(tone),
        size === "sm" && "mk-btn--sm",
        size === "lg" && "mk-btn--lg",
        className,
      )}
      {...rest}
    />
  );
});
