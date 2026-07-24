import type { AnchorHTMLAttributes } from "react";
import { forwardRef } from "react";
import { SOCIAL_GLYPHS, SOCIAL_META, SOCIAL_VIEWBOX, type SocialName, type SocialTone } from "@monetizekit/brand";
import { cn } from "./cn.js";
import type { TiltDirection } from "./IconTile.js";

export interface SocialIconProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Social glyph name (§footer). */
  name: SocialName;
  /** soc-* tile ground. Defaults to the glyph's canonical tone. */
  tone?: SocialTone;
  /** Signature ±12° tilt (§04). Defaults to `left` (−12°). */
  tilt?: TiltDirection;
  /** Accessible name. Defaults to the platform label. */
  label?: string;
}

const TILT_CLASS: Record<TiltDirection, string | undefined> = {
  left: "tilt--12",
  right: "tilt-12",
  none: undefined,
};

/**
 * A social tile (§footer): a filled social glyph on a soc-* ground with the black edge, tilted
 * ±12°. Renders as a link (keyboard-focusable via `.mk-focusable`); the glyph fills `currentColor`.
 */
export const SocialIcon = forwardRef<HTMLAnchorElement, SocialIconProps>(function SocialIcon(
  { name, tone, tilt = "left", label, className, ...rest },
  ref,
) {
  const meta = SOCIAL_META[name];
  return (
    <a
      ref={ref}
      className={cn("mk-social", "mk-focusable", `mk-social--${tone ?? meta.tone}`, TILT_CLASS[tilt], className)}
      aria-label={label ?? meta.label}
      {...rest}
    >
      <svg className="mk-icon" viewBox={SOCIAL_VIEWBOX} fill="currentColor" aria-hidden="true">
        <path d={SOCIAL_GLYPHS[name]} />
      </svg>
    </a>
  );
});
