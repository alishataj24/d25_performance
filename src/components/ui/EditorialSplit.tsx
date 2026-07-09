"use client";

import { cn } from "@/lib/utils";

interface EditorialSplitProps {
  aside: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  stickyAside?: boolean;
}

export function EditorialSplit({
  aside,
  children,
  className,
  stickyAside = true,
}: EditorialSplitProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start",
        className
      )}
    >
      <div
        className={cn(
          "lg:col-span-5 min-w-0",
          stickyAside && "lg:sticky lg:top-36"
        )}
      >
        {aside}
      </div>
      <div className="lg:col-span-7 min-w-0">{children}</div>
    </div>
  );
}
