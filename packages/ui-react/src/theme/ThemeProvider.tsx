import { resolveTokens, tokensToCssVars } from "@monetizekit/design-tokens";
import type { CSSProperties, ReactNode } from "react";
import { useEffect, useState } from "react";
import type { ModeSetting, PaletteName, ThemeName } from "../contract.js";

export interface MonetizeKitThemeProviderProps {
  /** Single "brand" theme for now. */
  theme?: ThemeName;
  /** Palette axis (§00). */
  palette?: PaletteName;
  /** Mode axis; `"system"` follows prefers-color-scheme. */
  mode?: ModeSetting;
  /** Render as this element. Defaults to `div`. */
  as?: "div" | "section" | "main";
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

function usePrefersDark(enabled: boolean): boolean {
  const [prefersDark, setPrefersDark] = useState(false);
  useEffect(() => {
    if (!enabled || typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    setPrefersDark(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setPrefersDark(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [enabled]);
  return prefersDark;
}

/**
 * Applies a `theme × palette × mode` composition to its subtree. Sets `data-theme`/`data-palette`
 * (so global `design-tokens/css` hooks apply) and inlines the fully-resolved `--mk-*`/`--<var>`
 * custom properties, so a subtree restyles correctly even without the global stylesheet and can be
 * nested (e.g. a dark island inside a light page).
 */
export function MonetizeKitThemeProvider({
  theme = "brand",
  palette = "default",
  mode = "light",
  as: Tag = "div",
  className,
  style,
  children,
}: MonetizeKitThemeProviderProps) {
  const prefersDark = usePrefersDark(mode === "system");
  const resolved = resolveTokens({ theme, palette, mode }, { prefersDark });
  const vars = tokensToCssVars(resolved) as CSSProperties;

  return (
    <Tag
      data-theme={resolved.resolvedMode}
      data-palette={palette}
      className={className}
      style={{
        background: "var(--background)",
        color: "var(--foreground)",
        ...vars,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
