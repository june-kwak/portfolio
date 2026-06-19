# Components — Agent Rules

## Module Context

ShadCN UI 기반 재사용 컴포넌트와 포트폴리오 전용 UI(좋아요 버튼, 섹션 블록 등)를 담당한다. Linear·Apple 스타일의 정돈된 UI는 이 레이어에서 일관되게 유지한다.

## Tech Stack & Constraints

- ShadCN UI (`components/ui/`) — Radix UI + CVA + Tailwind
- 아이콘: `lucide-react` only
- 클래스 병합: `cn()` from `@/lib/utils`
- 인터랙션 컴포넌트: 파일 최상단 `"use client"`

## Implementation Patterns

- ShadCN 추가: `bunx shadcn@latest add <name>` → `components/ui/`에 생성, 직접 수정 최소화
- 도메인 컴포넌트: `components/<name>.tsx` (예: `like-button.tsx`)
- Button 링크: `<Button asChild><a href="...">` 패턴
- variant·size는 ShadCN `buttonVariants` 등 기존 CVA를 확장하고, page에서 `className`으로 미세 조정
- props는 명시적 interface/type으로 정의. `any` 금지

## Local Golden Rules

### Do's

- 새 UI 필요 시 ShadCN 레지스트리에 equivalent가 있는지 먼저 확인한다.
- Lucide 아이콘은 `size-*`, `className`으로 ShadCN 토큰 색(`text-muted-foreground` 등)과 맞춘다.
- 접근성: 버튼에 `aria-label`, 장식 SVG에 `aria-hidden`, 포커스 ring 유지
- 애니메이션은 CSS keyframes(`globals.css`) 또는 Tailwind transition으로 제한. 과도한 motion 금지

### Don'ts

- `components/ui/` ShadCN 원본을 page 요구사항에 맞게 대량 수정하지 않는다. wrapper 컴포넌트를 만든다.
- Heroicons, Font Awesome 등 Lucide 외 아이콘 라이브러리를 도입하지 않는다.
- inline SVG를 반복 생성하지 않는다. 공통 장식은 컴포넌트로 추출한다.
- 한 컴포넌트에 layout + data fetching + styling을 모두 넣지 않는다.

## Testing Strategy

```bash
bun run dev    # hover, focus, 클릭 인터랙션 확인
bun run lint   # components/ 하위 린트
```

ShadCN 컴포넌트 추가 후 import 경로 `@/components/ui/<name>` 동작을 dev 서버에서 확인한다.
