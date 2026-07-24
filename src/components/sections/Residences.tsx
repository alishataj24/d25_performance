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
    <div className="relative flex flex-col items-center px-2 py-4 text-center lg:min-h-[24rem] lg:py-8">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none text-[clamp(7rem,28vw,20rem)] font-light leading-none tracking-tight text-ivory/[0.04] lg:text-[clamp(11rem,26vw,20rem)]"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative z-[1] flex w-full max-w-md flex-col items-center">
        <span className="mb-4 text-caption tracking-[0.24em] text-ivory/35 lg:mb-6">
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
          className="h-9 w-auto object-contain lg:h-11"
        />

        <span
          className="my-5 h-px w-14 bg-gradient-to-r from-transparent via-champagne/60 to-transparent lg:my-7"
          aria-hidden
        />

        <h3 className="text-[clamp(1.65rem,5.5vw,2.75rem)] font-light capitalize leading-[1.05] tracking-[-0.01em] text-ivory lg:text-[clamp(1.9rem,3vw,2.75rem)]">
          {config.title}
        </h3>

        <button
          type="button"
          onClick={() => openInquiry("pricing")}
          className="group mt-6 inline-flex items-center gap-2.5 rounded-full bg-ivory/10 px-7 py-3 text-[0.8rem] font-medium tracking-[0.1em] text-ivory/85 transition-all duration-500 hover:-translate-y-0.5 hover:bg-gold hover:text-forest-dark cursor-pointer lg:mt-8"
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
      <div className="section-padding !pb-0 px-container">
        <div className="mx-frame flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: duration.slow, ease: ease.out }}
              className="kicker !text-champagne mb-5"
            >
              {residences.label}
            </motion.p>
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

      {/* Sticky stack — each card pins, next slides over it (mobile + desktop) */}
      <div className="relative">
        {CONFIGURATIONS.map((c, i) => (
          <div
            key={c.id}
            className="sticky top-[68px] z-[1] flex items-center bg-canvas-deep py-8 md:top-[72px] md:py-12 lg:top-0 lg:py-16"
            style={{ zIndex: i + 1 }}
          >
            <div className="mx-frame px-container relative z-[1] w-full">
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-20">
                {/* Number first on mobile; right column on desktop */}
                <div className="relative z-[1] order-1 lg:order-2">
                  <ConfigDetail config={c} index={i} total={total} />
                </div>

                {/* Image — left on desktop, second on mobile */}
                <div className="relative order-2 mb-8 w-full lg:order-1 lg:mb-12">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -bottom-4 -right-4 hidden h-full w-full rounded-[var(--radius-card-lg)] border border-champagne/25 lg:block"
                  />

                  <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-card-lg)] bg-forest-dark/40 shadow-[var(--shadow-float)]">
                    <HighQualityImage
                      src={c.image}
                      alt={`${c.type} — artistic impression`}
                      fill
                      priority={i < 2}
                      sizes="(max-width: 1024px) 100vw, 48vw"
                      className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,18,14,0.25)_0%,transparent_35%,rgba(10,18,14,0.55)_100%)]" />

                    <span className="absolute top-4 left-4 rounded-full border border-ivory/25 bg-forest-dark/40 px-3.5 py-1.5 text-caption tracking-[0.14em] text-ivory/90 backdrop-blur-md lg:top-5 lg:left-5 lg:px-4">
                      {c.type}
                    </span>

                    <p className="absolute bottom-5 left-6 hidden text-caption tracking-[0.14em] text-ivory/55 lg:block">
                      {residences.artisticNote}
                    </p>
                  </div>

                  <div className="absolute -bottom-5 left-4 flex items-baseline gap-2 rounded-[var(--radius-card)] border border-champagne/25 bg-forest-dark/90 px-5 py-3 shadow-[var(--shadow-float)] backdrop-blur-md lg:-bottom-6 lg:left-6 lg:px-6 lg:py-4">
                    <span className="text-[clamp(1.35rem,4.5vw,2.1rem)] font-light leading-none text-gold-light tabular-nums">
                      {c.area.toLocaleString()}
                    </span>
                    <span className="text-[0.65rem] uppercase tracking-[0.16em] text-ivory/50 lg:text-[0.7rem]">
                      sq.ft.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
