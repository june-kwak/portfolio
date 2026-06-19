"use client";

import {
  useCallback,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";

type LensProps = {
  children: ReactNode;
  /** 렌즈 원 직경(px) */
  size?: number;
  /** 확대 배율 */
  zoomFactor?: number;
  className?: string;
};

export function Lens({
  children,
  size = 120,
  zoomFactor = 1.8,
  className,
}: LensProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - left, y: e.clientY - top });
  }, []);

  const half = size / 2;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className={cn("relative cursor-none overflow-hidden", className)}
    >
      {/* 원본 콘텐츠 */}
      {children}

      {/* 렌즈 레이어 */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="lens"
            aria-hidden
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="pointer-events-none absolute"
            style={{
              width: size,
              height: size,
              left: pos.x - half,
              top: pos.y - half,
              borderRadius: "50%",
              overflow: "hidden",
              boxShadow:
                "0 0 0 2px oklch(0.62 0.18 350 / 40%), 0 8px 24px oklch(0.28 0.04 320 / 20%)",
              zIndex: 30,
            }}
          >
            {/* 확대된 이미지 */}
            <div
              style={{
                width: "100%",
                height: "100%",
                transform: `scale(${zoomFactor})`,
                transformOrigin: `${pos.x}px ${pos.y}px`,
              }}
            >
              {children}
            </div>

            {/* 광택 하이라이트 */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 35% 30%, oklch(1 0 0 / 22%) 0%, transparent 60%)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
