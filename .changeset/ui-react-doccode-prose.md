---
"@monetizekit/ui-react": minor
---

Extend the §13 docs kit with the code block and prose scale:

- `DocCodeBlock` — an interactive documentation code block (single-snippet or tabbed, copy-to-clipboard, optional line numbers) built on the `.mk-doccode*` brand classes. It is a client component, so it ships from a new **`@monetizekit/ui-react/client`** entry (which carries a preserved `"use client"` directive); the package root stays usable from React Server Components.
- `Prose` — a presentational wrapper that applies the `.mk-prose` long-form scale.

Adds the `DocCodeTab` contract type. No breaking changes to the existing root exports.
