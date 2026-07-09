"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SceneDirector } from "@/components/ui/SceneDirector";
import { ease, duration, fadeUp, staggerContainer } from "@/lib/animations";

type Tour = {
  id: string;
  tag: string;
  title: string;
  sub: string;
};

const TOURS: Tour[] = [
  {
    id: "57d6t2MmMQs",
    tag: "3 BHK",
    title: "3 BHK Model Home",
    sub: "Model Home Walkthrough",
  },
  {
    id: "jh9K_vA1gmQ",
    tag: "4 BHK",
    title: "4 BHK Model Home",
    sub: "Model Home Walkthrough",
  },
];

function PlayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M8 5.5v13l11-6.5-11-6.5z" fill="currentColor" />
    </svg>
  );
}

function VideoCard({ tour }: { tour: Tour }) {
  const [playing, setPlaying] = useState(false);
  const [thumb, setThumb] = useState(
    `https://img.youtube.com/vi/${tour.id}/maxresdefault.jpg`,
  );

  return (
    <motion.div
      variants={fadeUp}
      className="group relative aspect-video w-full overflow-hidden rounded-[var(--radius-card-lg)] bg-black shadow-[var(--shadow-float)]"
    >
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${tour.id}?autoplay=1&rel=0&modestbranding=1`}
          title={tour.title}
          loading="lazy"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play ${tour.title}`}
          className="absolute inset-0 h-full w-full cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumb}
            onError={() =>
              setThumb(`https://img.youtube.com/vi/${tour.id}/hqdefault.jpg`)
            }
            alt={tour.title}
            className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,18,14,0.15)_0%,transparent_35%,rgba(10,18,14,0.72)_100%)]" />

          {/* Tag chip */}
          <span className="absolute left-5 top-5 rounded-full border border-ivory/25 bg-black/30 px-4 py-1.5 text-caption tracking-[0.16em] text-ivory/90 backdrop-blur-md">
            {tour.tag}
          </span>

          {/* Center play button */}
          <span className="absolute left-1/2 top-1/2 flex h-[68px] w-[68px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/95 text-forest shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-all duration-500 group-hover:scale-110 group-hover:bg-bronze group-hover:text-ivory">
            <span className="ml-0.5">
              <PlayIcon />
            </span>
          </span>

          {/* Caption */}
          <div className="absolute inset-x-0 bottom-0 p-6 text-left">
            <p className="text-[clamp(1.25rem,1.9vw,1.6rem)] font-light leading-tight text-ivory">
              {tour.title}
            </p>
            <p className="mt-1 text-[0.85rem] text-ivory/65">{tour.sub}</p>
          </div>
        </button>
      )}
    </motion.div>
  );
}

export function ModelHomes() {
  return (
    <section id="model-homes" className="relative bg-canvas-deep text-ivory overflow-hidden">
      <SceneDirector sceneId="gallery">
        <div className="section-padding px-container relative z-[1]">
          <div className="mx-frame">
            {/* Header */}
            <div className="mx-auto max-w-[820px] text-center">
              <span className="kicker kicker-center justify-center !text-champagne mb-6">
                Model Home Walkthroughs
              </span>
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: duration.slow, ease: ease.out }}
                className="h-section text-ivory"
              >
                Your Future Home Unveiled
              </motion.h2>
              <p className="mx-auto mt-7 max-w-[56ch] text-[clamp(1.02rem,1.35vw,1.18rem)] font-light leading-[1.8] text-ivory/65">
                Step inside the model residences — a cinematic walkthrough of the
                3 & 4 BHK homes at Nambiar District 25, Phase 3.
              </p>
            </div>

            {/* Video pair */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="mt-14 md:mt-16 grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2"
            >
              {TOURS.map((tour) => (
                <VideoCard key={tour.id} tour={tour} />
              ))}
            </motion.div>
          </div>
        </div>
      </SceneDirector>
    </section>
  );
}
