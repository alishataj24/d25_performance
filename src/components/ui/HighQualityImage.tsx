import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

/** Premium image — max JPEG/WebP quality, sharp rendering */
export const IMAGE_QUALITY = 95;

interface HighQualityImageProps extends Omit<ImageProps, "quality"> {
  quality?: number;
}

export function HighQualityImage({
  quality = IMAGE_QUALITY,
  className,
  fill,
  ...props
}: HighQualityImageProps) {
  return (
    <Image
      quality={quality}
      fill={fill}
      className={cn(fill && "object-cover", "img-luxury", className)}
      {...props}
    />
  );
}
