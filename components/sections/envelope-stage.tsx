"use client";

import { useGSAP } from "@gsap/react";
import dynamic from "next/dynamic";
import { useRef } from "react";

import { gsap } from "@/components/motion/gsap";
import {
  useHasWebGL,
  useMediaQuery,
} from "@/components/motion/use-media-query";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";
import { useTheme } from "@/components/theme/theme";

const EnvelopeField = dynamic(
  () => import("@/components/three/envelope-field"),
  { ssr: false, loading: () => null },
);

/**
 * One WebGL context for the whole opening movement.
 *
 * The canvas is sticky inside a wrapper that spans both the hero and the
 * assembly act, and the content is pulled back over it. So the envelopes drift
 * behind the headline, assemble into their grid as the act scrolls past, and
 * leave with the wrapper — without ever mounting a second renderer.
 *
 * ScrollTrigger writes progress into a ref that the render loop reads, so
 * scrolling never causes a React re-render.
 */
export function EnvelopeStage({
  children,
  actRef,
}: {
  children: React.ReactNode;
  /** The section whose scroll drives assembly. */
  actRef: React.RefObject<HTMLElement | null>;
}) {
  const progress = useRef(0);
  const canvasRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const enabled = useHasWebGL();
  const narrow = useMediaQuery("(max-width: 767px)");
  // The theme actually on screen, so the scene follows the nav toggle and
  // not just the operating system.
  const theme = useTheme();

  useGSAP(
    () => {
      if (!enabled) return;

      // Reduced motion: show the resolved grid and never touch it again.
      if (reduced) {
        progress.current = 1;
        return;
      }

      const act = actRef.current;
      if (!act) return;

      const assemble = gsap.to(progress, {
        current: 1,
        ease: "none",
        scrollTrigger: {
          trigger: act,
          start: "top bottom",
          end: "center center",
          scrub: 0.6,
        },
      });

      // Fade the field out as the act hands off to the rest of the page.
      const fade = gsap.fromTo(
        canvasRef.current,
        { opacity: 1 },
        {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: act,
            start: "bottom 80%",
            end: "bottom 30%",
            scrub: true,
          },
        },
      );

      return () => {
        assemble.scrollTrigger?.kill();
        assemble.kill();
        fade.scrollTrigger?.kill();
        fade.kill();
      };
    },
    { dependencies: [enabled, reduced, actRef] },
  );

  return (
    <div className="relative">
      <div
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none sticky top-0 -z-10 h-svh w-full"
      >
        {enabled ? (
          <EnvelopeField
            progress={progress}
            count={narrow ? 12 : 24}
            columns={narrow ? 3 : 6}
            theme={theme}
            className="size-full"
          />
        ) : null}
      </div>

      {/* Pull the content back over the sticky canvas. */}
      <div className="-mt-[100svh]">{children}</div>
    </div>
  );
}
