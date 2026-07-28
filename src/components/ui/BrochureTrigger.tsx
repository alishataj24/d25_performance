"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { SITE } from "@/lib/constants";

/**
 * On the Thank-You page, if the visitor arrived via the "Download Brochure"
 * flow (?brochure=1), open the brochure once. Runs after navigation so the
 * redirect is never blocked by a popup blocker mid-submit.
 */
export function BrochureTrigger() {
  const params = useSearchParams();
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    if (params.get("brochure") === "1") {
      fired.current = true;
      window.open(SITE.brochure, "_blank", "noopener,noreferrer");
    }
  }, [params]);

  return null;
}
