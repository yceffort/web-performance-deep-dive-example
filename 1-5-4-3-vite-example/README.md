# Vite modulepreload 자동 삽입 테스트

## 테스트 목적

Vite가 빌드 시 의존성 그래프를 분석하여 자동으로 `modulepreload` 태그를 삽입하는 것을 확인합니다.

## 파일 구조

```
.
├── src/
│   ├── main.js              # 엔트리 포인트
│   ├── ui.js                # UI 유틸리티
│   ├── utils/
│   │   ├── logger.js        # 로깅 (date.js 의존)
│   │   └── date.js          # 날짜 포맷팅
│   └── chart/               # 동적 import 대상
│       ├── index.js         # Chart 엔트리 (renderer.js, data.js 의존)
│       ├── renderer.js      # 렌더링 (utils.js 의존)
│       ├── data.js          # 데이터 제공
│       └── utils.js         # Chart 유틸리티
├── index.html
└── package.json
```

## 의존성 관계

```
index.html
  └─ main.js
      ├─ ui.js
      └─ utils/logger.js
          └─ utils/date.js

main.js (동적 import)
  └─ chart/index.js
      ├─ chart/renderer.js
      │   └─ chart/utils.js
      └─ chart/data.js
```

## 테스트 방법

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 모드 실행

```bash
npm run dev
```

브라우저에서 열고 Network 탭에서 개별 모듈 파일들이 로드되는 것을 확인합니다.

### 3. 프로덕션 빌드

```bash
npm run build
```

### 4. dist/index.html 확인

빌드 후 `dist/index.html`을 열어보면 Vite가 자동으로 삽입한 `modulepreload` 태그들을 확인할 수 있습니다:

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite modulepreload 예제</title>

    <!-- Vite가 자동으로 삽입한 modulepreload -->
    <link rel="modulepreload" crossorigin href="/assets/main-[hash].js" />
    <link rel="modulepreload" crossorigin href="/assets/ui-[hash].js" />
    <link rel="modulepreload" crossorigin href="/assets/logger-[hash].js" />
    <link rel="modulepreload" crossorigin href="/assets/date-[hash].js" />

    <script type="module" crossorigin src="/assets/main-[hash].js"></script>
  </head>
  <body>
    <!-- ... -->
  </body>
</html>
```

### 5. 빌드 결과 확인

```bash
npm run preview
```

브라우저에서 열고 Network 탭을 확인하면:
- **페이지 로드 시**: main.js와 그 의존성들(ui.js, logger.js, date.js)이 모두 병렬로 다운로드됨
- **버튼 클릭 시**: chart 관련 모듈들만 추가로 다운로드됨 (동적 import)

## 핵심 확인 사항

### modulepreload가 삽입되는 모듈
- ✅ main.js (엔트리 포인트)
- ✅ ui.js (main.js가 직접 import)
- ✅ utils/logger.js (main.js가 직접 import)
- ✅ utils/date.js (logger.js가 import, 전이적 의존성)

### modulepreload가 삽입되지 않는 모듈
- ❌ chart/index.js (동적 import)
- ❌ chart/renderer.js (동적 import된 모듈의 의존성)
- ❌ chart/data.js (동적 import된 모듈의 의존성)
- ❌ chart/utils.js (동적 import된 모듈의 의존성)

**이유**: 동적 import는 사용자 인터랙션 후에 필요하므로, 초기 로딩 시 preload하지 않습니다.

## 확인 방법

### Chrome DevTools Network 탭

1. **Initiator 컬럼 확인**:
   - `index.html`에서 시작된 요청: modulepreload로 미리 로드된 것
   - JS 파일에서 시작된 요청: 동적 import로 로드된 것

2. **Priority 확인**:
   - modulepreload된 파일: High 우선순위

3. **Waterfall 확인**:
   - main.js와 의존성들이 병렬로 다운로드됨 (워터폴 없음)
   - chart 모듈들은 버튼 클릭 후 순차적으로 다운로드됨

## 결론

Vite는 다음과 같이 동작합니다:

1. **정적 import 분석**: 엔트리 포인트(main.js)에서 시작하여 모든 정적 import 체인을 분석
2. **modulepreload 자동 삽입**: 분석된 모든 모듈에 대한 `<link rel="modulepreload">` 태그를 HTML에 삽입
3. **동적 import 제외**: `import()` 구문으로 로드되는 모듈은 제외 (런타임에 필요할 때만 로드)
4. **해시 파일명**: 캐시 무효화를 위해 파일명에 해시 추가

이를 통해 개발자가 수동으로 의존성을 추적하지 않아도 최적화된 로딩 순서를 얻을 수 있습니다.

---

## 🧪 실제 테스트 결과 (2025-11-22, Chrome 131)

### 테스트 환경
- 브라우저: Chrome 131
- 날짜: 2025년 11월 22일
- URL: http://localhost:4173/
- 테스트 방법: `npm run preview` 실행 후 Network 탭 확인

### 결과

#### 페이지 로드 시 (초기 진입)
```
index-DbQtnptv.js    200  http/1.1  script  (index):35  1.8 kB  14 ms  High
ui-BbNUfuQm.js       200  http/1.1  script  (index):36  0.4 kB  10 ms  High
date-C7AUNCZ9.js     200  http/1.1  script  (index):37  0.4 kB  11 ms  High
logger-CMwFa6va.js   200  http/1.1  script  (index):38  0.5 kB  12 ms  High
```

**핵심 관찰:**
- ✅ 4개 파일 모두 **병렬 다운로드** (10-14ms 내에 모두 완료)
- ✅ Initiator가 모두 `(index)` → **HTML의 modulepreload 태그**에서 시작
- ✅ line 35-38 → **dist/index.html**의 script와 modulepreload 태그 위치에 대응
- ✅ 모두 **High priority**

#### 버튼 클릭 시 (동적 import)
```
chart-dHGfsuF6.js    200  http/1.1  script  index-DbQtnptv.js:1  0.7 kB  5 ms  High
```

**핵심 관찰:**
- ✅ chart 파일**만** 추가로 다운로드됨
- ✅ Initiator가 `index-DbQtnptv.js:1` → **JS 파일의 동적 import**에서 시작
- ✅ 페이지 로드 시에는 다운로드되지 않음 (modulepreload 태그 없음)

### 검증 완료

**Vite가 자동으로 다음을 수행했습니다:**

1. ✅ **정적 import → modulepreload 자동 삽입**
   - main.js, ui.js, logger.js, date.js 모두 HTML에 modulepreload 태그 생성

2. ✅ **전이적 의존성 자동 포함**
   - date.js는 logger.js가 import하지만, Vite가 자동으로 감지하여 modulepreload 추가

3. ✅ **동적 import → modulepreload 제외**
   - chart.js는 `import()` 구문이므로 modulepreload에서 제외

4. ✅ **병렬 다운로드 최적화**
   - 모든 modulepreload 파일이 페이지 로드 시 동시에 다운로드됨 (워터폴 없음)
