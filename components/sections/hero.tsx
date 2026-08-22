"use client";

import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";

import { gsap } from "@/components/motion/gsap";
import { SplitHeadline } from "@/components/motion/split-headline";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";
import { AppStoreBadge } from "@/components/site/app-store-badge";
import { Button } from "@/components/ui/button";

/**
 * The homepage hero. The envelope field drifts behind the type at rest and
 * begins assembling as the page scrolls, handing off to the pinned act below.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !root.current) return;

      const tl = gsap.timeline({ delay: 0.15 });
      tl.from(
        root.current.querySelectorAll("[data-hero-fade]"),
        {
          opacity: 0,
          y: 18,
          filter: "blur(6px)",
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
        },
        0.5,
      );

      return () => {
        tl.kill();
      };
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section
      ref={root}
      className="paper-wash-center relative flex min-h-svh flex-col items-center justify-center px-6 pt-28 pb-20"
    >

      <div className="relative z-10 flex max-w-4xl flex-col items-center text-center">
        <p
          data-hero-fade
          className="eyebrow rounded-full border border-line bg-card/70 px-4 py-2 text-accent backdrop-blur-sm"
        >
          Envelope budgeting, refreshingly simplified.
        </p>

        <SplitHeadline
          as="h1"
          immediate
          delay={0.25}
          className="display mt-7 text-[clamp(3rem,10vw,7rem)] text-ink"
        >
          Take control of your
          <br />
          household budget (Together!)
        </SplitHeadline>

        <p
          data-hero-fade
          className="mt-7 max-w-xl text-lg leading-relaxed text-dim text-balance sm:text-xl"
        >
          With Sidecar, you can finally know exactly what you have to spend.
          Enjoy a refreshingly simple way to manage your money – without invasive trackers,
          annoying ads, or bloated features. Just you, your spouse, and peace of mind.
        </p>

        <div
          data-hero-fade
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <AppStoreBadge />
          <Button variant="outline" size="lg" asChild>
            <Link href="#how">See how it works</Link>
          </Button>
        </div>

        <p data-hero-fade className="mt-6 text-sm text-faint">
          Free to use · No account required to look around
        </p>
      </div>

      <a
        href="#how"
        data-hero-fade
        aria-label="Scroll to see how it works"
        className="absolute bottom-8 left-1/2 z-10 grid size-11 -translate-x-1/2 place-items-center rounded-full border border-line bg-card/60 text-dim backdrop-blur-sm transition-colors hover:text-ink"
      >
        <ArrowDown className="size-4" />
      </a>
    </section>
  );
}
