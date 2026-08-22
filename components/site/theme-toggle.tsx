"use client";

import { Moon, Sun } from "lucide-react";

import { toggleTheme, useTheme } from "@/components/theme/theme";
import { cn } from "@/lib/utils";

/**
 * Light/dark switch.
 *
 * Both icons are rendered and CSS picks one via [data-theme-show], so the right
 * icon is painted on the first frame — no hydration flash, and it stays correct
 * with JavaScript disabled. Only the label needs the live value.
 */
export function ThemeToggle({
  className,
  tone = "default",
}: {
  className?: string;
  tone?: "default" | "onBand";
}) {
  const theme = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      }
      title={
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      }
      className={cn(
        "grid size-10 place-items-center rounded-full border transition-colors duration-200",
        tone === "onBand"
          ? "border-band-line text-band-ink hover:border-sun/50 hover:bg-band-fill"
          : "border-line text-dim hover:border-teal/40 hover:bg-teal/6 hover:text-ink",
        className,
      )}
    >
      <Sun
        data-theme-show="light"
        className="size-[18px]"
        strokeWidth={1.75}
        aria-hidden="true"
      />
      <Moon
        data-theme-show="dark"
        className="size-[18px]"
        strokeWidth={1.75}
        aria-hidden="true"
      />
    </button>
  );
}
