"use client";

import { useGSAP } from "@gsap/react";
import { forwardRef, useRef } from "react";

import { gsap } from "@/components/motion/gsap";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";

const STEPS = [
  {
    n: "01",
    title: "You decide where the money goes",
    body: "When your paycheck lands, you can instantly split it into the categories you care about. Set aside fixed amounts for bills and percentages for the rest–you're completely in the driver's seat.",
  },
  {
    n: "02",
    title: "Give every dollar a job",
    body: "From rent to groceries to gas and date nights, your digital envelopes hold exactly what you've set aside. Now you can easily see what you actually have, instead of guessing what's left until payday.",
  },
  {
    n: "03",
    title: "Spend with total confidence",
    body: "Standing at the checkout counter? Just open your envelope, and you'll know instantly if you're good to go. No more mental math, no more hoping for the best.",
  },
];

/**
 * The section that drives the envelope assembly. Text steps rise as the
 * envelopes behind them fall into an ordered grid.
 */
export const EnvelopeAct = forwardRef<HTMLElement>(function EnvelopeAct(
  _props,
  ref,
) {
  const inner = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !inner.current) return;

      const steps = inner.current.querySelectorAll("[data-step]");
      const tweens = Array.from(steps).map((step) =>
        gsap.from(step, {
          opacity: 0,
          y: 30,
          filter: "blur(5px)",
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: step, start: "top 82%", once: true },
        }),
      );

      return () => {
        tweens.forEach((t) => {
          t.scrollTrigger?.kill();
          t.kill();
        });
      };
    },
    { scope: inner, dependencies: [reduced] },
  );

  return (
    <section
      ref={ref}
      id="how"
      aria-labelledby="how-title"
      className="relative px-6 py-28 sm:py-36"
    >
      <div ref={inner} className="mx-auto max-w-6xl">
        <div className="paper-wash relative max-w-2xl">
          <p className="eyebrow text-accent">How it works</p>
          <h2
            id="how-title"
            className="display mt-4 text-[clamp(2.25rem,5.5vw,4rem)]"
          >
            Your money.
            <br />
            <span className="text-accent italic">Your rules.</span>
          </h2>
        </div>

        <ol className="mt-20 grid gap-14 sm:mt-28 md:grid-cols-3 md:gap-10">
          {STEPS.map((step) => (
            <li
              key={step.n}
              data-step
              className="rounded-card border border-line bg-card/70 p-7 backdrop-blur-md"
            >
              <span className="figure text-4xl text-accent/40">{step.n}</span>
              <h3 className="mt-4 font-serif text-2xl leading-tight">
                {step.title}
              </h3>
              <p className="mt-3 leading-relaxed text-dim">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
});
