# 번들 분석 예제

2-2-1절 "번들 분석으로 문제를 가시화하라"를 실습하기 위한 예제 프로젝트입니다.

## 📦 의도적으로 포함된 문제점

이 프로젝트는 **의도적으로 비효율적인 번들 구성**을 보여주기 위해 만들어졌습니다:

1. **큰 라이브러리 전체 포함**

   - `moment.js` (~300KB) - 날짜 포맷팅 하나만 사용하는데 전체 로케일 포함
   - `lodash` (~70KB) - debounce 함수 하나만 사용하는데 전체 유틸리티 포함
   - `chart.js` (~190KB) - 차트 라이브러리가 조건부 컴포넌트에만 사용되는데 초기 번들에 포함
   - `date-fns` (~70KB) - 일부 날짜 함수만 사용하는데 많은 함수가 포함됨

2. **브라우저 네이티브 API로 대체 가능한 라이브러리**

   - `axios` (~13KB) - `fetch` API로 대체 가능

3. **대부분의 사용자가 접근하지 않는 코드 (초기 번들에 포함)**

   - `HeavyAdminPanel.jsx` - 관리자만 사용하는 기능 (2000개 데이터 처리 로직 포함)
   - `HeavyDashboard.jsx` - 일부 사용자만 접근하는 대시보드 (730일 데이터 + 차트)
   - `HeavyAnalytics.jsx` - 분석 기능 (5000개 분석 데이터 + 복잡한 통계)
   - `unusedUtils.js` - import만 되고 실제로는 사용되지 않음

4. **트리 셰이킹이 작동하지 않는 import 방식**
   - `import _ from 'lodash'` - 전체 라이브러리 포함
   - `import moment from 'moment'` - 전체 라이브러리 포함
   - `import { Chart } from 'chart.js/auto'` - 자동으로 모든 차트 타입 포함

## 🚀 시작하기

### 1. 의존성 설치 및 실행 (권장)

```bash
cd resources/2-2-1-bundle-analysis-example
pnpm install
pnpm start
```

`pnpm start` 명령어는 자동으로:

- 프로덕션 빌드 생성
- 로컬 서버 시작 (<http://localhost:8900>)

### 2. 번들 분석 실행

```bash
pnpm run analyze
```

이 명령어는:

- 프로덕션 빌드 생성
- `dist/bundle-report.html` 파일 생성 (번들 분석 리포트)

### 3. 개별 명령어

```bash
# 빌드만 실행
pnpm run build

# 서버만 실행 (빌드 이미 완료된 경우)
pnpm run serve
```

## 🔍 번들 분석 방법

### 1. Webpack Bundle Analyzer

```bash
pnpm run analyze
```

실행 후 `dist/bundle-report.html` 파일을 브라우저로 열면:

- 각 라이브러리가 차지하는 크기를 트리맵으로 확인
- `moment.js`, `lodash`, `axios`가 큰 영역을 차지하는 것 확인
- 사용하지 않는 컴포넌트들도 번들에 포함된 것 확인

### 2. 크롬 개발자 도구 Coverage

1. <http://localhost:8900> 접속
2. 크롬 개발자 도구 열기 (`F12` 또는 `Cmd+Option+I`)
3. `Cmd+Shift+P` (Mac) 또는 `Ctrl+Shift+P` (Windows) 눌러 Command Menu 열기
4. "Coverage" 입력하고 `Show Coverage` 선택
5. 새로고침 버튼 클릭하여 코드 사용량 기록
6. 결과 확인:
   - 빨간색 바: 사용되지 않는 코드
   - 녹색 바: 사용된 코드
   - 대부분의 코드가 빨간색으로 표시되는 것 확인

## 💡 확인할 문제점

### Bundle Analyzer에서 확인

- `moment.js`의 locale 파일들이 모두 포함됨 (~300KB)
- `lodash` 전체가 포함됨 (debounce 하나만 사용하는데도 ~70KB)
- `chart.js` 전체가 포함됨 (조건부 렌더링 컴포넌트에만 사용되는데 ~190KB)
- `date-fns`의 많은 함수들이 포함됨 (~70KB)
- `axios`가 포함됨 (fetch API로 대체 가능 ~13KB)
- 조건부 렌더링 컴포넌트들 (HeavyAdminPanel, HeavyDashboard, HeavyAnalytics)이 초기 번들에 포함됨

### Coverage에서 확인

- 초기 로드 시 **대부분의 코드가 사용되지 않음** (예상: 70%+ 미사용)
- `HeavyAdminPanel.jsx` - 버튼 클릭 전까지 실행되지 않음 (2000개 데이터 처리 로직)
- `HeavyDashboard.jsx` - 버튼 클릭 전까지 실행되지 않음 (730일 데이터 + Chart.js)
- `HeavyAnalytics.jsx` - 버튼 클릭 전까지 실행되지 않음 (5000개 분석 데이터)
- `unusedUtils.js` - 100% 미사용
- `chart.js` - 초기 로드 시 대부분 미사용
- `date-fns` - 조건부 컴포넌트에서만 사용되므로 초기에는 미사용
- `moment.js`와 `lodash`의 대부분 기능이 미사용

## 💡 이 예제로 배울 수 있는 것

이 예제 프로젝트는 번들 분석 도구 사용법을 익히는 것이 목적입니다. 발견한 문제들을 어떻게 해결하는지는 다음 절들에서 다룹니다:

- **2-2-2**: 사용하지 않는 코드 삭제하기 (unusedUtils.js 등)
- **2-2-3**: 트리 셰이킹이 제대로 작동하도록 코드 구조화하기 (동적 import, barrel exports 문제)
- **2-2-4**: 브라우저 네이티브 API로 대체하기 (axios → fetch, moment → Intl API)
- **2-2-5**: 무거운 라이브러리를 가벼운 대안으로 교체하기 (moment → day.js)
- **2-2-6**: 중복 패키지 제거하기

이 예제에서는 번들 분석 도구로 **문제를 발견하고 측정하는 방법**에 집중하세요.

## 📊 최적화 가능성

2-2-2 ~ 2-2-6에서 배울 최적화 방법들을 적용하면:

- **번들 크기**: ~800KB → ~150KB (80% 이상 감소 가능)
  - moment.js 제거 또는 day.js로 대체: -300KB
  - chart.js 동적 import: -190KB
  - lodash 개별 import: -60KB
  - date-fns 최적화: -50KB
  - axios → fetch: -13KB
- **초기 로드 시간**: 50-70% 개선 가능
- **사용되지 않는 코드**: 70%+ → 10% 미만으로 감소
- **Time to Interactive**: 크게 개선

## 🔗 관련 문서

- [2-2-1. 번들 분석으로 문제를 가시화하라](../../posts/part2/2-2.트리_셰이킹보다_불필요한_리소스_자체를_없애는_것이_우선이다.md)
- [Webpack Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
- [Chrome DevTools Coverage](https://developer.chrome.com/docs/devtools/coverage/)
