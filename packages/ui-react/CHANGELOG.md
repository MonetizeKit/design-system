# @monetizekit/ui-react

## 0.1.0

### Minor Changes

- 9f1679f: Add `@monetizekit/ui-react` (Layer 2) — the React component library for Brand Direction v0.8, styled via `@monetizekit/design-tokens` + `@monetizekit/brand`.

  - **Frozen shared contract** (`@monetizekit/ui-react/contract`, side-effect-free) — `Variant`, `Tone`, `Size`, `Verdict`, per-component prop contracts, and the `theme × palette × mode` axes, so non-React renderers can depend on the contract without React.
  - **`MonetizeKitThemeProvider`** — composes theme × palette × mode; sets `data-theme`/`data-palette` and inlines the fully-resolved `--mk-*`/`--<var>` custom properties (nestable dark islands; `mode="system"` follows prefers-color-scheme).
  - **Components** — `Button`, `Badge`, `Card`, `Input`, `Section` (saturated grounds default to `.on-color` light-islands, §12), `Tile`, plus the signature primitives `VerdictPill`, `ConsoleWindow`, `StatCard`, `DecorShape`, and the inline `MonetizeKitBadge` / `MonetizeKitWordmark` marks.
  - **`@monetizekit/ui-react/styles.css`** — single import that carries tokens + §12 dark + brand utilities + primitives + component classes.
  - **Storybook** (`@storybook/react-vite`) with a palette + mode toolbar that recomposes stories live; unit + `axe-core` a11y tests (jsdom).
