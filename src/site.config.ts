// 사이트 전역 상수. 제품명·연락처는 여기서만 바꾼다.
export const site = {
  productName: {
    ko: '코드 기반 ETL 프레임워크',
    en: 'Code-based ETL Framework',
  },
  contactEmail: 'dvmoomoodv@gmail.com',
  defaultLocale: 'ko',
  locales: ['ko', 'en'],
} as const;

export type Lang = (typeof site.locales)[number];
