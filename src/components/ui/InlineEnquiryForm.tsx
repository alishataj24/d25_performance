"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SITE } from "@/lib/constants";
import { isValidIndianMobile, PHONE_ERROR } from "@/lib/validation";

const FIELDS = [
  { id: "name", type: "text", label: "Your name", autoComplete: "name" },
  { id: "email", type: "email", label: "Email address", autoComplete: "email" },
  { id: "phone", type: "tel", label: "Phone number", autoComplete: "tel" },
] as const;

/** Enquiry form embedded directly in a section (no modal) — dark premium card. */
export function InlineEnquiryForm() {
  const router = useRouter();
  const [phoneError, setPhoneError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const phone = (form.elements.namedItem("phone") as HTMLInputElement | null)?.value ?? "";

    if (!isValidIndianMobile(phone)) {
      setPhoneError(PHONE_ERROR);
      (form.elements.namedItem("phone") as HTMLInputElement | null)?.focus();
      return;
    }
    setPhoneError("");
    router.push("/thank-you");
  };

  return (
    <div className="relative overflow-hidden rounded-[var(--radius-card-lg)] bg-canvas-deep p-7 shadow-[var(--shadow-float)] sm:p-9">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_80%_0%,rgba(122,92,50,0.16),transparent_60%)]" />

      <div className="relative z-[1]">
        <span className="kicker !text-champagne mb-4">Enquire Now</span>
        <p className="text-[0.95rem] leading-relaxed text-ivory/65">
          Share your details and we&apos;ll get back to you shortly.
        </p>

        <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-6" noValidate>
          {FIELDS.map((field) => (
            <div key={field.id} className="flex flex-col gap-1.5">
              <label
                htmlFor={`inline-${field.id}`}
                className="text-[0.625rem] uppercase tracking-[0.18em] text-champagne/70"
              >
                {field.label}
              </label>
              <input
                id={`inline-${field.id}`}
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
                className="w-full border-b border-ivory/20 bg-transparent pb-2 pt-1 text-[0.95rem] text-ivory outline-none transition-colors placeholder:text-ivory/30 focus:border-champagne"
              />
              {field.id === "phone" && phoneError && (
                <p className="mt-1 text-[0.78rem] text-[#e08a8a]">{phoneError}</p>
              )}
            </div>
          ))}

          <button type="submit" className="btn-pill btn-gold mt-2 w-full justify-center">
            Submit
          </button>
        </form>

        <p className="mt-6 text-center text-[0.85rem] text-ivory/55">
          Or call us at{" "}
          <a href={SITE.phoneHref} className="text-champagne transition-colors hover:text-gold">
            {SITE.phone}
          </a>
        </p>
      </div>
    </div>
  );
}
