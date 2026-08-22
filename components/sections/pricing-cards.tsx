"use client";

import { Check } from "lucide-react";
import { useState } from "react";

import { AppStoreBadge } from "@/components/site/app-store-badge";
import { plans, grandfatherNote } from "@/lib/pricing";
import { cn } from "@/lib/utils";

export function PricingCards() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex justify-center">
        <div
          role="group"
          aria-label="Billing period"
          className="inline-flex rounded-full border border-line bg-card p-1"
        >
          {(["monthly", "annual"] as const).map((period) => {
            const isAnnual = period === "annual";
            const active = annual === isAnnual;
            return (
              <button
                key={period}
                type="button"
                aria-pressed={active}
                onClick={() => setAnnual(isAnnual)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium capitalize transition-colors",
                  active ? "bg-teal text-sun" : "text-dim hover:text-ink",
                )}
              >
                {period}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {plans.map((plan) => {
          const price = plan.price
            ? annual
              ? plan.price.annual
              : plan.price.monthly
            : null;
          const isFree = plan.id === "free";

          return (
            <div
              key={plan.id}
              className={cn(
                "flex flex-col rounded-card border p-8 sm:p-10",
                isFree
                  ? "border-teal/25 bg-card shadow-[0_24px_60px_-32px_rgba(4,32,30,0.45)]"
                  : "border-line bg-transparent",
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="font-serif text-3xl">{plan.name}</h2>
                {plan.badge && (
                  <span className="eyebrow rounded-full border border-line px-3 py-1.5 text-faint">
                    {plan.badge}
                  </span>
                )}
              </div>

              <p className="mt-3 text-dim">{plan.tagline}</p>

              <p className="mt-8 flex items-baseline gap-2">
                <span className="figure text-6xl">{price}</span>
                {!isFree && (
                  <span className="text-dim">
                    {annual ? "per year" : "per month"}
                  </span>
                )}
              </p>
              {!isFree && annual && plan.annualNote && (
                <p className="mt-2 text-sm text-pos">{plan.annualNote}</p>
              )}
              {isFree && (
                <p className="mt-2 text-sm text-dim">
                  Forever. No trial, no card.
                </p>
              )}

              <ul className="mt-9 space-y-3.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <Check
                      className={cn(
                        "mt-0.5 size-5 shrink-0",
                        isFree ? "text-pos" : "text-faint",
                      )}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    <span
                      className={cn("text-sm", isFree ? "text-ink" : "text-dim")}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 pt-2">
                {isFree ? (
                  <AppStoreBadge />
                ) : (
                  <p className="rounded-lg border border-line bg-card/50 p-4 text-sm leading-relaxed text-dim">
                    {grandfatherNote}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
