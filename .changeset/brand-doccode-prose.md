---
"@monetizekit/brand": minor
---

Add the remaining §13 documentation primitive classes to `primitives.css`:

- `.mk-doccode*` — the doc code block (edged panel, tab/language bar, copy button, optional line-number gutter).
- `.mk-prose` — the long-form prose scale (headings, paragraphs, lists, links, inline `code`, blockquotes, `hr`) on the brand type + tokens.

Both token-driven, so brand-only consumers (plain HTML, the docs app) get branded code blocks and prose without importing the React component stylesheet.
