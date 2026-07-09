"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HighQualityImage } from "@/components/ui/HighQualityImage";
import { TextReveal } from "@/components/ui/TextReveal";
import { ASSETS } from "@/lib/assets";
import { COPY, getChapter, VOICE } from "@/lib/constants";
import { fadeUp, staggerContainer } from "@/lib/animations";

/**
 * Chapter 10 — Testimonials
 * Portraits. Human stories. Gallery lights dim into warmth.
 */
export function TestimonialsChapter() {
  const ref = useRef<HTMLElement>(null);
  const { testimonials } = COPY;
  const chapter = getChapter("testimonials")!;
  const images = ASSETS.testimonials;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const warmth = useTransform(scrollYProgress, [0, 1], [0, 0.15]);

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative bg-ivory overflow-hidden section-padding"
    >
      <motion.div
        style={{ opacity: warmth }}
        className="absolute inset-0 bg-gradient-to-b from-champagne/20 to-transparent pointer-events-none"
      />

      <div className="max-w-[1440px] mx-auto mb-20 md:mb-28">
        <p className="text-colophon text-stone-dark mb-6">
          {chapter.number} — {chapter.title}
        </p>
        <TextReveal as="h2" className="text-masthead text-forest font-light mb-6">
          {testimonials.headline}
        </TextReveal>
        <p className="text-body text-grey-500 font-light italic">{VOICE.testimonials.subhead}</p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-8%" }}
        className="max-w-[1440px] mx-auto space-y-24 md:space-y-32"
      >
        {images.map((src, i) => (
          <motion.figure
            key={src}
            variants={fadeUp}
            className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center ${
              i % 2 === 1 ? "md:[direction:rtl]" : ""
            }`}
          >
            <div className={`md:col-span-7 relative aspect-[16/10] overflow-hidden ${i % 2 === 1 ? "md:[direction:ltr]" : ""}`}>
              <HighQualityImage
                src={src}
                alt={`Resident testimonial ${i + 1}`}
                fill
                sizes="60vw"
                className="object-cover"
              />
            </div>
            <figcaption className={`md:col-span-4 ${i % 2 === 1 ? "md:[direction:ltr]" : ""}`}>
              <span className="text-colophon text-stone-dark block mb-4">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-title text-forest font-light italic">
                Voices from those who already belong
              </p>
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>
    </section>
  );
}
