# @monetizekit/brand

## 0.2.0

### Minor Changes

- 69a9d1c: Add the §13a documentation page-shell header classes to `primitives.css`:

  - `.mk-doc-header` / `.mk-doc-header__heading` / `.mk-doc-header__title` / `.mk-doc-header__desc` / `.mk-doc-header__actions` — the documentation page title on the brand DISPLAY scale (display weight + display tracking + ink), a muted lede, and a right-aligned action slot.

  Token-driven, so brand-only consumers (plain HTML, the docs app) get the branded page header without importing the React component stylesheet, and it inverts with the page in dark mode.

- 694cd71: Add the remaining §13 documentation primitive classes to `primitives.css`:

  - `.mk-doccode*` — the doc code block (edged panel, tab/language bar, copy button, optional line-number gutter).
  - `.mk-prose` — the long-form prose scale (headings, paragraphs, lists, links, inline `code`, blockquotes, `hr`) on the brand type + tokens.

  Both token-driven, so brand-only consumers (plain HTML, the docs app) get branded code blocks and prose without importing the React component stylesheet.

- 92f4299: Ship the §13 documentation primitive classes in `primitives.css`, alongside `.mk-verdict`, so any brand-only consumer (plain HTML, the docs app) gets them without pulling in the React component stylesheet:

  - `.mk-callout` (+ `__bar` / `__icon` / `__title` / `__body` and the `--note` / `--tip` / `--info` / `--warn` / `--danger` status tones).
  - `.mk-method` (+ `--get` / `--post` / `--put` / `--patch` / `--delete` HTTP-method colors).

  All token-driven (`--mk-*`), so they follow the page theme and palette.

- badadef: Ship the §07/§08 iconography + §footer social assets so the full brand board is expressed by the package, not re-drawn per surface.

  - **Line-icon registry** (`icons.ts`) — the canonical MonetizeKit glyph set (catalog, enforcement, credits, usage, metering, approvals, workflows, experiments, contracts, code, shield) authored on the board's 24×24 stroke grid, with per-icon category color + label (`ICON_META`) and saturated-category rules for stroke color.
  - **Social registry** (`social.ts`) — Twitter/X, GitHub, LinkedIn fill glyphs with their soc-\* tones.
  - **Generated SVG assets** — the build emits one `.svg` per glyph (`assets/icons/glyphs/*.svg`) and per social icon (`assets/social/*.svg`) from the same registry (single source of truth), added to the asset manifest.
  - **Primitives** — `.mk-icon`, `.mk-icon-tile` (+ category modifiers; a light-island that keeps a black edge in dark, §12) and `.mk-social` (+ soc tones).
  - **Utilities** — `.tex-stripe-o` (white stripe for saturated grounds), the `.mk-caret` console cursor, and the `.mk-float-a/b/c` decor-drift animations (all reduced-motion aware).
  - **Guidelines** — ship the v0.8 board HTML as living documentation under `guidelines/`.

### Patch Changes

- 5d79368: Enlarge the "MK" inside the badge so it fills the orange field with less dead
  whitespace (§01 fidelity). The mark width now targets ~0.78 of the badge's inner
  side (was 0.6); all logo/icon/OG SVG sources and the `MonetizeKitBadge`/wordmark
  React transforms are regenerated in lockstep, and the satori OG template's `MK`
  scales to match.
- c758f63: Fix the MonetizeKit mark to match Brand Direction v0.8. The badge now shows the literal **"MK"**
  set in Inter Black (900) — outlined to a fill path so it renders identically in every renderer
  regardless of installed fonts — instead of the retired abstract stroked monogram.

  - `@monetizekit/brand`: regenerated `icon.svg`, `mk-badge.svg`, `mk-badge-tilted.svg`,
    `mk-badge-mono-ink.svg`, `mk-badge-mono-cream.svg`, `mask-icon.svg`, `maskable.svg`,
    `og-default.svg`, and the `wordmark.svg` lockup ("MK" badge + "MonetizeKit" in Inter Black).
    The `ogTemplate()` badge now renders the "MK" letters.
  - `@monetizekit/ui-react`: `MonetizeKitBadge` / `MonetizeKitWordmark` render the same outlined
    "MK" / "MonetizeKit" geometry.

- Updated dependencies [badadef]
- Updated dependencies [74d3995]
  - @monetizekit/design-tokens@0.4.0

## 0.1.0

### Minor Changes

- ef4aa52: Add `@monetizekit/brand` (Layer 1) — framework-agnostic brand identity for Brand Direction v0.8, built on `@monetizekit/design-tokens`.

  - **`brand.css`** — §02 colors (via token vars), §03 grounds/textures, §04 tilt (hover-straighten + ≤900px panel rule), §05 typography, §09 structure (3px edges, hard shadows, radius 0, violet focus, grey disabled). Re-imports `design-tokens/css`, so the §12 dark inversion (`[data-theme="dark"]`) and `.on-color` light-islands come with it; hard-shadow utilities use the mode-aware `shade` var.
  - **`primitives.css`** — verdict pill (`ALLOW`/`DENY`/`REQUIRE_TOP_UP`/`DEGRADE`/`RECORDED`), console window, stat card, decorative shapes (§01/§10).
  - **Media asset system** (`@monetizekit/brand/assets/*` + typed `ASSETS` manifest / `dist/assets.json`) — logo/mark SVG sources (upright + tilted −12° badge, wordmark, monochrome), maskable + Safari pinned-tab icons, and rasterized favicon (16/32/48), apple-touch (180, opaque cream), PWA (192/512), maskable (512), and default OG (1200×630) PNG exports.
  - **OG template** — `ogTemplate()` + `OG_SIZE` return a satori/`ImageResponse`-compatible 1200×630 card in lockstep with the tokens; plus `CATEGORY_LINE`, `VERDICTS`, and `verdictClass()` helpers.
