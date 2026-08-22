"use client";

import { useRef } from "react";

import { BuiltForTwo } from "@/components/sections/built-for-two";
import { CarouselSection } from "@/components/sections/carousel-section";
import { EnvelopeAct } from "@/components/sections/envelope-act";
import { EnvelopeStage } from "@/components/sections/envelope-stage";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { PricingTeaser } from "@/components/sections/pricing-teaser";
import { ReportsAct } from "@/components/sections/reports-act";
import { TrustBand } from "@/components/sections/trust-band";

export default function HomePage() {
  const actRef = useRef<HTMLElement>(null);

  return (
    <>
      <EnvelopeStage actRef={actRef}>
        <Hero />
        <EnvelopeAct ref={actRef} />
      </EnvelopeStage>

      <CarouselSection />
      <TrustBand />
      <BuiltForTwo />
      <ReportsAct />
      <PricingTeaser />
      <FinalCta />
    </>
  );
}
