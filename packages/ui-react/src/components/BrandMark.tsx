import type { SVGAttributes } from "react";
import { forwardRef } from "react";

export interface BrandMarkProps extends Omit<SVGAttributes<SVGSVGElement>, "viewBox"> {
  /** Signature −12° tilt (§01). */
  tilt?: boolean;
  /** Draw the hard offset shadow behind the badge. */
  shadow?: boolean;
  title?: string;
}

const MONOGRAM = (
  <g fill="none" stroke="#1A1A1A" strokeWidth={46} strokeLinecap="butt" strokeLinejoin="miter">
    <path d="M110 350 L110 160 L180 270 L250 160 L250 350" />
    <path d="M300 160 L300 350" />
    <path d="M300 258 L420 160" />
    <path d="M300 258 L420 350" />
  </g>
);

/** The MonetizeKit badge (inline SVG so it inherits currentColor context and needs no asset import). */
export const MonetizeKitBadge = forwardRef<SVGSVGElement, BrandMarkProps>(function MonetizeKitBadge(
  { tilt = false, shadow = false, title = "MonetizeKit", width = 64, height = 64, ...rest },
  ref,
) {
  return (
    <svg ref={ref} viewBox="0 0 512 512" width={width} height={height} role="img" aria-label={title} {...rest}>
      <g transform={tilt ? "rotate(-12 256 256)" : undefined}>
        {shadow ? <rect x={40} y={40} width={456} height={456} fill="#1A1A1A" /> : null}
        <rect x={16} y={16} width={480} height={480} fill="#ED7445" stroke="#1A1A1A" strokeWidth={24} />
        {MONOGRAM}
      </g>
    </svg>
  );
});

export interface WordmarkProps extends Omit<SVGAttributes<SVGSVGElement>, "viewBox"> {
  title?: string;
}

/** The MonetizeKit wordmark lockup (badge + "MonetizeKit"). */
export const MonetizeKitWordmark = forwardRef<SVGSVGElement, WordmarkProps>(function MonetizeKitWordmark(
  { title = "MonetizeKit", width = 260, height = 64, ...rest },
  ref,
) {
  return (
    <svg ref={ref} viewBox="0 0 900 220" width={width} height={height} role="img" aria-label={title} {...rest}>
      <g transform="translate(10 10)">
        <rect x={6} y={6} width={180} height={180} fill="#ED7445" stroke="#1A1A1A" strokeWidth={8} />
        <g fill="none" stroke="#1A1A1A" strokeWidth={20} strokeLinecap="butt" strokeLinejoin="miter" transform="translate(6 6) scale(0.3516)">
          <path d="M110 350 L110 160 L180 270 L250 160 L250 350" />
          <path d="M300 160 L300 350" />
          <path d="M300 258 L420 160" />
          <path d="M300 258 L420 350" />
        </g>
      </g>
      <text x={240} y={140} fill="#1A1A1A" fontFamily="Inter, system-ui, sans-serif" fontWeight={900} fontSize={112} letterSpacing={-3}>
        MonetizeKit
      </text>
    </svg>
  );
});
