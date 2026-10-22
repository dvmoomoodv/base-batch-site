// 페이지 동작: 모바일 메뉴, 메일 복사, 언어 선택 기억, 모바일 바텀 시트.
// 외부 호출은 하지 않는다 (공개 사이트는 운영 UI·API 와 연결하지 않음).

// ---------- 언어 선택 기억 (루트 / 에서 읽음) ----------
document.querySelectorAll<HTMLAnchorElement>('[data-lang-link]').forEach(a =>
  a.addEventListener('click', () => {
    try { localStorage.setItem('lang', a.dataset.langLink!); } catch { /* 저장 불가 환경 */ }
  }),
);

// ---------- 모바일 메뉴 ----------
const menuBtn = document.getElementById('menu-btn')!;
const menu = document.getElementById('sheet')!;
menuBtn.addEventListener('click', () => {
  menu.hidden = !menu.hidden;
  menuBtn.setAttribute('aria-expanded', String(!menu.hidden));
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.hidden = true;
  menuBtn.setAttribute('aria-expanded', 'false');
}));

// ---------- 메일 복사 ----------
const copyBtn = document.getElementById('copy-mail') as HTMLButtonElement | null;
if (copyBtn) {
  const mail = document.getElementById('mail')!;
  const done = (label: string) => {
    copyBtn.textContent = label;
    setTimeout(() => { copyBtn.textContent = copyBtn.dataset.copy!; }, 1600);
  };
  const fallback = () => {
    const r = document.createRange(); r.selectNodeContents(mail);
    const s = window.getSelection(); s?.removeAllRanges(); s?.addRange(r);
    done(copyBtn.dataset.copyFail!);
  };
  copyBtn.addEventListener('click', () => {
    try { navigator.clipboard.writeText(mail.textContent!.trim()).then(() => done(copyBtn.dataset.copied!), fallback); }
    catch { fallback(); }
  });
}

// ---------- 모바일 바텀 시트 ----------
// 640px 미만: 항목이 많은 묶음은 앞의 몇 개만 제목으로 보이고(.m-extra 는 숨김), "N개 모두 보기" 버튼이 묶음 전체를 시트 하나에 펼친다.
// 보이는 항목을 누르면 같은 시트가 열리고 그 항목 위치로 이동한다.
const mqMobile = window.matchMedia('(max-width: 639px)');
const ms = document.getElementById('msheet') as HTMLDialogElement;
const msBody = document.getElementById('ms-body')!;
let msOpener: HTMLElement | null = null;

function syncTaps() {
  document.querySelectorAll<HTMLElement>('.tap').forEach(el => {
    if (mqMobile.matches) { el.setAttribute('role', 'button'); el.tabIndex = 0; el.setAttribute('aria-haspopup', 'dialog'); }
    else { el.removeAttribute('role'); el.removeAttribute('tabindex'); el.removeAttribute('aria-haspopup'); }
  });
}

function openSheet(group: string, focusEl: HTMLElement | null, opener: HTMLElement) {
  const list = document.querySelector<HTMLElement>(`[data-sheet="${group}"]`);
  const items = [...document.querySelectorAll<HTMLElement>(`.tap[data-group="${group}"]`)];
  document.getElementById('ms-title')!.textContent = list?.dataset.title ?? '';
  document.getElementById('ms-count')!.textContent = (ms.dataset.count ?? '{n}').replace('{n}', String(items.length));
  let target: HTMLElement | null = null;
  msBody.replaceChildren(...items.map(el => {
    const sec = document.createElement('section');
    sec.className = 'ms-item';
    const head = document.createElement('div');
    head.className = 'ms-ih';
    const mark = el.querySelector('.ico') || el.querySelector('.cmp-sum > :first-child');
    if (mark) head.appendChild(mark.cloneNode(true));
    const h = document.createElement('h3');
    h.textContent = el.querySelector('.m-title')?.textContent ?? '';
    head.appendChild(h);
    sec.append(head, ...[...el.querySelectorAll('.m-detail')].map(n => n.cloneNode(true)));
    if (el === focusEl) target = sec;
    return sec;
  }));
  msOpener = opener;
  if (typeof ms.showModal === 'function') ms.showModal(); else ms.setAttribute('open', '');
  document.documentElement.classList.add('sheet-open');
  msBody.scrollTop = 0;
  const tgt = target as HTMLElement | null;
  if (tgt && tgt !== msBody.firstElementChild) {
    msBody.scrollTop = tgt.offsetTop - msBody.offsetTop;
    tgt.classList.add('hit');
  }
}

ms.addEventListener('close', () => {
  document.documentElement.classList.remove('sheet-open');
  if (msOpener?.isConnected && mqMobile.matches) msOpener.focus({ preventScroll: true });
});
ms.addEventListener('click', e => { if (e.target === ms) ms.close(); });
document.getElementById('ms-close')!.addEventListener('click', () => ms.close());
document.addEventListener('click', e => {
  const el = e.target as HTMLElement;
  if (!mqMobile.matches || ms.contains(el)) return;
  const more = el.closest<HTMLElement>('.m-more');
  if (more) { openSheet(more.dataset.more!, null, more); return; }
  const tap = el.closest<HTMLElement>('.tap');
  if (tap) openSheet(tap.dataset.group!, tap, tap);
});
document.addEventListener('keydown', e => {
  if (!mqMobile.matches || !(e.key === 'Enter' || e.key === ' ')) return;
  const el = e.target as HTMLElement;
  if (el.classList?.contains('tap')) { e.preventDefault(); openSheet(el.dataset.group!, el, el); }
});
mqMobile.addEventListener('change', () => { syncTaps(); if (!mqMobile.matches && ms.open) ms.close(); });
syncTaps();
