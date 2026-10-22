// 페이지 수치를 base-batch README 와 대조한다. 다르면 경고만 하고 빌드는 막지 않는다.
// 사용: node scripts/check-facts.mjs [base-batch 경로, 기본 ../base-batch]
// base-batch 파일은 읽기만 한다.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { STATS } from '../src/data/content.js';

const repo = process.argv[2] || '../base-batch';
let readme;
try { readme = readFileSync(join(repo, 'README.md'), 'utf8'); }
catch { console.warn(`check-facts: ${repo}/README.md 를 찾지 못해 건너뜁니다.`); process.exit(0); }

const stat = key => STATS.find(([, k]) => k === key)?.[0];
const facts = [
  ['자동 테스트 수', 'st1', () => readme.match(/테스트\s*(\d+)\s*개/)?.[1]],
  ['보고서 형식 수', 'st2', () => {
    const line = readme.split('\n').find(l => /^\|\s*보고서\s*\|/.test(l)) || '';
    return String(['JSON', 'CSV', 'XLSX', 'PDF'].filter(f => line.includes(f)).length || '');
  }],
  ['테스트 모드 수', 'st3', () => String(new Set(readme.match(/\b(?:READER|PROCESSOR|WRITER)_TEST\b/g) || []).size + 1)], // + NORMAL
  ['내장 예제 테이블 수', 'st4', () => readme.match(/(\d+)\s*테이블/)?.[1]],
];

let warn = 0;
for (const [label, key, read] of facts) {
  const page = stat(key), src = read();
  if (!src) { console.warn(`check-facts 경고: ${label} 를 README 에서 찾지 못함 (페이지 ${page})`); warn++; }
  else if (src !== page) { console.warn(`check-facts 경고: ${label} 불일치 · 페이지 ${page} / README ${src}`); warn++; }
  else console.log(`check-facts: ${label} ${page} 일치`);
}
console.log(warn ? `check-facts: 경고 ${warn}건 (빌드는 계속)` : 'check-facts: 통과');
