import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: the whole site is static content, so Netlify serves plain
  // HTML/CSS/JS with no serverless functions and no Next runtime plugin.
  output: "export",

  // The image optimizer needs a server, which a static export does not have.
  // Assets in /public are pre-converted to WebP at the sizes we actually use.
  images: { unoptimized: true },

  // Emit /about/index.html rather than /about.html so Netlify serves clean URLs.
  trailingSlash: true,

  // Don't generate AGENTS.md / CLAUDE.md into the repo on every dev run.
  agentRules: false,
};

export default nextConfig;
