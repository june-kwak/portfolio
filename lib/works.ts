export type WorkLink = {
  label: string;
  url: string;
};

export type Work = {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  coverImage: string;
  body: string;
  links: WorkLink[];
};

export const works: Work[] = [
  {
    slug: "esim-ux",
    title: "eSIM 개통 UX",
    description:
      "갤럭시 eSIM 개통·관리 여정을 단순화하고, 불안 없이 완료할 수 있는 모바일 경험 설계",
    thumbnail: "/works/thumb-esim.jpg",
    coverImage: "/works/cover-esim.jpg",
    // AI로 생성된 문구입니다.
    body: `삼성전자 MX 사업부에서 eSIM 개통·관리 전체 여정을 설계했습니다. QR 스캔, 네트워크 설정, 개통 완료까지 — 사용자가 처음 eSIM을 만나는 순간부터 이후 관리까지, 각 단계에서 막히는 지점을 사용자 조사와 프로토타이핑으로 찾아내고 더 명확하고 안심할 수 있는 흐름으로 개선했습니다.

주요 기여: 개통 플로우 IA 재정의, 오류·예외 상황 가이드 카피, 설정 앱 내 eSIM 관리 화면 설계, 사용성 테스트 기반 반복 개선.`,
    links: [
      { label: "Behance", url: "https://www.behance.net" },
      { label: "Figma", url: "https://www.figma.com" },
    ],
  },
  {
    slug: "samsung-tv-plus-ux",
    title: "Samsung TV Plus UX",
    description:
      "FAST 스트리밍 서비스의 개인화 홈·콘텐츠 탐색 경험을 더 직관적이고 몰입감 있게 재설계",
    thumbnail: "/works/thumb-tv-plus.jpg",
    coverImage: "/works/cover-tv-plus.jpg",
    // AI로 생성된 문구입니다.
    body: `Samsung TV Plus는 전 세계 수억 대 기기에서 사용되는 무료 광고 기반 스트리밍(FAST) 서비스입니다. 스크롤은 줄이고 발견은 늘리는 것을 목표로, 개인화 홈 화면·몰입형 브라우징·라이브·VOD 연계 탐색 경험을 설계했습니다.

시청 이력과 선호 장르를 반영한 홈 구조, 풍부한 메타데이터와 고품질 이미지로 콘텐츠 맥락을 전달하고, 라이브 이벤트·스포츠 등 실시간 콘텐츠 발견성을 높이는 UI 흐름을 다듬었습니다.

주요 기여: 홈·카테고리 IA, 개인화 추천 영역 UX, 라이브/VOD 전환 패턴, TV 리모컴·D-pad 내비게이션 사용성 검증.`,
    links: [
      {
        label: "Samsung Newsroom",
        url: "https://news.samsung.com/global/samsung-tv-plus-update-makes-browsing-and-viewing-content-easier-and-faster",
      },
      { label: "Dribbble", url: "https://dribbble.com" },
    ],
  },
  {
    slug: "samsung-account-ux",
    title: "Samsung account UX",
    description:
      "삼성 생태계 계정 가입·로그인 터치포인트를 정비해 연결된 기기 경험의 진입 장벽을 낮춤",
    thumbnail: "/works/thumb-samsung-account.jpg",
    coverImage: "/works/cover-samsung-account.jpg",
    // AI로 생성된 문구입니다.
    body: `Samsung account는 SmartThings, Samsung Cloud, 기기 찾기 등 삼성 서비스를 하나로 묶는 통합 계정입니다. 가입률 정체와 터치포인트 가시성 부족 문제를 해결하기 위해, 기기 사용 중 노출되는 로그인·가입 경험과 Connected Devices 등 생태계 설정 흐름을 재설계했습니다.

계정 혜택을 텍스트만이 아닌 시각적 단서로 전달하고, 앱·설정 곳곳에 묻혀 있던 가입 유도 지점을 정리해 SSO에 가까운 일관된 로그인 경험을 지향했습니다. One UI 6 업데이트와 연계한 터치포인트 개선으로 글로벌 가입률 개선에 기여한 사례를 참고했습니다.

주요 기여: 가입·로그인 터치포인트 리디자인, Connected Devices 진입 UX, 2단계 인증·소셜 로그인 플로우 정리, 사용성 테스트 및 데이터 기반 개선.`,
    links: [
      {
        label: "Samsung Account",
        url: "https://www.samsung.com/us/why-samsung-account/",
      },
      { label: "GitHub", url: "https://github.com" },
    ],
  },
];

export function getWork(slug: string): Work | undefined {
  return works.find((work) => work.slug === slug);
}

export function getAllSlugs(): string[] {
  return works.map((work) => work.slug);
}
