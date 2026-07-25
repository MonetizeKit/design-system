import type { HTMLAttributes, ReactNode } from "react";
import { Fragment, forwardRef } from "react";
import type { SocialName } from "@monetizekit/brand";
import { cn } from "./cn.js";
import { MonetizeKitBadge } from "./BrandMark.js";
import { SocialIcon } from "./SocialIcon.js";
import { DecorShape } from "./DecorShape.js";

export interface FooterLink {
  label: string;
  href: string;
  /** Open in a new tab with `rel="noopener noreferrer"`. */
  external?: boolean;
}

export interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

export interface FooterSocial {
  name: SocialName;
  href: string;
}

/**
 * The canonical brand footer link set (§footer / Brand Direction v0.9). Exported so every surface
 * renders the *same* columns; each surface only supplies the link renderer (relative + client
 * routing vs. plain absolute anchors) so the structure and labels never drift.
 */
export const DEFAULT_FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: "Product",
    links: [
      { label: "Overview", href: "https://www.monetizekit.app/product" },
      { label: "Pricing", href: "https://www.monetizekit.app/pricing" },
      { label: "Integrations", href: "https://www.monetizekit.app/integrations" },
      { label: "Product Tour", href: "https://www.monetizekit.app/demo" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "SaaS Monetization", href: "https://www.monetizekit.app/solutions/saas" },
      { label: "Enterprise Governance", href: "https://www.monetizekit.app/solutions/enterprise" },
      { label: "AI Credits & Budgets", href: "https://www.monetizekit.app/solutions/ai-credits" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Documentation", href: "https://docs.monetizekit.app", external: true },
      { label: "API Reference", href: "https://docs.monetizekit.app/api-reference", external: true },
      { label: "Component Gallery", href: "https://ui.monetizekit.app", external: true },
      { label: "Comparisons", href: "https://www.monetizekit.app/blog" },
      { label: "About", href: "https://www.monetizekit.app/about" },
      { label: "Security", href: "https://www.monetizekit.app/security" },
      { label: "Trust", href: "https://www.monetizekit.app/trust" },
      { label: "Status", href: "https://www.monetizekit.app/status" },
    ],
  },
];

/** The canonical social tiles (§footer): Twitter/X (cyan), GitHub (yellow), LinkedIn (green). */
export const DEFAULT_FOOTER_SOCIAL: FooterSocial[] = [
  { name: "twitter", href: "https://twitter.com/monetizekit" },
  { name: "github", href: "https://github.com/MonetizeKit" },
  { name: "linkedin", href: "https://www.linkedin.com/company/monetizekit" },
];

/** The canonical legal links shown in the sub-footer. */
export const DEFAULT_FOOTER_LEGAL_LINKS: FooterLink[] = [
  { label: "Privacy Policy", href: "https://www.monetizekit.app/privacy" },
  { label: "Terms of Service", href: "https://www.monetizekit.app/terms" },
];

export const DEFAULT_FOOTER_TAGLINE = "The monetization control plane for modern SaaS and AI products.";

export interface FooterEndorsement {
  label: string;
  href?: string;
}

export interface BrandFooterProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  /** Navigation columns. Defaults to {@link DEFAULT_FOOTER_COLUMNS}. */
  columns?: FooterColumn[];
  /** Social tiles. Defaults to {@link DEFAULT_FOOTER_SOCIAL}. */
  social?: FooterSocial[];
  /** Legal links in the sub-footer. Defaults to {@link DEFAULT_FOOTER_LEGAL_LINKS}. */
  legalLinks?: FooterLink[];
  /** Brand tagline under the wordmark. */
  tagline?: string;
  /** Wordmark text beside the badge. */
  wordmark?: string;
  /** Name in the copyright line. */
  copyrightHolder?: string;
  /** Parent-company endorsement (§06). Pass `null` to omit. */
  endorsement?: FooterEndorsement | null;
  /** Copyright year. Defaults to the current year. */
  year?: number;
  /**
   * Interactive "Cookie Preferences" control appended to the legal row (e.g. a consent-manager
   * trigger). Surfaces without a consent manager omit it.
   */
  cookiePreferences?: ReactNode;
  /**
   * Render a nav link. Defaults to a plain `<a>` (client apps pass a router-aware renderer to keep
   * in-app navigation a soft transition). The returned node must render the link text itself.
   */
  renderLink?: (link: FooterLink, className: string) => ReactNode;
}

// Scoped footer styling. The footer is a permanently-dark ground in BOTH modes (`--mk-footer-bg`
// is dark in light *and* dark), so its text is fixed cream (#FFFEF3) rather than the mode-aware
// `--mk-cream` (which would invert to a dark value and disappear). Shipped inline so consumers
// need no extra stylesheet import — the social tiles / badge / decor reuse the brand primitive
// classes already loaded via `@monetizekit/brand/primitives.css`.
const FOOTER_CSS = `
.mk-footer{position:relative;overflow:hidden;background:var(--mk-footer-bg);color:#FFFEF3;border-top:var(--mk-border-panel) solid var(--mk-ink);padding:3.5rem 0 0;}
.mk-footer__inner{max-width:80rem;margin:0 auto;padding:0 1.5rem;position:relative;z-index:1;}
.mk-footer__cols{display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:2rem;}
.mk-footer__lockup{display:flex;align-items:center;gap:0.75rem;}
.mk-footer__wm{font-family:var(--mk-font-sans);font-weight:800;font-size:1.1875rem;letter-spacing:-0.02em;color:#FFFEF3;}
.mk-footer__tag{color:rgba(255,254,243,0.62);font-size:0.85rem;margin-top:0.9rem;max-width:32ch;font-weight:500;line-height:1.5;}
.mk-footer__socials{display:flex;gap:0.75rem;margin-top:1.1rem;}
.mk-footer__col-h{font-family:var(--mk-font-mono);font-size:0.6875rem;font-weight:700;letter-spacing:0.14em;color:rgba(255,254,243,0.5);text-transform:uppercase;margin:0 0 0.9rem;}
.mk-footer__links{list-style:none;margin:0;padding:0;display:grid;gap:0.625rem;}
.mk-footer__link{display:inline-block;color:rgba(255,254,243,0.84);font-size:0.84rem;text-decoration:none;font-weight:500;transition:color 0.12s ease;}
.mk-footer__link:hover{color:var(--mk-signal-yellow);}
.mk-footer__link:focus-visible{outline:2px solid var(--mk-signal-yellow);outline-offset:3px;}
.mk-footer__sub{border-top:1px solid rgba(255,254,243,0.16);margin-top:2.6rem;padding:1.4rem 0;display:flex;justify-content:space-between;align-items:center;gap:1.1rem;flex-wrap:wrap;font-size:0.78rem;color:rgba(255,254,243,0.62);font-weight:500;}
.mk-footer__en{color:var(--mk-signal-yellow);text-decoration:underline;font-weight:700;}
.mk-footer__legal{display:flex;gap:1.4rem;flex-wrap:wrap;font-weight:800;font-size:0.72rem;letter-spacing:0.06em;text-transform:uppercase;}
.mk-footer__legal a,.mk-footer__legal button,.mk-footer__legal .mk-footer__legal-item{color:#FFFEF3;text-decoration:none;background:none;border:0;padding:0;margin:0;font:inherit;letter-spacing:inherit;text-transform:inherit;cursor:pointer;transition:color 0.12s ease;}
.mk-footer__legal a:hover,.mk-footer__legal button:hover,.mk-footer__legal .mk-footer__legal-item:hover{color:var(--mk-signal-yellow);}
.mk-footer__legal a:focus-visible,.mk-footer__legal button:focus-visible{outline:2px solid var(--mk-signal-yellow);outline-offset:3px;}
.mk-footer__decor{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:0;color:rgba(255,254,243,0.6);}
@media (max-width:900px){.mk-footer__cols{grid-template-columns:1fr 1fr;}}
@media (max-width:560px){.mk-footer__cols{grid-template-columns:1fr;}}
`;

function defaultRenderLink(link: FooterLink, className: string): ReactNode {
  return (
    <a
      className={className}
      href={link.href}
      {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {link.label}
    </a>
  );
}

/**
 * The MonetizeKit brand footer (§footer / Brand Direction v0.9): a permanently-dark ground with a
 * 3px ink top rule, the tilted MK badge + wordmark, brand tagline, tilted social tiles, mono
 * uppercase column headers, and a sub-footer carrying the C9D Holdings endorsement + legal links.
 *
 * This is the single source of truth for the footer across every surface. RSC-safe.
 */
export const BrandFooter = forwardRef<HTMLElement, BrandFooterProps>(function BrandFooter(
  {
    columns = DEFAULT_FOOTER_COLUMNS,
    social = DEFAULT_FOOTER_SOCIAL,
    legalLinks = DEFAULT_FOOTER_LEGAL_LINKS,
    tagline = DEFAULT_FOOTER_TAGLINE,
    wordmark = "MonetizeKit",
    copyrightHolder = "MonetizeKit",
    endorsement = { label: "C9D Holdings", href: "https://www.c9dholdings.com" },
    year = new Date().getFullYear(),
    cookiePreferences,
    renderLink = defaultRenderLink,
    className,
    ...rest
  },
  ref,
) {
  return (
    <footer ref={ref} className={cn("mk-footer", className)} {...rest}>
      <style dangerouslySetInnerHTML={{ __html: FOOTER_CSS }} />
      <div className="mk-footer__decor" aria-hidden="true">
        <DecorShape shape="triangle" size={60} style={{ top: "3rem", right: "22%" }} />
        <DecorShape shape="circle" size={120} style={{ bottom: "3.5rem", right: "8%" }} />
      </div>

      <div className="mk-footer__inner">
        <div className="mk-footer__cols">
          <div className="mk-footer__brandcol">
            <div className="mk-footer__lockup">
              <MonetizeKitBadge tilt width={38} height={38} title={wordmark} />
              <span className="mk-footer__wm">{wordmark}</span>
            </div>
            {tagline ? <p className="mk-footer__tag">{tagline}</p> : null}
            {social.length > 0 ? (
              <div className="mk-footer__socials">
                {social.map((item) => (
                  <SocialIcon
                    key={item.name}
                    name={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                ))}
              </div>
            ) : null}
          </div>

          {columns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h5 className="mk-footer__col-h">{column.heading}</h5>
              <ul className="mk-footer__links">
                {column.links.map((link) => (
                  <li key={link.label}>{renderLink(link, "mk-footer__link")}</li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mk-footer__sub">
          <span>
            © {year} {copyrightHolder}. All rights reserved.
            {endorsement ? (
              <>
                {" A "}
                {endorsement.href ? (
                  <a
                    className="mk-footer__en"
                    href={endorsement.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {endorsement.label}
                  </a>
                ) : (
                  <span className="mk-footer__en">{endorsement.label}</span>
                )}
                {" company."}
              </>
            ) : null}
          </span>
          <span className="mk-footer__legal">
            {legalLinks.map((link) => (
              <Fragment key={link.label}>{renderLink(link, "mk-footer__legal-item")}</Fragment>
            ))}
            {cookiePreferences}
          </span>
        </div>
      </div>
    </footer>
  );
});
