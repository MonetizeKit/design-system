import { resolve } from "node:path";
import type { StorybookConfig } from "@storybook/react-vite";

const SITE_URL = "https://internal-ui.monetizekit.app";
const OG_IMAGE = `${SITE_URL}/brand/og/og-default.png`;

const BRAND_FONTS = `
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap"
      rel="stylesheet"
    />`;

const BRAND_ICONS = `
    <link rel="icon" type="image/svg+xml" href="/brand/logo/icon.svg" />
    <link rel="icon" type="image/png" sizes="32x32" href="/brand/icons/favicon-32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/brand/icons/favicon-16.png" />
    <link rel="apple-touch-icon" href="/brand/icons/apple-touch-icon.png" />
    <link rel="mask-icon" href="/brand/icons/mask-icon.svg" color="#ED7445" />
    <link rel="manifest" href="/manifest.webmanifest" />
    <meta name="theme-color" content="#FFFEF3" />`;

const BRAND_SOCIAL = `
    <link rel="canonical" href="${SITE_URL}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="MonetizeKit Internal UI" />
    <meta property="og:title" content="MonetizeKit Internal UI — design-system primitive gallery" />
    <meta property="og:description" content="Explore MonetizeKit's design tokens, brand assets, and shared React primitives." />
    <meta property="og:url" content="${SITE_URL}" />
    <meta property="og:image" content="${OG_IMAGE}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="MonetizeKit — The monetization control plane" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="MonetizeKit Internal UI — design-system primitive gallery" />
    <meta name="twitter:description" content="Explore MonetizeKit's design tokens, brand assets, and shared React primitives." />
    <meta name="twitter:image" content="${OG_IMAGE}" />
    <meta name="twitter:image:alt" content="MonetizeKit — The monetization control plane" />`;

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  presets: [
    resolve(process.cwd(), ".storybook/favicon-preset.ts"),
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
  staticDirs: [
    "./public",
    { from: "../../brand/dist/assets", to: "/brand" },
  ],
  managerHead: (head) => `${head}${BRAND_FONTS}${BRAND_ICONS}${BRAND_SOCIAL}`,
  previewHead: (head) => `${head}${BRAND_FONTS}${BRAND_ICONS}`,
};

export default config;
