import type { ButtonHTMLAttributes } from "react";
import { forwardRef } from "react";
import { cn } from "./cn.js";

export type TileProps = ButtonHTMLAttributes<HTMLButtonElement>;

/** An interactive grid cell (panel that lifts on hover). Rendered as a button for keyboard access. */
export const Tile = forwardRef<HTMLButtonElement, TileProps>(function Tile(
  { className, type = "button", ...rest },
  ref,
) {
  return <button ref={ref} type={type} className={cn("mk-tile", "mk-focusable", className)} {...rest} />;
});
