// 빌드 결과(dist/)에서 고객사명·내부 주소·운영 시스템 연결을 찾으면 실패한다 (npm run build 마지막 단계).
// 사용: node scripts/check-leaks.mjs [dist 경로]
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, extname } from 'node:path';

const root = process.argv[2] || 'dist';
const EXT = new Set(['.html', '.js', '.mjs', '.css', '.json', '.xml', '.txt', '.svg', '.webmanifest']);

const RULES = [
  ['고객사명', /\bKITA\b|aekyung|ezApproval/i],
  ['localhost', /localhost|127\.0\.0\.1/i],
  ['사설 IP', /\b(?:10\.\d{1,3}|172\.(?:1[6-9]|2\d|3[01])|192\.168)\.\d{1,3}\.\d{1,3}\b/],
  ['운영 시스템 링크', /\b(?:href|src|action|formaction)\s*=\s*["']?[^"'\s>]*\/(?:ui|api|swagger-ui|v3\/api-docs|actuator|admin)(?:[\/"'?#\s>]|$)/i],
  ['운영 시스템 호출', /\b(?:fetch|XMLHttpRequest|EventSource|WebSocket)\s*\(\s*["'`][^"'`]*\/(?:ui|api|swagger-ui|actuator|admin)\b/i],
  ['iframe', /<iframe\b/i],
];

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (EXT.has(extname(name).toLowerCase())) yield p;
  }
}

let files = 0;
const hits = [];
try {
  for (const file of walk(root)) {
    files++;
    readFileSync(file, 'utf8').split(/\r?\n/).forEach((line, i) => {
      for (const [label, re] of RULES) {
        const m = line.match(re);
        if (m) hits.push(`${relative('.', file)}:${i + 1}  [${label}]  ${m[0].slice(0, 80)}`);
      }
    });
  }
} catch (e) {
  console.error(`check-leaks: ${root} 를 읽을 수 없습니다. 먼저 astro build 를 실행하세요. (${e.message})`);
  process.exit(1);
}

if (hits.length) {
  console.error(`check-leaks: 공개하면 안 되는 내용 ${hits.length}건\n` + hits.map(h => '  ' + h).join('\n'));
  process.exit(1);
}
console.log(`check-leaks: 통과 (${files}개 파일)`);
