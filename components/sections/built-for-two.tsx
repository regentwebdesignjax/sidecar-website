import { Reveal } from "@/components/motion/reveal";
import { SplitHeadline } from "@/components/motion/split-headline";

const BEATS = [
  "Both of you see the same numbers, updating live.",
  "Log a shop on the way home and it's on their phone before you are.",
  "Owners invite and remove; remove someone and their access ends immediately.",
];

export function BuiltForTwo() {
  return (
    <section className="px-6 py-28 sm:py-36">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/couple-working-on-budget.webp"
              alt="Two people going over a budget together at a kitchen table"
              width={1600}
              height={900}
              loading="lazy"
              decoding="async"
              className="aspect-4/3 w-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-teal/25 mix-blend-multiply"
            />
          </div>
        </Reveal>

        <div>
          <p className="eyebrow text-accent">Built for two</p>
          <SplitHeadline className="display mt-4 text-[clamp(2.25rem,5vw,3.5rem)]">
            One budget.
            <br />
            <span className="text-accent italic">Two phones.</span>
          </SplitHeadline>
          <p className="mt-7 text-lg leading-relaxed text-dim">
            Most budgets fail because only one person is keeping them. Share
            yours and the arithmetic stops being one person&apos;s job.
          </p>

          <Reveal stagger className="mt-9 space-y-4">
            {BEATS.map((beat) => (
              <div key={beat} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent"
                />
                <p className="leading-relaxed text-ink/85">{beat}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
