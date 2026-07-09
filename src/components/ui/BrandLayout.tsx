import { cn } from "@/lib/utils";
import { layoutClasses } from "@/lib/design-system";

type BrandContainerVariant = "cinematic" | "editorial" | "reading" | "form" | "narrow";

const variantClass: Record<BrandContainerVariant, string> = {
  cinematic: layoutClasses.cinematic,
  editorial: layoutClasses.editorial,
  reading: layoutClasses.reading,
  form: layoutClasses.form,
  narrow: "w-full max-w-[520px]",
};

interface BrandContainerProps {
  variant?: BrandContainerVariant;
  className?: string;
  children: React.ReactNode;
  as?: "div" | "section" | "article" | "header" | "footer";
}

/** Width rhythm — each section decides its own container */
export function BrandContainer({
  variant = "editorial",
  className,
  children,
  as: Tag = "div",
}: BrandContainerProps) {
  return <Tag className={cn(variantClass[variant], className)}>{children}</Tag>;
}

interface EditorialGridProps {
  className?: string;
  children: React.ReactNode;
  bleed?: boolean;
}

/** 12-column editorial grid — luxury magazine, not Bootstrap */
export function EditorialGrid({ className, children, bleed }: EditorialGridProps) {
  return (
    <div
      className={cn(
        "editorial-grid",
        bleed && "editorial-grid-bleed",
        className
      )}
    >
      {children}
    </div>
  );
}

interface GridColumnProps {
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  start?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  className?: string;
  children: React.ReactNode;
}

const spanMap: Record<number, string> = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
  7: "col-span-7",
  8: "col-span-8",
  9: "col-span-9",
  10: "col-span-10",
  11: "col-span-11",
  12: "col-span-12",
};

export function GridColumn({ span = 12, start, className, children }: GridColumnProps) {
  return (
    <div
      className={cn(
        spanMap[span],
        start && `col-start-${start}`,
        className
      )}
    >
      {children}
    </div>
  );
}
