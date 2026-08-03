import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";
import { describe, expect, it } from "vitest";
import storybookConfig from "../.storybook/main.js";
import { favicon } from "../.storybook/favicon-preset.js";

const here = dirname(fileURLToPath(import.meta.url));
const storybookDir = resolve(here, "..", ".storybook");
const siteUrl = "https://internal-ui.monetizekit.app";

function renderHead(transform: StorybookConfig["managerHead"] | StorybookConfig["previewHead"]): Document {
  expect(transform).toBeTypeOf("function");
  const markup = (transform as (head: string) => string)("");
  return new DOMParser().parseFromString(`<head>${markup}</head>`, "text/html");
}

describe("Storybook brand publication", () => {
  it("serves the package assets at /brand and publishes an install manifest", () => {
    expect(storybookConfig.presets).toEqual([
      expect.stringMatching(/packages\/ui-react\/\.storybook\/favicon-preset\.ts$/),
    ]);
    expect(favicon()).toMatch(/manifest\.webmanifest$/);
    expect(storybookConfig.staticDirs).toEqual([
      "./public",
      { from: "../../brand/dist/assets", to: "/brand" },
    ]);

    const manifest = JSON.parse(
      readFileSync(resolve(storybookDir, "public", "manifest.webmanifest"), "utf8"),
    ) as { start_url: string; icons: Array<{ src: string; purpose?: string }> };

    expect(manifest.start_url).toBe("/");
    expect(manifest.icons).toEqual([
      { src: "/brand/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/brand/icons/maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ]);
  });

  it("emits canonical manager metadata and package-backed icons", () => {
    const managerHead = renderHead(storybookConfig.managerHead);
    const link = (rel: string) => managerHead.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
    const property = (name: string) =>
      managerHead.querySelector<HTMLMetaElement>(`meta[property="${name}"]`)?.content;
    const meta = (name: string) =>
      managerHead.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)?.content;

    expect(link("canonical")?.href).toBe(`${siteUrl}/`);
    expect(link("icon")?.getAttribute("href")).toBe("/brand/logo/icon.svg");
    expect(link("apple-touch-icon")?.getAttribute("href")).toBe(
      "/brand/icons/apple-touch-icon.png",
    );
    expect(link("mask-icon")?.getAttribute("href")).toBe("/brand/icons/mask-icon.svg");
    expect(link("manifest")?.getAttribute("href")).toBe("/manifest.webmanifest");
    expect(property("og:url")).toBe(siteUrl);
    expect(property("og:image")).toBe(`${siteUrl}/brand/og/og-default.png`);
    expect(meta("twitter:card")).toBe("summary_large_image");
    expect(meta("twitter:image")).toBe(`${siteUrl}/brand/og/og-default.png`);
  });

  it("gives the story iframe the same package-backed browser and install icons", () => {
    const previewHead = renderHead(storybookConfig.previewHead);
    const hrefs = Array.from(previewHead.querySelectorAll<HTMLLinkElement>("link")).map(
      (link) => link.getAttribute("href"),
    );

    expect(hrefs).toEqual(
      expect.arrayContaining([
        "/brand/logo/icon.svg",
        "/brand/icons/favicon-32.png",
        "/brand/icons/favicon-16.png",
        "/brand/icons/apple-touch-icon.png",
        "/brand/icons/mask-icon.svg",
        "/manifest.webmanifest",
      ]),
    );
  });
});
