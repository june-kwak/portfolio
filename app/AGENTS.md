# App Router — Agent Rules

## Module Context

Next.js App Router 기반 페이지·레이아웃·전역 스타일을 담당한다. 브랜딩 사이트의 섹션 구조와 SEO metadata가 이 디렉토리에서 정의된다.

## Tech Stack & Constraints

- Next.js 16 App Router, React Server Components 기본
- `"use client"`는 상태·이벤트·브라우저 API가 필요한 leaf 컴포넌트에만 선언
- 폰트: `next/font/google`로 로드하고 CSS 변수(`--font-*`)로 전달
- 전역 스타일: `globals.css` (Tailwind v4, ShadCN 토큰)

## Implementation Patterns

- `layout.tsx`: metadata, html/body, 전역 폰트, 공통 shell
- `page.tsx`: 섹션 조합만 담당. 복잡한 UI·인터랙션은 `components/`로 분리
- 정적 콘텐츠는 파일 상단 `const profile = { ... } as const` 또는 별도 `lib/` 모듈로 분리
- 섹션 앵커: `id="hero"`, `id="about"` 등 시맨틱 `<section>` + `aria-labelledby`
- metadata `title` / `description`은 페이지 목적에 맞게 한국어로 유지

## Local Golden Rules

### Do's

- 새 섹션 추가 시 Hero → About 흐름과 동일한 시맨틱 구조(`main` > `section` > heading hierarchy)를 따른다.
- 클라이언트 컴포넌트 import는 page 상단에서 named import로 명시한다.
- `scroll-smooth` 등 전역 동작은 `globals.css` 또는 `html` 클래스 한 곳에서만 정의한다.

### Don'ts

- `page.tsx`에 대량 인라인 스타일·애니메이션 로직을 넣지 않는다.
- `layout.tsx`에 페이지 전용 UI를 넣지 않는다.
- Server Component에서 `useState`, `useEffect`, 이벤트 핸들러를 사용하지 않는다.
- 다크모드 variant(`dark:`) 클래스를 추가하지 않는다.

## Testing Strategy

```bash
bun run dev    # 섹션·앵커·반응형 수동 확인
bun run build  # RSC/Client 경계 빌드 오류 확인
bun run lint   # app/ 하위 린트
```
