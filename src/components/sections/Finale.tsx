"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HighQualityImage } from "@/components/ui/HighQualityImage";
import { BrandMark } from "@/components/ui/BrandMark";
import { ASSETS } from "@/lib/assets";
import { SITE, NAV_LINKS } from "@/lib/constants";
import { ease, duration } from "@/lib/animations";

const AVENUE_GRADIENT =
  "bg-[linear-gradient(180deg,rgba(10,18,14,0.42)_0%,rgba(10,18,14,0.24)_45%,rgba(10,18,14,0.7)_100%)]";

export function Finale() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // Begin the sequence as the section approaches — not only after it pins
    offset: ["start 0.88", "end end"],
  });

  // Avenue render — slow cinematic zoom, stays crisp (no fade)
  const imageScale = useTransform(scrollYProgress, [0, 0.65], [1.12, 1.02]);

  // "Live the SOHO Life." — mirrors site fade-up (40px · 0.8s feel, unhurried hold)
  const textOpacity = useTransform(scrollYProgress, [0, 0.14, 0.36, 0.5], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.14, 0.36, 0.5], ["40px", "0px", "0px", "-32px"]);

  // Footer — slides up after the tagline has held and eased out
  const footerY = useTransform(scrollYProgress, [0.44, 0.78], ["100%", "0%"]);

  return (
    <>
      {/* Desktop — cinematic pinned slide-up */}
      <section ref={ref} className="relative hidden h-[300vh] bg-canvas-deep lg:block">
        <div className="sticky top-0 h-screen overflow-hidden bg-canvas-deep">
          {/* Avenue backdrop — always crisp, gently zooming */}
          <motion.div style={{ scale: imageScale }} className="absolute inset-0 z-0">
            <HighQualityImage
              src={ASSETS.footerTop}
              alt="The tree-lined avenues of Nambiar District 25"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className={`absolute inset-0 ${AVENUE_GRADIENT}`} />
          </motion.div>

          {/* Tagline */}
          <motion.h2
            style={{ opacity: textOpacity, y: textY }}
            className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center h-section text-ivory"
          >
            Live the SOHO Life.
          </motion.h2>

          {/* Footer — solid dark-green panel, slides up to fully cover the avenue */}
          <motion.div
            style={{ y: footerY }}
            className="absolute inset-0 z-20 flex items-center bg-canvas-deep text-ivory"
          >
            <div className="mx-auto w-full max-w-7xl px-14 py-14">
              <FooterGrid />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mobile — natural document flow (no scroll-jacking), animated on view */}
      <section className="relative bg-canvas-deep text-ivory lg:hidden">
        <div className="relative h-[62vh] min-h-[420px] overflow-hidden">
          <motion.div
            initial={{ scale: 1.14 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: duration.cinematic, ease: ease.out }}
            className="absolute inset-0"
          >
            <HighQualityImage
              src={ASSETS.footerTop}
              alt="The tree-lined avenues of Nambiar District 25"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
          <div className={`absolute inset-0 ${AVENUE_GRADIENT}`} />
          <motion.h2
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: duration.slow, ease: ease.out }}
            className="absolute inset-0 flex items-center justify-center px-6 text-center h-section text-ivory"
          >
            Live the SOHO Life.
          </motion.h2>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 44 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: duration.slow, ease: ease.out }}
          className="px-8 py-14"
        >
          <FooterGrid />
        </motion.div>
      </section>
    </>
  );
}

/** Footer content — brandmark first on mobile, three-column on desktop */
function FooterGrid() {
  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr_0.55fr] lg:items-center lg:gap-10">
      {/* Brandmark (D logo) — first on mobile, centered on desktop */}
      <div
        className="order-1 flex items-center justify-center lg:order-2"
        aria-label="Nambiar District 25"
      >
        <BrandMark className="h-auto w-[150px] md:w-[220px]" />
      </div>

      {/* Nambiar Builders — logo + details */}
      <div className="order-3 flex flex-col gap-8 lg:order-1">
        <div className="w-fit">
          <HighQualityImage
            src={ASSETS.nambiarBuildersWhite}
            alt="Nambiar Builders"
            width={520}
            height={124}
            priority
            unoptimized
            className="h-[46px] w-auto md:h-[52px]"
          />
        </div>

        <div className="flex flex-col gap-6">
          <FooterItem label="Site Address" value={SITE.siteAddress} />
          <FooterItem label="Corporate Address" value={SITE.corporateAddress} />
          <FooterItem label="RERA Number">
            <span className="flex flex-col gap-1">
              {SITE.reraPhases.map((p) => (
                <span key={p.phase} className="break-words">
                  {p.phase} : {p.number}
                </span>
              ))}
            </span>
          </FooterItem>
          <FooterItem label="Phone">
            <a href={SITE.phoneHref} className="transition-colors hover:text-gold">
              {SITE.phone}
            </a>
          </FooterItem>
        </div>

        <p className="mt-1 text-[0.72rem] uppercase tracking-[0.08em] text-ivory/40">
          © 2026 Nambiar District 25. All rights reserved.
        </p>
      </div>

      {/* Navigation */}
      <nav className="order-2 flex flex-col gap-4 lg:order-3">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-[0.95rem] uppercase tracking-[0.14em] text-ivory/75 transition-colors duration-300 hover:text-gold"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );
}

function FooterItem({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[1.15rem] font-medium text-ivory">{label}</span>
      <span className="max-w-sm text-[0.85rem] leading-relaxed text-ivory/60">
        {children ?? value}
      </span>
    </div>
  );
}
