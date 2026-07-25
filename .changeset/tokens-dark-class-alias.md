---
"@monetizekit/design-tokens": minor
---

Centralize the dark-mode contract: `tokens.css` now emits the default and per-palette dark blocks under **both** `[data-theme="dark"]` **and** the `.dark` class alias (e.g. `[data-theme="dark"], .dark { … }` and `[data-palette="nord"][data-theme="dark"], [data-palette="nord"].dark { … }`).

Consumers that drive dark mode with a class strategy (Tailwind's `dark:` variant, `next-themes`' `class` attribute) now get the complete brand dark contract — inverted neutrals, dimmed `--mk-shade`, and the full shadcn semantic set — directly from the package, and no longer need to hand-mirror the `[data-theme="dark"]` values onto `.dark` per app to get reliable content repaint on a live toggle. The new `paletteModeSelector(palette, mode)` helper is exported so the selector policy is a single, tested source of truth.
