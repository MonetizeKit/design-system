# @monetizekit/design-tokens

Framework-agnostic design tokens for **Brand Direction v0.8** (incl. the §12 dark-mode system) —
the single source of truth for MonetizeKit brand values, with a `theme × palette × mode`
composition engine and build artifacts for JS/TS, CSS, Tailwind, and the SDK `--mk-*` contract.

## Install

```bash
npm install @monetizekit/design-tokens
```

## Composition model

Theming composes three orthogonal axes:

- **theme** — brand identity (`brand`). Carries the frozen color ramp + structure
  (radius `0`, `3px` borders, hard shadows, tilt, Inter/JetBrains Mono).
- **palette** — a named semantic color scheme: `default` (on-brand) plus `nord`, `solarized`,
  `dracula`, `github`, `rose-pine`, `blue`, `green`, `unicorn` (ported from the product app).
- **mode** — `light` | `dark` | `system` (`system` resolves via `prefersDark`).

## Dark mode (§12)

Dark is **inversion, not dimming**. `resolveTokens` returns a **mode-aware** `brand` — the neutral
set inverts (warm near-black grounds, cream edges), the hard-shadow color `shade` **dims to
`#AFAD98`** and is distinct from `ink`, and accent text lifts (`violet-txt → #BB86FC`). Saturated
brand grounds (orange, yellow) do **not** invert; they use the fixed **`.on-color`** light-island
set (also returned as `resolved.onColor`), which re-pins neutrals to their fixed light values and
keeps a black edge + black text via `onlight = #1A1A1A`. Dark is driven by `[data-theme="dark"]`
on the root; `system` follows `prefers-color-scheme`.

```ts
import { resolveTokens, tokensToCssVars } from "@monetizekit/design-tokens";

const tokens = resolveTokens({ theme: "brand", palette: "nord", mode: "system" }, { prefersDark: true });
const style = tokensToCssVars(tokens); // { "--background": "...", "--mk-orange": "#FF6B35", ... }
```

## Build artifacts

| Import | File | Use |
|---|---|---|
| `@monetizekit/design-tokens` | `dist/index.js` | Typed data + `resolveTokens`/`tokensToCssVars`/`mkContractVars` |
| `@monetizekit/design-tokens/css` | `dist/tokens.css` | `:root` + `[data-theme="dark"]` + `.on-color` + `[data-palette]` custom properties |
| `@monetizekit/design-tokens/theme` | `dist/theme.css` | Tailwind v4 `@theme inline` mapping |
| `@monetizekit/design-tokens/tailwind` | `dist/tailwind-preset.js` | Config-based Tailwind preset |
| `@monetizekit/design-tokens/mk` | `dist/mk-tokens.css` | The `@monetizekit/react` SDK `--mk-*` contract |
| `@monetizekit/design-tokens/tokens.json` | `dist/tokens.json` | Machine-readable source export |

## Notes

- **Source of truth is TypeScript** (`src/brand.ts`, `src/palettes.ts`); `tokens.json` is emitted
  from it. A follow-up may invert this to author DTCG sources and generate everything via
  Style Dictionary (incl. native Swift/Compose/Flutter targets) — the data shapes are designed to
  make that migration mechanical.
