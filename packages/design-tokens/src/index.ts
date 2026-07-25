export type {
  ThemeName,
  PaletteName,
  Mode,
  ResolvedMode,
  SemanticVar,
  SemanticColors,
  PaletteVariants,
  BrandColors,
  OnColorTokens,
  BrandTypography,
  BrandShadowScale,
  BrandBorderWidths,
  BrandTilt,
  BrandTexture,
  BrandTokens,
  ResolveInput,
  ResolveOptions,
  ResolvedTokens,
} from "./types.js";

export {
  BRAND,
  BRAND_NEUTRALS_LIGHT,
  BRAND_NEUTRALS_DARK,
  ON_COLOR,
  brandShadow,
  resolveBrand,
  resolveBrandColors,
} from "./brand.js";
export { PALETTES, PALETTE_NAMES, BRAND_SEMANTIC_BASE } from "./palettes.js";
export { resolveTokens, resolveMode } from "./resolve.js";
export {
  tokensToCssVars,
  brandCssVars,
  semanticCssVars,
  onColorCssVars,
  mkContractVars,
  cssVarsToDeclarations,
  paletteModeSelector,
} from "./css.js";
export { monetizekitPreset } from "./tailwind-preset.js";

export const THEME_NAMES: readonly ["brand"] = ["brand"] as const;
export const MODES: readonly ["light", "dark", "system"] = ["light", "dark", "system"] as const;
