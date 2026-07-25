---
"@monetizekit/brand": minor
---

Ship the §13 documentation primitive classes in `primitives.css`, alongside `.mk-verdict`, so any brand-only consumer (plain HTML, the docs app) gets them without pulling in the React component stylesheet:

- `.mk-callout` (+ `__bar` / `__icon` / `__title` / `__body` and the `--note` / `--tip` / `--info` / `--warn` / `--danger` status tones).
- `.mk-method` (+ `--get` / `--post` / `--put` / `--patch` / `--delete` HTTP-method colors).

All token-driven (`--mk-*`), so they follow the page theme and palette.
