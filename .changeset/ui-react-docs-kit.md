---
"@monetizekit/ui-react": minor
---

Add the first shared documentation primitives (Brand Direction §13) so docs surfaces render in the brand language from one implementation instead of re-authoring chrome per app:

- `Callout` — a status-color panel (`note`→yellow, `tip`→mint, `info`→cyan, `warn`→pink, `danger`→red) with an optional tilted icon tile, title bar, and body.
- `MethodBadge` — an HTTP method chip color-coded per method (`GET`→green, `POST`→violet, `PUT`→yellow, `PATCH`→action, `DELETE`→pink).

Both are fully token-driven (`--mk-*`), so they follow the page theme (light/dark) and any active palette, and ship their classes in `@monetizekit/ui-react/styles.css`. New `CalloutContract` / `CalloutTone` and `MethodContract` / `HttpMethod` types are exported from `@monetizekit/ui-react/contract` for non-React renderers.
