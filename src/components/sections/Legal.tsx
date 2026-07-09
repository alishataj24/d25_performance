"use client";

import { TextReveal } from "@/components/ui/TextReveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { COPY, getChapter, SITE } from "@/lib/constants";

export function Legal() {
  const { legal, location } = COPY;
  const chapter = getChapter("legal")!;

  return (
    <SectionShell id="legal" chapter={chapter} tone="light" className="!pb-24">
      <TextReveal as="h2" className="h-section text-forest mb-12">
        {legal.headline}
      </TextReveal>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 max-w-4xl">
        <div className="space-y-8">
          <div>
            <p className="text-caption text-gold-muted mb-3 tracking-[0.15em]">{location.reraLabel}</p>
            <p className="text-body text-forest leading-relaxed">RERA: {SITE.rera}</p>
          </div>
          <div>
            <p className="text-caption text-gold-muted mb-3 tracking-[0.15em]">{location.phoneLabel}</p>
            <a href={SITE.phoneHref} className="text-body text-forest hover:text-gold transition-colors">
              {SITE.phone}
            </a>
          </div>
        </div>
        <div>
          <p className="text-body text-grey-600 leading-[1.85] mb-8">{legal.disclaimer}</p>
          <p className="text-caption text-grey-400 tracking-[0.1em]">{legal.copyright}</p>
        </div>
      </div>
    </SectionShell>
  );
}
