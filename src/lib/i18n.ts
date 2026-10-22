import { ui } from '../i18n/ui.js';
import { site, type Lang } from '../site.config';

export type Dict = (typeof ui)['ko'];

export const isLang = (v: unknown): v is Lang => site.locales.includes(v as Lang);

export const useT = (lang: Lang): Dict => ui[lang];

// '{n}개 모두 보기' 같은 문구의 {n} 을 채운다.
export const fmt = (s: string, n: number | string) => s.replace('{n}', String(n));

// 언어별 페이지 주소. trailingSlash: 'always' 와 맞춘다.
export const pathFor = (lang: Lang, hash = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${lang}/${hash}`;
