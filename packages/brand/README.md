# @monetizekit/brand

Brand identity for **Brand Direction v0.8**, built entirely on
[`@monetizekit/design-tokens`](../design-tokens). Framework-agnostic: the CSS utilities and
signature primitives work in any framework or plain HTML — no component package required.

## Install

```bash
npm install @monetizekit/brand @monetizekit/design-tokens
```

## Usage

```ts
// brand.css re-imports design-tokens/css, so this one import gives you the tokens,
// the [data-theme="dark"] inversion, the .on-color light-islands, and the brand utilities.
import "@monetizekit/brand/css";
import "@monetizekit/brand/primitives.css"; // verdict pill, console window, stat card, decor
```

```html
<section class="g-cream tex-dots-soft">
  <div class="mk-panel mk-shadow-md tilt-panel">
    <span class="mk-label">usage</span>
    <div class="mk-statcard__value">128,904</div>
  </div>
  <!-- saturated island: add .on-color so it keeps a black edge + text in dark mode -->
  <section class="g-orange on-color">
    <span class="mk-verdict mk-verdict--allow">ALLOW</span>
  </section>
</section>
```

## What ships

- **`brand.css`** — §02 colors (via token vars), §03 grounds/textures, §04 tilt (hover-straighten,
  ≤900px panel rule), §05 typography, §09 structure (3px edges, hard shadows, radius 0, violet
  focus, grey disabled). §12 dark is inherited from `design-tokens/css`: hard-shadow utilities use
  the mode-aware `shade` var (dimmed in dark), and `.on-color` keeps saturated islands light.
- **`primitives.css`** — `.mk-verdict--{allow,deny,require-top-up,degrade,recorded}`,
  `.mk-console`, `.mk-statcard`, `.mk-decor--{circle,square,triangle}`, `.mk-icon`,
  `.mk-icon-tile--{orange,violet,pink,green,cyan,yellow,mint,peach}`, and
  `.mk-social--{cyan,yellow,green,orange}` (§01/§07/§08/§10/footer).
- **Iconography** (`icons.ts` / `social.ts`) — the canonical line-icon set (catalog, enforcement,
  credits, usage, metering, approvals, workflows, experiments, contracts, code, shield) with
  per-icon category + label (`ICON_META`), and the Twitter/X · GitHub · LinkedIn · Reddit social
  glyphs.
  Glyph geometry is the single source of truth: both the standalone `assets/icons/glyphs/*.svg` /
  `assets/social/*.svg` and the React `Icon` render from it.
- **Media asset system** (`@monetizekit/brand/assets/*`) — logo/mark SVG sources (upright + tilted
  −12° badge, wordmark, monochrome). The mark is the literal **"MK"** set in Inter Black (900),
  outlined to a fill path so it renders identically in every surface regardless of installed fonts;
  it is never a geometric monogram. Also: maskable + pinned-tab icons, rasterized favicon/apple/PWA PNGs,
  the generated icon/social glyph SVGs, and a default OG image. A typed manifest (`ASSETS`, also
  `dist/assets.json`) is the single source of truth so consumers reference paths, not copies.
- **`guidelines/`** — the v0.8 brand board (`brand-board-v0.8.html`) as living documentation.
- **OG template** — `ogTemplate()` + `OG_SIZE` produce a satori/`ImageResponse`-compatible 1200×630
  card in lockstep with the tokens, for per-route social images.

## Guidelines (§ voice)

Category line: **"The monetization control plane."** (`CATEGORY_LINE`). Voice is plain, confident,
technical; no invented claims/metrics. The signature is the **Decision Block** — an `mk.` SDK call
rendered as code returning a console verdict with an `audit=evt_…` reference. Verdicts:
`ALLOW`, `DENY`, `REQUIRE_TOP_UP`, `DEGRADE`, `RECORDED` (`VERDICTS`, `verdictClass()`).
