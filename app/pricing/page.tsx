import type { Metadata } from "next";
import { Check, Minus } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SplitHeadline } from "@/components/motion/split-headline";
import { PricingCards } from "@/components/sections/pricing-cards";
import { comparison, faqs } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Sidecar is free. Every feature works today with no trial and no card. Sidecar Plus is planned at $3.99 a month — and what you already use stays free.",
};

export default function PricingPage() {
  return (
    <>
      <section className="px-6 pt-36 pb-20 text-center sm:pt-44">
        <p className="eyebrow text-accent">Pricing</p>
        <SplitHeadline
          as="h1"
          immediate
          className="display mx-auto mt-5 max-w-4xl text-[clamp(2.75rem,8vw,5.5rem)]"
        >
          Free. Actually free.
        </SplitHeadline>
        <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-dim">
          No trial period, no card, no feature held hostage. Sidecar makes money
          from nothing today, and when it does, you&apos;ll know exactly how.
        </p>
      </section>

      <section className="px-6 pb-24">
        <PricingCards />
      </section>

      {/* Comparison */}
      <section className="bg-teal px-6 py-24 text-band-ink sm:py-32">
        <div className="mx-auto max-w-5xl">
          <SplitHeadline className="display max-w-2xl text-[clamp(2.25rem,5vw,3.5rem)] text-band-ink">
            What you give up.
            <br />
            <span className="text-sun italic">What you get back.</span>
          </SplitHeadline>
          <p className="mt-6 max-w-xl text-band-dim">
            Sidecar asks you to type in your spending. Here is what that buys
            you, and where it costs you.
          </p>

          <div className="mt-14 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <caption className="sr-only">
                Sidecar compared with bank-linked budgeting apps
              </caption>
              <thead>
                <tr className="border-b border-band-line">
                  <th scope="col" className="py-4 pr-4 font-medium text-band-dim">
                    <span className="sr-only">Feature</span>
                  </th>
                  {comparison.columns.map((col) => (
                    <th
                      key={col}
                      scope="col"
                      className="py-4 pr-4 font-semibold text-band-ink"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((row) => (
                  <tr key={row.label} className="border-b border-band-line/60">
                    <th
                      scope="row"
                      className="py-5 pr-6 align-top font-normal text-band-dim"
                    >
                      {row.label}
                    </th>
                    <td className="py-5 pr-6 align-top">
                      <span className="flex items-start gap-2.5">
                        {row.sidecarGood ? (
                          <Check
                            className="mt-0.5 size-4 shrink-0 text-sun"
                            aria-hidden="true"
                          />
                        ) : (
                          <Minus
                            className="mt-0.5 size-4 shrink-0 text-band-dim"
                            aria-hidden="true"
                          />
                        )}
                        <span className="text-band-ink">{row.sidecar}</span>
                      </span>
                    </td>
                    <td className="py-5 pr-4 align-top text-band-dim">
                      {row.others}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl">
          <SplitHeadline className="display text-[clamp(2.25rem,5vw,3.5rem)]">
            Reasonable questions.
          </SplitHeadline>

          <Reveal stagger className="mt-14 divide-y divide-line border-y border-line">
            {faqs.map((faq) => (
              <details key={faq.q} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-xl">
                  {faq.q}
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-2xl text-faint transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl leading-relaxed text-dim">
                  {faq.a}
                </p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
