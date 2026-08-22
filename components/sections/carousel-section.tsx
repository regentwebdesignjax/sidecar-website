import { SplitHeadline } from "@/components/motion/split-headline";
import { FeatureCarousel } from "@/components/ui/feature-carousel";

export function CarouselSection() {
  return (
    <section className="px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl text-center">
        <p className="eyebrow text-accent">Inside the app</p>
        <SplitHeadline className="display mx-auto mt-4 max-w-3xl text-[clamp(2.25rem,5.5vw,4rem)]">
          Seven screens. No clutter.
        </SplitHeadline>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-dim">
          Everything Sidecar does, and nothing it doesn&apos;t.
        </p>
      </div>

      <div className="mt-16">
        <FeatureCarousel />
      </div>
    </section>
  );
}
