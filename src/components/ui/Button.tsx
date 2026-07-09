"use client";

import { cn } from "@/lib/utils";

interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost" | "invitation";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  showArrow?: boolean;
}

/** Luxury hardware — large, restrained, intentional hover */
const variants = {
  primary:
    "bg-forest text-ivory border border-forest/80 shadow-lift hover:shadow-depth hover:-translate-y-px hover:bg-forest-light",
  secondary:
    "bg-transparent text-forest border border-forest/25 hover:border-bronze/60 hover:bg-forest/[0.03] group",
  ghost:
    "bg-transparent text-ivory border border-ivory/25 hover:border-ivory/50 hover:bg-ivory/[0.04]",
  invitation:
    "bg-forest text-ivory border border-forest/80 shadow-lift hover:shadow-depth hover:-translate-y-px hover:bg-forest-light normal-case tracking-[0.04em] font-normal",
};

const sizes = {
  sm: "px-6 py-3 text-[0.8125rem]",
  md: "px-9 py-4 text-[0.875rem]",
  lg: "px-11 py-[1.125rem] text-[0.9375rem]",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  onClick,
  type = "button",
  disabled,
  showArrow = false,
}: ButtonProps) {
  const isSecondary = variant === "secondary";

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "btn-luxury inline-flex items-center justify-center gap-3",
        "font-medium transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "cursor-pointer disabled:opacity-40 disabled:pointer-events-none",
        variant === "invitation" || variant === "primary" ? "" : "uppercase tracking-[0.14em]",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
      {showArrow && isSecondary && (
        <span
          className="inline-block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
          aria-hidden
        >
          →
        </span>
      )}
    </button>
  );
}
