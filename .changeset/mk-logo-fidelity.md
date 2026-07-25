---
"@monetizekit/brand": patch
"@monetizekit/ui-react": patch
---

Fix the MonetizeKit mark to match Brand Direction v0.8. The badge now shows the literal **"MK"**
set in Inter Black (900) — outlined to a fill path so it renders identically in every renderer
regardless of installed fonts — instead of the retired abstract stroked monogram.

- `@monetizekit/brand`: regenerated `icon.svg`, `mk-badge.svg`, `mk-badge-tilted.svg`,
  `mk-badge-mono-ink.svg`, `mk-badge-mono-cream.svg`, `mask-icon.svg`, `maskable.svg`,
  `og-default.svg`, and the `wordmark.svg` lockup ("MK" badge + "MonetizeKit" in Inter Black).
  The `ogTemplate()` badge now renders the "MK" letters.
- `@monetizekit/ui-react`: `MonetizeKitBadge` / `MonetizeKitWordmark` render the same outlined
  "MK" / "MonetizeKit" geometry.
