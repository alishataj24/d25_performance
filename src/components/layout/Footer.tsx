"use client";

import { SITE, NAV_LINKS, VOICE } from "@/lib/constants";
import { useInquiry } from "@/components/providers/InquiryProvider";

export function Footer() {
  const { openInquiry } = useInquiry();
  const { cta } = VOICE;

  return (
    <footer className="bg-canvas-deep text-ivory">
      {/* Closing CTA band */}
      <div className="px-container pt-[var(--space-section)]">
        <div className="mx-frame">
          <div className="p-card p-card-dark relative overflow-hidden px-8 py-14 md:px-16 md:py-20 text-center">
            <span className="kicker kicker-center !text-champagne mb-6 justify-center">
              {VOICE.finalCta.eyebrow}
            </span>
            <h2 className="h-section mx-auto max-w-[18ch] text-ivory">
              {VOICE.finalCta.headline}
            </h2>
            <p className="mx-auto mt-7 max-w-[56ch] text-[clamp(1rem,1.35vw,1.18rem)] font-light leading-[1.8] text-ivory/72">
              {VOICE.finalCta.body}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button onClick={() => openInquiry("viewing")} className="btn-pill btn-gold">
                {cta.privateViewing}
              </button>
              <button onClick={() => openInquiry("enquire")} className="btn-pill btn-ghost-light">
                {cta.connect}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer grid */}
      <div className="section-padding px-container">
        <div className="mx-frame">
          <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <div className="lg:col-span-1">
              <p className="kicker !text-champagne mb-4">Nambiar</p>
              <h3 className="mb-6 text-[clamp(1.75rem,3vw,2.25rem)] font-light text-ivory">
                District<span className="text-gold">25</span>
              </h3>
              <p className="max-w-xs leading-relaxed text-ivory/60">{VOICE.footer.essence}</p>
            </div>

            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.22em] text-gold mb-6">Navigate</p>
              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-ivory/60 transition-colors duration-500 hover:text-gold"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.22em] text-gold mb-6">Contact</p>
              <div className="space-y-4 text-ivory/60">
                <div>
                  <p className="mb-1 text-[0.65rem] uppercase tracking-[0.18em] text-ivory/40">Site Address</p>
                  <p>{SITE.siteAddress}</p>
                </div>
                <div>
                  <p className="mb-1 text-[0.65rem] uppercase tracking-[0.18em] text-ivory/40">Corporate Address</p>
                  <p>{SITE.corporateAddress}</p>
                </div>
                <div>
                  <p className="mb-1 text-[0.65rem] uppercase tracking-[0.18em] text-ivory/40">Phone</p>
                  <a href={SITE.phoneHref} className="transition-colors hover:text-gold">
                    {SITE.phone}
                  </a>
                </div>
              </div>
            </div>

            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.22em] text-gold mb-6">Connect</p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => openInquiry("enquire")}
                  className="cursor-pointer text-left text-ivory/60 transition-colors hover:text-gold"
                >
                  {cta.connect}
                </button>
                <button
                  onClick={() => openInquiry("viewing")}
                  className="cursor-pointer text-left text-ivory/60 transition-colors hover:text-gold"
                >
                  {cta.privateViewing}
                </button>
                <a
                  href={SITE.brochure}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ivory/60 transition-colors hover:text-gold"
                >
                  {cta.collection}
                </a>
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ivory/60 transition-colors hover:text-gold"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start justify-between gap-4 border-t border-ivory/10 pt-8 md:flex-row md:items-center">
            <p className="text-xs text-ivory/40">RERA: {SITE.rera}</p>
            <p className="text-xs text-ivory/40">© 2026 Nambiar District 25. All rights reserved.</p>
          </div>

          <p className="mt-6 max-w-4xl text-[0.65rem] leading-relaxed text-ivory/30">
            All visuals are artistic impressions for representational purposes. Specifications,
            amenities, and surroundings are indicative and subject to change.
          </p>
        </div>
      </div>
    </footer>
  );
}
