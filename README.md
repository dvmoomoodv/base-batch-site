# base-batch-site

base-batch 의 외부 공개용 소개 사이트. Astro 정적 사이트로, 빌드하면 `dist/` 에 HTML·CSS·JS 만 남는다.

- 운영 UI(`/ui`)·API·Swagger·Actuator 와 링크·iframe·호출로 연결하지 않는다. `check-leaks` 가 빌드 때 막는다.
- 고객사명·내부 주소를 쓰지 않는다. 예시는 내장 데모(게시판·회원) 기준.
- base-batch 저장소는 읽기만 한다. 수치는 README 기준이고 `check-facts` 로 대조한다.

## 실행

Node 20 이상이 필요하다.

```bash
npm install
npm run dev        # http://localhost:4321/ko/
npm run build      # dist/ 생성 + check-leaks
npm run preview    # 빌드 결과 확인
npm run check      # check-i18n + check-facts (../base-batch/README.md 와 대조)
```

배포 도메인이 정해지면 `SITE_URL=https://example.com npm run build` 로 빌드한다. canonical·hreflang 이 절대 주소가 된다.

## 바꿀 곳

| 바꿀 것 | 파일 |
|---|---|
| 제품명, 문의 메일 | `src/site.config.ts` |
| 화면 문구 (ko/en) | `src/i18n/ui.js` |
| 기능·안전장치·비교표 등 목록 | `src/data/content.js` |
| 색·간격·서체 토큰, 다크 모드 | `src/styles/global.css` 의 `:root` |
| 모바일에서 미리 보일 항목 수 | 각 컴포넌트의 `limit` / `LIMIT` |

문구를 고친 뒤에는 `npm run check:i18n` 으로 두 언어가 맞는지 확인한다.

## 구조

```
src/
├─ site.config.ts          제품명·문의 메일 상수
├─ i18n/ui.js              화면 문구 사전 (ko/en)
├─ data/content.js         목록 데이터·아이콘
├─ lib/i18n.ts             useT, fmt, pathFor
├─ styles/global.css
├─ layouts/Base.astro      lang, hreflang, 메타, 서체
├─ components/             Header, Hero(흐름도), Stats, Features, Safety, TestModes,
│                          Compare, DevExperience, CoreTech, Contact, Footer,
│                          BottomSheet, Cells, MoreButton, Icon, Mark
├─ scripts/page.ts         모바일 메뉴, 메일 복사, 언어 기억, 바텀 시트
└─ pages/
   ├─ index.astro          저장된 언어 → 브라우저 언어로 /ko/ 또는 /en/ 이동
   ├─ [lang]/index.astro   랜딩 페이지
   └─ 404.astro
scripts/                   check-leaks, check-i18n, check-facts
prototype/index.html       디자인 시안 (빌드에 포함되지 않음)
```

## 모바일 (640px 미만)

항목이 많은 묶음은 앞의 몇 개만 제목으로 보이고 "N개 모두 보기" 버튼으로 바텀 시트에서 전부 본다. 항목을 누르면 같은 시트가 그 항목 위치로 열린다. JS 가 꺼져 있으면 접지 않고 모두 펼쳐 보여 준다.
