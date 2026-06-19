"use client";

import Image from "next/image";
import gsap from "gsap";
import { useEffect, useRef } from "react";

type LightSpotRefs = {
  primary: HTMLDivElement;
  secondary: HTMLDivElement;
};

function bindLightSpot(
  container: HTMLDivElement,
  spots: LightSpotRefs,
  durations: { primary: number; secondary: number },
) {
  const setPrimaryX = gsap.quickTo(spots.primary, "x", {
    duration: durations.primary,
    ease: "power3.out",
  });
  const setPrimaryY = gsap.quickTo(spots.primary, "y", {
    duration: durations.primary,
    ease: "power3.out",
  });
  const setSecondaryX = gsap.quickTo(spots.secondary, "x", {
    duration: durations.secondary,
    ease: "power2.out",
  });
  const setSecondaryY = gsap.quickTo(spots.secondary, "y", {
    duration: durations.secondary,
    ease: "power2.out",
  });

  const centerSpots = () => {
    const { width, height } = container.getBoundingClientRect();
    const centerX = width / 2;
    const centerY = height / 2;

    gsap.set([spots.primary, spots.secondary], {
      x: centerX,
      y: centerY,
      xPercent: -50,
      yPercent: -50,
    });
  };

  centerSpots();

  const moveSpots = (clientX: number, clientY: number) => {
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    setPrimaryX(x);
    setPrimaryY(y);
    setSecondaryX(x);
    setSecondaryY(y);
  };

  const onMouseMove = (event: MouseEvent) => {
    moveSpots(event.clientX, event.clientY);
  };

  const onTouchMove = (event: TouchEvent) => {
    const touch = event.touches[0];
    if (!touch) return;
    moveSpots(touch.clientX, touch.clientY);
  };

  container.addEventListener("mousemove", onMouseMove);
  container.addEventListener("touchmove", onTouchMove, { passive: true });
  window.addEventListener("resize", centerSpots);

  return () => {
    container.removeEventListener("mousemove", onMouseMove);
    container.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("resize", centerSpots);
  };
}

export function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const primarySpotRef = useRef<HTMLDivElement>(null);
  const secondarySpotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const primary = primarySpotRef.current;
    const secondary = secondarySpotRef.current;

    if (!container || !primary || !secondary) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    return bindLightSpot(
      container,
      { primary, secondary },
      { primary: 0.7, secondary: 1.4 },
    );
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0" aria-hidden>
      <Image
        src="/hero-mesh-gradient.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* 메인 라이트 스팟 — 밝고 선명하게 */}
        <div
          ref={primarySpotRef}
          className="absolute left-0 top-0 size-[min(60vw,480px)] rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.99 0.03 350 / 85%) 0%, oklch(0.94 0.08 350 / 55%) 35%, oklch(0.86 0.12 340 / 20%) 60%, transparent 80%)",
          }}
        />
        {/* 보조 라이트 스팟 — 따뜻한 틴트, 레이어드 깊이감 */}
        <div
          ref={secondarySpotRef}
          className="absolute left-0 top-0 size-[min(80vw,680px)] rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.92 0.14 330 / 50%) 0%, oklch(0.80 0.16 345 / 28%) 40%, transparent 72%)",
          }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-paper/20 via-paper/50 to-background/85" />
    </div>
  );
}
