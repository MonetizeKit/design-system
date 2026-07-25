import type { HTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import type { CalloutContract, CalloutTone } from "../contract.js";
import { cn } from "./cn.js";

export interface CalloutProps extends HTMLAttributes<HTMLDivElement>, CalloutContract {
  /** Bar label. Defaults to the tone's canonical word (Note / Tip / Info / Warning / Danger). */
  title?: string;
  /** Optional glyph rendered in the tilted icon tile on the bar (e.g. an `<Icon />`). */
  icon?: ReactNode;
}

const TONE_MODIFIER: Record<CalloutTone, string> = {
  note: "mk-callout--note",
  tip: "mk-callout--tip",
  info: "mk-callout--info",
  warn: "mk-callout--warn",
  danger: "mk-callout--danger",
};

const TONE_LABEL: Record<CalloutTone, string> = {
  note: "Note",
  tip: "Tip",
  info: "Info",
  warn: "Warning",
  danger: "Danger",
};

/**
 * Documentation callout (§13b): a bordered brand panel whose bar takes a status color
 * (note→yellow, tip→mint, info→cyan, warn→pink, danger→red). Fully token-driven, so it
 * inverts with the page in dark mode via the shared token cascade.
 */
export const Callout = forwardRef<HTMLDivElement, CalloutProps>(function Callout(
  { tone = "note", title, icon, className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cn("mk-callout", TONE_MODIFIER[tone], className)} {...rest}>
      <div className="mk-callout__bar">
        {icon ? (
          <span className="mk-callout__icon" aria-hidden="true">
            {icon}
          </span>
        ) : null}
        <span className="mk-callout__title">{title ?? TONE_LABEL[tone]}</span>
      </div>
      <div className="mk-callout__body">{children}</div>
    </div>
  );
});
