"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { FlythroughWaypointLayer } from "@/components/journey/FlythroughWaypointLayer";
import { WowMorph } from "@/components/journey/WowMorph";
import { EditorialList } from "@/components/ui/EditorialList";
import { useJourney } from "@/components/providers/JourneyProvider";
import { FLYTHROUGH_WAYPOINTS } from "@/lib/flythrough-journey";
import { AMENITIES, SPORTS, COPY, getChapter } from "@/lib/constants";
import { ASSETS } from "@/lib/assets";

const IMAGE_MAP = {
  entrance: ASSETS.slider.web2,
  football: ASSETS.seaImg,
  clubhouse: ASSETS.gallery[1],
  pool: ASSETS.gallery[2],
  park: ASSETS.renders.aerial,
  tower: ASSETS.heroTowers,
  apartment: ASSETS.config.creative2,
  skylounge: ASSETS.config.creative3,
  sunset: ASSETS.slider.web1,
  masterplan: ASSETS.locationMap,
} as const;

export function TownshipFlythrough() {
  const ref = useRef<HTMLElement>(null);
  const waypoints = FLYTHROUGH_WAYPOINTS;
  const count = waypoints.length;
  const { setFlythroughProgress, setInFlythrough } = useJourney();
  const { sports, nature, clubhouse } = COPY;
  const chapter = getChapter("sports-district")!;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setFlythroughProgress(v);
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInFlythrough(entry.isIntersecting),
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      setInFlythrough(false);
    };
  }, [setInFlythrough]);

  const cloudY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section
      id="flythrough-journey"
      ref={ref}
      className="relative bg-charcoal"
      style={{ height: `${(count + 1.2) * 100}vh` }}
      aria-label="Township flythrough"
    >
      <span id="amenities" className="sr-only" />

      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <motion.div
          style={{ y: cloudY }}
          className="absolute inset-0 pointer-events-none z-20 cloud-shadow"
          aria-hidden
        />

        {waypoints.map((wp, i) => (
          <FlythroughWaypointLayer
            key={wp.id}
            waypoint={wp}
            index={i}
            total={count}
            scrollYProgress={scrollYProgress}
            imageSrc={IMAGE_MAP[wp.imageKey]}
          />
        ))}

        <WowMorph scrollYProgress={scrollYProgress} />
        <FacadePeel scrollYProgress={scrollYProgress} />
      </div>

      <div className="relative z-10 bg-charcoal section-padding -mt-[15vh]">
        <div className="max-w-[1440px] mx-auto">
          <p className="text-colophon text-bronze/60 mb-6">
            {chapter.number} — {chapter.title}
          </p>
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

          <EditorialList items={AMENITIES} light columns={2} />

          <div className="mt-24 pt-16 border-t border-ivory/10 max-w-2xl">
            <h4 className="text-title text-ivory font-light mb-4">{clubhouse.headline}</h4>
            <p className="text-body text-ivory/55 leading-[1.85]">{clubhouse.body}</p>
          </div>

          <div className="mt-16 max-w-2xl">
            <h4 className="text-title text-ivory font-light mb-4">{COPY.architecture.headline}</h4>
            <p className="text-body text-ivory/55 leading-[1.85]">{COPY.architecture.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FacadePeel({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const peel = useTransform(scrollYProgress, [0.55, 0.72], [0, 1]);
  const peelWidth = useTransform(peel, [0, 1], ["100%", "0%"]);

  return (
    <motion.div
      style={{ width: peelWidth }}
      className="absolute top-0 right-0 bottom-0 z-[15] bg-gradient-to-l from-charcoal/90 to-transparent pointer-events-none"
      aria-hidden
    />
  );
}
