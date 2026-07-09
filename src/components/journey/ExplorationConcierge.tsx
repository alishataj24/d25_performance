"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInquiry } from "@/components/providers/InquiryProvider";
import { scrollToSection } from "@/lib/scroll";
import { ease } from "@/lib/animations";

const OPTIONS = [
  { id: "homes", label: "Explore Homes", href: "#configuration" },
  { id: "amenities", label: "View Amenities", href: "#amenities" },
  { id: "plans", label: "Compare Floor Plans", href: "#configuration" },
  { id: "visit", label: "Book a Visit" },
] as const;

/**
 * AI Concierge — exploration-first, not chat-first.
 * Appears with restraint. Useful. Never intrusive.
 */
export function ExplorationConcierge() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const { openConcierge } = useInquiry();

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 6000);
    return () => clearTimeout(t);
  }, []);

  const handleOption = (opt: (typeof OPTIONS)[number]) => {
    if (opt.id === "visit") {
      openConcierge("viewing");
    } else if ("href" in opt) {
      scrollToSection(opt.href.slice(1));
    }
    setOpen(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[85]">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.6, ease: ease.cinematic }}
            className="absolute bottom-full right-0 mb-4 w-[min(320px,85vw)] bg-charcoal/85 backdrop-blur-xl border border-ivory/10 p-8 shadow-depth"
          >
            <p className="text-colophon text-champagne/70 mb-2">Concierge</p>
            <p className="text-body text-ivory/80 mb-8 leading-relaxed">
              How would you like to explore District 25 today?
            </p>
            <ul className="space-y-1">
              {OPTIONS.map((opt, i) => (
                <li key={opt.id}>
                  <button
                    type="button"
                    onClick={() => handleOption(opt)}
                    className="w-full text-left py-3 text-body text-ivory/70 hover:text-ivory border-b border-ivory/8 last:border-0 transition-colors duration-500 cursor-pointer flex items-center justify-between group"
                  >
                    <span>{opt.label}</span>
                    <span className="opacity-0 group-hover:opacity-60 transition-opacity text-sm">→</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-3 px-5 py-3 rounded-full border border-ivory/15 bg-charcoal/50 backdrop-blur-md text-colophon text-ivory/70 hover:border-bronze/40 hover:text-ivory transition-all duration-700 cursor-pointer shadow-soft"
        aria-expanded={open}
        aria-label="Open concierge"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-bronze/80" />
        Concierge
      </button>
    </div>
  );
}
