"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { HighQualityImage } from "@/components/ui/HighQualityImage";
import { SITE, VOICE } from "@/lib/constants";
import { ASSETS } from "@/lib/assets";
import { ease, duration } from "@/lib/animations";
import type { InquiryType } from "@/components/ui/InquiryModal";

interface InquiryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  type?: InquiryType;
}

const modalCopy = VOICE.modal;

const FIELDS = [
  { id: "name", type: "text", label: "Your name", autoComplete: "name" },
  { id: "email", type: "email", label: "Email address", autoComplete: "email" },
  { id: "phone", type: "tel", label: "Phone number", autoComplete: "tel" },
] as const;

export function InquiryDialog({
  isOpen,
  onClose,
  type = "enquire",
}: InquiryDialogProps) {
  const [submitted, setSubmitted] = useState(false);
  const { title, subtitle } = modalCopy[type];

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) setSubmitted(false);
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (type === "brochure") {
      window.open(SITE.brochure, "_blank", "noopener,noreferrer");
    }
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration.normal, ease: ease.cinematic }}
            className="fixed inset-0 z-[150] bg-charcoal/60 backdrop-blur-md"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: duration.cinematic, ease: ease.cinematic }}
            className="fixed inset-0 z-[155] flex items-center justify-center p-4 sm:p-8 pointer-events-none"
            role="dialog"
            aria-modal="true"
            aria-labelledby="inquiry-title"
          >
            <div
              className="pointer-events-auto relative grid w-full max-w-[860px] overflow-hidden rounded-[1.5rem] border border-[color-mix(in_srgb,var(--bronze)_20%,var(--stone)_80%)] bg-ivory shadow-[0_30px_80px_rgba(18,26,20,0.4)] md:grid-cols-[0.85fr_1fr]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left — cinematic panel */}
              <div className="relative hidden md:block overflow-hidden">
                <HighQualityImage
                  src={ASSETS.renders.lifeInside}
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
                    <p className="bronze-line w-10 mb-5" />
                    <p className="text-[clamp(1.6rem,2.4vw,2rem)] font-light leading-[1.15] tracking-[-0.01em] text-ivory">
                      Live the SOHO Life
                      <br />
                      in Bengaluru.
                    </p>
                    <p className="mt-4 text-[0.8rem] leading-relaxed text-ivory/70">
                      District 25 Phase 3.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right — form panel */}
              <div className="relative p-7 sm:p-9">
                <button
                  type="button"
                  onClick={onClose}
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
                    className="flex min-h-[360px] flex-col items-center justify-center text-center"
                  >
                    <div className="bronze-line w-12 mx-auto mb-6" />
                    <p className="inquiry-headline text-center mb-2">{modalCopy.thankTitle}</p>
                    <p className="inquiry-copy text-center">{modalCopy.thankBody}</p>
                  </motion.div>
                ) : (
                  <>
                    <p className="inquiry-eyebrow">{VOICE.cta.connect}</p>
                    <h2 id="inquiry-title" className="inquiry-headline pr-8">
                      {title}
                    </h2>
                    <p className="inquiry-copy">{subtitle}</p>

                    <form onSubmit={handleSubmit} className="inquiry-form">
                      {FIELDS.map((field) => (
                        <div key={field.id} className="form-field">
                          <label htmlFor={`inquiry-${field.id}`} className="form-label">
                            {field.label}
                          </label>
                          <input
                            id={`inquiry-${field.id}`}
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
                        {modalCopy.submit}
                      </Button>
                    </form>

                    {type === "brochure" && (
                      <p className="inquiry-footer-link">
                        <a
                          href={SITE.brochure}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-bronze hover:text-forest transition-colors"
                        >
                          {modalCopy.brochure.directLink}
                        </a>
                      </p>
                    )}

                    <p className="inquiry-footer">
                      {modalCopy.phoneNote}{" "}
                      <a href={SITE.phoneHref} className="text-bronze hover:text-forest transition-colors">
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
    </AnimatePresence>
  );
}
