---
"@monetizekit/brand": minor
---

Ship the §07/§08 iconography + §footer social assets so the full brand board is expressed by the package, not re-drawn per surface.

- **Line-icon registry** (`icons.ts`) — the canonical MonetizeKit glyph set (catalog, enforcement, credits, usage, metering, approvals, workflows, experiments, contracts, code, shield) authored on the board's 24×24 stroke grid, with per-icon category color + label (`ICON_META`) and saturated-category rules for stroke color.
- **Social registry** (`social.ts`) — Twitter/X, GitHub, LinkedIn fill glyphs with their soc-* tones.
- **Generated SVG assets** — the build emits one `.svg` per glyph (`assets/icons/glyphs/*.svg`) and per social icon (`assets/social/*.svg`) from the same registry (single source of truth), added to the asset manifest.
- **Primitives** — `.mk-icon`, `.mk-icon-tile` (+ category modifiers; a light-island that keeps a black edge in dark, §12) and `.mk-social` (+ soc tones).
- **Utilities** — `.tex-stripe-o` (white stripe for saturated grounds), the `.mk-caret` console cursor, and the `.mk-float-a/b/c` decor-drift animations (all reduced-motion aware).
- **Guidelines** — ship the v0.8 board HTML as living documentation under `guidelines/`.
