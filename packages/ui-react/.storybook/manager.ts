import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming";
import { version } from "../package.json";

addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: `MonetizeKit Internal UI v${version}`,
    brandUrl: "https://internal-ui.monetizekit.app",
    brandImage: "/brand/logo/mk-badge-tilted.svg",
    brandTarget: "_self",
    fontBase: '"Inter", system-ui, -apple-system, sans-serif',
    fontCode: '"JetBrains Mono", ui-monospace, "SFMono-Regular", monospace',
    colorPrimary: "#FF6B35",
    colorSecondary: "#4F46E5",
    appBg: "#FFFEF3",
    appContentBg: "#FFFFFF",
    appPreviewBg: "#FFFEF3",
    appBorderColor: "#1A1A1A",
    appBorderRadius: 8,
    textColor: "#1A1A1A",
    textInverseColor: "#FFFEF3",
    barTextColor: "#5C5C55",
    barSelectedColor: "#FF6B35",
    barHoverColor: "#FF6B35",
    barBg: "#FFFEF3",
    inputBg: "#FFFFFF",
    inputBorder: "#1A1A1A",
    inputTextColor: "#1A1A1A",
    inputBorderRadius: 6,
  }),
});
