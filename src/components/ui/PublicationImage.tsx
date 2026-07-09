"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HighQualityImage } from "@/components/ui/HighQualityImage";
import { cn } from "@/lib/utils";
import { ease, duration } from "@/lib/animations";

interface PublicationImageProps {
  src: string;
  alt: string;
  className?: string;
  aspect?: "cinematic" | "portrait" | "square" | "tall" | "full";
  bleed?: boolean;
  priority?: boolean;
  unoptimized?: boolean;
  sizes?: string;
}

const aspects = {
  cinematic: "aspect-[2/1] md:aspect-[21/9]",
  portrait: "aspect-[3/4]",
  square: "aspect-square",
  tall: "aspect-[4/5]",
  full: "min-h-[70vh] md:min-h-[85vh]",
};

export function PublicationImage({
  src,
  alt,
  className,
  aspect = "cinematic",
  bleed = false,
  priority = false,
  unoptimized,
  sizes = "100vw",
}: PublicationImageProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, clipPath: "inset(8% 8% 8% 8%)" }}
      animate={inView ? { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" } : undefined}
      transition={{ duration: duration.scene, ease: ease.drift }}
      className={cn(
        "pub-image group",
        bleed && "pub-image-bleed",
        aspects[aspect],
        className
      )}
    >
      <div className="pub-image-inner absolute inset-0 overflow-hidden">
        <HighQualityImage
          src={src}
          alt={alt}
          fill
          priority={priority}
          unoptimized={unoptimized}
          sizes={sizes}
          className="object-cover pub-image-media"
        />
      </div>
    </motion.div>
  );
}
