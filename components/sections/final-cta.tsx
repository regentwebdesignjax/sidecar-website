import { SplitHeadline } from "@/components/motion/split-headline";
import { AppStoreBadge } from "@/components/site/app-store-badge";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-teal px-6 py-28 text-band-ink sm:py-36">
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <SplitHeadline className="display text-[clamp(2.5rem,6vw,4.5rem)] text-band-ink">
            Stop guessing. Start living.
            <br />
            <span className="text-sun italic">what&apos;s left.</span>
          </SplitHeadline>
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-band-dim">
            Now you can give every single dollar a purpose before you spend it. 
            Join the couples who are transforming their finances with a tool 
            that's free, completely private, and built just for you.
          </p>
          <div className="mt-10">
            <AppStoreBadge tone="onBand" />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xs">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/device/home.webp"
            alt="The Sidecar home screen showing total on hand and envelope balances"
            width={660}
            height={1434}
            loading="lazy"
            decoding="async"
            className="screen-radius w-full shadow-[0_40px_80px_-30px_rgba(2,16,15,0.7)]"
          />
        </div>
      </div>
    </section>
  );
}
