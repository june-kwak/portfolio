"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

type BlurFadeProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  blur?: string;
  className?: string;
};

const variants: Variants = {
  hidden: ({ yOffset, blur }: { yOffset: number; blur: string }) => ({
    y: yOffset,
    opacity: 0,
    filter: `blur(${blur})`,
  }),
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
  },
};

export function BlurFade({
  children,
  delay = 0,
  duration = 0.5,
  yOffset = 12,
  blur = "8px",
  className,
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={{ yOffset, blur }}
      variants={variants}
      transition={{
        delay,
        duration,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      {children}
    </motion.div>
  );
}
