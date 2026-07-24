import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge.js";
import { Card } from "./Card.js";
import { ConsoleWindow } from "./ConsoleWindow.js";
import { MonetizeKitBadge } from "./BrandMark.js";
import { Section } from "./Section.js";
import { StatCard } from "./StatCard.js";
import { VerdictPill } from "./VerdictPill.js";

const meta: Meta = {
  title: "Overview/Showcase",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

/** A composed page slice exercising grounds, primitives, and the signature Decision Block. */
export const DecisionBlock: Story = {
  render: () => (
    <div>
      <Section ground="cream" texture="dots-soft">
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
          <MonetizeKitBadge tilt shadow width={72} height={72} />
          <div className="mk-display" style={{ fontSize: "2rem" }}>
            The monetization control plane.
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
          <ConsoleWindow title="mk.check()">
            {"mk.check({ feature: 'export' })\n"}
            <span className="mk-console__audit">→ ALLOW · audit=evt_1a2b3c</span>
          </ConsoleWindow>
          <Card tilt>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
              <VerdictPill verdict="ALLOW" />
              <VerdictPill verdict="REQUIRE_TOP_UP" />
              <Badge tone="violet">audit</Badge>
            </div>
            <StatCard label="calls today" value="128,904" />
          </Card>
        </div>
      </Section>
      <Section ground="orange">
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <VerdictPill verdict="DENY" />
          <span className="mk-body">Saturated grounds stay a light-island in dark mode (§12).</span>
        </div>
      </Section>
    </div>
  ),
};
