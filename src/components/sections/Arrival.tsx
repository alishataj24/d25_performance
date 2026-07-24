"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { HighQualityImage } from "@/components/ui/HighQualityImage";
import { useHeroExperience } from "@/components/providers/HeroExperienceProvider";
import { HERO_COPY } from "@/lib/constants";
import { ASSETS } from "@/lib/assets";
import { ease } from "@/lib/animations";
import { cn } from "@/lib/utils";

/** Desktop — all creatives same size as original sports banners (1024×460) */
const DESKTOP_SLIDES = [
  {
    src: ASSETS.slider.desk1,
    alt: "District 25 — Less scroll time. More goal time.",
  },
  {
    src: ASSETS.slider.desk2,
    alt: "District 25 Phase 3 — The next chapter of luxury begins. Elevation.",
  },
  {
    src: ASSETS.slider.desk3,
    alt: "District 25 — Bengaluru's biggest sports address",
  },
  {
    src: ASSETS.slider.desk4,
    alt: "District 25 Phase 3 — The next chapter of luxury begins. Interiors.",
  },
] as const;

/** Mobile — all creatives same 682×1024 frame */
const MOBILE_SLIDES = [
  {
    src: ASSETS.slider.mob1,
    alt: "District 25 — Less scroll time. More goal time. Sports District Phase 3.",
  },
  {
    src: ASSETS.slider.mob2,
    alt: "District 25 Phase 3 — Interior-focused. The next chapter of luxury begins.",
  },
  {
    src: ASSETS.slider.mob3,
    alt: "District 25 — Bengaluru's biggest sports address. Soho Life Phase 3.",
  },
] as const;

const INTERVAL_MS = 5000;

/** Shared frames — same size for every slide */
const DESKTOP_ASPECT = "1024 / 460";
const MOBILE_ASPECT = "682 / 1024";

function ArrowIcon({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {dir === "prev" ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
    </svg>
  );
}

function MobileVerticalBanner({
  revealActive,
  reduceMotion,
}: {
  revealActive: boolean;
  reduceMotion: boolean | null;
}) {
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const slide = MOBILE_SLIDES[index];

  const go = useCallback((dir: -1 | 1) => {
    setIndex((i) => (i + dir + MOBILE_SLIDES.length) % MOBILE_SLIDES.length);
  }, []);

  useEffect(() => {
    if (!revealActive || reduceMotion || MOBILE_SLIDES.length <= 1) return;
    const timer = setInterval(() => go(1), INTERVAL_MS);
    return () => clearInterval(timer);
  }, [revealActive, reduceMotion, go, index]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current == null) return;
    const dx = (e.changedTouches[0]?.clientX ?? touchX.current) - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < 48) return;
    go(dx < 0 ? 1 : -1);
  };

  return (
    <div
      className="relative w-full overflow-hidden bg-[#f7f4ef] md:hidden"
      style={{
        aspectRatio: MOBILE_ASPECT,
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.src}
          initial={{ opacity: 0 }}
          animate={{ opacity: revealActive ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: ease.cinematic }}
          className="absolute inset-0"
        >
          <HighQualityImage
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            unoptimized
            sizes="100vw"
            // contain — full creative (incl. awards) always visible; no bottom crop
            className="!object-contain !object-top"
            style={{ objectFit: "contain", objectPosition: "top center" }}
          />
        </motion.div>
      </AnimatePresence>

      {MOBILE_SLIDES.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous banner"
            onClick={() => go(-1)}
            className="absolute left-2 top-[42%] z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-charcoal/15 bg-ivory/80 text-charcoal shadow-sm backdrop-blur-sm"
          >
            <ArrowIcon dir="prev" />
          </button>
          <button
            type="button"
            aria-label="Next banner"
            onClick={() => go(1)}
            className="absolute right-2 top-[42%] z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-charcoal/15 bg-ivory/80 text-charcoal shadow-sm backdrop-blur-sm"
          >
            <ArrowIcon dir="next" />
          </button>

          {/* Above award trophies so labels stay fully readable */}
          <div className="absolute bottom-[14%] left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
            {MOBILE_SLIDES.map((s, i) => (
              <button
                key={s.src}
                type="button"
                aria-label={`Show slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === index ? "w-5 bg-bronze" : "w-1.5 bg-charcoal/25"
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function DesktopLandscapeBanner({
  revealActive,
  reduceMotion,
}: {
  revealActive: boolean;
  reduceMotion: boolean | null;
}) {
  const [slideIndex, setSlideIndex] = useState(0);
  const slide = DESKTOP_SLIDES[slideIndex];

  useEffect(() => {
    if (!revealActive || reduceMotion || DESKTOP_SLIDES.length <= 1) return;
    const timer = setInterval(() => {
      setSlideIndex((i) => (i + 1) % DESKTOP_SLIDES.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [revealActive, reduceMotion]);

  return (
    <div
      className="relative hidden w-full overflow-hidden bg-[#141414] md:block"
      style={{
        aspectRatio: DESKTOP_ASPECT,
        maxHeight: "100dvh",
      }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: revealActive ? 1 : 0 }}
        transition={{ duration: 1.2, ease: ease.cinematic, delay: 0.1 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: ease.cinematic }}
            className="absolute inset-0"
          >
            <HighQualityImage
              src={slide.src}
              alt={slide.alt}
              fill
              priority={slideIndex === 0}
              unoptimized
              sizes="100vw"
              className="!object-cover !object-center"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export function Arrival() {
  const reduceMotion = useReducedMotion();
  const { loadingComplete } = useHeroExperience();
  const revealActive = loadingComplete || Boolean(reduceMotion);

  return (
    <section
      id="home"
      className="relative isolate z-0 w-full overflow-hidden bg-[#141414]"
      aria-label="District 25 — hero"
    >
      <h1 className="sr-only">
        {HERO_COPY.headline} {HERO_COPY.headlineAccent}
      </h1>

      <MobileVerticalBanner revealActive={revealActive} reduceMotion={reduceMotion} />
      <DesktopLandscapeBanner revealActive={revealActive} reduceMotion={reduceMotion} />
    </section>
  );
}
