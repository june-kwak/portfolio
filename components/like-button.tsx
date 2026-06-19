"use client";

import { useCallback, useState, type CSSProperties } from "react";
import { Heart } from "lucide-react";

import { cn } from "@/lib/utils";

type FloatingHeart = {
  id: number;
  x: number;
  rotate: number;
  scale: number;
};

export function LikeButton() {
  const [count, setCount] = useState(0);
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [isPopping, setIsPopping] = useState(false);

  const handleClick = useCallback(() => {
    setCount((prev) => prev + 1);
    setIsPopping(true);

    const id = Date.now() + Math.random();
    const floatingHeart: FloatingHeart = {
      id,
      x: (Math.random() - 0.5) * 100,
      rotate: (Math.random() - 0.5) * 50,
      scale: 0.8 + Math.random() * 0.6,
    };

    setHearts((prev) => [...prev, floatingHeart]);

    window.setTimeout(() => setIsPopping(false), 320);
    window.setTimeout(() => {
      setHearts((prev) => prev.filter((heart) => heart.id !== id));
    }, 950);
  }, []);

  return (
    <div className="relative mt-4 flex justify-center">
      <button
        type="button"
        onClick={handleClick}
        aria-label={`좋아요 ${count}개`}
        className="group inline-flex items-center gap-2 rounded-full border border-blush-deep/20 bg-paper/80 px-4 py-2 text-blush-deep shadow-[0_2px_12px_oklch(0.62_0.18_350_/_12%)] transition-transform hover:scale-105 hover:bg-blush/40 active:scale-95"
      >
        <Heart
          className={cn(
            "size-5 transition-transform duration-300",
            count > 0 && "fill-blush-deep text-blush-deep",
            isPopping && "heart-pop",
          )}
          aria-hidden
        />
        <span className="font-display text-lg leading-none">좋아요</span>
        <span
          className={cn(
            "min-w-5 font-display text-lg leading-none tabular-nums transition-transform duration-200",
            isPopping && "scale-125",
          )}
        >
          {count}
        </span>
      </button>

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-24 w-32 -translate-x-1/2"
      >
        {hearts.map((heart) => (
          <span
            key={heart.id}
            className="floating-heart absolute left-1/2 top-1/2 text-blush-deep"
            style={
              {
                "--heart-x": `${heart.x}px`,
                "--heart-rotate": `${heart.rotate}deg`,
                "--heart-scale": heart.scale,
              } as CSSProperties
            }
          >
            <Heart className="size-5 fill-blush-deep" />
          </span>
        ))}
      </div>
    </div>
  );
}
