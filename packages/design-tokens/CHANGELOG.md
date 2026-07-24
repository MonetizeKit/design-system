# @monetizekit/design-tokens

## 0.3.0

### Minor Changes

- cd80d4f: Implement the Brand Direction v0.8 §12 dark-mode system in the token model.

  - **Mode-aware `shade` hard-shadow color**, split from `ink`: light `#1A1A1A`, dark `#AFAD98` (dimmed so the lit cream edge still reads brighter than its shadow). All shadow output (`brand.shadow`, `--mk-shadow-*`, the SDK `--mk-shadow`) now references `shade`, never `ink`.
  - **The brand default neutral set inverts in dark**: warm near-black grounds (`cream #191811`, `paper #242318`), cream edges/text (`ink #FFFEF3`), plus mode-aware `muted`, `faint`, `lavender`, `stripe`, `line-soft`, `dotsoft`, `footer-bg`, and lifted accent text (`violet-txt #BB86FC`, `purple-txt #9A93FF`). Saturated brand grounds (orange, yellow, …) do not invert.
  - **Fixed `onlight #1A1A1A` token and a non-inverting `.on-color` light-island set** that re-pins neutrals to their fixed light values and sets text to `onlight`, so saturated sections and small saturated objects keep a black edge + black text in both modes.
  - **`dist/tokens.css` now emits** `:root` + `[data-theme="dark"]` (inverted neutrals + dimmed shade) + `.on-color` (fixed light-island neutrals) + `[data-palette="…"]` (light and `[data-palette][data-theme="dark"]`). `dist/mk-tokens.css` keeps the SDK `--mk-*` contract with the shadow mapped to `shade`.
  - New exports: `resolveBrand`, `resolveBrandColors`, `brandShadow`, `onColorCssVars`, `ON_COLOR`, `BRAND_NEUTRALS_LIGHT`, `BRAND_NEUTRALS_DARK`, and the `OnColorTokens` type. `resolveTokens` now returns a mode-aware `brand` plus the fixed `onColor` island set.

## 0.2.0

### Minor Changes

- 7f7c223: Initial release of `@monetizekit/design-tokens` (Phase 0 of the design-system program).

  Framework-agnostic Brand Direction v0.7 tokens as the single source of truth, with:

  - A `theme × palette × mode` composition engine (`resolveTokens`, `resolveMode`, `tokensToCssVars`).
  - The frozen brand color ramp + structure (radius `0`, `3px` borders, hard shadows, tilt, Inter/JetBrains Mono).
  - Nine palettes (`default` on-brand + 8 experimentation palettes ported from the product app), each light + dark.
  - Build artifacts: typed JS/TS, `tokens.css` (`:root`/`.dark`/`[data-palette]`), Tailwind v4 `theme.css`, a config-based Tailwind preset, the SDK `--mk-*` contract (`mk-tokens.css`), and `tokens.json`.
