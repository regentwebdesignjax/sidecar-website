"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";

import { gsap } from "@/components/motion/gsap";
import { SplitHeadline } from "@/components/motion/split-headline";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";

/** The Reports screen's own figures, so the site and the app agree. */
const ROWS = [
  { label: "Rent", amount: 1450, display: "$1,450.00" },
  { label: "Groceries", amount: 196.6, display: "$196.60" },
  { label: "Utilities", amount: 186, display: "$186.00" },
  { label: "Kids", amount: 80, display: "$80.00" },
  { label: "Gas & Transit", amount: 41.75, display: "$41.75" },
];

const MAX = ROWS[0].amount;

export function ReportsAct() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !root.current) return;

      const bars = root.current.querySelectorAll("[data-bar]");
      const tween = gsap.from(bars, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.09,
        scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section className="px-6 py-28 sm:py-36">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="eyebrow text-accent">Clear, Simple Reports</p>
          <SplitHeadline className="display mt-4 text-[clamp(2.25rem,5vw,3.5rem)]">
            You can finally see where
            <br />
            <span className="text-accent italic">your money goes.</span>
          </SplitHeadline>
          <p className="mt-7 text-lg leading-relaxed text-dim">
            With Sidecar’s simple reporting, you have the power to track 
            your spending habits over a week, a month, or look back over two years. 
            You'll clearly see what came in versus what went out, helping you and
            your spouse make smarter, more confident decisions for the future.
          </p>
        </div>

        <div
          ref={root}
          className="rounded-card border border-line bg-card p-7 shadow-[0_24px_60px_-30px_rgba(4,32,30,0.4)] sm:p-9"
        >
          <div className="flex items-baseline justify-between">
            <p className="eyebrow text-faint">Spent · last 30 days</p>
            <p className="text-sm text-faint">vs previous</p>
          </div>
          <p className="figure mt-3 text-5xl">$2,004.34</p>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-line p-4">
              <p className="text-sm text-dim">Money in</p>
              <p className="figure mt-1 text-2xl text-pos">$1,620.00</p>
            </div>
            <div className="rounded-lg border border-line p-4">
              <p className="text-sm text-dim">Net</p>
              <p className="figure mt-1 text-2xl text-neg">&minus;$384.34</p>
            </div>
          </div>

          <p className="mt-8 font-semibold">Where it went</p>
          <ul className="mt-4 space-y-4">
            {ROWS.map((row) => (
              <li key={row.label}>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-sm">{row.label}</span>
                  <span className="figure text-sm">{row.display}</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
                  <div
                    data-bar
                    className="h-full rounded-full bg-teal"
                    style={{ width: `${(row.amount / MAX) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
