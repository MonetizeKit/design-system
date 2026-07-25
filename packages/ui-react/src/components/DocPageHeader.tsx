import type { HTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import type { DocPageHeaderContract } from "../contract.js";
import { cn } from "./cn.js";

export interface DocPageHeaderProps
  extends Omit<HTMLAttributes<HTMLElement>, "title">,
    DocPageHeaderContract {
  /** Right-aligned action slot (buttons, page actions). */
  children?: ReactNode;
}

/**
 * Documentation page-shell header (§13a): renders the page title on the brand DISPLAY scale
 * (display weight + display tracking + ink) with a muted lede and a right-aligned action slot.
 * Presentational and RSC-safe; token-driven via `.mk-doc-header*` in `@monetizekit/brand`, so it
 * inverts with the page in dark mode. Supersedes the reused app dashboard page header for docs.
 */
export const DocPageHeader = forwardRef<HTMLElement, DocPageHeaderProps>(function DocPageHeader(
  { title, description, className, children, ...rest },
  ref,
) {
  return (
    <header ref={ref} className={cn("mk-doc-header", className)} {...rest}>
      <div className="mk-doc-header__heading">
        <h1 className="mk-doc-header__title">{title}</h1>
        {description ? <p className="mk-doc-header__desc">{description}</p> : null}
      </div>
      {children ? <div className="mk-doc-header__actions">{children}</div> : null}
    </header>
  );
});
