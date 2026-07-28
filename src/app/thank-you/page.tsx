import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { HighQualityImage } from "@/components/ui/HighQualityImage";
import { BrochureTrigger } from "@/components/ui/BrochureTrigger";
import { ASSETS } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Thank You | Nambiar District 25",
  description: "Thank you for your interest in Nambiar District 25.",
};

export default function ThankYouPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-canvas-deep px-6 text-center text-ivory">
      <Suspense fallback={null}>
        <BrochureTrigger />
      </Suspense>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_20%,rgba(122,92,50,0.12),transparent_65%)]" />

      <div className="relative z-[1] flex flex-col items-center">
        <HighQualityImage
          src={ASSETS.logo}
          alt="Nambiar District 25"
          width={723}
          height={266}
          unoptimized
          priority
          className="mb-10 h-14 w-auto object-contain opacity-95 brightness-0 invert md:h-16"
        />

        <span className="bronze-line mb-8 w-12" />

        <h1 className="h-section max-w-[20ch] text-ivory">
          Thank you for your interest.
        </h1>

        <p className="mt-6 max-w-[52ch] text-body leading-relaxed text-ivory/70">
          Our advisor will reach out to you shortly. We look forward to welcoming
          you to Nambiar District 25 — where you can live the SOHO Life.
        </p>

        <Link href="/" className="btn-pill btn-gold mt-10">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
