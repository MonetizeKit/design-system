# Plan — Brand iconography & social asset completeness (v0.8)

## Goal

Leverage the Brand Direction **v0.8** board completely: everything the board renders should be
expressed by the published design-system packages instead of being re-drawn per surface. The audit
found the board's **§07/§08 iconography** (line icons on category tiles) and the **§footer social
tiles** were the only major brand assets not yet shipped, plus a few supporting tokens/CSS.

## Scope (single source of truth)

- **`@monetizekit/design-tokens`** — add the board's social + endorsement colors as saturated
  constants: `soc-cyan` `#02D9FF`, `soc-yellow` `#FFD240`, `soc-green` `#B6FFB6`, `purple`
  `#4F46E5`, `purple-d` `#3730B5`. Emitted automatically as `--mk-*` by the existing CSS builder.
- **`@monetizekit/brand`**
  - `icons.ts` — line-icon registry (glyph geometry + `ICON_META` category/label), verbatim from
    the board's 24×24 stroke grid.
  - `social.ts` — Twitter/X, GitHub, LinkedIn fill-glyph registry + soc tones.
  - Build generates `assets/icons/glyphs/*.svg` and `assets/social/*.svg` from the registry, added
    to the asset manifest.
  - `primitives.css` — `.mk-icon`, `.mk-icon-tile` (+ category modifiers; light-island keeps a
    black edge in dark, §12), `.mk-social` (+ soc tones).
  - `brand.css` — `.tex-stripe-o`, `.mk-caret`, `.mk-float-a/b/c` (reduced-motion aware).
  - `guidelines/brand-board-v0.8.html` — the board as living documentation.
- **`@monetizekit/ui-react`** — `Icon`, `IconTile`, `SocialIcon` components consuming the brand
  registry; Storybook `Brand/Iconography` gallery; unit + a11y tests.

## Guardrails

- No re-authoring of glyph geometry downstream — the brand registry is the sole source; both the
  standalone SVG assets and the React `Icon` render from it.
- Icon/social tiles are saturated objects: they pin structure to `onlight` so the black edge/shadow
  survive dark mode (§12).
- `apps/web` in the monorepo is untouched; only the plan doc + PR #259 description update there.

## Verification

- `pnpm build` (all packages), `pnpm typecheck`, `pnpm test` (design-tokens snapshots updated;
  brand icon/social + ui-react Icon/IconTile/SocialIcon + a11y), `pnpm lint`.
- Storybook `Brand/Iconography` visual check in light + dark.

## Status

- [x] design-tokens colors + snapshots
- [x] brand registries + generated assets + manifest
- [x] brand primitives/utilities + guidelines board
- [x] ui-react components + stories + tests
- [x] build / typecheck / test / lint green
- [x] changesets (minor × 3)
- [ ] Storybook visual evidence captured
- [ ] design-system PR opened; monorepo plan doc + PR #259 updated

## Release

Version bumps are handled by the Changesets release PR on merge (minor for all three packages).
Publishing to npm happens on that merge; not performed from this branch.
