"use client";

import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";
import { ease } from "@/lib/animations";

function DownloadIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3v12" />
      <path d="M7 11l5 5 5-5" />
      <path d="M4 21h16" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.1-8.7A2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.4 1.8.7 2.6a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.5-1.2a2 2 0 012.1-.4c.8.3 1.7.6 2.6.7a2 2 0 011.7 1.9z" />
    </svg>
  );
}

/**
 * Persistent floating CTA — Desktop + Mobile
 * Download Brochure | Call Now (opens dial pad / phone app)
 */
export function FloatingCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: ease.cinematic, delay: 0.35 }}
      className="fixed inset-x-0 bottom-0 z-40"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="mx-auto w-full max-w-[1920px] px-0 md:px-6 md:pb-4">
        <div
          className="flex items-stretch border-t border-white/10 shadow-[0_-8px_28px_rgba(0,0,0,0.35)] md:overflow-hidden md:rounded-full md:border md:border-white/10"
          style={{
            background:
              "linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 55%, #121212 100%)",
          }}
        >
          <a
            href={SITE.brochure}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download brochure"
            className="flex flex-1 items-center justify-center gap-2 px-3 py-3.5 text-[0.78rem] font-medium tracking-[0.04em] text-white transition-colors hover:bg-white/5 sm:text-[0.82rem] md:py-3.5"
          >
            <DownloadIcon />
            <span className="text-center leading-tight">
              <span className="sm:hidden">Brochure</span>
              <span className="hidden sm:inline">Download Brochure</span>
            </span>
          </a>
          <span
            className="w-px shrink-0 self-stretch bg-white/35 my-2.5"
            aria-hidden
          />
          <a
            href={SITE.phoneHref}
            aria-label={`Call Now ${SITE.phone}`}
            className="flex flex-1 items-center justify-center gap-2 px-3 py-3.5 text-[0.78rem] font-medium tracking-[0.04em] text-white transition-colors hover:bg-white/5 sm:text-[0.82rem] md:py-3.5"
          >
            <PhoneIcon />
            Call Now
          </a>
        </div>
      </div>
    </motion.div>
  );
}
