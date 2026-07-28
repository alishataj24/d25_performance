"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SITE } from "@/lib/constants";

/**
 * Thank-You page actions. If the visitor arrived via the "Download Brochure"
 * flow (?brochure=1), show a prominent Download button here — instead of a
 * focus-stealing auto-popup — so the Thank-You page is always seen first.
 */
export function ThankYouActions() {
  const params = useSearchParams();
  const isBrochure = params.get("brochure") === "1";

  return (
    <>
      {isBrochure && (
        <p className="mt-6 text-body text-ivory/70">Your brochure is ready.</p>
      )}
      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
        {isBrochure && (
          <a
            href={SITE.brochure}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill btn-gold"
          >
            Download Brochure
          </a>
        )}
        <Link
          href="/"
          className={isBrochure ? "btn-pill btn-ghost-light" : "btn-pill btn-gold"}
        >
          Back to Home
        </Link>
      </div>
    </>
  );
}
