---
"@monetizekit/brand": patch
"@monetizekit/ui-react": patch
---

Enlarge the "MK" inside the badge so it fills the orange field with less dead
whitespace (§01 fidelity). The mark width now targets ~0.78 of the badge's inner
side (was 0.6); all logo/icon/OG SVG sources and the `MonetizeKitBadge`/wordmark
React transforms are regenerated in lockstep, and the satori OG template's `MK`
scales to match.
