"use client";

import type { HTMLAttributes } from "react";
import { useMemo, useState } from "react";
import type { DocCodeTab } from "../contract.js";
import { cn } from "./cn.js";

export interface DocCodeBlockProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** Single-snippet form. Ignored when `tabs` is provided. */
  code?: string;
  /** Language chip label for the single-snippet form. */
  language?: string;
  /** Multi-tab form: one entry per language/variant. */
  tabs?: DocCodeTab[];
  /** Render a left-hand line-number gutter. */
  showLineNumbers?: boolean;
}

function toTabs(code: string | undefined, language: string | undefined, tabs: DocCodeTab[] | undefined): DocCodeTab[] {
  if (tabs && tabs.length > 0) return tabs;
  return [{ label: language ?? "code", language: language ?? undefined, code: code ?? "" }];
}

/**
 * Documentation code block (§13d): an edged brand panel with a tab/language bar, a copy button,
 * and an optional line-number gutter. Token-driven via the `.mk-doccode*` classes in
 * `@monetizekit/brand/primitives.css`, so it follows the page theme and palette.
 *
 * Client component (uses state + the clipboard); import from `@monetizekit/ui-react/client`.
 */
export function DocCodeBlock({
  code,
  language,
  tabs,
  showLineNumbers = false,
  className,
  "aria-label": ariaLabel,
  ...rest
}: DocCodeBlockProps) {
  const resolvedTabs = useMemo(() => toTabs(code, language, tabs), [code, language, tabs]);
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const current = resolvedTabs[Math.min(active, resolvedTabs.length - 1)] ?? resolvedTabs[0];
  const lines = useMemo(() => (current?.code ?? "").split("\n"), [current]);
  const multi = resolvedTabs.length > 1;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(current?.code ?? "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // best-effort clipboard behavior
    }
  };

  return (
    <div
      className={cn("mk-doccode", className)}
      aria-label={ariaLabel ?? `Code snippet (${current?.language ?? current?.label ?? "code"})`}
      {...rest}
    >
      <div className="mk-doccode__bar">
        {multi ? (
          <div className="mk-doccode__tabs" role="tablist">
            {resolvedTabs.map((tab, index) => (
              <button
                key={tab.label}
                type="button"
                role="tab"
                aria-selected={index === active}
                className={cn("mk-doccode__tab", index === active && "mk-doccode__tab--active")}
                onClick={() => setActive(index)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        ) : (
          <span className="mk-doccode__lang">{current?.language ?? current?.label}</span>
        )}
        <button
          type="button"
          className="mk-doccode__copy"
          aria-label="Copy code to clipboard"
          onClick={copy}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="mk-doccode__pre">
        <code>
          {lines.map((line, index) => (
            <span key={`${current?.label}-${index}`} className="mk-doccode__line">
              {showLineNumbers ? <span className="mk-doccode__ln">{index + 1}</span> : null}
              {line}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
