---
"@monetizekit/brand": minor
---

Add `@monetizekit/brand` (Layer 1) — framework-agnostic brand identity for Brand Direction v0.8, built on `@monetizekit/design-tokens`.

- **`brand.css`** — §02 colors (via token vars), §03 grounds/textures, §04 tilt (hover-straighten + ≤900px panel rule), §05 typography, §09 structure (3px edges, hard shadows, radius 0, violet focus, grey disabled). Re-imports `design-tokens/css`, so the §12 dark inversion (`[data-theme="dark"]`) and `.on-color` light-islands come with it; hard-shadow utilities use the mode-aware `shade` var.
- **`primitives.css`** — verdict pill (`ALLOW`/`DENY`/`REQUIRE_TOP_UP`/`DEGRADE`/`RECORDED`), console window, stat card, decorative shapes (§01/§10).
- **Media asset system** (`@monetizekit/brand/assets/*` + typed `ASSETS` manifest / `dist/assets.json`) — logo/mark SVG sources (upright + tilted −12° badge, wordmark, monochrome), maskable + Safari pinned-tab icons, and rasterized favicon (16/32/48), apple-touch (180, opaque cream), PWA (192/512), maskable (512), and default OG (1200×630) PNG exports.
- **OG template** — `ogTemplate()` + `OG_SIZE` return a satori/`ImageResponse`-compatible 1200×630 card in lockstep with the tokens; plus `CATEGORY_LINE`, `VERDICTS`, and `verdictClass()` helpers.
