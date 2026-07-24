---
"@monetizekit/ui-react": minor
---

Add the iconography components so surfaces render the brand icon system from tokens, not ad-hoc SVGs:

- **`Icon`** — inline line icon from the `@monetizekit/brand` glyph registry; inherits `currentColor`, decorative by default (`aria-hidden`) or an `img` with a `title`.
- **`IconTile`** — a capability tile (§07/§08): a glyph on its canonical category color with the black edge + hard shadow, tilted ±12° (straightens on hover), white/ink stroke handled in CSS.
- **`SocialIcon`** — a §footer social tile (filled glyph on a soc-* ground, tilted).
- Storybook `Brand/Iconography` gallery (capability tiles, category swatches, social) and unit + a11y tests.
