"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeroPillProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
  showArrow?: boolean;
  delay?: number;
}

/** Luxury hardware CTA — never screams */
export function HeroPill({
  children,
  onClick,
  href,
  variant = "primary",
  className,
  showArrow = false,
  delay = 0,
}: HeroPillProps) {
  const base =
    "inline-flex items-center gap-3 px-7 py-3.5 md:px-8 md:py-4 text-[0.8125rem] md:text-[0.875rem] tracking-[0.06em] font-normal transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer rounded-full";

  const styles = {
    primary:
      "bg-forest/90 text-ivory border border-forest/60 hover:bg-forest hover:-translate-y-px hover:shadow-lift backdrop-blur-sm",
    secondary:
      "bg-ivory/8 text-ivory border border-ivory/25 hover:border-ivory/45 hover:bg-ivory/12 backdrop-blur-sm group",
  };

  const content = (
    <>
      <span>{children}</span>
      {showArrow && (
        <motion.span
          className="inline-block opacity-70 group-hover:translate-x-1 transition-transform duration-700"
          aria-hidden
        >
          →
        </motion.span>
      )}
    </>
  );

  const motionProps = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const, delay },
  };

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(base, styles[variant], className)}
        {...motionProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={cn(base, styles[variant], className)}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
}
