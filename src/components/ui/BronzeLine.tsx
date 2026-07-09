import { cn } from "@/lib/utils";

interface BronzeLineProps {
  className?: string;
  /** Draw animation origin */
  origin?: "left" | "center" | "right";
  width?: "short" | "medium" | "full";
}

const widthMap = {
  short: "w-12",
  medium: "w-24",
  full: "w-full",
};

/** Architectural divider — never a plain horizontal rule */
export function BronzeLine({
  className,
  origin = "left",
  width = "short",
}: BronzeLineProps) {
  return (
    <span
      className={cn(
        "bronze-line block",
        widthMap[width],
        origin === "center" && "mx-auto origin-center",
        origin === "right" && "ml-auto origin-right",
        origin === "left" && "origin-left",
        className
      )}
      aria-hidden
    />
  );
}

interface FadeDividerProps {
  className?: string;
}

/** Soft gradient separator — whitespace as luxury */
export function FadeDivider({ className }: FadeDividerProps) {
  return <div className={cn("fade-divider", className)} aria-hidden />;
}
