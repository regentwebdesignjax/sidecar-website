import type { Metadata } from "next";

import { Reveal } from "@/components/motion/reveal";
import { SplitHeadline } from "@/components/motion/split-headline";
import { AppStoreBadge } from "@/components/site/app-store-badge";
import { Hero10 } from "@/components/ui/hero-10";
import { siteConfig } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "About",
  description:
    "Sidecar was built by a husband and wife who were tired of budgeting apps bloated with features they didn't need & unwanted third-party ads.",
};

const PRINCIPLES = [
  {
    title: "Simple for a reason",
    body: "Just five tabs, that's it – Home, Envelopes, Activity & Reports. Each one relevant to the fundamentals of running a simple budget, and keeping it simple.",
  },
  {
    title: "Respect for your privacy",
    body: "Manual entry isn't a limitation we haven't got round to fixing — it's the whole point. No bank credentials required and no third-party integration holding your financial history.",
  },
  {
    title: "Two people, one shared budget",
    body: "Money in a household is a shared responsibility. Sidecar assumes there are two of you from the start rather than treating sharing as an upgrade.",
  },
  {
    title: "Nothing to sell",
    body: "No ads, no analytics, no trackers. It's just a simple budgeting app, and we'd like to keep it that way.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Hero10
        title="We built it for"
        titleLine2Prefix="our own"
        titleHighlight="kitchen table."
        description="Sidecar started as two people trying to run a household budget without fighting the software first."
        images={["/device/home.webp", "/device/envelopes.webp", "/device/activity.webp"]}
        imageAlts={["The Home screen", "The Envelopes screen", "The Activity ledger"]}
        variant="compact"
      />

      {/* EDIT ME — founder story. Written from Brandon's notes; every fact here
          traces to them. Reword freely, but don't add specifics we can't stand
          behind (dates, locations, named competitors). */}
      <section className="px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow text-accent">Why Sidecar exists</p>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-ink/85">
            <p>
              My wife and I tried a lot of budgeting apps. Most of them were
              bloated with features and unwanted third-party ads that simply got in the way.
              The ones that weren't had the opposite problem — we had to
              bend our budget around how the app wanted to work, instead of the
              app fitting how we actually ran our money.
            </p>
            <p>
              What we wanted was smaller than any of it, and simpler. Somewhere to put each
              dollar before we spent it. A number we could both look at. The
              ability to log a shopping trip from the checkout line and have it show up
              on the other person's phone before we could say, "Honey, I'm home!"
            </p>
            <p>
              That's the mission of Sidecar. It isn't trying to be your bank,
              your accountant, or your financial advisor. It keeps the
              arithmetic straight for two people sharing one budget, and then it
              gets out of the way. We hope it serves you and your family well.
            </p>
          </div>

          <Reveal className="mt-14 border-l-2 border-accent pl-8">
            <p className="font-serif text-3xl leading-snug text-balance">
              Sidecar is a response to a need couples everywhere have — a
              simple, unbloated budget you can both keep, from your phones, in
              real time.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-8">
        <Reveal className="mx-auto max-w-6xl overflow-hidden rounded-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/couple-working-on-budget-2.webp"
            alt="Two people working through a household budget together"
            width={1600}
            height={900}
            loading="lazy"
            decoding="async"
            className="aspect-21/9 w-full object-cover"
          />
        </Reveal>
      </section>

      <section className="px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <SplitHeadline className="display max-w-2xl text-[clamp(2.25rem,5vw,3.5rem)]">
            What we built,
            <br />
            <span className="text-accent italic">and what we didn't.</span>
          </SplitHeadline>

          <Reveal
            stagger
            className="mt-16 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2"
          >
            {PRINCIPLES.map((principle) => (
              <div key={principle.title} className="bg-paper p-8 sm:p-10">
                <h2 className="font-serif text-2xl">{principle.title}</h2>
                <p className="mt-3 leading-relaxed text-dim">
                  {principle.body}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="bg-teal px-6 py-24 text-band-ink sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <SplitHeadline className="display text-[clamp(2.25rem,5vw,3.5rem)] text-band-ink">
            Made with ❤ by {siteConfig.legal.entityShort}.
          </SplitHeadline>
          <p className="mt-6 text-band-dim">
            Questions, bug reports, or feature requests go straight to us at{" "}
            <a
              href={`mailto:${siteConfig.legal.email}`}
              className="text-sun underline underline-offset-4"
            >
              {siteConfig.legal.email}
            </a>
            .
          </p>
          <div className="mt-10 flex justify-center">
            <AppStoreBadge tone="onBand" />
          </div>
        </div>
      </section>
    </>
  );
}
