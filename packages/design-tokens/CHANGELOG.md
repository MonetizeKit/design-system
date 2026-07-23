# @monetizekit/design-tokens

## 0.2.0

### Minor Changes

- 7f7c223: Initial release of `@monetizekit/design-tokens` (Phase 0 of the design-system program).

  Framework-agnostic Brand Direction v0.7 tokens as the single source of truth, with:

  - A `theme × palette × mode` composition engine (`resolveTokens`, `resolveMode`, `tokensToCssVars`).
  - The frozen brand color ramp + structure (radius `0`, `3px` borders, hard shadows, tilt, Inter/JetBrains Mono).
  - Nine palettes (`default` on-brand + 8 experimentation palettes ported from the product app), each light + dark.
  - Build artifacts: typed JS/TS, `tokens.css` (`:root`/`.dark`/`[data-palette]`), Tailwind v4 `theme.css`, a config-based Tailwind preset, the SDK `--mk-*` contract (`mk-tokens.css`), and `tokens.json`.
