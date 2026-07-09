"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp, staggerContainer } from "@/lib/animations";

interface EditorialListProps {
  items: readonly string[];
  className?: string;
  light?: boolean;
  columns?: 1 | 2;
}

export function EditorialList({
  items,
  className,
  light = false,
  columns = 2,
}: EditorialListProps) {
  return (
    <motion.ul
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-5%" }}
      className={cn(
        columns === 2 ? "editorial-list-2col" : "editorial-list",
        className
      )}
    >
      {items.map((item, i) => (
        <motion.li
          key={item}
          variants={fadeUp}
          className={cn(
            "editorial-list-item group",
            light && "editorial-list-item-light"
          )}
        >
          <span className="editorial-list-index">{String(i + 1).padStart(2, "0")}</span>
          <span className="editorial-list-text">{item}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
}
