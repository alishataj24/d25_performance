"use client";

import { useState, useEffect } from "react";
import { HighQualityImage } from "@/components/ui/HighQualityImage";
import { motion, AnimatePresence } from "framer-motion";
import { SITE, NAV_LINKS, VOICE } from "@/lib/constants";
import { scrollToSection } from "@/lib/scroll";
import { cn } from "@/lib/utils";
import { useInquiry } from "@/components/providers/InquiryProvider";
import { ease } from "@/lib/animations";

function useActiveSection() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((link) => link.href.slice(1));
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-72px 0px -55% 0px", threshold: [0, 0.15, 0.35, 0.55] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
}

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const activeSection = useActiveSection();
  const { openInquiry } = useInquiry();

  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setOverHero(entry.isIntersecting),
      { threshold: 0.35, rootMargin: "-72px 0px 0px 0px" }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    scrollToSection(href.slice(1));
  };

  const onHero = overHero && !menuOpen;
  const navHeight = onHero ? "h-[80px] md:h-[88px]" : "h-[68px] md:h-[72px]";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-[100] isolate transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          onHero
            ? "bg-transparent border-b border-transparent"
            : "bg-ivory/80 backdrop-blur-xl border-b border-charcoal/10 shadow-[0_2px_20px_rgba(18,26,20,0.06)]"
        )}
      >
        {/* Readability scrim over bright hero banner */}
        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 h-[160%] transition-opacity duration-700",
            onHero ? "opacity-100" : "opacity-0"
          )}
          style={{
            background:
              "linear-gradient(180deg, rgba(15,16,20,0.55) 0%, rgba(15,16,20,0.28) 45%, transparent 100%)",
          }}
          aria-hidden
        />
        <nav
          className={cn(
            "grid grid-cols-[auto_1fr_auto] items-center gap-4 px-5 md:px-10 lg:px-14 max-w-[1920px] mx-auto transition-all duration-700",
            navHeight
          )}
        >
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#home");
            }}
            className="relative z-10 shrink-0"
            aria-label="District 25 Home"
          >
            <HighQualityImage
              src={SITE.logo}
              alt="Nambiar District 25"
              width={180}
              height={66}
              priority
              unoptimized
              className={cn(
                "w-auto object-contain transition-all duration-700",
                onHero
                  ? "h-11 sm:h-12 md:h-[3.25rem] lg:h-14 brightness-0 invert opacity-95"
                  : "h-9 sm:h-10 md:h-11"
              )}
            />
          </a>

          <div className="hidden lg:flex items-center justify-center gap-8 xl:gap-10 relative z-10">
            {NAV_LINKS.map((link) => {
              const id = link.href.slice(1);
              const isActive = activeSection === id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={cn(
                    "relative py-2 text-[0.62rem] font-medium uppercase tracking-[0.22em] transition-colors duration-500",
                    onHero
                      ? isActive
                        ? "text-champagne drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)]"
                        : "text-ivory/90 hover:text-ivory drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)]"
                      : isActive
                        ? "text-bronze"
                        : "text-charcoal/70 hover:text-charcoal"
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-0 right-0 h-px bg-bronze transition-transform duration-500 origin-center",
                      isActive ? "scale-x-100" : "scale-x-0"
                    )}
                  />
                </a>
              );
            })}
          </div>

          <button
            onClick={() => openInquiry("enquire", onHero ? "concierge" : "modal")}
            className={cn(
              "hidden lg:inline-flex justify-self-end items-center gap-2 rounded-full px-6 py-2.5 text-[0.8rem] font-medium tracking-[0.02em] transition-all duration-500 cursor-pointer",
              onHero
                ? "btn-ghost-light drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)]"
                : "bg-forest text-ivory shadow-[0_10px_30px_-10px_rgba(28,46,31,0.5)] hover:bg-forest-dark hover:-translate-y-0.5"
            )}
          >
            {VOICE.cta.nav}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2 cursor-pointer relative z-10 ml-auto"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={cn(
                  "block w-6 h-px transition-all duration-500",
                  onHero && !menuOpen ? "bg-ivory" : "bg-charcoal",
                  i === 0 && menuOpen && "rotate-45 translate-y-[3.5px]",
                  i === 1 && menuOpen && "opacity-0",
                  i === 2 && menuOpen && "-rotate-45 -translate-y-[3.5px]"
                )}
              />
            ))}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: ease.cinematic }}
            className="fixed inset-0 z-[90] bg-forest-dark flex flex-col justify-center items-center lg:hidden"
          >
            <nav className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => {
                const id = link.href.slice(1);
                const isActive = activeSection === id;
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07, ease: ease.cinematic }}
                    className={cn(
                      "text-headline font-light tracking-wide transition-colors",
                      isActive ? "text-gold" : "text-ivory/80 hover:text-gold"
                    )}
                  >
                    {link.label}
                  </motion.a>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
