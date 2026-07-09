"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HighQualityImage } from "@/components/ui/HighQualityImage";
import { TextReveal } from "@/components/ui/TextReveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { LOCATION_HIGHLIGHTS, COPY, getChapter } from "@/lib/constants";
import { ease, duration } from "@/lib/animations";

const MAP_SRC =
  "https://maps.google.com/maps?q=Nambiar%20District%2025%20Dommasandra%20Bengaluru&t=&z=14&ie=UTF8&iwloc=&output=embed";

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Location() {
  const { location } = COPY;
  const chapter = getChapter("location")!;
  const [i, setI] = useState(0);
  const total = LOCATION_HIGHLIGHTS.length;
  const current = LOCATION_HIGHLIGHTS[i];

  const go = (step: number) => setI((prev) => (prev + step + total) % total);

  return (
    <SectionShell id="location" chapter={chapter} tone="light" innerClassName="!pt-6 md:!pt-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Left — headline + advantage carousel */}
        <div className="flex flex-col justify-between gap-10">
          <TextReveal
            as="h2"
            className="h-section max-w-[16ch] capitalize text-forest"
          >
            {location.headline}
          </TextReveal>

          <div>
            <p className="kicker mb-6 !text-bronze">Location Advantage</p>

            {/* Image stage */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[var(--radius-card-lg)] shadow-[var(--shadow-float)]">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={current.title}
                  initial={{ clipPath: "inset(0 0 0 100%)", opacity: 0.4 }}
                  animate={{ clipPath: "inset(0 0 0 0%)", opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: ease.cinematic }}
                  className="absolute inset-0"
                >
                  <HighQualityImage
                    src={current.image}
                    alt={current.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(10,18,14,0.72)_100%)]" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.title}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: duration.normal, ease: ease.out }}
                  className="absolute inset-x-0 bottom-0 p-7"
                >
                  <p className="text-[clamp(1.15rem,1.7vw,1.5rem)] font-light leading-tight text-ivory">
                    {current.title}
                  </p>
                  <p className="mt-1 text-[0.85rem] text-ivory/70">{current.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="mt-6 flex items-center gap-5">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous landmark"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-forest/25 text-forest transition-all duration-300 hover:border-bronze hover:bg-bronze hover:text-ivory cursor-pointer"
                >
                  <Arrow dir="left" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next landmark"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-forest/25 text-forest transition-all duration-300 hover:border-bronze hover:bg-bronze hover:text-ivory cursor-pointer"
                >
                  <Arrow dir="right" />
                </button>
              </div>

              <span className="text-caption tabular-nums tracking-[0.14em] text-grey-500">
                {String(i + 1).padStart(2, "0")}{" "}
                <span className="text-grey-400">/ {String(total).padStart(2, "0")}</span>
              </span>

              {/* Progress ticks */}
              <div className="ml-auto flex items-center gap-1.5">
                {LOCATION_HIGHLIGHTS.map((h, idx) => (
                  <button
                    key={h.title}
                    type="button"
                    onClick={() => setI(idx)}
                    aria-label={`Go to ${h.title}`}
                    className={`h-1 rounded-full transition-all duration-500 cursor-pointer ${
                      idx === i ? "w-7 bg-bronze" : "w-2 bg-forest/20 hover:bg-forest/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right — interactive map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: duration.slow, ease: ease.out }}
          className="relative min-h-[360px] overflow-hidden rounded-[var(--radius-card-lg)] border border-forest/10 shadow-[var(--shadow-float)] lg:min-h-full"
        >
          <iframe
            src={MAP_SRC}
            title="Nambiar District 25 — location map"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full grayscale-[0.15]"
            allowFullScreen
          />
        </motion.div>
      </div>
    </SectionShell>
  );
}
