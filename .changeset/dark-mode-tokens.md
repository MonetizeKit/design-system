---
"@monetizekit/design-tokens": minor
---

Implement the Brand Direction v0.8 §12 dark-mode system in the token model.

- **Mode-aware `shade` hard-shadow color**, split from `ink`: light `#1A1A1A`, dark `#AFAD98` (dimmed so the lit cream edge still reads brighter than its shadow). All shadow output (`brand.shadow`, `--mk-shadow-*`, the SDK `--mk-shadow`) now references `shade`, never `ink`.
- **The brand default neutral set inverts in dark**: warm near-black grounds (`cream #191811`, `paper #242318`), cream edges/text (`ink #FFFEF3`), plus mode-aware `muted`, `faint`, `lavender`, `stripe`, `line-soft`, `dotsoft`, `footer-bg`, and lifted accent text (`violet-txt #BB86FC`, `purple-txt #9A93FF`). Saturated brand grounds (orange, yellow, …) do not invert.
- **Fixed `onlight #1A1A1A` token and a non-inverting `.on-color` light-island set** that re-pins neutrals to their fixed light values and sets text to `onlight`, so saturated sections and small saturated objects keep a black edge + black text in both modes.
- **`dist/tokens.css` now emits** `:root` + `[data-theme="dark"]` (inverted neutrals + dimmed shade) + `.on-color` (fixed light-island neutrals) + `[data-palette="…"]` (light and `[data-palette][data-theme="dark"]`). `dist/mk-tokens.css` keeps the SDK `--mk-*` contract with the shadow mapped to `shade`.
- New exports: `resolveBrand`, `resolveBrandColors`, `brandShadow`, `onColorCssVars`, `ON_COLOR`, `BRAND_NEUTRALS_LIGHT`, `BRAND_NEUTRALS_DARK`, and the `OnColorTokens` type. `resolveTokens` now returns a mode-aware `brand` plus the fixed `onColor` island set.
