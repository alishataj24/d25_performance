"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HighQualityImage } from "@/components/ui/HighQualityImage";
import { EditorialList } from "@/components/ui/EditorialList";
import { StopLayer } from "@/components/chapters/SportJourneyStop";
import { SPORT_JOURNEY_STOPS } from "@/lib/narrative-journey";
import { AMENITIES, SPORTS, COPY, getChapter } from "@/lib/constants";
import { ASSETS } from "@/lib/assets";

const IMAGE_MAP = {
  seaImg: ASSETS.seaImg,
  sliderWeb1: ASSETS.slider.web1,
  sliderWeb2: ASSETS.slider.web2,
  gallery0: ASSETS.renders.aerial,
  gallery2: ASSETS.gallery[1],
  gallery3: ASSETS.gallery[2],
  gallery4: ASSETS.gallery[3],
  heroTowers: ASSETS.heroTowers,
} as const;

export function SportJourney() {
  const ref = useRef<HTMLElement>(null);
  const stops = SPORT_JOURNEY_STOPS;
  const stopCount = stops.length;
  const { sports, nature, clubhouse } = COPY;
  const chapter = getChapter("sports-district")!;
  const chapterLabel = chapter.title;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const mapMorph = useTransform(scrollYProgress, [0.88, 1], [0, 1]);
  const mapScale = useTransform(scrollYProgress, [0.88, 1], [1.2, 1]);

  return (
    <section
      id="amenities"
      ref={ref}
      className="relative bg-charcoal"
      style={{ height: `${(stopCount + 2) * 100}vh` }}
      aria-label="Life Around Sport"
    >
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        {stops.map((stop, i) => (
          <StopLayer
            key={stop.id}
            stop={stop}
            index={i}
            stopCount={stopCount}
            scrollYProgress={scrollYProgress}
            chapterLabel={chapterLabel}
            imageSrc={IMAGE_MAP[stop.imageKey]}
          />
        ))}

        <motion.div
          style={{ opacity: mapMorph, scale: mapScale }}
          className="absolute inset-0 origin-center"
        >
          <HighQualityImage
            src={ASSETS.locationMap}
            alt="Master plan"
            fill
            unoptimized
            className="object-contain p-8 md:p-16 bg-ivory"
          />
        </motion.div>
      </div>

      <div className="relative z-10 bg-charcoal section-padding -mt-[20vh]">
        <div className="max-w-[1440px] mx-auto">
          <p className="text-colophon text-bronze/60 mb-6">{getChapter("amenities")!.title}</p>
          <h3 className="text-title text-ivory font-light mb-4">{COPY.amenities.headline}</h3>
          <p className="text-body text-ivory/50 mb-16 !max-w-2xl">{COPY.amenities.subheadline}</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
            <div>
              <p className="text-colophon text-ivory/40 mb-8">{sports.headline}</p>
              <EditorialList items={SPORTS} light columns={1} />
            </div>
            <div>
              <p className="text-colophon text-ivory/40 mb-8">{nature.headline}</p>
              <ul className="space-y-4">
                {nature.features.map((f) => (
                  <li key={f} className="text-body text-ivory/55 border-b border-ivory/8 pb-4">
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-colophon text-ivory/40 mb-10">The complete tapestry</p>
          <EditorialList items={AMENITIES} light columns={2} />

          <div className="mt-24 pt-16 border-t border-ivory/10 max-w-2xl">
            <p className="text-colophon text-bronze/60 mb-4">{getChapter("clubhouse")!.title}</p>
            <h4 className="text-title text-ivory font-light mb-4">{clubhouse.headline}</h4>
            <p className="text-body text-ivory/55 leading-[1.85]">{clubhouse.body}</p>
          </div>

          <div className="mt-16 max-w-2xl">
            <p className="text-colophon text-bronze/60 mb-4">{getChapter("architecture")!.title}</p>
            <h4 className="text-title text-ivory font-light mb-4">{COPY.architecture.headline}</h4>
            <p className="text-body text-ivory/55 leading-[1.85]">{COPY.architecture.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
