import { resolve } from "node:path";

/**
 * Storybook injects its own `./favicon.svg` outside `managerHead`.
 * Resolve a non-icon file so only the canonical package-backed links are emitted.
 */
export const favicon = () =>
  resolve(process.cwd(), ".storybook/public/manifest.webmanifest");
