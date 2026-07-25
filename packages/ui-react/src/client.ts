"use client";

/**
 * @monetizekit/ui-react/client — interactive (stateful) components that must run in a React client
 * boundary. Kept out of the package root so the presentational primitives stay usable from React
 * Server Components. Import the shared stylesheet once at your app root as usual.
 */

export { DocCodeBlock } from "./components/DocCodeBlock.js";
export type { DocCodeBlockProps } from "./components/DocCodeBlock.js";
export type { DocCodeTab } from "./contract.js";
