"use client";

import { useRef } from "react";
import { TextReveal } from "@/components/ui/TextReveal";
import { PublicationImage } from "@/components/ui/PublicationImage";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { CraftRoomPanel } from "@/components/chapters/CraftRoomPanel";
import { CRAFT_ROOMS } from "@/lib/narrative-journey";
import { COPY, getChapter, PHASE_DETAILS, STATS, OVERVIEW_IMAGES } from "@/lib/constants";
import { ASSETS } from "@/lib/assets";
import { useScroll } from "framer-motion";

const ROOM_IMAGES = [
  ASSETS.config.creative2,
  ASSETS.config.creative3,
  ASSETS.config.conf3,
  ASSETS.config.creative1,
];

export function CraftsmanshipChapter() {
  const ref = useRef<HTMLElement>(null);
  const { specifications, construction } = COPY;
  const specChapter = getChapter("specifications")!;
  const buildChapter = getChapter("construction")!;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const statsBlock = (
    <ul className="mt-10 space-y-4 stat-editorial">
      {STATS.map((stat) => (
        <li key={stat.label}>
          <span className="stat-editorial-label">{stat.label}</span>
          <span className="stat-editorial-value">
            <AnimatedNumber value={stat.value} suffix={stat.suffix} />
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <section
      id="specifications"
      ref={ref}
      className="relative bg-ivory"
      style={{ height: `${(CRAFT_ROOMS.length + 1.2) * 100}vh` }}
    >
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <div className="absolute top-0 left-0 right-0 section-padding pt-24 z-10">
          <div className="max-w-[1440px] mx-auto">
            <p className="text-colophon text-stone-dark mb-4">
              {specChapter.number} — {specChapter.title}
            </p>
            <TextReveal as="h2" className="text-masthead text-forest font-light">
              {specifications.headline}
            </TextReveal>
          </div>
        </div>

        {CRAFT_ROOMS.map((room, i) => (
          <CraftRoomPanel
            key={room.id}
            room={room}
            index={i}
            total={CRAFT_ROOMS.length}
            scrollYProgress={scrollYProgress}
            imageSrc={ROOM_IMAGES[i]}
            showStats={i === 0 ? statsBlock : undefined}
          />
        ))}
      </div>

      <div className="relative z-10 bg-ivory section-padding -mt-[25vh]" id="construction">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <p className="text-colophon text-stone-dark mb-6">
              {buildChapter.number} — {buildChapter.title}
            </p>
            <h3 className="text-title text-forest font-light mb-6">{construction.headline}</h3>
            <p className="text-editorial text-forest mb-6">{construction.subheadline}</p>
            <p className="text-body text-grey-600 leading-[1.85] mb-10">{construction.body}</p>
            <ul className="space-y-5">
              {PHASE_DETAILS.towerSpecs.map((spec, idx) => (
                <li key={spec} className="flex gap-6 text-body text-grey-600">
                  <span className="text-colophon text-stone-dark">{String(idx + 1).padStart(2, "0")}</span>
                  {spec}
                </li>
              ))}
            </ul>
            <p className="text-colophon text-grey-400 mt-10">{construction.artisticNote}</p>
          </div>
          <PublicationImage src={OVERVIEW_IMAGES[1]} alt="Construction quality" aspect="tall" sizes="45vw" />
        </div>
        <p className="text-body text-grey-500 mt-16 max-w-2xl text-sm leading-relaxed">
          {COPY.legal.disclaimer}
        </p>
      </div>
    </section>
  );
}
