"use client";

import { useCallback, useRef, type MouseEvent } from "react";

import { cn } from "@/lib/utils";

type MagicCardProps = {
  children: React.ReactNode;
  className?: string;
  /** 스팟라이트 색상 */
  spotColor?: string;
  /** 스팟라이트 크기(px) */
  spotSize?: number;
};

export function MagicCard({
  children,
  className,
  spotColor = "oklch(0.92 0.08 350 / 40%)",
  spotSize = 300,
}: MagicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const updateSpot = useCallback(
    (x: number, y: number) => {
      if (!overlayRef.current) return;
      overlayRef.current.style.background = `radial-gradient(${spotSize}px circle at ${x}px ${y}px, ${spotColor}, transparent 65%)`;
    },
    [spotColor, spotSize],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const { left, top } = cardRef.current.getBoundingClientRect();
      updateSpot(e.clientX - left, e.clientY - top);
    },
    [updateSpot],
  );

  const handleMouseLeave = useCallback(() => {
    if (!overlayRef.current) return;
    overlayRef.current.style.background = "transparent";
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("group relative overflow-hidden", className)}
    >
      {/* 마우스 추적 스팟라이트 */}
      <div
        ref={overlayRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 transition-[background] duration-100"
      />
      <div className="relative z-20">{children}</div>
    </div>
  );
}
