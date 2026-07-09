"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HighQualityImage } from "@/components/ui/HighQualityImage";
import { TextReveal } from "@/components/ui/TextReveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { COPY, getChapter, VOICE } from "@/lib/constants";
import { ASSETS } from "@/lib/assets";
import { fadeUp, staggerContainer } from "@/lib/animations";

/** Resident video testimonials — thumbnail (poster) → YouTube id (from the original site). */
const VIDEOS: { thumb: string; id: string }[] = [
  { thumb: ASSETS.testimonials[0], id: "9vdP_InVE8w" },
  { thumb: ASSETS.testimonials[1], id: "-9HrFNdmev4" },
  { thumb: ASSETS.testimonials[2], id: "d4IBVxGS-bo" },
  { thumb: ASSETS.testimonials[3], id: "Y7JyBFAZE2k" },
  { thumb: ASSETS.testimonials[4], id: "a-AUxezyuaY" },
];

function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M8 5.5v13l11-6.5-11-6.5z" fill="currentColor" />
    </svg>
  );
}

function VideoTestimonial({ thumb, id, index }: { thumb: string; id: string; index: number }) {
  const [playing, setPlaying] = useState(false);

  return (
    <motion.figure
      variants={fadeUp}
      className="relative w-[78vw] md:w-[44vw] lg:w-[32vw] aspect-[4/3] flex-shrink-0 overflow-hidden group rounded-[var(--radius-card)] shadow-[var(--shadow-card)] bg-black"
    >
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={`Resident testimonial ${index + 1}`}
          loading="lazy"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play resident testimonial ${index + 1}`}
          className="absolute inset-0 h-full w-full cursor-pointer"
        >
          <HighQualityImage
            src={thumb}
            alt={`Resident testimonial ${index + 1}`}
            fill
            sizes="32vw"
            className="object-cover transition-transform duration-[2.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,18,14,0.1)_0%,transparent_40%,rgba(10,18,14,0.35)_100%)] transition-opacity duration-500 group-hover:opacity-70" />
          <span className="absolute left-1/2 top-1/2 flex h-[58px] w-[58px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/95 text-forest shadow-[0_10px_36px_rgba(0,0,0,0.35)] transition-all duration-500 group-hover:scale-110 group-hover:bg-bronze group-hover:text-ivory">
            <span className="ml-0.5">
              <PlayIcon />
            </span>
          </span>
        </button>
      )}
    </motion.figure>
  );
}

export function Testimonials() {
  const { testimonials } = COPY;
  const chapter = getChapter("testimonials")!;

  return (
    <SectionShell
      id="testimonials"
      chapter={chapter}
      tone="light"
      className="!overflow-visible"
      innerClassName="!pb-6 md:!pb-8"
    >
      <div className="mb-8 md:mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between max-w-4xl">
        <TextReveal as="h2" className="h-section text-forest">
          {testimonials.headline}
        </TextReveal>
        <p className="text-body text-grey-500 font-light italic sm:pb-1.5">{VOICE.testimonials.subhead}</p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-5%" }}
        className="film-strip -mx-6 px-6 md:-mx-12 md:px-12 pb-4"
      >
        {VIDEOS.map((v, i) => (
          <VideoTestimonial key={v.id} thumb={v.thumb} id={v.id} index={i} />
        ))}
      </motion.div>
    </SectionShell>
  );
}
