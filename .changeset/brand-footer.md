---
"@monetizekit/ui-react": minor
---

Add `BrandFooter` — the single-source-of-truth brand footer (§footer / Brand Direction v0.9) shared across surfaces.

Renders a permanently-dark footer ground (mode-independent, driven by `--mk-footer-bg`) with a 3px ink top rule, the tilted MK badge + wordmark, brand tagline, tilted social tiles (Twitter/X · GitHub · LinkedIn), mono uppercase column headers, and a sub-footer carrying the C9D Holdings endorsement + legal links. Styling is self-contained (no extra stylesheet import required; reuses the brand primitive classes already loaded via `@monetizekit/brand/primitives.css`) and RSC-safe.

Exposes `DEFAULT_FOOTER_COLUMNS`, `DEFAULT_FOOTER_SOCIAL`, `DEFAULT_FOOTER_LEGAL_LINKS`, and `DEFAULT_FOOTER_TAGLINE` so every surface renders the same structure/labels, plus a `renderLink` hook (for client-router links) and a `cookiePreferences` slot (for consent-manager triggers).
