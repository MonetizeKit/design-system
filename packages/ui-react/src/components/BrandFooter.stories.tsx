import type { Meta, StoryObj } from "@storybook/react";
import { BrandFooter } from "./BrandFooter.js";

const meta: Meta<typeof BrandFooter> = {
  title: "Components/BrandFooter",
  component: BrandFooter,
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof BrandFooter>;

/** The canonical brand footer — shared across every surface (marketing, docs). */
export const Default: Story = {
  render: () => <BrandFooter />,
};

/** With an interactive "Cookie Preferences" control injected into the legal row. */
export const WithCookiePreferences: Story = {
  render: () => (
    <BrandFooter
      cookiePreferences={
        <button type="button" className="mk-footer__legal-item">
          Cookie Preferences
        </button>
      }
    />
  ),
};
