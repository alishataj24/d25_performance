"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { getSceneDirection, sceneVariants, type SceneDirection } from "@/lib/sceneDirections";
import { duration, ease } from "@/lib/animations";

interface SceneDirectorProps {
  sceneId: string;
  direction?: SceneDirection;
  className?: string;
  children: React.ReactNode;
}

export function SceneDirector({
  sceneId,
  direction,
  className,
  children,
}: SceneDirectorProps) {
  const dir = direction ?? getSceneDirection(sceneId);
  const variants = sceneVariants[dir] ?? sceneVariants.fade;

  return (
    <motion.div
      data-scene={sceneId}
      data-scene-direction={dir}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: duration.slow, ease: ease.out }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
