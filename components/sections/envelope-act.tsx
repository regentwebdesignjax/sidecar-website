"use client";

import { useGSAP } from "@gsap/react";
import { forwardRef, useRef } from "react";

import { gsap } from "@/components/motion/gsap";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";

const STEPS = [
  {
    n: "01",
    title: "Money comes in",
    body: "A paycheck lands. Instead of one balance you have to interpret, Sidecar splits it the way you decided once — fixed amounts for the bills that don't move, percentages for everything else.",
  },
  {
    n: "02",
    title: "Every dollar gets a job",
    body: "Rent, groceries, petrol, the school run. Each envelope holds a real number, and that number is what you have — not what's left in the account until the next bill clears.",
  },
  {
    n: "03",
    title: "You spend without guessing",
    body: "Standing in a shop, you open the envelope and the answer is already there. Nothing to reconcile, nothing to project, nothing to hope about.",
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
            Not one balance.
            <br />
            <span className="text-accent italic">A place for everything.</span>
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
