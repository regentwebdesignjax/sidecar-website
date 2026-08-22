import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /**
   * "auto"  — dark lockup on paper, light lockup in dark mode (nav, footer)
   * "light" — always the cream lockup, for use on teal contrast bands
   */
  tone?: "auto" | "light";
};

/**
 * The real brand lockup, not a redraw. `lockup-dark` is the teal artwork meant
 * for cream backgrounds; `lockup-light` is the cream artwork for dark ones.
 */
export function Logo({ className, tone = "auto" }: LogoProps) {
  if (tone === "light") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/logos/lockup-light.webp"
        alt="Sidecar"
        width={640}
        height={124}
        className={cn("h-7 w-auto", className)}
      />
    );
  }

  return (
    <>
      {/* Both lockups ship; CSS shows the one that suits the current theme.
          A <picture media> query would only ever follow the system setting and
          would ignore the visitor's explicit choice. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        data-theme-show="light"
        src="/logos/lockup-dark.webp"
        alt="Sidecar"
        width={640}
        height={124}
        className={cn("h-7 w-auto", className)}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        data-theme-show="dark"
        src="/logos/lockup-light.webp"
        alt="Sidecar"
        width={640}
        height={124}
        className={cn("h-7 w-auto", className)}
      />
    </>
  );
}

/**
 * Wordmark as live text in Alan Sans — the logotype face. Used where the mark
 * would be redundant, such as the footer sign-off.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-wordmark text-2xl leading-none font-bold tracking-tight italic",
        className,
      )}
    >
      sidecar
    </span>
  );
}
