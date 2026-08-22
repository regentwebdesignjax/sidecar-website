import type { Metadata } from "next";

import { Reveal } from "@/components/motion/reveal";
import { SplitHeadline } from "@/components/motion/split-headline";
import { AppStoreBadge } from "@/components/site/app-store-badge";
import { Hero10 } from "@/components/ui/hero-10";
import { features, screenshots } from "@/lib/features";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Envelopes, automatic paycheck splitting, scheduled bills, split purchases, a readable ledger, and reports — with no bank connection and no tracking.",
};

export default function FeaturesPage() {
  return (
    <>
      <Hero10
        title="Everything it does."
        titleLine2Prefix="And nothing"
        titleHighlight="it doesn't."
        description="Sidecar is deliberately small. Every screen below earns its place, and there is no sixth tab hiding a feature you'll never use."
        socialProof="Free · No bank connection · No trackers"
        images={[
          "/device/envelopes.webp",
          "/device/home.webp",
          "/device/reports.webp",
        ]}
        imageAlts={[
          "The Envelopes screen",
          "The Home screen",
          "The Reports screen",
        ]}
        primaryCTA={{ ctaEnabled: true, text: "See pricing", link: "/pricing" }}
        secondaryCTA={{
          ctaEnabled: true,
          text: "Read the privacy policy",
          link: "/privacy",
        }}
      />

      <section className="px-6 py-24 sm:py-32">
        <Reveal
          stagger
          className="mx-auto grid max-w-6xl gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2"
        >
          {features.map((feature) => (
            <div key={feature.id} className="bg-paper p-8 sm:p-10">
              <feature.icon
                className="size-6 text-accent"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <h2 className="mt-6 font-serif text-2xl leading-tight">
                {feature.title}
              </h2>
              <p className="mt-3 leading-relaxed text-dim">{feature.blurb}</p>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="bg-teal px-6 py-24 text-band-ink sm:py-32">
        <div className="mx-auto max-w-6xl">
          <SplitHeadline className="display max-w-2xl text-[clamp(2.25rem,5vw,3.5rem)] text-band-ink">
            Every screen,
            <br />
            <span className="text-sun italic">end to end.</span>
          </SplitHeadline>

          <Reveal
            stagger
            className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4"
          >
            {screenshots.map((shot) => (
              <figure key={shot.id}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={shot.src}
                  alt={`${shot.label} — ${shot.caption}`}
                  width={660}
                  height={1434}
                  loading="lazy"
                  decoding="async"
                  className="screen-radius w-full shadow-[0_24px_50px_-24px_rgba(2,16,15,0.8)]"
                />
                <figcaption className="mt-4 text-sm text-band-dim">
                  {shot.caption}
                </figcaption>
              </figure>
            ))}
          </Reveal>

          <div className="mt-16">
            <AppStoreBadge tone="onBand" />
          </div>
        </div>
      </section>
    </>
  );
}
