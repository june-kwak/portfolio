import Image from "next/image";

import { BlurFade } from "@/components/blur-fade";
import { Lens } from "@/components/lens";
import { MagicCard } from "@/components/magic-card";
import { Button } from "@/components/ui/button";
import { CommentSection } from "@/components/comment-section";
import { HeroBackground } from "@/components/hero-background";
import { LikeButton } from "@/components/like-button";
import { WorksGrid } from "@/components/works-grid";
import { works } from "@/lib/works";

const profile = {
  name: "JOOEUN",
  tagline: "삼성전자 UX 디자이너",
  // AI로 생성된 문구입니다.
  heroDescription:
    "복잡한 문제 속에서도 사람이 편안함을 느끼는 경험을 설계합니다. 사용자의 목소리를 듣고, 그것을 더 나은 제품 경험으로 옮기는 일이 저의 일이에요.",
  // AI로 생성된 문구입니다.
  intro:
    "안녕하세요, 주은입니다. 만나서 반가워요! 현재 삼성전자 MX 사업부에서 eSIM UX를 담당하고 있어요. 화면 너머의 맥락과 감정까지 함께 그리는 UX 디자이너로, 사용자가 무엇을 원하는지, 어디서 막히는지, 어떤 순간에 기분 좋아지는지 — 그 작은 단서들을 모아 더 따뜻하고 명확한 디지털 경험을 만들어 갑니다.",
  // AI로 생성된 문구입니다.
  career:
    "2013년부터 디자인 업무를 시작해 웹·모바일 서비스 기획, 사용자 조사, 프로토타이핑, 디자인 시스템 구축까지 폭넓게 경험했습니다. 작은 터치포인트 하나부터 전체 여정까지, 사용자 중심으로 생각하는 것이 저의 방식입니다.",
  contact: "010-1234-5678",
  email: "abc@gmail.com",
} as const;

const marqueeItems = [
  "User Research",
  "Prototyping",
  "Usability",
  "Design Systems",
  "Interaction Design",
  "Information Architecture",
];

function ScribbleHeart({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 48 48"
      fill="none"
      className={className}
    >
      <path
        d="M24 38C24 38 4 24 4 13C4 7 8 4 13 4C17 4 21 7 24 11C27 7 31 4 35 4C40 4 44 7 44 13C44 24 24 38 24 38Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ScribbleStar({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 40 40" fill="none" className={className}>
      <path
        d="M20 3L23 15H36L26 23L29 36L20 28L11 36L14 23L4 15H17L20 3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ScribbleUnderline({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 12"
      fill="none"
      className={className}
      preserveAspectRatio="none"
    >
      <path
        d="M2 8C20 2 40 10 60 6C80 2 100 9 118 5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="relative overflow-x-hidden bg-background text-ink">
      <section
        id="hero"
        aria-labelledby="hero-heading"
        className="relative flex min-h-[88vh] w-full flex-col items-center justify-center overflow-hidden px-6 py-20 text-center"
      >
        <HeroBackground />

        <ScribbleStar className="absolute left-6 top-16 z-10 size-8 rotate-12 text-blush-deep/50 sm:left-12 sm:size-10" />
        <ScribbleHeart className="absolute right-8 top-28 z-10 size-10 -rotate-6 text-blush-deep/40 sm:right-16 sm:size-12" />

        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center">

          <BlurFade delay={0.1} className="mb-8">
            <Lens
              size={110}
              zoomFactor={1.9}
              className="relative size-32 rounded-full border-2 border-blush-deep/20 bg-paper shadow-[0_4px_24px_oklch(0.62_0.18_350_/_15%)] sm:size-36"
            >
              <Image
                src="/hero-avatar.png"
                alt="주은 UX 디자이너 프로필"
                fill
                sizes="(max-width: 640px) 128px, 144px"
                className="object-cover object-top"
                priority
              />
            </Lens>
          </BlurFade>

          <BlurFade delay={0.2}>
            <p className="mb-3 text-xs tracking-[0.25em] text-blush-deep uppercase">
              Portfolio
            </p>
          </BlurFade>

          <BlurFade delay={0.3}>
            <div className="relative mb-4">
              <h1
                id="hero-heading"
                className="font-display text-6xl leading-none text-ink sm:text-8xl"
              >
                {profile.name}
              </h1>
              <ScribbleUnderline className="absolute -bottom-2 left-1/2 h-3 w-[70%] -translate-x-1/2 text-blush-deep/70" />
            </div>
          </BlurFade>

          <BlurFade delay={0.4}>
            <LikeButton />
          </BlurFade>

          <BlurFade delay={0.5}>
            <p className="mt-4 font-display text-2xl text-blush-deep sm:text-3xl">
              {profile.tagline}
            </p>
          </BlurFade>

          <BlurFade delay={0.6}>
            <p className="mt-6 max-w-lg text-sm leading-7 text-ink/75 sm:text-base">
              {profile.heroDescription}
            </p>
          </BlurFade>

          <BlurFade delay={0.7}>
            <Button
              asChild
              size="lg"
              className="mt-10 h-11 rounded-full border-2 border-blush-deep/20 bg-blush-deep px-8 text-sm tracking-wide text-paper shadow-[0_4px_0_oklch(0.52_0.16_350)] transition-transform hover:bg-blush-deep/90 active:translate-y-0.5 active:shadow-none"
            >
              <a href="#about">더 알아보기 ↓</a>
            </Button>
          </BlurFade>
        </div>
      </section>

      <div
        aria-hidden
        className="border-y border-blush-deep/10 bg-blush/40 py-3"
      >
        <div className="overflow-hidden whitespace-nowrap">
          <div className="marquee-track inline-flex gap-10 font-display text-xl text-blush-deep/80">
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <span key={`${item}-${index}`} className="inline-flex items-center gap-10">
                {item}
                <span className="text-blush-muted">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <section
        id="about"
        aria-labelledby="about-heading"
        className="relative mx-auto w-full max-w-3xl px-6 py-24 sm:py-32"
      >
        <ScribbleStar className="absolute -left-1 top-8 size-7 rotate-45 text-blush-deep/35" />

        <BlurFade>
          <MagicCard
            spotColor="oklch(0.88 0.1 350 / 35%)"
            spotSize={380}
            className="torn-paper -rotate-1 px-8 py-10 sm:px-12 sm:py-14"
          >
            <div className="rotate-1">
              <BlurFade delay={0.1}>
                <p className="font-display text-lg text-blush-deep">About me</p>
                <h2
                  id="about-heading"
                  className="mt-1 font-display text-4xl text-ink sm:text-5xl"
                >
                  소개
                </h2>
              </BlurFade>

              <BlurFade delay={0.2} className="mt-8 space-y-5 text-sm leading-7 text-ink/80 sm:text-base">
                <p>{profile.intro}</p>
                <p>{profile.career}</p>
              </BlurFade>

              <BlurFade delay={0.3} className="mt-10 inline-flex flex-wrap gap-3">
                <MagicCard
                  spotColor="oklch(0.84 0.14 345 / 45%)"
                  spotSize={180}
                  className="rotate-1 rounded-sm border border-blush-deep/15 bg-blush/50 px-5 py-3"
                >
                  <p className="font-display text-lg text-blush-deep">연락처</p>
                  <a
                    href={`tel:${profile.contact.replace(/-/g, "")}`}
                    className="mt-1 block text-sm text-ink/80 underline decoration-blush-muted decoration-wavy underline-offset-4 transition-colors hover:text-blush-deep"
                  >
                    {profile.contact}
                  </a>
                </MagicCard>
                <MagicCard
                  spotColor="oklch(0.84 0.14 345 / 45%)"
                  spotSize={180}
                  className="-rotate-1 rounded-sm border border-blush-deep/15 bg-blush/50 px-5 py-3"
                >
                  <p className="font-display text-lg text-blush-deep">이메일</p>
                  <a
                    href={`mailto:${profile.email}`}
                    className="mt-1 block text-sm text-ink/80 underline decoration-blush-muted decoration-wavy underline-offset-4 transition-colors hover:text-blush-deep"
                  >
                    {profile.email}
                  </a>
                </MagicCard>
              </BlurFade>
            </div>
          </MagicCard>
        </BlurFade>
      </section>

      <section
        id="works"
        aria-labelledby="works-heading"
        className="relative mx-auto w-full max-w-5xl px-6 py-24 sm:py-32"
      >
        <BlurFade>
          <p className="font-display text-lg text-blush-deep">Selected works</p>
          <h2
            id="works-heading"
            className="mt-1 font-display text-4xl text-ink sm:text-5xl"
          >
            작업물
          </h2>
        </BlurFade>
        <WorksGrid works={works} />
      </section>

      <CommentSection />
    </main>
  );
}
