# @monetizekit/ui-react

## 0.2.0

### Minor Changes

- badadef: Add the iconography components so surfaces render the brand icon system from tokens, not ad-hoc SVGs:

  - **`Icon`** — inline line icon from the `@monetizekit/brand` glyph registry; inherits `currentColor`, decorative by default (`aria-hidden`) or an `img` with a `title`.
  - **`IconTile`** — a capability tile (§07/§08): a glyph on its canonical category color with the black edge + hard shadow, tilted ±12° (straightens on hover), white/ink stroke handled in CSS.
  - **`SocialIcon`** — a §footer social tile (filled glyph on a soc-\* ground, tilted).
  - Storybook `Brand/Iconography` gallery (capability tiles, category swatches, social) and unit + a11y tests.

- 69a9d1c: Add `DocPageHeader` to the §13 docs kit: a presentational, RSC-safe page-shell header that renders the page title on the brand display scale with an optional muted lede and a right-aligned action slot (children). Built on the `.mk-doc-header*` brand classes and adds the `DocPageHeaderContract` contract type. It supersedes the reused app dashboard page header for documentation surfaces. No breaking changes to the existing root exports.
- 694cd71: Extend the §13 docs kit with the code block and prose scale:

  - `DocCodeBlock` — an interactive documentation code block (single-snippet or tabbed, copy-to-clipboard, optional line numbers) built on the `.mk-doccode*` brand classes. It is a client component, so it ships from a new **`@monetizekit/ui-react/client`** entry (which carries a preserved `"use client"` directive); the package root stays usable from React Server Components.
  - `Prose` — a presentational wrapper that applies the `.mk-prose` long-form scale.

  Adds the `DocCodeTab` contract type. No breaking changes to the existing root exports.

- a5d8fff: Add the first shared documentation primitives (Brand Direction §13) so docs surfaces render in the brand language from one implementation instead of re-authoring chrome per app:

  - `Callout` — a status-color panel (`note`→yellow, `tip`→mint, `info`→cyan, `warn`→pink, `danger`→red) with an optional tilted icon tile, title bar, and body.
  - `MethodBadge` — an HTTP method chip color-coded per method (`GET`→green, `POST`→violet, `PUT`→yellow, `PATCH`→action, `DELETE`→pink).

  Both are fully token-driven (`--mk-*`), so they follow the page theme (light/dark) and any active palette. Their CSS classes ship in `@monetizekit/brand/primitives.css` (alongside `.mk-verdict`), which this package's `styles.css` re-imports — so brand-only consumers get them too. New `CalloutContract` / `CalloutTone` and `MethodContract` / `HttpMethod` types are exported from `@monetizekit/ui-react/contract` for non-React renderers.

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

- Updated dependencies [69a9d1c]
- Updated dependencies [694cd71]
- Updated dependencies [92f4299]
- Updated dependencies [badadef]
- Updated dependencies [badadef]
- Updated dependencies [5d79368]
- Updated dependencies [c758f63]
- Updated dependencies [74d3995]
  - @monetizekit/brand@0.2.0
  - @monetizekit/design-tokens@0.4.0

## 0.1.0

### Minor Changes

- 9f1679f: Add `@monetizekit/ui-react` (Layer 2) — the React component library for Brand Direction v0.8, styled via `@monetizekit/design-tokens` + `@monetizekit/brand`.

  - **Frozen shared contract** (`@monetizekit/ui-react/contract`, side-effect-free) — `Variant`, `Tone`, `Size`, `Verdict`, per-component prop contracts, and the `theme × palette × mode` axes, so non-React renderers can depend on the contract without React.
  - **`MonetizeKitThemeProvider`** — composes theme × palette × mode; sets `data-theme`/`data-palette` and inlines the fully-resolved `--mk-*`/`--<var>` custom properties (nestable dark islands; `mode="system"` follows prefers-color-scheme).
  - **Components** — `Button`, `Badge`, `Card`, `Input`, `Section` (saturated grounds default to `.on-color` light-islands, §12), `Tile`, plus the signature primitives `VerdictPill`, `ConsoleWindow`, `StatCard`, `DecorShape`, and the inline `MonetizeKitBadge` / `MonetizeKitWordmark` marks.
  - **`@monetizekit/ui-react/styles.css`** — single import that carries tokens + §12 dark + brand utilities + primitives + component classes.
  - **Storybook** (`@storybook/react-vite`) with a palette + mode toolbar that recomposes stories live; unit + `axe-core` a11y tests (jsdom).
