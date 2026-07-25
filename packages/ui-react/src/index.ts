/**
 * @monetizekit/ui-react — React component library for Brand Direction v0.8.
 *
 * Import the stylesheet once at your app root (it carries the tokens, §12 dark, brand utilities,
 * primitives, and component classes):
 *   import "@monetizekit/ui-react/styles.css";
 *
 * Then wrap your tree in the theme provider to compose theme × palette × mode:
 *   <MonetizeKitThemeProvider palette="default" mode="system">…</MonetizeKitThemeProvider>
 */

export * from "./contract.js";

export { MonetizeKitThemeProvider } from "./theme/ThemeProvider.js";
export type { MonetizeKitThemeProviderProps } from "./theme/ThemeProvider.js";

export { Button } from "./components/Button.js";
export type { ButtonProps } from "./components/Button.js";
export { Badge } from "./components/Badge.js";
export type { BadgeProps } from "./components/Badge.js";
export { Card } from "./components/Card.js";
export type { CardProps } from "./components/Card.js";
export { Input } from "./components/Input.js";
export type { InputProps } from "./components/Input.js";
export { Section } from "./components/Section.js";
export type { SectionProps } from "./components/Section.js";
export { Tile } from "./components/Tile.js";
export type { TileProps } from "./components/Tile.js";
export { VerdictPill } from "./components/VerdictPill.js";
export type { VerdictPillProps } from "./components/VerdictPill.js";
export { ConsoleWindow } from "./components/ConsoleWindow.js";
export type { ConsoleWindowProps } from "./components/ConsoleWindow.js";
export { StatCard } from "./components/StatCard.js";
export type { StatCardProps } from "./components/StatCard.js";
export { DecorShape } from "./components/DecorShape.js";
export type { DecorShapeProps } from "./components/DecorShape.js";
export { Icon } from "./components/Icon.js";
export type { IconProps } from "./components/Icon.js";
export { IconTile } from "./components/IconTile.js";
export type { IconTileProps, TiltDirection } from "./components/IconTile.js";
export { SocialIcon } from "./components/SocialIcon.js";
export type { SocialIconProps } from "./components/SocialIcon.js";
export { MonetizeKitBadge, MonetizeKitWordmark } from "./components/BrandMark.js";
export type { BrandMarkProps, WordmarkProps } from "./components/BrandMark.js";
export { Callout } from "./components/Callout.js";
export type { CalloutProps } from "./components/Callout.js";
export { MethodBadge } from "./components/MethodBadge.js";
export type { MethodBadgeProps } from "./components/MethodBadge.js";
export { Prose } from "./components/Prose.js";
export type { ProseProps } from "./components/Prose.js";
export { DocPageHeader } from "./components/DocPageHeader.js";
export type { DocPageHeaderProps } from "./components/DocPageHeader.js";
// Interactive (client-only) components live in the "./client" entry so this root stays RSC-safe:
//   import { DocCodeBlock } from "@monetizekit/ui-react/client";
