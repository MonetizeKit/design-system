import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { afterEach, describe, expect, it } from "vitest";
import {
  Badge,
  Button,
  Card,
  ConsoleWindow,
  Icon,
  IconTile,
  Input,
  MonetizeKitThemeProvider,
  Section,
  SocialIcon,
  StatCard,
  VerdictPill,
} from "../src/index.js";

afterEach(() => {
  document.body.innerHTML = "";
});

describe("Button", () => {
  it("renders a button with variant + tone classes", () => {
    render(<Button variant="primary" tone="violet">Go</Button>);
    const btn = screen.getByRole("button", { name: "Go" });
    expect(btn.className).toContain("mk-btn");
    expect(btn.className).toContain("mk-btn--primary");
    expect(btn.className).toContain("mk-btn--tone-violet");
    expect(btn.getAttribute("type")).toBe("button");
  });

  it("does not apply a tone class to ghost variant", () => {
    render(<Button variant="ghost" tone="violet">G</Button>);
    expect(screen.getByRole("button").className).not.toContain("mk-btn--tone-violet");
  });
});

describe("VerdictPill", () => {
  it("maps each verdict to its modifier and renders the label", () => {
    render(<VerdictPill verdict="REQUIRE_TOP_UP" />);
    const el = screen.getByText("REQUIRE_TOP_UP");
    expect(el.className).toContain("mk-verdict--require-top-up");
  });
});

describe("Input", () => {
  it("reflects invalid via aria-invalid + class", () => {
    render(<Input invalid aria-label="key" />);
    const input = screen.getByLabelText("key");
    expect(input.getAttribute("aria-invalid")).toBe("true");
    expect(input.className).toContain("mk-input--invalid");
  });
});

describe("Section", () => {
  it("saturated ground defaults to an on-color light-island (§12)", () => {
    const { container } = render(<Section ground="orange">x</Section>);
    const section = container.querySelector("section")!;
    expect(section.className).toContain("g-orange");
    expect(section.className).toContain("on-color");
  });

  it("neutral ground is not an island", () => {
    const { container } = render(<Section ground="cream">x</Section>);
    expect(container.querySelector("section")!.className).not.toContain("on-color");
  });
});

describe("Icon", () => {
  it("renders an inline stroked SVG from the brand registry (decorative by default)", () => {
    const { container } = render(<Icon name="catalog" />);
    const svg = container.querySelector("svg")!;
    expect(svg.className.baseVal).toContain("mk-icon");
    expect(svg.getAttribute("stroke")).toBe("currentColor");
    expect(svg.getAttribute("aria-hidden")).toBe("true");
    expect(svg.querySelectorAll("path").length).toBeGreaterThan(0);
  });

  it("becomes an img with a title", () => {
    render(<Icon name="approvals" title="Approvals" />);
    expect(screen.getByRole("img", { name: "Approvals" })).toBeTruthy();
    // check-circle uses a circle node
    expect(screen.getByRole("img").querySelector("circle")).toBeTruthy();
  });
});

describe("IconTile", () => {
  it("applies the canonical category color and the −12° tilt by default", () => {
    render(<IconTile name="enforcement" />);
    const tile = screen.getByRole("img", { name: "Enforcement" });
    expect(tile.className).toContain("mk-icon-tile--violet");
    expect(tile.className).toContain("tilt--12");
    expect(tile.querySelector("svg.mk-icon")).toBeTruthy();
  });

  it("honors a category override", () => {
    render(<IconTile name="usage" category="cyan" tilt="right" label="Usage tile" />);
    const tile = screen.getByRole("img", { name: "Usage tile" });
    expect(tile.className).toContain("mk-icon-tile--cyan");
    expect(tile.className).toContain("tilt-12");
  });
});

describe("SocialIcon", () => {
  it("renders a soc-toned filled glyph link with an accessible name", () => {
    render(<SocialIcon name="github" href="https://example.com" />);
    const link = screen.getByRole("link", { name: "GitHub" });
    expect(link.className).toContain("mk-social--yellow");
    const svg = link.querySelector("svg")!;
    expect(svg.getAttribute("fill")).toBe("currentColor");
  });
});

describe("MonetizeKitThemeProvider", () => {
  it("resolves dark mode: data-theme=dark and inverted neutral vars", () => {
    const { container } = render(
      <MonetizeKitThemeProvider mode="dark" palette="default">
        <span>child</span>
      </MonetizeKitThemeProvider>,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.getAttribute("data-theme")).toBe("dark");
    // dark cream/paper invert to dark neutrals; ink lifts to a light value
    const cream = root.style.getPropertyValue("--mk-cream").trim();
    const ink = root.style.getPropertyValue("--mk-ink").trim();
    expect(cream.toLowerCase()).not.toBe("#fffef3");
    expect(ink.toLowerCase()).not.toBe("#1a1a1a");
  });

  it("light mode keeps authoritative light neutrals", () => {
    const { container } = render(<MonetizeKitThemeProvider mode="light">x</MonetizeKitThemeProvider>);
    const root = container.firstElementChild as HTMLElement;
    expect(root.getAttribute("data-theme")).toBe("light");
    expect(root.style.getPropertyValue("--mk-ink").trim().toLowerCase()).toBe("#1a1a1a");
  });
});

describe("a11y (axe-core)", () => {
  it("a composed slice has no serious/critical violations", async () => {
    render(
      <main>
        <Section ground="cream">
          <Card>
            <Badge tone="violet">audit</Badge>
            <VerdictPill verdict="ALLOW" />
            <IconTile name="catalog" />
            <SocialIcon name="github" href="https://example.com" />
            <StatCard label="calls" value="128,904" />
            <ConsoleWindow title="mk.check()">ok</ConsoleWindow>
            <Input aria-label="API key" />
            <Button>Save</Button>
          </Card>
        </Section>
      </main>,
    );
    const results = await axe.run(document.body, {
      resultTypes: ["violations"],
      rules: { "color-contrast": { enabled: false } },
    });
    const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(serious, JSON.stringify(serious.map((v) => v.id))).toHaveLength(0);
  });
});
