import { fileURLToPath } from "node:url";

/**
 * Storybook injects its own `./favicon.svg` outside `managerHead`.
 * Resolve a non-icon file so only the canonical package-backed links are emitted.
 */
export const favicon = () =>
  fileURLToPath(new URL("./public/manifest.webmanifest", import.meta.url));
