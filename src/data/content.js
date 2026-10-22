// 섹션별 목록 데이터. 각 항목은 ko/en 을 함께 가진다. 수치는 base-batch README 기준: npm run check:facts

export const ICON = {
  code: '<path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/>',
  order: '<path d="M10 6h11M10 12h11M10 18h11"/><path d="M4 6h1v4M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/>',
  retry: '<path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/>',
  pulse: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>',
  gauge: '<path d="m12 14 4-4"/><path d="M3.3 19a10 10 0 1 1 17.4 0"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/>',
  plug: '<path d="M12 22v-5"/><path d="M9 8V2M15 8V2"/><path d="M18 8v5a6 6 0 0 1-12 0V8z"/>',
  sheet: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/>',
  box: '<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
  wand: '<path d="m15 4 5 5L9 20H4v-5z"/><path d="m13 6 5 5"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5V21h16"/>',
  monitor: '<rect x="2" y="4" width="20" height="14" rx="2"/><path d="M8 21h8M12 18v3"/>',
  layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
  sliders: '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
  check: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  tick: '<path d="M20 6 9 17l-5-5"/>',
  minus: '<path d="M5 12h14"/>',
};

export const STATS = [['188', 'st1'], ['4', 'st2'], ['4', 'st3'], ['12', 'st4']];

export const FEATURES = [
  ['code', { ko: ['코드로 정의하는 변환', '변환 규칙을 MyBatis SQL과 Java Processor로 씁니다. 모든 규칙이 코드 리뷰와 버전 관리 대상이 됩니다.'],
             en: ['Transformations as code', 'Write rules in MyBatis SQL and Java processors, so every rule goes through code review and version control.'] }],
  ['order', { ko: ['테이블·시나리오 이관', '테이블 하나를 즉시 또는 Cron으로 돌리고, 시나리오로 여러 테이블을 정해진 순서대로 실행합니다. 기간 필터와 날짜 분할을 지원합니다.'],
              en: ['Table and scenario runs', 'Run one table now or on a cron schedule, or chain tables in a fixed order with scenarios. Date filters and date splitting included.'] }],
  ['retry', { ko: ['청크 처리와 재시도', '기본 200건 단위로 처리하고 청크마다 상태를 기록합니다. 실패한 청크만 다시 돌리고, 에러 유형별로 재시도 정책을 다르게 둡니다.'],
              en: ['Chunks and retries', 'Processes 200 rows per chunk by default and records every chunk. Retry only failed chunks, with retry policies per error type.'] }],
  ['pulse', { ko: ['운영 가시성', '청크별 진행률, 요청 JSON까지 남는 실행 이력, 로그·오류 조회, 5분 간격 부하 추이(7일 보관)를 한 화면에서 봅니다.'],
              en: ['Visibility', 'Per-chunk progress, run history including the request JSON, logs and errors, and 5-minute load history kept for 7 days.'] }],
  ['file', { ko: ['보고서', 'Job·요약 보고서를 JSON, CSV, XLSX, PDF로 내보내고, 큰 묶음은 비동기 zip으로 받습니다.'],
             en: ['Reports', 'Export job and summary reports as JSON, CSV, XLSX or PDF, or as an async zip bundle.'] }],
  ['gauge', { ko: ['부하 제어', '청크·페이지 지연과 적응형 지연을 겁니다. 금지 시간대에는 현재 청크를 마치고 멈춘 뒤 허용 시간에 자동으로 다시 시작합니다.'],
              en: ['Load control', 'Chunk and page delays plus adaptive delay. In blackout hours a run stops after the current chunk and resumes on its own.'] }],
  ['bell', { ko: ['알림', '시작·완료·실패·경고를 텔레그램과 화면 알림으로 받고, 지난 알림은 검색합니다.'],
             en: ['Alerts', 'Start, finish, failure and warning alerts via Telegram and in-app notifications, with search.'] }],
  ['plug', { ko: ['플러그인 구조', '업무 단위로 플러그인을 나누고 설정 한 줄로 켜고 끕니다. DataSource 조합이 맞지 않으면 기동할 때 바로 알려 줍니다.'],
             en: ['Plugins', 'Split work into plugins and toggle each with one setting. Mismatched data sources fail fast at startup.'] }],
  ['sheet', { ko: ['엑셀 이관', '엑셀을 올리면 바로 검증하고, 미리보기와 오류 행만 모은 xlsx를 제공합니다.'],
              en: ['Excel loads', 'Upload a spreadsheet for instant validation, a preview and an xlsx of rejected rows.'] }],
];

export const SAFETY = [
  { ko: ['실행 게이트', '시스템 전체에서 이관은 한 번에 하나만 돕니다. 실행 중 들어온 요청은 409로 거절합니다.', '409 Conflict · 실행 중인 이관이 있습니다'],
    en: ['Single run gate', 'Only one migration runs across the whole system. Requests that arrive mid-run get a 409.', '409 Conflict · a migration is already running'] },
  { ko: ['기존 데이터 차단', '타겟 테이블에 데이터가 있으면 적재를 시작하기 전에 멈춥니다.', '타겟에 기존 데이터가 720건 있어 적재를 중단했습니다'],
    en: ['Existing-data stop', 'If the target table already holds rows, loading stops before it begins.', 'Loading stopped: the target already has 720 rows'] },
  { ko: ['실행 전 점검', '샘플 변환 결과를 타겟 컬럼 정의와 대조합니다. 길이, NOT NULL, 타입, PK 중복을 봅니다.', 'CSV · XLSX 점검 보고서'],
    en: ['Pre-run check', 'Compares sample output with the target columns: length, NOT NULL, type and duplicate keys.', 'Check report as CSV or XLSX'] },
  { ko: ['미완 매핑 차단', '매핑 코드에 TODO가 남아 있으면 실행하지 않습니다.', 'TODO 0 일 때만 실행'],
    en: ['Unfinished-mapping block', 'A mapping that still contains TODOs does not run.', 'Runs only at TODO 0'] },
  { ko: ['삭제하지 않는 적재', '제품은 TRUNCATE·DELETE를 실행하지 않습니다. 적재 방식은 쿼리로 정하고, 정리는 사람이 합니다.', 'INSERT · ON DUPLICATE KEY · MERGE'],
    en: ['No deletes, ever', 'The product never runs TRUNCATE or DELETE. Load behavior lives in the query; clean-up is done by people.', 'INSERT · ON DUPLICATE KEY · MERGE'] },
];

export const DEVX = [
  ['box', { ko: ['내장 예제 서비스', '게시판·회원·통계 등 12개 테이블과 플러그인 5개가 들어 있습니다. 실제 이관과 같은 코드 경로를 지나므로 설치 검증에 씁니다.'],
            en: ['Built-in sample service', '12 tables (boards, members, stats) and 5 plugins ship with the product. They follow the same code path as a real run, so they double as an install check.'] }],
  ['wand', { ko: ['코드 생성기', '테이블 인벤토리 CSV에서 Reader·Processor·Writer·DTO·Mapper 파일셋과 작업용 SQL을 한 번에 만듭니다.'],
             en: ['Code generator', 'Generates reader, processor, writer, DTO and mapper files plus working SQL from a table inventory CSV.'] }],
  ['sheet', { ko: ['DDL 변환 도구', 'CREATE TABLE 문으로 컬럼 정의 표, Java 모델, Processor 초안, Writer 매퍼 XML(MySQL·Oracle·MSSQL·PostgreSQL)을 만듭니다.'],
              en: ['DDL tools', 'Turn a CREATE TABLE statement into a column sheet, Java models, a processor draft and writer mapper XML for MySQL, Oracle, MSSQL or PostgreSQL.'] }],
  ['book', { ko: ['화면 안의 안내서', '시작하기 화면, 안내서 11편, 화면마다 도움말, 메뉴 검색이 운영 UI에 들어 있습니다.'],
             en: ['Guides inside the app', 'A start page, 11 guides, help on every screen and menu search are built into the operations UI.'] }],
  ['monitor', { ko: ['Spring 표준 운영 도구', 'Actuator 상태·지표, Spring Boot Admin(JVM·GC·스레드 덤프), OpenAPI 문서를 그대로 씁니다.'],
                en: ['Standard Spring tooling', 'Actuator health and metrics, Spring Boot Admin for JVM, GC and thread dumps, and OpenAPI docs.'] }],
  ['layers', { ko: ['운영용 컨테이너 이미지', '멀티스테이지 빌드, 비root 실행, 헬스체크, 컨테이너 메모리 비율로 정하는 힙이 기본입니다.'],
               en: ['Production-ready image', 'Multi-stage build, non-root user, health check and a heap sized as a share of container memory.'] }],
  ['sliders', { ko: ['프로파일과 토글', 'docker·dev·stg·prd 프로파일을 나눕니다. 서버 환경은 접속 정보를 환경변수로만 받고, prd에서는 API 문서가 꺼집니다.'],
                en: ['Profiles and toggles', 'Separate docker, dev, stg and prd profiles. Server profiles read credentials from environment variables only, and prd turns API docs off.'] }],
  ['check', { ko: ['테스트와 구조 검사', 'JUnit 5 테스트 188개와 ArchUnit 계층 의존 검사가 함께 돕니다.'],
              en: ['Tests and architecture checks', '188 JUnit 5 tests plus ArchUnit checks on layer dependencies.'] }],
];

// 비교표: [항목, 이 프레임워크, GUI 기반 ETL 도구, 직접 작성한 스크립트], 각 칸 [표시(g/p/w), 문구]
export const COMPARE = [
  { ko: ['변환 규칙 작성', ['g', 'SQL과 Java 코드로 작성, 코드 리뷰·버전 관리'], ['p', '화면에서 끌어놓기로 작성, 변경 비교가 어려움'], ['p', 'SQL 파일로 작성, 구조가 사람마다 다름']],
    en: ['Writing transformations', ['g', 'SQL and Java code, reviewed and versioned'], ['p', 'Drag-and-drop designer; changes are hard to diff'], ['p', 'Plain SQL files; structure varies by author']] },
  { ko: ['중복 실행·덮어쓰기 방지', ['g', '실행 게이트와 기존 데이터 차단이 기본 내장'], ['p', 'Job 설계와 설정으로 직접 구성'], ['w', '직접 구현하거나 사람이 확인']],
    en: ['Overlap and overwrite protection', ['g', 'Run gate and existing-data stop built in'], ['p', 'Built yourself through job design and settings'], ['w', 'Hand-built, or checked by people']] },
  { ko: ['실행 전 검증', ['g', '길이·NOT NULL·타입·PK 중복 점검 보고서'], ['p', '제품별 데이터 품질 기능을 따로 구성'], ['w', '실행해 보고 오류로 확인']],
    en: ['Pre-run validation', ['g', 'Report on length, NOT NULL, type and duplicate keys'], ['p', 'Data-quality features set up separately'], ['w', 'Run it and find out from errors']] },
  { ko: ['실패 후 재실행', ['g', '실패한 청크만 재시도, 에러 유형별 정책'], ['g', '대부분 재시작 지점 지원'], ['w', '처음부터 다시 실행하는 경우가 많음']],
    en: ['Recovery after failure', ['g', 'Retry failed chunks only, per-error policies'], ['g', 'Most support restart points'], ['w', 'Often rerun from the start']] },
  { ko: ['모니터링·보고서', ['g', '청크 진행률, 실행 이력, 4개 형식 보고서'], ['g', '제품 관리 콘솔 제공'], ['w', '로그를 직접 확인']],
    en: ['Monitoring and reports', ['g', 'Chunk progress, run history, reports in 4 formats'], ['g', 'Vendor console included'], ['w', 'Read the logs yourself']] },
  { ko: ['환경 구성', ['g', 'Docker로 앱·DB·예제 데이터를 한 번에'], ['p', '서버 설치와 라이선스 설정 필요'], ['g', '별도 설치 없음']],
    en: ['Setting up', ['g', 'Docker brings up the app, databases and sample data'], ['p', 'Server install and license setup'], ['g', 'Nothing to install']] },
  { ko: ['필요한 인력', ['w', 'Java·Spring·SQL 개발자 필요'], ['g', '비개발자도 시작하기 쉬움'], ['p', 'SQL을 아는 사람']],
    en: ['Who can use it', ['w', 'Needs Java, Spring and SQL developers'], ['g', 'Approachable for non-developers'], ['p', 'Anyone who knows SQL']] },
  { ko: ['연결 가능한 DB', ['g', 'JDBC 드라이버가 있는 DBMS는 DataSource로 등록'], ['g', '커넥터가 많음'], ['p', '쓰는 DB에 한정']],
    en: ['Supported databases', ['g', 'Any DBMS with a JDBC driver, as a DataSource'], ['g', 'Large connector catalog'], ['p', 'Whatever you script against']] },
  { ko: ['외부 시스템 연계', ['g', 'Reader·Writer를 추가해 연계, 안전장치·재시도는 그대로'], ['g', 'API·파일 커넥터 제공'], ['p', '연계마다 따로 작성']],
    en: ['External integrations', ['g', 'Add a reader or writer; safeguards and retries still apply'], ['g', 'API and file connectors included'], ['p', 'Written separately for each one']] },
  { ko: ['실시간 동기화 (CDC)', ['w', '지원하지 않음, 일괄 이관 전용'], ['p', '제품에 따라 지원'], ['w', '직접 구현']],
    en: ['Real-time sync (CDC)', ['w', 'Not supported; batch migration only'], ['p', 'Depends on the product'], ['w', 'Build it yourself']] },
  { ko: ['실행 규모', ['w', '앱 1대, 시스템 전체에서 한 번에 하나'], ['g', '분산·병렬 실행 지원'], ['p', '병렬은 가능하나 관리가 어려움']],
    en: ['Scale-out', ['w', 'One app instance, one run at a time'], ['g', 'Distributed and parallel runs'], ['p', 'Parallel is possible but hard to manage']] },
];
export const FIT = {
  ko: { yes: ['JDBC로 연결되는 DBMS 간 일괄 이관', '변환 규칙이 많고 코드 리뷰가 필요한 프로젝트', 'DB와 사내 시스템·외부 API 연계가 섞인 이관', '재실행·덮어쓰기 사고를 막아야 하는 운영 이관'],
        no: ['실시간 동기화나 스트리밍', '개발자 없이 운영하는 데이터 파이프라인', '여러 서버에 나눠 대량 병렬 처리해야 할 때'] },
  en: { yes: ['Batch moves between any JDBC-reachable databases', 'Projects with many rules that need code review', 'Migrations that mix databases with in-house systems or APIs', 'Production migrations where reruns and overwrites must not happen'],
        no: ['Real-time sync or streaming', 'Pipelines run without developers', 'Workloads that must be spread across many servers'] },
};

// 비교표 표시 아이콘: g 강점 / p 보통 / w 약점
export const MK = {
  g: '<circle cx="12" cy="12" r="9.5" fill="currentColor"/><path d="m7.5 12.2 3 3 6-6.4" fill="none" style="stroke:var(--bg)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  p: '<circle cx="12" cy="12" r="8.75" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 3.25a8.75 8.75 0 0 1 0 17.5z" fill="currentColor"/>',
  w: '<circle cx="12" cy="12" r="8.75" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 12h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
};

// 테스트 모드: [모드, 실행 단계 수(읽기·변환·저장 중 몇 단계까지), 문구 키]
export const MODES = [['READER_TEST', 1, 'tm1'], ['PROCESSOR_TEST', 2, 'tm2'], ['WRITER_TEST', 3, 'tm3'], ['NORMAL', 3, 'tm4']];
