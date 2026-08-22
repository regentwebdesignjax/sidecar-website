"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import type { ElementType } from "react";

import { cn } from "@/lib/utils";

import { gsap, SplitText } from "./gsap";
import { useReducedMotion } from "./use-reduced-motion";

type SplitHeadlineProps = {
  children: React.ReactNode;
  as?: ElementType;
  className?: string;
  /** Play on mount instead of waiting for the element to scroll into view. */
  immediate?: boolean;
  delay?: number;
};

/**
 * Masked line-by-line reveal. Characters rise out of a clipped line box, which
 * reads far better on a serif display face than a plain fade.
 *
 * The markup renders visible by default and useGSAP sets the hidden from-state
 * in a layout effect, before paint. That way there is no flash, and no chance
 * of a headline that stays invisible because a tween never ran.
 */
export function SplitHeadline({
  children,
  as: Tag = "h2",
  className,
  immediate = false,
  delay = 0,
}: SplitHeadlineProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;

      const split = SplitText.create(ref.current, {
        type: "lines,chars",
        linesClass: "split-line",
        autoSplit: true,
      });

      const tween = gsap.from(split.chars, {
        yPercent: 108,
        duration: 0.9,
        ease: "power4.out",
        stagger: { each: 0.012, from: "start" },
        delay,
        scrollTrigger: immediate
          ? undefined
          : { trigger: ref.current, start: "top 85%", once: true },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        split.revert();
      };
    },
    { scope: ref, dependencies: [reduced, immediate, delay] },
  );

  // ElementType loses the intrinsic prop types across a union, so narrow it to
  // the three props this component actually forwards.
  const Component = Tag as React.ComponentType<{
    ref?: React.Ref<HTMLElement>;
    className?: string;
    children?: React.ReactNode;
  }>;

  return (
    <Component ref={ref} className={cn(className)}>
      {children}
    </Component>
  );
}
