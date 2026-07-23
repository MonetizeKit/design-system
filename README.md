# MonetizeKit Design System

The layered, npm-published source of truth for **Brand Direction v0.7**. This monorepo houses the
framework-agnostic core and the per-framework component families that every MonetizeKit brand
surface (marketing, docs, Storybook, examples) consumes.

## Packages

| Package | Layer | Status |
|---|---|---|
| [`@monetizekit/design-tokens`](packages/design-tokens) | 0 — token data (SSOT) + `resolveTokens` engine | 🚧 in progress |
| `@monetizekit/brand` | 1 — brand identity (CSS, assets, primitives) | planned |
| `@monetizekit/ui-react` | 2 — React component family (first) | planned |
| `@monetizekit/ui-wc` / `-vue` / `-svelte` | 2 — additional frameworks | reserved |

## Architecture

```
design-tokens (token data, framework-agnostic)
      └─> brand (identity: CSS, assets, primitives)
              └─> ui-* (per-framework components; ui-react first)
```

Layers 0–1 contain **zero framework code**, so the design language ships to any framework — or
plain HTML — via CSS + tokens. Theming composes three orthogonal axes: **theme × palette × mode**.

See the full program plan in
[`app-monetizekit-monorepo/docs/engineering/brand-standardization-plan.md`](https://github.com/MonetizeKit/app-monetizekit-monorepo/blob/main/docs/engineering/brand-standardization-plan.md).

## Development

```bash
pnpm install
pnpm build      # build all packages
pnpm test       # run all tests
pnpm lint       # lint all packages
```

Releases are published to npm from CI via [changesets](https://github.com/changesets/changesets).
