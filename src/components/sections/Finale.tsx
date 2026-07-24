"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HighQualityImage } from "@/components/ui/HighQualityImage";
import { BrandMark } from "@/components/ui/BrandMark";
import { ASSETS } from "@/lib/assets";
import { SITE, NAV_LINKS } from "@/lib/constants";

const AVENUE_GRADIENT =
  "bg-[linear-gradient(180deg,rgba(10,18,14,0.42)_0%,rgba(10,18,14,0.24)_45%,rgba(10,18,14,0.7)_100%)]";

/**
 * Cinematic finale — footer slides up over the avenue (mobile + desktop).
 * Mobile footer is a compact editorial stack so it fits without scroll traps.
 */
export function Finale() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.88", "end end"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.65], [1.1, 1.02]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.14, 0.36, 0.5], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.14, 0.36, 0.5], ["40px", "0px", "0px", "-32px"]);
  const footerY = useTransform(scrollYProgress, [0.44, 0.82], ["100%", "0%"]);

  return (
    <section
      ref={ref}
      className="relative h-[200vh] bg-canvas-deep md:h-[240vh] lg:h-[300vh]"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-canvas-deep">
        <motion.div style={{ scale: imageScale }} className="absolute inset-0 z-0">
          <HighQualityImage
            src={ASSETS.footerTop}
            alt="The tree-lined avenues of Nambiar District 25"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className={`absolute inset-0 ${AVENUE_GRADIENT}`} />
        </motion.div>

        <motion.h2
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center h-section text-ivory"
        >
          Live the SOHO Life.
        </motion.h2>

        <motion.div
          style={{ y: footerY }}
          className="absolute inset-0 z-20 bg-canvas-deep text-ivory"
        >
          <div className="flex h-full flex-col justify-center px-6 py-8 pb-[calc(4.75rem+env(safe-area-inset-bottom,0px))] md:px-14 md:py-12 lg:py-14">
            <div className="mx-auto w-full max-w-7xl">
              {/* Mobile — compact editorial footer */}
              <div className="lg:hidden">
                <MobileFooter />
              </div>
              {/* Desktop — three-column */}
              <div className="hidden lg:block">
                <DesktopFooter />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MobileFooter() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center text-center">
      <BrandMark className="h-auto w-[88px] shrink-0" />

      <span
        className="mt-5 h-px w-10 bg-gradient-to-r from-transparent via-champagne/50 to-transparent"
        aria-hidden
      />

      <nav
        className="mt-5 flex flex-wrap items-center justify-center gap-x-1 gap-y-2"
        aria-label="Footer"
      >
        {NAV_LINKS.map((link, i) => (
          <span key={link.href} className="inline-flex items-center">
            {i > 0 && (
              <span className="mx-2 text-ivory/25" aria-hidden>
                ·
              </span>
            )}
            <a
              href={link.href}
              className="text-[0.68rem] uppercase tracking-[0.16em] text-ivory/70 transition-colors hover:text-gold"
            >
              {link.label}
            </a>
          </span>
        ))}
      </nav>

      <div className="mt-8 w-full border-t border-ivory/10 pt-7 text-left">
        <HighQualityImage
          src={ASSETS.nambiarBuildersWhite}
          alt="Nambiar Builders"
          width={520}
          height={124}
          priority
          unoptimized
          className="h-[34px] w-auto"
        />

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.14em] text-champagne/80">
              Site Address
            </p>
            <p className="mt-1.5 text-[0.78rem] leading-snug text-ivory/55">
              {SITE.siteAddress}
            </p>
          </div>
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.14em] text-champagne/80">
              Corporate
            </p>
            <p className="mt-1.5 text-[0.78rem] leading-snug text-ivory/55">
              {SITE.corporateAddress}
            </p>
          </div>
        </div>

        <div className="mt-5">
          <p className="text-[0.65rem] uppercase tracking-[0.14em] text-champagne/80">
            RERA
          </p>
          <ul className="mt-1.5 space-y-1">
            {SITE.reraPhases.map((p) => (
              <li
                key={p.phase}
                className="text-[0.7rem] leading-snug text-ivory/45 break-words"
              >
                <span className="text-ivory/65">{p.phase}</span>
                <span className="text-ivory/25"> · </span>
                {p.number}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-ivory/10 pt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <a
            href={SITE.phoneHref}
            className="text-[0.95rem] font-light tracking-wide text-gold-light transition-colors hover:text-gold"
          >
            {SITE.phone}
          </a>
          <p className="text-[0.62rem] uppercase leading-relaxed tracking-[0.08em] text-ivory/40">
            © 2026 Nambiar District 25. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

function DesktopFooter() {
  return (
    <div className="grid w-full grid-cols-[1.1fr_0.9fr_0.55fr] items-center gap-10">
      <div className="flex flex-col gap-8">
        <div className="w-fit">
          <HighQualityImage
            src={ASSETS.nambiarBuildersWhite}
            alt="Nambiar Builders"
            width={520}
            height={124}
            priority
            unoptimized
            className="h-[52px] w-auto"
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

      <div className="flex items-center justify-center" aria-label="Nambiar District 25">
        <BrandMark className="h-auto w-[220px]" />
      </div>

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
