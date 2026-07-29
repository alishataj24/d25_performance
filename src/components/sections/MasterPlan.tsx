"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HighQualityImage } from "@/components/ui/HighQualityImage";
import { ZoomableImage } from "@/components/ui/ZoomableImage";
import { TextReveal } from "@/components/ui/TextReveal";
import { SectionShell } from "@/components/ui/SectionShell";
import { COPY, getChapter, SITE } from "@/lib/constants";
import { ASSETS } from "@/lib/assets";
import { ease, duration } from "@/lib/animations";
import { isValidIndianMobile, PHONE_ERROR } from "@/lib/validation";

const UNLOCK_KEY = "d25-masterplan-unlocked";

const GATE_FIELDS = [
  { id: "name", type: "text", label: "Your name", autoComplete: "name" },
  { id: "email", type: "email", label: "Email address", autoComplete: "email" },
  { id: "phone", type: "tel", label: "Phone number", autoComplete: "tel" },
] as const;

export function MasterPlan() {
  const { masterPlan } = COPY;
  const chapter = getChapter("master-plan")!;
  const [expanded, setExpanded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      if (sessionStorage.getItem(UNLOCK_KEY) === "1") setUnlocked(true);
    } catch {
      /* ignore */
    }
  }, []);

  // Lock body scroll while any overlay is open
  useEffect(() => {
    if (!expanded && !showForm) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setExpanded(false);
      setShowForm(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [expanded, showForm]);

  // Clicking the preview: view directly if already unlocked, else gate behind the form
  const requestView = () => {
    if (unlocked) setExpanded(true);
    else setShowForm(true);
  };

  const handleGateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const phone = (form.elements.namedItem("phone") as HTMLInputElement | null)?.value ?? "";
    if (!isValidIndianMobile(phone)) {
      setPhoneError(PHONE_ERROR);
      (form.elements.namedItem("phone") as HTMLInputElement | null)?.focus();
      return;
    }
    setPhoneError("");
    try {
      sessionStorage.setItem(UNLOCK_KEY, "1");
    } catch {
      /* ignore */
    }
    setUnlocked(true);
    setShowForm(false);
    setExpanded(true);
  };

  const viewer = (
    <motion.div
      key="master-plan-viewer"
      role="dialog"
      aria-modal="true"
      aria-label="Master plan viewer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: ease.out }}
      className="fixed inset-0 z-[9999] flex flex-col bg-black"
    >
      <div
        className="relative z-[10] flex shrink-0 items-center justify-end bg-[#0a120e] px-3 shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
        style={{
          paddingTop: "max(0.85rem, env(safe-area-inset-top, 0px))",
          paddingBottom: "0.85rem",
        }}
      >
        <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-caption tracking-[0.12em] text-ivory/50">
          Drag to pan · pinch to zoom
        </span>
        <button
          type="button"
          onClick={() => setExpanded(false)}
          aria-label="Close master plan"
          className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-ivory/40 bg-ivory/10 text-ivory"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <div className="relative min-h-0 flex-1">
        <ZoomableImage
          src={ASSETS.masterplan}
          alt="Nambiar District 25 master plan"
          className="h-full w-full"
        />
      </div>
    </motion.div>
  );

  const gate = (
    <motion.div
      key="master-plan-gate"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: duration.normal, ease: ease.cinematic }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-charcoal/70 p-4 backdrop-blur-md"
      onClick={() => setShowForm(false)}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: duration.cinematic, ease: ease.cinematic }}
        className="relative w-full max-w-[440px] rounded-[1.25rem] border border-[color-mix(in_srgb,var(--bronze)_20%,var(--stone)_80%)] bg-ivory p-7 shadow-[0_30px_80px_rgba(18,26,20,0.4)] sm:p-8"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="View the master plan"
      >
        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="inquiry-close"
          aria-label="Close"
        >
          <span className="inquiry-close-line inquiry-close-line--a" />
          <span className="inquiry-close-line inquiry-close-line--b" />
        </button>

        <span className="kicker mb-3">Master Plan</span>
        <h3 className="inquiry-headline pr-8">View the Master Plan</h3>
        <p className="inquiry-copy">
          Share your details to explore and zoom the full master plan.
        </p>

        <form onSubmit={handleGateSubmit} className="inquiry-form" noValidate>
          {GATE_FIELDS.map((field) => (
            <div key={field.id} className="form-field">
              <label htmlFor={`mp-${field.id}`} className="form-label">
                {field.label}
              </label>
              <input
                id={`mp-${field.id}`}
                name={field.id}
                type={field.type}
                required
                autoComplete={field.autoComplete}
                {...(field.id === "phone"
                  ? {
                      inputMode: "tel" as const,
                      maxLength: 15,
                      onChange: () => phoneError && setPhoneError(""),
                    }
                  : {})}
                className="form-input"
              />
              {field.id === "phone" && phoneError && (
                <p className="mt-1.5 text-[0.78rem] text-[#b23b3b]">{phoneError}</p>
              )}
            </div>
          ))}

          <button type="submit" className="btn-pill btn-solid mt-2 w-full justify-center">
            View Master Plan
          </button>
        </form>

        <p className="inquiry-footer">
          Or call us at{" "}
          <a href={SITE.phoneHref} className="text-bronze transition-colors hover:text-forest">
            {SITE.phone}
          </a>
        </p>
      </motion.div>
    </motion.div>
  );

  return (
    <SectionShell
      id="master-plan"
      chapter={chapter}
      tone="charcoal"
      innerClassName="!pb-10 md:!pb-12"
    >
      <div className="mb-8 md:mb-10 max-w-3xl">
        <TextReveal as="h2" className="h-section text-ivory">
          {masterPlan.headline}
        </TextReveal>
        <p className="mt-4 text-body text-champagne">{masterPlan.subheadline}</p>
      </div>

      <motion.button
        type="button"
        onClick={requestView}
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: duration.slow, ease: ease.out }}
        aria-label="View the master plan"
        className="group relative block w-full cursor-pointer overflow-hidden rounded-[var(--radius-card-lg)] border border-ivory/10 bg-black shadow-[var(--shadow-float)]"
      >
        <div className="relative aspect-[16/10] w-full sm:aspect-[16/9]">
          <HighQualityImage
            src={ASSETS.masterplan}
            alt="Nambiar District 25 master plan"
            fill
            unoptimized
            sizes="(max-width: 1024px) 100vw, 1200px"
            className="object-contain object-center p-2 md:p-3"
          />
          {/* Locked overlay — invite the visitor to unlock via the form */}
          {!unlocked && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/45 backdrop-blur-[2px] transition-colors group-hover:bg-black/55">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-ivory/30 bg-black/50 text-ivory">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="10" width="16" height="10" rx="2" />
                  <path d="M8 10V7a4 4 0 018 0v3" />
                </svg>
              </span>
              <span className="text-caption tracking-[0.12em] text-ivory/90">
                Submit the form to view &amp; zoom the master plan
              </span>
            </div>
          )}
          <span className="pointer-events-none absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full border border-ivory/15 bg-black/60 px-4 py-2 text-caption tracking-[0.08em] text-ivory/90 backdrop-blur-md transition-colors group-hover:border-champagne/50 group-hover:text-ivory">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
            {unlocked ? "Tap to expand & zoom" : "Unlock to explore"}
          </span>
        </div>
      </motion.button>

      {/* Portal to body — escapes SceneDirector transform + section overflow */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {showForm ? gate : null}
            {expanded ? viewer : null}
          </AnimatePresence>,
          document.body
        )}
    </SectionShell>
  );
}
