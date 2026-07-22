"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HighQualityImage } from "@/components/ui/HighQualityImage";
import { PublicationImage } from "@/components/ui/PublicationImage";
import { DescentLabel } from "@/components/chapters/DescentLabel";
import { LOCATION_DESCENT } from "@/lib/narrative-journey";
import {
  LOCATION_LANDMARKS,
  LOCATION_HIGHLIGHTS,
  SITE,
  COPY,
} from "@/lib/constants";
import { ASSETS } from "@/lib/assets";

/**
 * Chapter 7 — Location
 * Camera descends from region to address. Map appears only after context.
 */
export function LocationDescent() {
  const ref = useRef<HTMLElement>(null);
  const { location, connectivity } = COPY;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const descentOpacity = useTransform(scrollYProgress, [0, 0.35, 0.5], [1, 1, 0]);
  const mapOpacity = useTransform(scrollYProgress, [0.4, 0.6, 1], [0, 1, 1]);
  const mapY = useTransform(scrollYProgress, [0.4, 1], ["8%", "-4%"]);

  return (
    <section
      id="location"
      ref={ref}
      className="relative bg-charcoal text-ivory"
      style={{ height: "320vh" }}
    >
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        {/* Descent labels */}
        <motion.div
          style={{ opacity: descentOpacity }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative text-center h-full w-full">
            {LOCATION_DESCENT.map((step, i) => (
              <DescentLabel
                key={step.label}
                label={step.label}
                index={i}
                total={LOCATION_DESCENT.length}
                scale={step.scale}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </motion.div>

        {/* Map emerges */}
        <motion.div style={{ opacity: mapOpacity, y: mapY }} className="absolute inset-0 bg-ivory">
          <HighQualityImage
            src={ASSETS.locationMap}
            alt="Location map"
            fill
            unoptimized
            className="object-contain p-8 md:p-16"
          />
        </motion.div>
      </div>

      {/* Full location content */}
      <div className="relative z-10 bg-ivory text-forest section-padding -mt-[15vh]" id="connectivity">
        <div className="max-w-[1440px] mx-auto">
          <p className="text-colophon text-stone-dark mb-6">
            {location.headline}
          </p>
          <h2 className="text-masthead text-forest font-light mb-4 capitalize">{location.headline}</h2>
          <p className="text-title text-forest font-light mb-16">{location.subheadline}</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
            <div className="space-y-8">
              <div className="py-6 border-t border-b border-forest/10">
                <p className="text-colophon text-stone-dark mb-3">{location.siteLabel}</p>
                <p className="text-body leading-relaxed">{SITE.siteAddress}</p>
              </div>
              <div className="py-6 border-b border-forest/10">
                <p className="text-colophon text-stone-dark mb-3">{location.corporateLabel}</p>
                <p className="text-body leading-relaxed">{SITE.corporateAddress}</p>
              </div>
              <div className="py-6 border-b border-forest/10">
                <p className="text-colophon text-stone-dark mb-3">{location.reraLabel}</p>
                <p className="text-body">RERA: {SITE.rera}</p>
              </div>
              <div className="py-6 border-b border-forest/10">
                <p className="text-colophon text-stone-dark mb-3">{location.phoneLabel}</p>
                <a href={SITE.phoneHref} className="text-body hover:text-bronze transition-colors">
                  {SITE.phone}
                </a>
              </div>
            </div>
            <ul className="space-y-4">
              {LOCATION_LANDMARKS.map((landmark, i) => (
                <li key={landmark.name} className="flex gap-4 text-body text-grey-600">
                  <span className="text-colophon text-stone-dark w-8">{String(i + 1).padStart(2, "0")}</span>
                  {landmark.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="film-strip -mx-6 px-6 md:-mx-12 md:px-12 mb-24">
            {LOCATION_LANDMARKS.map((landmark) => (
              <article
                key={landmark.name}
                className="relative w-[55vw] md:w-[28vw] aspect-[4/5] overflow-hidden flex-shrink-0"
              >
                <HighQualityImage src={landmark.image} alt={landmark.name} fill sizes="28vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/90 to-transparent" />
                <p className="absolute bottom-0 p-6 text-colophon text-ivory/90">{landmark.name}</p>
              </article>
            ))}
          </div>

          <p className="text-colophon text-stone-dark mb-8">
            {connectivity.headline}
          </p>
          <h3 className="text-title text-forest font-light mb-16">{connectivity.headline}</h3>

          <div className="space-y-32">
            {LOCATION_HIGHLIGHTS.map((item, i) => (
              <article
                key={item.title}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-end ${
                  i % 2 === 1 ? "lg:[direction:rtl]" : ""
                }`}
              >
                <div className={`lg:col-span-5 ${i % 2 === 1 ? "lg:[direction:ltr]" : ""}`}>
                  <span className="text-colophon text-stone-dark block mb-6">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="text-title text-forest font-light mb-4">{item.title}</h4>
                  <p className="text-body text-grey-600 !max-w-none leading-[1.85]">{item.description}</p>
                </div>
                <div className={`lg:col-span-7 ${i % 2 === 1 ? "lg:[direction:ltr]" : ""}`}>
                  <PublicationImage src={item.image} alt={item.title} aspect="cinematic" sizes="55vw" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
