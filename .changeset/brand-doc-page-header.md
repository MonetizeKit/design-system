---
"@monetizekit/brand": minor
---

Add the §13a documentation page-shell header classes to `primitives.css`:

- `.mk-doc-header` / `.mk-doc-header__heading` / `.mk-doc-header__title` / `.mk-doc-header__desc` / `.mk-doc-header__actions` — the documentation page title on the brand DISPLAY scale (display weight + display tracking + ink), a muted lede, and a right-aligned action slot.

Token-driven, so brand-only consumers (plain HTML, the docs app) get the branded page header without importing the React component stylesheet, and it inverts with the page in dark mode.
