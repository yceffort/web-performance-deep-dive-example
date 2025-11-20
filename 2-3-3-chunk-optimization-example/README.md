# 청크 최적화 예제

2-3-3절 "청크 최적화와 공통 모듈 추출"을 실습하기 위한 예제 프로젝트입니다.

## 📦 포함된 라이브러리

이 프로젝트는 의도적으로 무거운 라이브러리들을 포함하여 청크 최적화의 효과를 확인할 수 있도록 구성되었습니다:

- **React + React Router**: 프레임워크 (~145KB)
- **Chart.js + react-chartjs-2**: 차트 라이브러리 (~155KB) - Dashboard 페이지에서만 사용
- **lodash-es**: 유틸리티 라이브러리 (~24KB, 트리 셰이킹 적용) - Settings 페이지에서만 사용
- **date-fns**: 날짜 처리 라이브러리 (~70KB) - Profile 페이지에서만 사용

## 🚀 시작하기

### 1. 의존성 설치

```bash
cd resources/2-3-3-chunk-optimization-example
pnpm install
```

### 2. 기본 빌드 (vendor 청크 세분화 안 함)

```bash
pnpm run build
```

빌드가 완료되면 자동으로 `dist/stats.html`이 브라우저에서 열립니다.

### 3. 최적화된 빌드 (vendor 청크 세분화)

```bash
pnpm run build:optimized
```

빌드가 완료되면 자동으로 `dist/stats-optimized.html`이 브라우저에서 열립니다.

## 📊 빌드 결과 비교

### 기본 설정 (vite.config.js)

```javascript
manualChunks: {
  vendor: ['react', 'react-dom'],
}
```

**예상 결과:**

- `index.js`: ~230KB (애플리케이션 코드 + Chart.js + lodash-es + date-fns 모두 포함)
- `vendor.js`: ~141KB (React + ReactDOM)

### 최적화된 설정 (vite.config.optimized.js)

```javascript
manualChunks: {
  'vendor-react': ['react', 'react-dom', 'react-router-dom'],
  'vendor-charts': ['chart.js', 'react-chartjs-2'],
  'vendor-utils': ['lodash-es', 'date-fns'],
}
```

**예상 결과:**

- `index.js`: ~12KB (애플리케이션 코드)
- `vendor-react.js`: ~145KB (React + ReactDOM + Router)
- `vendor-charts.js`: ~155KB (Chart.js)
- `vendor-utils.js`: ~24KB (lodash-es + date-fns, 트리 셰이킹 적용)
- `Dashboard.js`: ~8KB (Dashboard 코드만)
- `Settings.js`: ~6KB (Settings 코드만)
- `Profile.js`: ~6KB (Profile 코드만)

## 🔍 Rollup Visualizer로 확인하기

### 1. 트리맵 보는 방법

빌드 후 `dist/stats.html` 또는 `dist/stats-optimized.html`을 열면:

- **큰 사각형**: 큰 라이브러리 (Chart.js, React 등)
- **색상**: 각 청크별로 다른 색상
- **마우스 오버**: 정확한 크기 확인 가능

### 2. 비교 포인트

#### 기본 설정에서 확인할 점:

- 모든 라이브러리(Chart.js, lodash-es, date-fns)가 `index.js`에 함께 번들링됨
- 초기 로드 시 사용하지 않는 라이브러리까지 모두 다운로드됨
- 총 번들 크기: ~371KB (index + vendor)

#### 최적화된 설정에서 확인할 점:

- Chart.js가 별도 `vendor-charts` 청크로 분리됨
- lodash-es와 date-fns가 `vendor-utils` 청크로 분리됨
- 각 페이지 청크가 매우 작아짐 (~6-8KB)
- 사용자가 Dashboard를 방문할 때만 `vendor-charts` 로드

## 💡 실습 가이드

### 1. 기본 빌드 실행 및 분석

```bash
pnpm run build
```

`dist/stats.html`에서 확인:

- 각 청크의 크기
- 어떤 라이브러리가 어느 청크에 포함되어 있는지
- Chart.js, lodash-es, date-fns의 위치

### 2. 최적화된 빌드 실행 및 비교

```bash
pnpm run build:optimized
```

`dist/stats-optimized.html`에서 확인:

- vendor 청크가 어떻게 세분화되었는지
- 각 페이지 청크의 크기가 얼마나 줄었는지
- 캐싱 효율이 얼마나 개선되었는지

### 3. 스크린샷 촬영

두 파일을 비교하며 스크린샷을 촬영하여 문서에 삽입하세요:

- `stats.html`: 기본 설정의 트리맵
- `stats-optimized.html`: 최적화된 설정의 트리맵

## 🎯 학습 목표

이 예제를 통해 다음을 확인할 수 있습니다:

1. **vendor 청크 분리의 효과**

   - 라이브러리를 별도 청크로 분리하면 각 페이지 청크가 작아짐
   - 캐싱 효율이 증가함 (라이브러리는 변경 빈도가 낮음)

2. **트리 셰이킹의 효과**

   - lodash-es는 필요한 함수만 포함됨
   - date-fns도 사용한 함수만 포함됨

3. **청크 크기와 개수의 균형**
   - 너무 많은 청크는 HTTP 요청 증가
   - 적절한 크기의 청크로 나누는 것이 중요

## 🔗 관련 문서

- [2-3-3. 청크 최적화와 공통 모듈 추출](../../posts/part2/2-3.코드_스플리팅은_기능이_아니라_전략이다.md#2-3-3-청크-최적화와-공통-모듈-추출)
