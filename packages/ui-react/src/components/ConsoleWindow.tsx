import type { HTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import { cn } from "./cn.js";

export interface ConsoleWindowProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Optional title-bar label (e.g. a file or endpoint name). */
  title?: ReactNode;
}

/** The signature console window (§01): title bar with traffic-light dots + a mono body. */
export const ConsoleWindow = forwardRef<HTMLDivElement, ConsoleWindowProps>(function ConsoleWindow(
  { title, className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cn("mk-console", className)} {...rest}>
      <div className="mk-console__bar">
        <span className="mk-console__dot mk-console__dot--r" aria-hidden="true" />
        <span className="mk-console__dot mk-console__dot--y" aria-hidden="true" />
        <span className="mk-console__dot mk-console__dot--g" aria-hidden="true" />
        {title ? <span style={{ marginLeft: "0.75ch" }}>{title}</span> : null}
      </div>
      <div className="mk-console__body">{children}</div>
    </div>
  );
});
