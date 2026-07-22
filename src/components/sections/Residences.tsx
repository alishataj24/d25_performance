"use client";

import { motion } from "framer-motion";
import { HighQualityImage } from "@/components/ui/HighQualityImage";
import { CONFIGURATIONS, COPY } from "@/lib/constants";
import { ASSETS } from "@/lib/assets";
import { useInquiry } from "@/components/providers/InquiryProvider";
import { ease, duration } from "@/lib/animations";

type Config = (typeof CONFIGURATIONS)[number];

function ConfigDetail({
  config,
  index,
  total,
}: {
  config: Config;
  index: number;
  total: number;
}) {
  const { openInquiry } = useInquiry();

  return (
    <div className="relative flex min-h-[24rem] flex-col items-center px-2 py-6 text-center lg:min-h-0 lg:py-8">
      {/* Oversized ghost numeral */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none text-[clamp(11rem,26vw,20rem)] font-light leading-none tracking-tight text-ivory/[0.04]"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative z-[1] flex w-full max-w-md flex-col items-center">
        <span className="mb-6 text-caption tracking-[0.24em] text-ivory/35">
          <span className="text-gold/80">{String(index + 1).padStart(2, "0")}</span>
          <span className="mx-1.5">/</span>
          {String(total).padStart(2, "0")}
        </span>

        <HighQualityImage
          src={ASSETS.logoIcon}
          alt=""
          width={56}
          height={56}
          unoptimized
          aria-hidden
          className="h-11 w-auto object-contain"
        />

        <span className="my-7 h-px w-14 bg-gradient-to-r from-transparent via-champagne/60 to-transparent" aria-hidden />

        <h3 className="text-[clamp(1.9rem,3vw,2.75rem)] font-light capitalize leading-[1.05] tracking-[-0.01em] text-ivory">
          {config.title}
        </h3>

        <button
          onClick={() => openInquiry("pricing")}
          className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-ivory/10 px-7 py-3 text-[0.8rem] tracking-[0.1em] font-medium text-ivory/85 transition-all duration-500 hover:bg-gold hover:text-forest-dark hover:-translate-y-0.5 cursor-pointer"
        >
          Know More
          <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
        </button>
      </div>
    </div>
  );
}

export function Residences() {
  const { residences } = COPY;
  const total = CONFIGURATIONS.length;

  return (
    <section id="configuration" className="relative bg-canvas-deep text-ivory">
      {/* Masthead */}
      <div className="section-padding !pb-0 px-container">
        <div className="mx-frame flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
          <div className="max-w-3xl">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: duration.slow, delay: 0.06, ease: ease.out }}
              className="h-section text-ivory"
            >
              {residences.headline}
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: duration.slow, delay: 0.12, ease: ease.out }}
            className="lede !text-ivory/95 max-w-sm"
          >
            {residences.subheadline}
          </motion.p>
        </div>
      </div>

      {/* Stacking pinned panels — each configuration sticks to the top and the
          next scrolls up over it (mirrors the original's sticky-scroll). */}
      <div className="relative">
        {CONFIGURATIONS.map((c, i) => (
          <div
            key={c.id}
            className="relative flex items-center bg-canvas-deep py-12 lg:sticky lg:top-0 lg:min-h-0 lg:py-16"
            style={{ zIndex: i + 1 }}
          >
            <div className="mx-frame px-container relative z-[1] w-full">
              <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
                {/* Image with creative frame + badges */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: duration.slow, ease: ease.out }}
                  className="relative mb-10 lg:mb-12"
                >
                  {/* Offset bronze accent frame */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -bottom-4 -right-4 hidden h-full w-full rounded-[var(--radius-card-lg)] border border-champagne/25 lg:block"
                  />

                  <div className="relative overflow-hidden rounded-[var(--radius-card-lg)] aspect-[4/3] shadow-[var(--shadow-float)] group">
                    <HighQualityImage
                      src={c.image}
                      alt={`${c.type} — artistic impression`}
                      fill
                      unoptimized={c.image.endsWith(".png")}
                      sizes="(max-width: 1024px) 100vw, 48vw"
                      className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,18,14,0.25)_0%,transparent_35%,rgba(10,18,14,0.6)_100%)]" />

                    {/* Type chip */}
                    <span className="absolute top-5 left-5 rounded-full border border-ivory/25 bg-forest-dark/40 px-4 py-1.5 text-caption tracking-[0.14em] text-ivory/90 backdrop-blur-md">
                      {c.type}
                    </span>

                    <p className="absolute bottom-5 left-6 text-caption text-ivory/55 tracking-[0.14em]">
                      {residences.artisticNote}
                    </p>
                  </div>

                  {/* Floating spec badge overlapping the image */}
                  <div className="absolute -bottom-6 left-6 hidden items-baseline gap-2 rounded-[var(--radius-card)] border border-champagne/25 bg-forest-dark/90 px-6 py-4 shadow-[var(--shadow-float)] backdrop-blur-md lg:flex">
                    <span className="text-[clamp(1.6rem,2.4vw,2.1rem)] font-light leading-none text-gold-light tabular-nums">
                      {c.area.toLocaleString()}
                    </span>
                    <span className="text-[0.7rem] uppercase tracking-[0.16em] text-ivory/50">
                      sq.ft.
                    </span>
                  </div>
                </motion.div>

                {/* Card */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: duration.slow, delay: 0.08, ease: ease.out }}
                  className="relative z-[1]"
                >
                  <ConfigDetail config={c} index={i} total={total} />
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
