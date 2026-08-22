"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { isAppLive, siteConfig } from "@/lib/site.config";

function AppleGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-7 shrink-0">
      <path d="M17.05 12.54c-.03-2.68 2.19-3.97 2.29-4.03-1.25-1.83-3.19-2.08-3.88-2.11-1.65-.17-3.22.97-4.06.97-.84 0-2.13-.95-3.5-.92-1.8.03-3.46 1.05-4.39 2.66-1.87 3.25-.48 8.06 1.34 10.7.89 1.29 1.95 2.74 3.34 2.69 1.34-.05 1.85-.87 3.47-.87 1.62 0 2.08.87 3.5.84 1.44-.02 2.36-1.31 3.24-2.61 1.02-1.5 1.44-2.95 1.47-3.02-.03-.01-2.82-1.08-2.85-4.29zM14.4 4.6c.74-.9 1.24-2.15 1.1-3.4-1.07.04-2.36.71-3.12 1.61-.68.79-1.28 2.06-1.12 3.28 1.19.09 2.41-.61 3.14-1.49z" />
    </svg>
  );
}

/**
 * Download button. While `appStoreUrl` is empty in site.config, this renders a
 * "coming soon" state instead of a dead link — one edit there takes every badge
 * on the site live.
 */
export function AppStoreBadge({
  className,
  tone = "default",
}: {
  className?: string;
  tone?: "default" | "onBand";
}) {
  const [notified, setNotified] = useState(false);

  const base =
    "inline-flex items-center gap-3 rounded-full px-6 h-14 transition-[background-color,transform] duration-200 ease-[var(--ease-out-expo)] active:scale-[0.98]";
  const skin =
    tone === "onBand"
      ? "bg-sun text-teal hover:bg-white"
      : "bg-teal text-sun hover:bg-deep";

  const label = (
    <span className="flex flex-col items-start leading-none">
      <span className="text-[0.65rem] font-medium opacity-80">
        {isAppLive ? "Download on the" : "Coming soon to the"}
      </span>
      <span className="text-lg font-semibold tracking-tight">App Store</span>
    </span>
  );

  if (isAppLive) {
    return (
      <a
        href={siteConfig.appStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(base, skin, className)}
      >
        <AppleGlyph />
        {label}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setNotified(true)}
      aria-live="polite"
      className={cn(base, skin, className)}
    >
      <AppleGlyph />
      {notified ? (
        <span className="flex flex-col items-start leading-none">
          <span className="text-[0.65rem] font-medium opacity-80">
            Sidecar 1.0 is in review
          </span>
          <span className="text-lg font-semibold tracking-tight">
            Almost there
          </span>
        </span>
      ) : (
        label
      )}
    </button>
  );
}
