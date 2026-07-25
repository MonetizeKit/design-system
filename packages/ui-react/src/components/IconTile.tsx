import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import { ICON_META, type IconCategory, type IconName } from "@monetizekit/brand";
import { Icon } from "./Icon.js";
import { cn } from "./cn.js";

/** Signature tilt directions (§04): small objects sit at ±12° and straighten on hover. */
export type TiltDirection = "left" | "right" | "none";

export interface IconTileProps extends HTMLAttributes<HTMLSpanElement> {
  /** Brand glyph name (§07/§08). */
  name: IconName;
  /** Tile ground color. Defaults to the icon's canonical category color. */
  category?: IconCategory;
  /** Signature ±12° tilt (§04). Defaults to `left` (−12°). */
  tilt?: TiltDirection;
  /** Accessible name for the tile. Defaults to the icon's label. */
  label?: string;
}

const TILT_CLASS: Record<TiltDirection, string | undefined> = {
  left: "tilt--12",
  right: "tilt-12",
  none: undefined,
};

/**
 * A capability icon tile (§07/§08): a brand line icon on a saturated color tile with the black
 * edge + hard shadow, tilted ±12°. White stroke on saturated fills, ink stroke on light fills
 * (handled in CSS). Icon tiles are light-island objects — they keep a black edge in dark mode.
 */
export const IconTile = forwardRef<HTMLSpanElement, IconTileProps>(function IconTile(
  { name, category, tilt = "left", label, className, ...rest },
  ref,
) {
  const meta = ICON_META[name];
  const tone = category ?? meta.category;
  return (
    <span
      ref={ref}
      className={cn("mk-icon-tile", `mk-icon-tile--${tone}`, TILT_CLASS[tilt], className)}
      role="img"
      aria-label={label ?? meta.label}
      {...rest}
    >
      <Icon name={name} />
    </span>
  );
});
