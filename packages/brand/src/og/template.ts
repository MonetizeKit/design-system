/**
 * Shared OpenGraph/Twitter card template (§01, Brand v0.8). Framework-agnostic: returns a
 * satori-compatible element node (the `{ type, props }` shape that `next/og`'s `ImageResponse`
 * and `satori` both accept), so every surface renders consistent 1200×630 cards from one source.
 *
 * Usage (Next.js app router):
 *   import { ImageResponse } from "next/og";
 *   import { ogTemplate, OG_SIZE } from "@monetizekit/brand";
 *   export default function OG() { return new ImageResponse(ogTemplate({ title: "Pricing" }), OG_SIZE); }
 */

import { resolveTokens } from "@monetizekit/design-tokens";

/** 1200×630 — the canonical social card size. */
export const OG_SIZE = { width: 1200, height: 630 } as const;

/** A minimal satori/ImageResponse-compatible element node (avoids a React dependency). */
export interface OgNode {
  type: string;
  props: {
    style?: Record<string, string | number>;
    children?: OgNode | string | Array<OgNode | string>;
    [key: string]: unknown;
  };
}

export interface OgTemplateProps {
  /** Large display headline. Defaults to the wordmark. */
  title?: string;
  /** Mono subtitle / category line. */
  subtitle?: string;
  /** Named brand ground; defaults to cream. */
  ground?: "cream" | "orange" | "yellow" | "lavender";
}

function node(type: string, props: OgNode["props"]): OgNode {
  return { type, props };
}

/**
 * Build the OG card element. Colors are pulled from resolved design tokens (light mode — OG cards
 * are a fixed light-island, they do not invert), keeping the card in lockstep with the brand.
 */
export function ogTemplate(props: OgTemplateProps = {}): OgNode {
  const { title = "MonetizeKit", subtitle = "The monetization control plane.", ground = "cream" } = props;
  const colors = resolveTokens({ mode: "light" }).brand.colors;
  const bg = colors[ground];
  const ink = colors.onlight;

  return node("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      width: "100%",
      height: "100%",
      padding: "72px",
      background: bg,
      border: `16px solid ${ink}`,
      fontFamily: "Inter",
    },
    children: [
      node("div", {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "160px",
          height: "160px",
          marginBottom: "auto",
          background: colors.action,
          border: `10px solid ${ink}`,
          boxShadow: `18px 18px 0 0 ${ink}`,
        },
        children: node("div", {
          style: { fontSize: "94px", fontWeight: 900, letterSpacing: "-3px", color: ink, lineHeight: 1 },
          children: "MK",
        }),
      }),
      node("div", {
        style: {
          fontSize: "112px",
          fontWeight: 900,
          letterSpacing: "-4px",
          color: ink,
          lineHeight: 1,
        },
        children: title,
      }),
      node("div", {
        style: {
          marginTop: "20px",
          fontSize: "40px",
          fontFamily: "JetBrains Mono",
          color: colors.muted,
        },
        children: subtitle,
      }),
    ],
  });
}
