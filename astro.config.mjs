import { defineConfig } from 'astro/config';

// 언어별 경로(/ko/, /en/)는 src/pages/[lang] 와 루트 리다이렉트(src/pages/index.astro)로 직접 만든다.
// 배포 도메인이 정해지면 SITE_URL 환경변수로 넣는다 (hreflang·canonical 절대 주소에 사용).
export default defineConfig({
  site: process.env.SITE_URL || undefined,
  output: 'static',
  trailingSlash: 'always',
});
