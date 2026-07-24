/**
 * The canonical MonetizeKit media asset manifest (§01, Brand v0.8). A single typed source of
 * truth so every surface (marketing, docs, examples) references the same logo/icon/social assets
 * instead of copying files. Each entry's `path` is the package subpath, importable as
 * `@monetizekit/brand/assets/<path>` (see the package `exports` map).
 */

/** Package subpath prefix for raw asset imports. */
export const ASSET_BASE = "@monetizekit/brand/assets" as const;

export type AssetKind = "logo" | "icon" | "social";

export interface AssetEntry {
  /** Subpath under the package's `assets` export, e.g. `logo/icon.svg`. */
  path: string;
  kind: AssetKind;
  /** Media type of the shipped file. */
  type: "image/svg+xml" | "image/png" | "image/x-icon";
  /** Intrinsic size in px (square unless width/height differ). */
  width: number;
  height: number;
  description: string;
}

/** SVG sources (scalable, authored). */
export const LOGO_ASSETS = {
  /** Upright square badge (orange ground + black monogram). Base mark for micro/masked contexts. */
  icon: { path: "logo/icon.svg", kind: "logo", type: "image/svg+xml", width: 512, height: 512, description: "Upright MK badge (0°)" },
  /** Tilted −12° badge with hard shadow — the hero/marketing mark (§01). */
  badge: { path: "logo/mk-badge.svg", kind: "logo", type: "image/svg+xml", width: 560, height: 560, description: "MK badge with hard shadow (upright)" },
  badgeTilted: { path: "logo/mk-badge-tilted.svg", kind: "logo", type: "image/svg+xml", width: 560, height: 560, description: "MK badge tilted −12° (§01)" },
  wordmark: { path: "logo/wordmark.svg", kind: "logo", type: "image/svg+xml", width: 900, height: 220, description: "Full wordmark lockup" },
  monoInk: { path: "logo/mk-badge-mono-ink.svg", kind: "logo", type: "image/svg+xml", width: 512, height: 512, description: "Monochrome ink-on-light" },
  monoCream: { path: "logo/mk-badge-mono-cream.svg", kind: "logo", type: "image/svg+xml", width: 512, height: 512, description: "Monochrome cream-on-dark" },
} as const satisfies Record<string, AssetEntry>;

/** Icon SVG sources (scalable). Rasterized PNG/ICO exports are emitted to `dist/assets/icons`. */
export const ICON_ASSETS = {
  maskable: { path: "icons/maskable.svg", kind: "icon", type: "image/svg+xml", width: 512, height: 512, description: "Maskable PWA icon (safe-zone padded, cream ground)" },
  maskIcon: { path: "icons/mask-icon.svg", kind: "icon", type: "image/svg+xml", width: 512, height: 512, description: "Safari pinned-tab monochrome mask" },
} as const satisfies Record<string, AssetEntry>;

/** Rasterized icon exports produced by the build (see scripts/build-assets.mjs). */
export const RASTER_ICONS = [
  { path: "icons/favicon-16.png", kind: "icon", type: "image/png", width: 16, height: 16, description: "Favicon 16" },
  { path: "icons/favicon-32.png", kind: "icon", type: "image/png", width: 32, height: 32, description: "Favicon 32" },
  { path: "icons/favicon-48.png", kind: "icon", type: "image/png", width: 48, height: 48, description: "Favicon 48" },
  { path: "icons/apple-touch-icon.png", kind: "icon", type: "image/png", width: 180, height: 180, description: "Apple touch icon 180 (opaque cream)" },
  { path: "icons/icon-192.png", kind: "icon", type: "image/png", width: 192, height: 192, description: "PWA icon 192" },
  { path: "icons/icon-512.png", kind: "icon", type: "image/png", width: 512, height: 512, description: "PWA icon 512" },
  { path: "icons/maskable-512.png", kind: "icon", type: "image/png", width: 512, height: 512, description: "Maskable PWA icon 512" },
] as const satisfies readonly AssetEntry[];

/** Social/OG assets. */
export const SOCIAL_ASSETS = {
  ogDefaultSvg: { path: "og/og-default.svg", kind: "social", type: "image/svg+xml", width: 1200, height: 630, description: "Default OG source (1200×630)" },
  ogDefaultPng: { path: "og/og-default.png", kind: "social", type: "image/png", width: 1200, height: 630, description: "Default OG/Twitter image (1200×630)" },
} as const satisfies Record<string, AssetEntry>;

/** The full flat manifest (all assets across kinds). */
export const ASSETS: readonly AssetEntry[] = [
  ...Object.values(LOGO_ASSETS),
  ...Object.values(ICON_ASSETS),
  ...RASTER_ICONS,
  ...Object.values(SOCIAL_ASSETS),
];

/** Build an importable package subpath for an asset entry or raw subpath string. */
export function assetImport(entry: AssetEntry | string): string {
  const path = typeof entry === "string" ? entry : entry.path;
  return `${ASSET_BASE}/${path}`;
}
