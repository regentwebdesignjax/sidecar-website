/* eslint-disable @next/next/no-img-element -- the badge is Apple's SVG, served as-is */
"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { isAppLive, siteConfig } from "@/lib/site.config";

/**
 * Apple's official "Download on the App Store" badge (public/badges/*.svg,
 * from Apple's badge service), used unmodified per the App Store marketing
 * guidelines: black on light grounds, white on dark, never under 40px tall,
 * with clear space around it.
 *
 * While `appStoreUrl` is empty in site.config this renders a "coming soon"
 * state instead of a dead link.
 */
export function AppStoreBadge({
  className,
  tone = "default",
}: {
  className?: string;
  tone?: "default" | "onBand";
}) {
  const [notified, setNotified] = useState(false);

  if (isAppLive) {
    return (
      <a
        href={siteConfig.appStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download on the App Store"
        className={cn(
          "inline-block rounded-[7px] transition-transform duration-200 ease-[var(--ease-out-expo)] hover:scale-[1.03] active:scale-[0.98]",
          className,
        )}
      >
        <img
          src={tone === "onBand" ? "/badges/app-store-white.svg" : "/badges/app-store-black.svg"}
          alt=""
          width={120}
          height={40}
          className="block h-12 w-auto sm:h-[3.25rem]"
        />
      </a>
    );
  }

  const skin =
    tone === "onBand"
      ? "bg-sun text-teal hover:bg-white"
      : "bg-teal text-sun hover:bg-deep";

  return (
    <button
      type="button"
      onClick={() => setNotified(true)}
      className={cn(
        "inline-flex h-12 items-center gap-3 rounded-full px-6 text-sm font-semibold transition-colors",
        skin,
        className,
      )}
    >
      {notified ? "We'll let you know." : "Coming soon to the App Store"}
    </button>
  );
}
