# Portfolio — Agent Governance

## Operational Commands

패키지 매니저는 **bun**만 사용한다. npm, yarn, pnpm 사용 금지.

```bash
bun install          # 의존성 설치
bun run dev          # 개발 서버 (http://localhost:3000)
bun run build        # 프로덕션 빌드
bun run start        # 프로덕션 서버
bun run lint         # ESLint
```

ShadCN 컴포넌트 추가:

```bash
bunx shadcn@latest add <component>
```

## Project Context

개인 포트폴리오 사이트. 단순 이력서가 아니라 AI 시대의 **브랜딩 사이트**로 설계한다. 방문자에게 전문성, 취향, 사고방식이 전달되어야 한다.

**Tech Stack:** Next.js (App Router), ShadCN UI, Lucide React, Tailwind CSS v4, TypeScript

## Golden Rules

### Immutable

- Next.js 16은 학습 데이터와 API가 다를 수 있다. 코드 작성 전 `node_modules/next/dist/docs/` 가이드를 확인하고 deprecation을 따른다.
- API 키, 토큰, `.env` 값을 코드·커밋에 포함하지 않는다.
- 다크모드는 지원하지 않는다. 라이트 모드 단일 테마로 유지한다.

### Do's

- ShadCN UI 컴포넌트를 **우선** 사용하고, 없을 때만 커스텀 컴포넌트를 만든다.
- 아이콘은 **Lucide React**만 사용한다 (`lucide-react`).
- 인터랙션이 필요한 UI는 `"use client"` 컴포넌트로 분리하고, 페이지·레이아웃은 Server Component를 기본으로 유지한다.
- 스타일 병합은 `cn()` (`@/lib/utils`)을 사용한다.
- 콘텐츠·UI 텍스트는 한국어를 기본으로 한다. `lang="ko"`를 유지한다.
- 변경 범위는 요청된 작업에 한정한다. 무관한 리팩터링·스타일 변경을 하지 않는다.

### Don'ts

- ShadCN/Radix 동작을 우회하는 raw HTML 폼·버튼·다이얼로그를 새로 만들지 않는다.
- npm/yarn/pnpm 명령을 실행하거나 lockfile을 혼용하지 않는다.
- README·문서에 없는 내용을 AGENTS.md에 중복 기록하지 않는다.
- 장식적 이모지, 과도한 애니메이션, 시각적 노이즈를 추가하지 않는다.

## Design Principles

Apple 수준의 **깔끔함**과 Linear 수준의 **정돈된 UI**를 목표로 한다.

- 여백·타이포·정렬을 일관되게 유지한다. 요소마다 다른 간격·크기를 쓰지 않는다.
- 색상은 제한된 팔레트(배경, 전경, 포인트 1~2색)로 통제한다.
- Border, shadow, radius는 ShadCN 토큰(`--radius`, `--border`, `--muted` 등)을 따른다.
- 한 화면에 경쟁하는 시각 요소를 두지 않는다. CTA는 섹션당 하나를 원칙으로 한다.
- 커스텀 CSS는 Tailwind 유틸리티로 해결하고, 전역 CSS 추가는 최소화한다.

## Standards & References

- 경로 별칭: `@/*` → 프로젝트 루트
- 컴포넌트: `components/ui/` (ShadCN), `components/` (도메인·기능 컴포넌트)
- 페이지: `app/` (App Router)
- 커밋 메시지: 변경 목적을 1~2문장으로, `feat` / `fix` / `style` / `refactor` 접두 사용
- 규칙과 코드가 어긋나면 AGENTS.md 업데이트를 제안한다.

## Context Map

- **[App Router 페이지·레이아웃](./app/AGENTS.md)** — `page.tsx`, `layout.tsx`, metadata, 라우팅, Server/Client 경계.
- **[UI 컴포넌트·ShadCN](./components/AGENTS.md)** — ShadCN 추가·확장, Lucide, 재사용 컴포넌트 패턴.
