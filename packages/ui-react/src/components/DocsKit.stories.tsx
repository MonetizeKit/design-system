import type { Meta, StoryObj } from "@storybook/react";
import { Callout } from "./Callout.js";
import { MethodBadge } from "./MethodBadge.js";
import { DocCodeBlock } from "./DocCodeBlock.js";
import { DocPageHeader } from "./DocPageHeader.js";
import { Prose } from "./Prose.js";
import { Button } from "./Button.js";
import type { HttpMethod } from "../contract.js";

/**
 * The documentation kit (Brand Direction §13): status-color callouts and HTTP method badges
 * used to render docs in the brand language. Everything is token-driven, so it follows the
 * page theme (light/dark) and any active palette.
 */
const meta: Meta = {
  title: "Docs Kit/Overview",
};
export default meta;

type Story = StoryObj;

export const Callouts: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1rem", maxWidth: 640 }}>
      <Callout tone="note">Neutral context the reader should keep in mind.</Callout>
      <Callout tone="tip">A shortcut or best practice that saves the reader time.</Callout>
      <Callout tone="info">Supporting detail or a pointer to related reading.</Callout>
      <Callout tone="warn">A consequence to avoid before proceeding.</Callout>
      <Callout tone="danger">A destructive or irreversible action.</Callout>
    </div>
  ),
};

export const MethodBadges: Story = {
  render: () => {
    const methods: HttpMethod[] = ["GET", "POST", "PUT", "PATCH", "DELETE"];
    return (
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
        {methods.map((method) => (
          <MethodBadge key={method} method={method} />
        ))}
      </div>
    );
  },
};

export const CodeBlockSingle: Story = {
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <DocCodeBlock
        language="bash"
        showLineNumbers
        code={"curl https://api.monetizekit.com/v1/entitlements \\\n  -H 'Authorization: Bearer mk_live_…'"}
      />
    </div>
  ),
};

export const CodeBlockTabbed: Story = {
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <DocCodeBlock
        tabs={[
          { label: "Node", language: "javascript", code: "const mk = new MonetizeKit(key);\nawait mk.entitlements.check('seat');" },
          { label: "Python", language: "python", code: "mk = MonetizeKit(key)\nmk.entitlements.check('seat')" },
          { label: "cURL", language: "bash", code: "curl .../v1/entitlements/seat -H 'Authorization: Bearer …'" },
        ]}
      />
    </div>
  ),
};

export const PageHeader: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1.5rem", maxWidth: 720 }}>
      <DocPageHeader
        title="Entitlement patterns"
        description="Recommended ways to model access decisions with MonetizeKit."
      >
        <Button variant="secondary" size="sm">
          Copy page
        </Button>
      </DocPageHeader>
      <DocPageHeader title="Quickstart" description="No actions — title + lede only." />
    </div>
  ),
};

export const ProseScale: Story = {
  render: () => (
    <Prose style={{ maxWidth: 640 }}>
      <h2>Entitlements</h2>
      <p>
        An <a href="#">entitlement</a> is a computed access decision for a customer and feature. Branch
        on the <code>verdict</code>, not the raw HTTP status.
      </p>
      <ul>
        <li>Boolean features gate on/off access.</li>
        <li>Metered features debit a balance.</li>
      </ul>
    </Prose>
  ),
};
