import { ON_COLOR, resolveBrand } from "./brand.js";
import { BRAND_SEMANTIC_BASE, PALETTES } from "./palettes.js";
import type {
  Mode,
  PaletteName,
  ResolvedMode,
  ResolvedTokens,
  ResolveInput,
  ResolveOptions,
  SemanticColors,
  ThemeName,
} from "./types.js";

const DEFAULT_THEME: ThemeName = "brand";
const DEFAULT_PALETTE: PaletteName = "default";
const DEFAULT_MODE: Mode = "light";

/** Collapse a requested `mode` into a concrete light/dark mode. */
export function resolveMode(mode: Mode, prefersDark = false): ResolvedMode {
  switch (mode) {
    case "light":
      return "light";
    case "dark":
      return "dark";
    case "system":
      return prefersDark ? "dark" : "light";
    default: {
      const _exhaustive: never = mode;
      return _exhaustive;
    }
  }
}

/**
 * Merge a palette's overrides for a mode over the on-brand base, mirroring the CSS
 * `:root` → `[data-palette]` cascade (missing keys inherit the brand base).
 */
function resolveSemantic(palette: PaletteName, resolvedMode: ResolvedMode): SemanticColors {
  const base = BRAND_SEMANTIC_BASE[resolvedMode];
  if (palette === DEFAULT_PALETTE) {
    return { ...base };
  }
  const overrides = PALETTES[palette][resolvedMode];
  return { ...base, ...overrides };
}

/**
 * Resolve a `theme × palette × mode` combination into a complete, concrete token set.
 * Brand identity (structure, ramp, type) is theme-level and constant; semantic colors come
 * from the palette merged over the on-brand base for the effective mode.
 */
export function resolveTokens(input: ResolveInput = {}, options: ResolveOptions = {}): ResolvedTokens {
  const theme = input.theme ?? DEFAULT_THEME;
  const palette = input.palette ?? DEFAULT_PALETTE;
  const mode = input.mode ?? DEFAULT_MODE;
  const resolvedMode = resolveMode(mode, options.prefersDark ?? false);

  return {
    theme,
    palette,
    mode,
    resolvedMode,
    brand: resolveBrand(resolvedMode),
    onColor: ON_COLOR,
    semantic: resolveSemantic(palette, resolvedMode),
  };
}
