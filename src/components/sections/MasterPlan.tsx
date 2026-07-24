"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HighQualityImage } from "@/components/ui/HighQualityImage";
import { ZoomableImage } from "@/components/ui/ZoomableImage";
import { TextReveal } from "@/components/ui/TextReveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { COPY, getChapter } from "@/lib/constants";
import { ASSETS } from "@/lib/assets";
import { ease, duration } from "@/lib/animations";

export function MasterPlan() {
  const { masterPlan } = COPY;
  const chapter = getChapter("master-plan")!;
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll while the fullscreen viewer is open
  useEffect(() => {
    if (!expanded) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setExpanded(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [expanded]);

  const viewer = (
    <motion.div
      key="master-plan-viewer"
      role="dialog"
      aria-modal="true"
      aria-label="Master plan viewer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: ease.out }}
      className="fixed inset-0 z-[9999] flex flex-col bg-black"
    >
      {/* Top bar — X to close */}
      <div
        className="relative z-[10] flex shrink-0 items-center justify-end bg-[#0a120e] px-3 shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
        style={{
          paddingTop: "max(0.85rem, env(safe-area-inset-top, 0px))",
          paddingBottom: "0.85rem",
        }}
      >
        <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-caption tracking-[0.12em] text-ivory/50">
          Drag to pan · pinch to zoom
        </span>

        <button
          type="button"
          onClick={() => setExpanded(false)}
          aria-label="Close master plan"
          className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-ivory/40 bg-ivory/10 text-ivory"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <div className="relative min-h-0 flex-1">
        <ZoomableImage
          src={ASSETS.masterplan}
          alt="Nambiar District 25 master plan"
          className="h-full w-full"
        />
      </div>
    </motion.div>
  );

  return (
    <SectionShell
      id="master-plan"
      chapter={chapter}
      tone="charcoal"
      innerClassName="!pb-10 md:!pb-12"
    >
      <div className="mb-8 md:mb-10 max-w-3xl">
        <TextReveal as="h2" className="h-section text-ivory">
          {masterPlan.headline}
        </TextReveal>
        <p className="mt-4 text-body text-champagne">{masterPlan.subheadline}</p>
      </div>

      <motion.button
        type="button"
        onClick={() => setExpanded(true)}
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: duration.slow, ease: ease.out }}
        aria-label="Expand master plan to explore"
        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-[var(--radius-card-lg)] border border-ivory/10 bg-black shadow-[var(--shadow-float)]"
      >
        <div className="relative aspect-[16/10] w-full sm:aspect-[16/9]">
          <HighQualityImage
            src={ASSETS.masterplan}
            alt="Nambiar District 25 master plan"
            fill
            unoptimized
            sizes="(max-width: 1024px) 100vw, 1200px"
            className="object-contain object-center p-2 md:p-3"
          />
          <span className="pointer-events-none absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full border border-ivory/15 bg-black/60 px-4 py-2 text-caption tracking-[0.08em] text-ivory/90 backdrop-blur-md transition-colors group-hover:border-champagne/50 group-hover:text-ivory">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
            Tap to expand &amp; zoom
          </span>
        </div>
      </motion.button>

      {/* Portal to body — escapes SceneDirector transform + section overflow */}
      {mounted &&
        createPortal(
          <AnimatePresence>{expanded ? viewer : null}</AnimatePresence>,
          document.body
        )}
    </SectionShell>
  );
}
