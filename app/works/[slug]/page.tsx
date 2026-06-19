import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";

import { BlurFade } from "@/components/blur-fade";
import { Button } from "@/components/ui/button";
import { getAllSlugs, getWork } from "@/lib/works";

type WorkDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = getWork(slug);

  if (!work) {
    return { title: "작업물을 찾을 수 없습니다" };
  }

  return {
    title: `${work.title} | 주은`,
    description: work.description,
  };
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const work = getWork(slug);

  if (!work) {
    notFound();
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-ink">
      <div className="mx-auto w-full max-w-3xl px-6 py-12 sm:py-16">
        <BlurFade>
          <Link
            href="/#works"
            className="inline-flex items-center gap-1.5 text-sm text-ink/60 transition-colors hover:text-blush-deep"
          >
            ← 모든 작업물 보기
          </Link>
        </BlurFade>

        <BlurFade delay={0.1} className="relative mt-8 aspect-[16/9] overflow-hidden rounded-lg border border-blush-deep/15 bg-blush/20 shadow-[0_8px_32px_oklch(0.62_0.18_350_/_12%)]">
          <Image
            src={work.coverImage}
            alt={work.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </BlurFade>

        <BlurFade delay={0.2} className="mt-8">
          <p className="font-display text-lg text-blush-deep">Works</p>
          <h1 className="mt-1 font-display text-4xl text-ink sm:text-5xl">
            {work.title}
          </h1>
          <p className="mt-3 text-sm text-ink/60">{work.description}</p>
        </BlurFade>

        <BlurFade delay={0.3} className="mt-8 whitespace-pre-line text-sm leading-7 text-ink/80 sm:text-base">
          {work.body}
        </BlurFade>

        {work.links.length > 0 && (
          <BlurFade delay={0.4} className="mt-10 flex flex-wrap gap-3">
            {work.links.map((link) => (
              <Button
                key={link.url}
                asChild
                variant="outline"
                className="rounded-full border-blush-deep/25 bg-paper/80 text-ink hover:bg-blush/40"
              >
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.label}
                  <ExternalLink className="size-3.5" />
                </a>
              </Button>
            ))}
          </BlurFade>
        )}
      </div>
    </main>
  );
}
