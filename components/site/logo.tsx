import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /**
   * "auto"  — teal lockup on paper; the cream lockup takes over when a dark
   *           scene is under the nav bar (see GroundWatch and globals.css)
   * "light" — always the cream lockup, for teal contrast bands
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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        data-nav-logo="dark"
        src="/logos/lockup-dark.webp"
        alt="Sidecar"
        width={640}
        height={124}
        className={cn("h-7 w-auto", className)}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        data-nav-logo="light"
        src="/logos/lockup-light.webp"
        alt=""
        aria-hidden="true"
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
