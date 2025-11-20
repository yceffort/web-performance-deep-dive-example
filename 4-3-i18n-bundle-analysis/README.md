# 다국어 번들 분석 예제

이 프로젝트는 Next.js에서 동적 import를 사용하여 언어 파일을 분리하고, `@next/bundle-analyzer`로 번들 구조를 확인하는 예제입니다.

## 주요 기능

- **동적 import**: `import()`를 사용하여 언어 파일을 별도 청크로 분리
- **번들 분석**: `@next/bundle-analyzer`로 트리맵 시각화
- **코드 스플리팅**: 언어별로 청크가 분리되어 초기 로딩 최적화
- **Lazy Loading**: 사용자가 선택한 언어만 로드

## 설치 및 실행

### 1. 패키지 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 <http://localhost:3000> 으로 접속하여 언어 전환 기능을 테스트할 수 있습니다.

### 3. 번들 분석 실행

```bash
npm run analyze
```

빌드가 완료되면 브라우저에 두 개의 트리맵이 자동으로 열립니다:

- **Client Bundle**: `.next/analyze/client.html`
- **Server Bundle**: `.next/analyze/server.html`

## 번들 분석 결과 확인 방법

### 트리맵에서 확인할 사항

1. **언어 파일 분리 확인**

   - `ko.json`, `en.json`, `ja.json`이 각각 별도 청크로 표시되는지 확인
   - 메인 번들(`main.js` 또는 `pages/index.js`)에 포함되지 않았는지 확인

2. **청크 크기 확인**

   - 각 언어 파일의 크기 (gzip 압축 전/후)
   - 초기 로드되는 번들 크기

3. **동적 import 작동 확인**
   - 언어 파일이 숫자 ID를 가진 별도 청크로 분리됨
   - 예: `123.js` (ko.json), `124.js` (en.json), `125.js` (ja.json)

### 예상 결과

번들 분석기 트리맵에서 다음과 같은 구조를 확인할 수 있습니다:

```
client.html (트리맵)
├── pages/
│   └── index.js (메인 페이지 코드)
├── chunks/
│   ├── 123.js → ko.json (한국어 번역, ~4KB)
│   ├── 124.js → en.json (영어 번역, ~4KB)
│   └── 125.js → ja.json (일본어 번역, ~4KB)
└── framework/
    └── react (React 프레임워크)
```

## 프로젝트 구조

```
4-3-i18n-bundle-analysis/
├── package.json
├── next.config.js          # @next/bundle-analyzer 설정
├── pages/
│   ├── _app.js
│   └── index.js            # 메인 페이지
├── hooks/
│   └── useTranslation.js   # 동적 import로 언어 로드
├── locales/
│   ├── ko.json             # 한국어 번역 (~4KB)
│   ├── en.json             # 영어 번역 (~4KB)
│   └── ja.json             # 일본어 번역 (~4KB)
└── README.md
```

## 핵심 코드 설명

### 1. 동적 import (hooks/useTranslation.js)

```javascript
import(`../locales/${locale}.json`).then((module) => {
  setMessages(module.default)
})
```

동적 `import()`를 사용하여 런타임에 언어 파일을 로드합니다. 이렇게 하면 Webpack/Turbopack이 각 언어 파일을 별도 청크로 분리합니다.

### 2. 번들 분석기 설정 (next.config.js)

```javascript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)
```

`ANALYZE=true` 환경 변수가 설정되면 번들 분석을 활성화합니다.

## 스크린샷 촬영 방법

책에서 사용할 번들 분석기 트리맵 스크린샷을 촬영하려면:

1. `npm run analyze` 실행
2. 브라우저에서 열린 `.next/analyze/client.html` 확인
3. 트리맵에서 언어 파일 청크 영역 확대
4. 스크린샷 촬영 (파일명: `bundle-analyzer-example.png`)
5. 스크린샷에 다음 내용이 포함되도록:
   - 각 언어 파일이 별도 청크로 분리된 모습
   - 청크 크기 정보
   - 트리맵의 전체 구조

## 참고 사항

- 언어 파일은 각각 약 4KB 크기로 만들어져 있어 번들 분석기에서 명확히 보입니다
- 실제 프로덕션에서는 더 많은 번역 키가 포함되어 크기가 더 클 수 있습니다
- Next.js 14+ 버전에서 테스트되었습니다
