// ko/en 문구 누락 검사. 실패하면 종료 코드 1.
// - src/i18n/ui.js: 두 언어의 키가 같은지, 빈 문구가 없는지
// - src/data/content.js: 목록 항목마다 ko/en 이 모두 있고 모양(칸 수)이 같은지
// - 제품명·문의 메일이 문구에 글자 그대로 들어가 있으면 경고 (src/site.config.ts 에서 읽어야 함)
import { readFileSync } from 'node:fs';
import { ui } from '../src/i18n/ui.js';
import * as data from '../src/data/content.js';

const errors = [];
const warns = [];
const [A, B] = ['ko', 'en'];

// 1. 화면 문구 사전
const ka = Object.keys(ui[A]), kb = Object.keys(ui[B]);
for (const k of ka) if (!(k in ui[B])) errors.push(`ui.${B} 에 '${k}' 없음`);
for (const k of kb) if (!(k in ui[A])) errors.push(`ui.${A} 에 '${k}' 없음`);
for (const l of [A, B]) for (const [k, v] of Object.entries(ui[l])) {
  if (typeof v !== 'string' || !v.trim()) errors.push(`ui.${l}.${k} 가 비어 있음`);
  else if (v.includes('{n}') !== String(ui[l === A ? B : A][k] ?? '').includes('{n}')) errors.push(`ui.*.${k}: {n} 자리표시가 한쪽에만 있음`);
}

// 2. 목록 데이터
const shape = v => (Array.isArray(v) ? v.map(shape) : typeof v);
const same = (x, y) => JSON.stringify(shape(x)) === JSON.stringify(shape(y));
const pairs = (name, list) => list.forEach((item, i) => {
  const obj = Array.isArray(item) ? item[1] : item;
  if (!obj || !obj[A] || !obj[B]) return errors.push(`${name}[${i}]: ko/en 중 하나가 없음`);
  if (!same(obj[A], obj[B])) errors.push(`${name}[${i}]: ko/en 칸 수가 다름`);
});
pairs('FEATURES', data.FEATURES);
pairs('DEVX', data.DEVX);
pairs('SAFETY', data.SAFETY);
pairs('COMPARE', data.COMPARE);
for (const k of ['yes', 'no']) if (data.FIT[A][k].length !== data.FIT[B][k].length) errors.push(`FIT.${k}: ko/en 개수가 다름`);
for (const [, k] of data.STATS) if (!ui[A][k]) errors.push(`STATS: 문구 키 '${k}' 없음`);
for (const [, , k] of data.MODES) for (const s of ['_q', '_n']) if (!ui[A][k + s]) errors.push(`MODES: 문구 키 '${k + s}' 없음`);

// 3. 상수 하드코딩 경고
const cfg = readFileSync(new URL('../src/site.config.ts', import.meta.url), 'utf8');
const literals = [...cfg.matchAll(/(?:ko|en|contactEmail):\s*'([^']+)'/g)].map(m => m[1]);
const text = JSON.stringify({ ui, data });
for (const s of literals) if (text.includes(s)) warns.push(`'${s}' 가 문구에 그대로 있음. site.config.ts 상수를 쓰세요.`);

warns.forEach(w => console.warn('check-i18n 경고: ' + w));
if (errors.length) {
  console.error(`check-i18n: ${errors.length}건\n` + errors.map(e => '  ' + e).join('\n'));
  process.exit(1);
}
console.log(`check-i18n: 통과 (문구 키 ${ka.length}개, 언어 ${A}/${B})`);
