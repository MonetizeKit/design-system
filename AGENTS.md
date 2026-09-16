# AGENTS.md

## Project overview

The layered, npm-published source of truth for MonetizeKit Brand Direction:
`packages/design-tokens` (layer 0, token data + `resolveTokens`),
`packages/brand` (layer 1, CSS, assets, primitives), `packages/ui-react`
(layer 2, React components; Storybook hosted at
<https://internal-ui.monetizekit.app>). Turborepo workspace; layers 0 and 1
contain no framework code.

## Commands

- `pnpm install --frozen-lockfile`
- `pnpm lint`, `pnpm typecheck`, `pnpm build`, `pnpm test`
- `pnpm turbo run build-storybook --filter=@monetizekit/ui-react` (what Vercel
  builds)

## Conventions

- Tokens are the single source of truth; a color, spacing or type value that
  is not a token is a bug. Theming composes theme x palette x mode.
- `ui-react` depends on `brand`, which depends on `design-tokens`; never
  import upward.
- Public changes to any package need a changeset; releases go through
  `.github/workflows/release.yml` on `main`.

## Verifying your work

```
$ pnpm lint
> eslint .
(no output, exit 0)

$ pnpm typecheck
 Tasks:    5 successful, 5 total

$ pnpm build
 Tasks:    3 successful, 3 total
(the "use client" directive warnings from rollup on ui-react are expected)

$ pnpm test
@monetizekit/brand:test:          Tests  21 passed (21)
@monetizekit/design-tokens:test:  Tests  29 passed (29)
```

## SDLC and promotion chain

- Branches: `feature/*` -> PR -> `development` -> `delivery` -> `main`. Feature
  PRs target `development`. Promotion between stages is a promotion PR from
  the upstream stage branch (`development -> delivery`, `delivery -> main`);
  where this repository has `.github/workflows/promote.yml`, that workflow
  opens it when the stage gate is green, and `delivery -> main` is always
  merged by a human. Never open a feature PR against `main` or `delivery`.
- Every PR must pass the `Required Checks Gate` job in `.github/workflows/ci.yml`.
  The `Shadow Review (advisory)` job posts a model review comment; it never
  blocks. React with a thumbs-down to dismiss a finding.
- Agent roles, model IDs, tools and autonomy for the whole fleet are declared in
  [`MonetizeKit/.github/agent-policy.json`](https://github.com/MonetizeKit/.github/blob/main/agent-policy.json).
  Never hardcode a model ID in this repository.
- Conventional commits (`feat:`, `fix:`, `chore:`, ...). Position and status live
  in Linear (team `MK`); reference the issue key in the PR body when one exists.
- The fleet-wide plan is
  [`docs/engineering/ai-native-sdlc-plan.md`](https://github.com/MonetizeKit/app-monetizekit-monorepo/blob/main/docs/engineering/ai-native-sdlc-plan.md)
  in the monorepo.
