import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";
import type { InputContract } from "../contract.js";
import { cn } from "./cn.js";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    InputContract {}

/** Mono text input with a 3px edge and violet focus ring (§09). */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { size = "md", invalid = false, className, "aria-invalid": ariaInvalid, ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      aria-invalid={ariaInvalid ?? (invalid || undefined)}
      className={cn(
        "mk-input",
        size === "sm" && "mk-input--sm",
        size === "lg" && "mk-input--lg",
        invalid && "mk-input--invalid",
        className,
      )}
      {...rest}
    />
  );
});
