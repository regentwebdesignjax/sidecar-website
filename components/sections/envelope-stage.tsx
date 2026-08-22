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
      // Reduced motion: nothing here scrubs with scroll. The photo and, if
      // WebGL is available, the resolved envelope grid just sit there.
      if (reduced) {
        progress.current = 1;
        return;
      }

      const act = actRef.current;
      if (!act) return;

      // Only the envelope grid needs a canvas, so only create this when one
      // exists to animate.
      const assemble = enabled
        ? gsap.to(progress, {
            current: 1,
            ease: "none",
            scrollTrigger: {
              trigger: act,
              start: "top bottom",
              end: "center center",
              scrub: 0.6,
            },
          })
        : null;

      // Fade the whole layer — photo and envelopes together — as the act
      // hands off to the rest of the page. Independent of `enabled`, so the
      // background photo still fades out on its own schedule when there is no
      // WebGL to draw envelopes over it.
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
        assemble?.scrollTrigger?.kill();
        assemble?.kill();
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
        {/*
          One clip region for the whole stage, starting at the height of the
          nav bar. The nav is transparent until you scroll, so anything drawn
          under it makes the links hard to read — and the photo below is scaled
          well past its box, so clipping is the only thing that reliably keeps
          it out from behind the bar. Both layers fill this region.
        */}
        <div className="absolute inset-x-0 top-18 bottom-0 overflow-hidden">
          {/*
            Ambient texture behind the envelope field, not a photograph meant
            to be looked at directly. Rendered unconditionally, unlike the
            canvas below, so the hero still has some life when WebGL is
            unavailable and no envelopes draw at all.
          */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hand-holding-iphone.webp"
            alt=""
            className="hero-photo absolute inset-0 size-full object-cover object-center"
          />

          {enabled ? (
            <EnvelopeField
              progress={progress}
              count={narrow ? 12 : 24}
              columns={narrow ? 3 : 6}
              theme={theme}
              className="absolute inset-0 size-full"
            />
          ) : null}
        </div>
      </div>

      {/* Pull the content back over the sticky canvas. */}
      <div className="-mt-[100svh]">{children}</div>
    </div>
  );
}
