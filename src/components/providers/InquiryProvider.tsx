"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { InquiryDialog } from "@/components/ui/InquiryDialog";
import { TimedLeadCapture } from "@/components/ui/TimedLeadCapture";
import type { InquiryType } from "@/components/ui/InquiryModal";

type Presentation = "modal" | "concierge";

interface InquiryContextType {
  openInquiry: (type?: InquiryType, presentation?: Presentation) => void;
  openConcierge: (type?: InquiryType) => void;
  closeInquiry: () => void;
}

const InquiryContext = createContext<InquiryContextType | null>(null);

export function useInquiry() {
  const ctx = useContext(InquiryContext);
  if (!ctx) throw new Error("useInquiry must be used within InquiryProvider");
  return ctx;
}

export function InquiryProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<InquiryType>("enquire");

  const openInquiry = useCallback((t: InquiryType = "enquire", _p?: Presentation) => {
    setType(t);
    setIsOpen(true);
  }, []);

  const openConcierge = useCallback((t: InquiryType = "enquire") => {
    openInquiry(t, "concierge");
  }, [openInquiry]);

  const closeInquiry = useCallback(() => setIsOpen(false), []);

  return (
    <InquiryContext.Provider value={{ openInquiry, openConcierge, closeInquiry }}>
      {children}
      <InquiryDialog isOpen={isOpen} onClose={closeInquiry} type={type} />
      <TimedLeadCapture suppressed={isOpen} />
    </InquiryContext.Provider>
  );
}
