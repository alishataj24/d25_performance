"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HighQualityImage } from "@/components/ui/HighQualityImage";
import { TextReveal } from "@/components/ui/TextReveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { GALLERY_IMAGES, COPY, getChapter } from "@/lib/constants";
import { ease } from "@/lib/animations";

const ASPECTS = ["aspect-[3/4]", "aspect-[16/10]", "aspect-[4/5]", "aspect-[16/10]", "aspect-[3/4]", "aspect-[16/10]", "aspect-[4/5]", "aspect-[16/10]"];

function ScrollArrow({
  direction,
  onClick,
  visible,
}: {
  direction: "left" | "right";
  onClick: () => void;
  visible: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "left" ? "Scroll gallery left" : "Scroll gallery right"}
      className={`absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/20 bg-charcoal/85 text-ivory/80 shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-all duration-300 hover:border-bronze hover:bg-charcoal hover:text-ivory cursor-pointer ${
        direction === "left" ? "left-2 md:left-4" : "right-2 md:right-4"
      } ${visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d={direction === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);
  const { gallery } = COPY;
  const chapter = getChapter("gallery")!;

  const updateScrollState = useCallback(() => {
    const el = stripRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollStrip = (direction: "left" | "right") => {
    const el = stripRef.current;
    if (!el) return;
    const amount = Math.max(el.clientWidth * 0.72, 280);
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <SectionShell
      id="gallery"
      chapter={chapter}
      tone="charcoal"
      className="!overflow-visible"
      innerClassName="!pt-10 md:!pt-12"
    >
      <div className="mb-8 md:mb-10 max-w-4xl">
        <TextReveal as="h2" className="h-section text-ivory">
          {gallery.secondaryHeadline}
        </TextReveal>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
          <p className="text-body text-champagne">{gallery.tertiaryHeadline}</p>
          <span className="chip chip-dark shrink-0">{gallery.instruction}</span>
        </div>
      </div>

      <div className="relative mt-4">
        {canScrollLeft && (
          <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-12 bg-gradient-to-r from-charcoal to-transparent md:w-20" />
        )}
        {canScrollRight && (
          <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-12 bg-gradient-to-l from-charcoal to-transparent md:w-20" />
        )}

        <ScrollArrow direction="left" onClick={() => scrollStrip("left")} visible={canScrollLeft} />
        <ScrollArrow direction="right" onClick={() => scrollStrip("right")} visible={canScrollRight} />

        <div ref={stripRef} className="film-strip -mx-6 px-6 md:-mx-12 md:px-12">
          {GALLERY_IMAGES.map((src, i) => (
            <motion.button
              key={`${src}-${i}`}
              onClick={() => setSelected(i)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 1.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className={`relative w-[70vw] md:w-[36vw] lg:w-[26vw] ${ASPECTS[i % ASPECTS.length]} overflow-hidden flex-shrink-0 cursor-pointer group rounded-[var(--radius-card)] shadow-[var(--shadow-card)]`}
            >
              <HighQualityImage
                src={src}
                alt={`District 25 gallery ${i + 1}`}
                fill
                sizes="32vw"
                unoptimized={src.endsWith(".png")}
                className="object-cover transition-transform duration-[2.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
              />
            </motion.button>
          ))}
        </div>

        {(canScrollLeft || canScrollRight) && (
          <div className="mt-5 flex items-center justify-center gap-2 text-[0.72rem] uppercase tracking-[0.18em] text-ivory/45">
            <span>Scroll to explore</span>
            <motion.span
              aria-hidden
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-[80] bg-charcoal/97 flex items-center justify-center p-6 vignette"
            onClick={() => setSelected(null)}
          >
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute top-8 right-8 text-colophon text-ivory/50 hover:text-ivory cursor-pointer"
              aria-label="Close gallery"
            >
              Close
            </motion.button>
            <motion.div
              initial={{ opacity: 0, clipPath: "inset(6% 6% 6% 6%)" }}
              animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: ease.drift }}
              className="relative w-full max-w-6xl aspect-[16/10]"
              onClick={(e) => e.stopPropagation()}
            >
              <HighQualityImage
                src={GALLERY_IMAGES[selected]}
                alt=""
                fill
                unoptimized={GALLERY_IMAGES[selected].endsWith(".png")}
                className="object-contain"
                sizes="90vw"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionShell>
  );
}
