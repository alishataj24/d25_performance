"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { HighQualityImage } from "@/components/ui/HighQualityImage";
import { SITE, VOICE } from "@/lib/constants";
import { ASSETS } from "@/lib/assets";
import { ease, duration } from "@/lib/animations";
import { useHeroExperience } from "@/components/providers/HeroExperienceProvider";

/** Bump key when behaviour changes so prior dismissals don’t hide the popup forever in a tab */
const STORAGE_KEY = "d25-lead-capture-v2";
const DELAY_MS = 5000;

const FIELDS = [
  { id: "name", type: "text", label: "Name", autoComplete: "name" },
  { id: "mobile", type: "tel", label: "Mobile", autoComplete: "tel" },
  { id: "email", type: "email", label: "Email", autoComplete: "email" },
] as const;

type TimedLeadCaptureProps = {
  /** When true, suppress the timed popup (e.g. another dialog is open) */
  suppressed?: boolean;
};

function wasDismissed() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function markDismissed() {
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* ignore */
  }
}

export function TimedLeadCapture({ suppressed = false }: TimedLeadCaptureProps) {
  const { loadingComplete } = useHeroExperience();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const armed = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 5s after the hero/loading experience is ready — not while the splash is still up
  useEffect(() => {
    if (!mounted || !loadingComplete || suppressed || armed.current) return;
    if (wasDismissed()) return;

    armed.current = true;
    const timer = window.setTimeout(() => {
      if (wasDismissed()) return;
      setOpen(true);
    }, DELAY_MS);

    return () => {
      window.clearTimeout(timer);
      // Allow re-arm only if we cleaned up before firing (e.g. strict mode / suppress)
      armed.current = false;
    };
  }, [mounted, loadingComplete, suppressed]);

  useEffect(() => {
    if (suppressed) setOpen(false);
  }, [suppressed]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const dismiss = () => {
    setOpen(false);
    setSubmitted(false);
    markDismissed();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    markDismissed();
    window.setTimeout(() => {
      setSubmitted(false);
      setOpen(false);
    }, 2200);
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="lead-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration.normal, ease: ease.cinematic }}
            className="fixed inset-0 z-[9000] bg-charcoal/60 backdrop-blur-md"
            onClick={dismiss}
            aria-hidden
          />

          <motion.div
            key="lead-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-capture-title"
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: duration.cinematic, ease: ease.cinematic }}
            className="fixed inset-0 z-[9001] flex items-center justify-center p-4 sm:p-8 pointer-events-none"
          >
            <div
              className="pointer-events-auto relative grid w-full max-w-[860px] max-h-[min(920px,100dvh-2rem)] overflow-y-auto overflow-x-hidden rounded-[1.5rem] border border-[color-mix(in_srgb,var(--bronze)_20%,var(--stone)_80%)] bg-ivory shadow-[0_30px_80px_rgba(18,26,20,0.4)] md:grid-cols-[0.85fr_1fr]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative hidden min-h-[420px] overflow-hidden md:block">
                <HighQualityImage
                  src={ASSETS.renders.inquiryPanel}
                  alt="Nambiar District 25 residences"
                  fill
                  unoptimized
                  sizes="360px"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(17,32,26,0.55)_0%,rgba(17,32,26,0.35)_45%,rgba(17,32,26,0.85)_100%)]" />
                <div className="relative z-[1] flex h-full flex-col justify-between p-8">
                  <HighQualityImage
                    src={ASSETS.logo}
                    alt="Nambiar District 25"
                    width={723}
                    height={266}
                    unoptimized
                    priority
                    className="h-[5.25rem] w-auto max-w-[95%] object-contain object-left brightness-0 invert opacity-95"
                  />
                  <div>
                    <p className="bronze-line mb-5 w-10" />
                    <p className="text-[clamp(1.6rem,2.4vw,2rem)] font-light leading-[1.15] tracking-[-0.01em] text-ivory">
                      Live the SOHO Life
                      <br />
                      in Bengaluru.
                    </p>
                    <p className="mt-4 text-[0.8rem] leading-relaxed text-ivory/70">
                      Enquire now or download the brochure — District 25 Phase 3.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative p-7 sm:p-9">
                <button
                  type="button"
                  onClick={dismiss}
                  className="inquiry-close"
                  aria-label="Close"
                >
                  <span className="inquiry-close-line inquiry-close-line--a" />
                  <span className="inquiry-close-line inquiry-close-line--b" />
                </button>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex min-h-[280px] flex-col items-center justify-center text-center"
                  >
                    <div className="bronze-line mx-auto mb-6 w-12" />
                    <p className="inquiry-headline mb-2 text-center">
                      {VOICE.modal.thankTitle}
                    </p>
                    <p className="inquiry-copy text-center">{VOICE.modal.thankBody}</p>
                  </motion.div>
                ) : (
                  <>
                    <h2 id="lead-capture-title" className="inquiry-headline pr-8">
                      Express Your Interest
                    </h2>
                    <p className="inquiry-copy">
                      Please enter your details to know more about Nambiar District 25 —
                      enquire now or download the brochure.
                    </p>

                    <form onSubmit={handleSubmit} className="inquiry-form">
                      {FIELDS.map((field) => (
                        <div key={field.id} className="form-field">
                          <label htmlFor={`lead-${field.id}`} className="form-label">
                            {field.label}
                          </label>
                          <input
                            id={`lead-${field.id}`}
                            name={field.id}
                            type={field.type}
                            required
                            autoComplete={field.autoComplete}
                            className="form-input"
                          />
                        </div>
                      ))}

                      <Button
                        type="submit"
                        variant="invitation"
                        size="md"
                        className="inquiry-submit w-full"
                      >
                        Submit
                      </Button>
                    </form>

                    <p className="inquiry-footer-link">
                      <a
                        href={SITE.brochure}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-bronze transition-colors hover:text-forest"
                      >
                        Or download the brochure
                      </a>
                    </p>

                    <p className="inquiry-footer">
                      {VOICE.modal.phoneNote}{" "}
                      <a
                        href={SITE.phoneHref}
                        className="text-bronze transition-colors hover:text-forest"
                      >
                        {SITE.phone}
                      </a>
                    </p>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
