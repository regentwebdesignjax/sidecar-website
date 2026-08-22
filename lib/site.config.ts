/**
 * Single source of truth for everything that changes without a redesign.
 */
export const siteConfig = {
  name: "Sidecar",
  tagline: "Budgeting made simple.",
  description:
    "Envelope budgeting for people who want to know what they can actually spend. No bank connection, no ads, no tracking. Share a budget with your partner and both see the same numbers, live.",
  url: "https://sidecar.regentmediagroup.com",

  /**
   * LAUNCH DAY: paste the App Store link here and every download button on the
   * site goes live. While it is empty, badges render a "coming soon" state.
   */
  appStoreUrl: "",

  legal: {
    entity: "Regent Media Group, LLC",
    entityShort: "Regent Media Group",
    email: "sidecar@regentmediagroup.com",
    lastUpdated: "August 21, 2026",
    governingLaw: "the State of Florida, United States",
    /** Where Supabase stores user data — cited in the Privacy Policy. */
    dataRegion: "Virginia, United States",
  },
} as const;

export const isAppLive = siteConfig.appStoreUrl.length > 0;

export const navLinks = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerLinks = {
  Product: [
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/support", label: "Support" },
  ],
  Company: [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ],
} as const;
