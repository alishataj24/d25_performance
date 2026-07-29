"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";
import { isValidIndianMobile, PHONE_ERROR } from "@/lib/validation";

const FIELDS = [
  { id: "name", type: "text", label: "Your name", autoComplete: "name" },
  { id: "email", type: "email", label: "Email address", autoComplete: "email" },
  { id: "phone", type: "tel", label: "Phone number", autoComplete: "tel" },
] as const;

/** Enquiry form embedded directly in a section (no modal). */
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
    <div className="p-card p-6 sm:p-8">
      <h3 className="inquiry-headline">Enquire Now</h3>
      <p className="inquiry-copy">Share your details and we&apos;ll get back to you shortly.</p>

      <form onSubmit={handleSubmit} className="inquiry-form" noValidate>
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

        <Button type="submit" variant="invitation" size="md" className="inquiry-submit w-full">
          Submit
        </Button>
      </form>

      <p className="inquiry-footer">
        Or call us at{" "}
        <a href={SITE.phoneHref} className="text-bronze hover:text-forest transition-colors">
          {SITE.phone}
        </a>
      </p>
    </div>
  );
}
