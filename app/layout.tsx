import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";

import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { THEME_SCRIPT } from "@/components/theme/theme";
import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";
import { siteConfig } from "@/lib/site.config";

import "./globals.css";

/** Display headings and every figure, exactly as the app sets them. */
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

/** UI and body copy. */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

/**
 * The logotype face. Self-hosted because Alan Sans is not in next/font/google's
 * catalogue yet. Used for the "sidecar" wordmark only — never body or headings.
 */
const alanSans = localFont({
  src: "./fonts/AlanSans-Variable.woff2",
  weight: "400 700",
  variable: "--font-alan-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "envelope budgeting",
    "budget app",
    "shared budget",
    "couples budgeting",
    "expense tracker",
    "paycheck planner",
    "no bank connection",
  ],
  authors: [{ name: siteConfig.legal.entityShort }],
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F0DB" },
    { media: "(prefers-color-scheme: dark)", color: "#04201E" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${jakarta.variable} ${alanSans.variable}`}
      // The theme script sets data-theme on this element before React hydrates.
      suppressHydrationWarning
    >
      <head>
        {/* Must run before first paint, so it is inlined and render-blocking. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <SmoothScroll />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-teal focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-sun"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
