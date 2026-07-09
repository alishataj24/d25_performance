"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HighQualityImage } from "@/components/ui/HighQualityImage";
import { BrandMark } from "@/components/ui/BrandMark";
import { ASSETS } from "@/lib/assets";
import { SITE, NAV_LINKS } from "@/lib/constants";

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
    <section ref={ref} className="relative h-[300vh] bg-canvas-deep">
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
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,18,14,0.42)_0%,rgba(10,18,14,0.24)_45%,rgba(10,18,14,0.7)_100%)]" />
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
          <div className="mx-auto w-full max-w-7xl px-8 py-14 md:px-14">
            <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-[1.1fr_0.9fr_0.55fr] md:gap-10">
              {/* Left — logo + details */}
              <div className="flex flex-col gap-8">
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
                  <FooterItem label="RERA Number" value={`RERA: ${SITE.rera}`} />
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

              {/* Center — brandmark (SVG for crisp rendering) */}
              <div className="flex items-center justify-center" aria-label="Nambiar District 25">
                <BrandMark className="h-auto w-[160px] md:w-[220px]" />
              </div>

              {/* Right — navigation */}
              <nav className="flex flex-col gap-4">
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
          </div>
        </motion.div>
      </div>
    </section>
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
