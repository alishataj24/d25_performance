"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { HighQualityImage } from "@/components/ui/HighQualityImage";
import { GALLERY_IMAGES, COPY, getChapter } from "@/lib/constants";

/**
 * Chapter 9 — Gallery
 * Walking through an art gallery. Each photograph owns a wall.
 */
export function GalleryJourney() {
  const ref = useRef<HTMLElement>(null);
  const { gallery } = COPY;
  const chapter = getChapter("gallery")!;
  const count = GALLERY_IMAGES.length;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="gallery"
      ref={ref}
      className="relative bg-charcoal"
      style={{ height: `${count * 100}vh` }}
      aria-label="Gallery"
    >
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        {GALLERY_IMAGES.map((src, i) => (
          <GalleryWall
            key={`${src}-${i}`}
            src={src}
            index={i}
            total={count}
            scrollYProgress={scrollYProgress}
            caption={
              i === 0
                ? gallery.headline
                : i === 1
                  ? gallery.secondaryHeadline
                  : gallery.tertiaryHeadline
            }
            chapterLabel={`${chapter.number} — ${chapter.title}`}
            showChapter={i === 0}
          />
        ))}
      </div>
      <p className="relative z-10 text-center text-colophon text-ivory/30 pb-16 -mt-8">
        {gallery.instruction}
      </p>
    </section>
  );
}

function GalleryWall({
  src,
  index,
  total,
  scrollYProgress,
  caption,
  chapterLabel,
  showChapter,
}: {
  src: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  caption: string;
  chapterLabel: string;
  showChapter: boolean;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const span = end - start;
  const fade = span * 0.22;
  const fadeInEnd = start + fade;
  const fadeOutStart = Math.max(fadeInEnd + 0.001, end - fade);
  const isLast = index === total - 1;

  const opacity = useTransform(
    scrollYProgress,
    isLast ? [start, fadeInEnd, end] : [start, fadeInEnd, fadeOutStart, end],
    isLast ? [0, 1, 1] : [0, 1, 1, 0]
  );
  const scale = useTransform(scrollYProgress, [start, start + span * 0.5], [1.04, 1]);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <motion.div style={{ scale }} className="absolute inset-0">
        <HighQualityImage
          src={src}
          alt={`District 25 gallery ${index + 1}`}
          fill
          sizes="100vw"
          unoptimized={src.endsWith(".png")}
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-charcoal/30" />
      <div className="absolute bottom-0 left-0 right-0 section-padding pb-16 md:pb-24">
        <div className="max-w-[1440px] mx-auto">
          {showChapter && (
            <p className="text-colophon text-bronze/60 mb-8">{chapterLabel}</p>
          )}
          <p className="text-title text-ivory font-light max-w-2xl leading-snug">{caption}</p>
          <p className="text-colophon text-ivory/40 mt-6 museum-plaque">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
