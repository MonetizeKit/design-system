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

## Storybook hosting (Surface E — primitive gallery)

The `@monetizekit/ui-react` Storybook is the internal **primitive gallery** and is hosted on Vercel at
**[`internal-ui.monetizekit.app`](https://internal-ui.monetizekit.app)**.

- **Vercel project:** `app.monetizekit.internal-ui`, Git-linked to this repo.
- **Build:** driven by the root [`vercel.json`](vercel.json) —
  `pnpm turbo run build-storybook --filter=@monetizekit/ui-react` → `packages/ui-react/storybook-static`.
  The `build-storybook` turbo task `dependsOn: ["^build"]`, so `@monetizekit/design-tokens` and
  `@monetizekit/brand` are built before the gallery.
- **Promotion pattern (same as every other surface):** push to `development` / `delivery` → Vercel
  preview deploys; push to `main` (the production branch) → production deploy on
  `internal-ui.monetizekit.app`. DNS is Vercel-managed for `monetizekit.app`, so the subdomain record is
  created and verified automatically.
- **Access model:** public, matching the public SDK gallery at `ui.monetizekit.app`. If the gallery
  should be restricted to the team, enable **Vercel Authentication** (or a shared password) on the
  `app.monetizekit.internal-ui` project — no code changes required.

> The public `@monetizekit/react` **SDK** Storybook (component usage for customers) lives in the
> `react` repo and deploys to `ui.monetizekit.app`; this `ui-react` gallery is the internal
> primitive/design-language reference.
