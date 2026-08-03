"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { isValidIndianMobile, PHONE_ERROR } from "@/lib/validation";

const FIELDS = [
  { id: "name", type: "text", label: "Your name", autoComplete: "name" },
  { id: "email", type: "email", label: "Email address", autoComplete: "email" },
  { id: "phone", type: "tel", label: "Phone number", autoComplete: "tel" },
] as const;

/** Enquiry form embedded directly in a section (no modal) — warm cream card. */
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
    <div className="relative overflow-hidden rounded-[var(--radius-card-lg)] border border-bronze/20 bg-[#f7f1e6] p-7 shadow-[var(--shadow-float)] sm:p-9">
      <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-bronze/70 to-transparent" aria-hidden />

      <div className="relative z-[1]">
        <span className="kicker mb-4">Enquire Now</span>
        <p className="text-[0.95rem] leading-relaxed text-grey-600">
          Share your details and we&apos;ll get back to you shortly.
        </p>

        <form onSubmit={handleSubmit} className="inquiry-form mt-7" noValidate>
          {FIELDS.map((field) => (
            <div key={field.id} className="form-field">
              <label htmlFor={`inline-${field.id}`} className="form-label">
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
                className="form-input"
              />
              {field.id === "phone" && phoneError && (
                <p className="mt-1.5 text-[0.78rem] text-[#b23b3b]">{phoneError}</p>
              )}
            </div>
          ))}

          <button type="submit" className="btn-pill btn-solid mt-2 w-full justify-center">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
