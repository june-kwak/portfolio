"use client";

import Image from "next/image";
import Link from "next/link";

import { BlurFade } from "@/components/blur-fade";
import { MagicCard } from "@/components/magic-card";
import type { Work } from "@/lib/works";

type WorksGridProps = {
  works: Work[];
};

export function WorksGrid({ works }: WorksGridProps) {
  return (
    <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {works.map((work, index) => (
        <li key={work.slug}>
          <BlurFade delay={0.1 + index * 0.05}>
            <Link href={`/works/${work.slug}`} className="block h-full">
              <MagicCard
                spotColor="oklch(0.86 0.12 350 / 40%)"
                spotSize={260}
                className="h-full overflow-hidden rounded-lg border border-blush-deep/15 bg-paper shadow-[0_4px_24px_oklch(0.62_0.18_350_/_10%)] transition-transform hover:-translate-y-0.5"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-blush/30">
                  <Image
                    src={work.thumbnail}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="px-5 py-4">
                  <h3 className="font-display text-xl text-ink">{work.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-ink/70">
                    {work.description}
                  </p>
                </div>
              </MagicCard>
            </Link>
          </BlurFade>
        </li>
      ))}
    </ul>
  );
}
