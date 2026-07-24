import type { Meta, StoryObj } from "@storybook/react";
import { ICON_META, ICON_NAMES, SOCIAL_NAMES } from "@monetizekit/brand";
import { IconTile } from "./IconTile.js";
import { SocialIcon } from "./SocialIcon.js";
import { Section } from "./Section.js";

const meta: Meta = {
  title: "Brand/Iconography",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

/** The full §07/§08 line-icon set on their canonical category tiles, alternating ±12° (§04). */
export const CapabilityTiles: Story = {
  render: () => (
    <Section ground="lavender" texture="stripe">
      <div className="mk-label" style={{ marginBottom: "1.5rem" }}>
        07 / 08 · Iconography
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.75rem" }}>
        {ICON_NAMES.map((name, i) => (
          <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem", minWidth: 96 }}>
            <IconTile name={name} tilt={i % 2 === 0 ? "left" : "right"} />
            <span className="mk-mono" style={{ fontSize: "0.7rem" }}>
              {ICON_META[name].label}
            </span>
          </div>
        ))}
      </div>
    </Section>
  ),
};

/** Category override: every glyph shown across the saturated + light tile grounds. */
export const CategorySwatches: Story = {
  render: () => (
    <Section ground="cream" texture="dots-soft">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(3.5rem, 1fr))", gap: "1rem" }}>
        {(["orange", "violet", "pink", "green", "cyan", "yellow", "mint", "peach"] as const).map((category) => (
          <IconTile key={category} name="shield" category={category} label={`${category} tile`} />
        ))}
      </div>
    </Section>
  ),
};

/** Social tiles (§footer) on their soc-* grounds. */
export const Social: Story = {
  render: () => (
    <Section ground="footer">
      <div style={{ display: "flex", gap: "1rem" }}>
        {SOCIAL_NAMES.map((name) => (
          <SocialIcon key={name} name={name} href="https://example.com" />
        ))}
      </div>
    </Section>
  ),
};
