import { BRAND } from "./brand.js";

/**
 * A Tailwind preset that maps utility color/radius/font names onto the design-token CSS custom
 * properties emitted by `@monetizekit/design-tokens/css`. Works with config-based Tailwind
 * (v3 and v4). For Tailwind v4 `@theme inline` usage, import `@monetizekit/design-tokens/theme`
 * instead. No Tailwind dependency is required to import this object.
 */

const semanticColorNames = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "destructive-foreground",
  "border",
  "input",
  "ring",
  "success",
  "success-foreground",
  "warning",
  "warning-foreground",
  "sidebar",
  "sidebar-foreground",
  "sidebar-primary",
  "sidebar-primary-foreground",
  "sidebar-accent",
  "sidebar-accent-foreground",
  "sidebar-border",
  "sidebar-ring",
] as const;

function toColorScale(): Record<string, string> {
  const colors: Record<string, string> = {};
  for (const name of semanticColorNames) {
    colors[name] = `var(--${name})`;
  }
  for (const name of Object.keys(BRAND.colors)) {
    colors[`mk-${name}`] = `var(--mk-${name})`;
  }
  return colors;
}

export const monetizekitPreset = {
  theme: {
    extend: {
      colors: toColorScale(),
      borderRadius: {
        DEFAULT: "var(--mk-radius)",
        none: "0",
      },
      borderWidth: {
        panel: "var(--mk-border-panel)",
        chip: "var(--mk-border-chip)",
      },
      boxShadow: {
        "mk-sm": "var(--mk-shadow-sm)",
        "mk-md": "var(--mk-shadow-md)",
        "mk-lg": "var(--mk-shadow-lg)",
      },
      fontFamily: {
        sans: ["var(--mk-font-sans)"],
        mono: ["var(--mk-font-mono)"],
      },
      letterSpacing: {
        display: "var(--mk-tracking-display)",
        label: "var(--mk-tracking-label)",
      },
    },
  },
};

export default monetizekitPreset;
