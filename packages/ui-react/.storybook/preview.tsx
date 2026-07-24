import { PALETTE_NAMES } from "@monetizekit/design-tokens";
import type { Decorator, Preview } from "@storybook/react";
import { MonetizeKitThemeProvider } from "../src/theme/ThemeProvider.js";
import type { Mode, PaletteName } from "../src/contract.js";
import "../src/styles.css";

/** Compose theme × palette × mode live from the Storybook toolbar (§00). */
const withBrandTheme: Decorator = (Story, context) => {
  const palette = context.globals.palette as PaletteName;
  const mode = context.globals.mode as Mode;
  return (
    <MonetizeKitThemeProvider palette={palette} mode={mode} style={{ padding: "2rem", minHeight: "100vh" }}>
      <Story />
    </MonetizeKitThemeProvider>
  );
};

const preview: Preview = {
  globalTypes: {
    palette: {
      description: "Brand palette axis",
      defaultValue: "default",
      toolbar: {
        title: "Palette",
        icon: "paintbrush",
        items: PALETTE_NAMES.map((p) => ({ value: p, title: p })),
        dynamicTitle: true,
      },
    },
    mode: {
      description: "Light / dark mode axis (§12)",
      defaultValue: "light",
      toolbar: {
        title: "Mode",
        icon: "mirror",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
          { value: "system", title: "System" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [withBrandTheme],
  parameters: {
    layout: "fullscreen",
    controls: { expanded: true },
  },
};

export default preview;
