import { Landmark, EyeOff, Megaphone, Trash2 } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SplitHeadline } from "@/components/motion/split-headline";

const POINTS = [
  {
    icon: Landmark,
    title: "No bank connection",
    body: "Nothing imported, nothing synced, and we never ask for banking credentials.",
  },
  {
    icon: EyeOff,
    title: "No analytics, no trackers",
    body: "No advertising SDK, no third-party trackers, no advertising identifier.",
  },
  {
    icon: Megaphone,
    title: "No ads, ever",
    body: "Nothing in the app is trying to sell you something else.",
  },
  {
    icon: Trash2,
    title: "Delete it all, any time",
    body: "Export to CSV and delete your account from Settings. It goes immediately.",
  },
];

/**
 * The trust band. Sidecar's sharpest differentiator is what it refuses to do,
 * so it gets a full-width teal statement rather than a row of feature cards.
 */
export function TrustBand() {
  return (
    <section className="bg-teal px-6 py-28 text-band-ink sm:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="eyebrow text-band-dim">The part nobody else advertises</p>
          <SplitHeadline className="display mt-4 text-[clamp(2.25rem,5.5vw,4rem)] text-band-ink">
            We never see
            <br />
            <span className="text-sun italic">your bank.</span>
          </SplitHeadline>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-band-dim">
            Every figure in Sidecar is one you typed. That takes a few seconds a
            day — and in exchange, your financial life isn&apos;t sitting in one
            more third party&apos;s database.
          </p>
        </div>

        <Reveal
          stagger
          className="mt-16 grid gap-px overflow-hidden rounded-card border border-band-line bg-band-line sm:grid-cols-2 lg:grid-cols-4"
        >
          {POINTS.map((point) => (
            <div key={point.title} className="bg-teal p-7">
              <point.icon className="size-6 text-sun" strokeWidth={1.5} />
              <h3 className="mt-5 font-semibold">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-band-dim">
                {point.body}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
