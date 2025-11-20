# 2-7. 폰트 최적화 예제 모음

이 폴더는 웹 폰트 최적화와 관련된 다양한 현상과 전략을 실습할 수 있는 예제들을 포함합니다.

## 📁 폴더 구조

```
2-7-font-optimization/
├── fonts/                          # 공통 폰트 파일
│   └── roboto-*.woff2
├── 1-foit-example/                 # FOIT 현상 재현
├── 2-fout-example/                 # FOUT 현상 재현 (CLS 측정)
├── 3-foft-example/                 # FOFT 현상 재현 (Synthetic bold/italic)
├── 5-font-display-optional/        # font-display: optional 전략
├── download-fonts.js               # 폰트 다운로드 스크립트
└── README.md                       # 이 파일
```

## 🚀 시작하기

### 1. 폰트 다운로드

먼저 예제에 사용할 폰트를 다운로드합니다:

```bash
cd resources/2-7-font-optimization
node download-fonts.js
```

### 2. 예제 실행

각 예제는 독립적인 `Node.js` 서버로 실행됩니다:

```bash
# FOIT 예제
cd 1-foit-example
node server.js
# http://localhost:3001 에서 확인

# FOUT 예제
cd 2-fout-example
node server.js
# http://localhost:3002 에서 확인

# FOFT 예제
cd 3-foft-example
node server.js
# http://localhost:3003 에서 확인

# font-display: optional 예제
cd 5-font-display-optional
node server.js
# http://localhost:3005 에서 확인
```

## 📚 예제 상세 설명

### 1. FOIT (Flash of Invisible Text) - `1-foit-example/`

**개념:** 웹 폰트가 로드되는 동안 텍스트를 완전히 숨기는 현상

**특징:**

- `font-display` 속성을 설정하지 않은 경우 발생
- Chrome/Firefox: 최대 3초 동안 텍스트 숨김
- Safari: 폰트가 로드될 때까지 무한정 대기

**성능 영향:**

- FCP (First Contentful Paint) 지연
- LCP (Largest Contentful Paint) 지연
- 사용자는 빈 화면만 보게 됨

**실행 방법:**

```bash
cd 1-foit-example
node server.js
```

브라우저에서 <http://localhost:3001> 을 열고:

1. 페이지가 로드되어도 텍스트가 보이지 않는 것을 확인
2. 약 3-4초 후 텍스트가 나타나는 것을 확인
3. 크롬 개발자 도구 Performance 패널에서 FCP 지연 확인

**측정 항목:**

- 폰트 로딩 상태
- 경과 시간
- FCP 발생 시점

### 2. FOUT (Flash of Unstyled Text) - `2-fout-example/`

**개념:** 폴백 폰트로 텍스트를 먼저 표시한 뒤 웹 폰트로 교체하면서 "깜빡이는" 현상

**특징:**

- `font-display: swap` 사용
- 텍스트가 즉시 표시되어 FOIT 방지
- 폰트 교체 시 레이아웃 시프트 발생 가능

**성능 영향:**

- FCP: 즉시 발생 (좋음)
- LCP: 빠르게 측정 (좋음)
- CLS: 폰트 메트릭 차이로 인한 레이아웃 시프트 발생 가능 (주의)

**실행 방법:**

```bash
cd 2-fout-example
node server.js
```

브라우저에서 <http://localhost:3002> 를 열고:

1. 텍스트가 즉시 Arial 폴백 폰트로 표시되는 것을 확인
2. 약 2초 후 CustomFont로 교체되면서 화면이 변하는 것을 확인
3. Layout Shift가 발생하는지 확인
4. CLS 점수 확인

**측정 항목:**

- 폰트 상태
- FCP
- 누적 CLS
- Layout Shifts 횟수

### 3. FOFT (Flash of Faux Text) - `3-foft-example/`

**개념:** Regular 폰트만 로드되고 Bold/Italic 폰트가 없을 때 synthetic bold/italic으로 렌더링되는 현상

**특징:**

- Regular 폰트는 즉시 로드
- Bold 폰트는 3초 지연
- Italic 폰트는 정의하지 않음
- Synthetic bold/italic과 real font의 시각적 차이 확인

**문제점:**

- Synthetic bold는 픽셀을 단순 확장하여 글자가 뭉개짐
- 진짜 Bold 폰트 로드 시 다시 교체되어 FOUT 발생
- 가독성 저하 및 레이아웃 시프트 가능

**실행 방법:**

```bash
cd 3-foft-example
node server.js
```

브라우저에서 <http://localhost:3003> 을 열고:

1. Regular 텍스트는 즉시 정확하게 렌더링
2. Bold 텍스트는 처음 3초간 synthetic bold로 렌더링
3. 3초 후 real Bold 폰트로 교체되는 것을 확인
4. Italic 텍스트는 계속 synthetic italic 사용

**측정 항목:**

- Regular 폰트 로딩 상태
- Bold 폰트 로딩 상태
- Italic 폰트 상태 (정의되지 않음)
- 시각적 비교 (synthetic vs real)

### 5. font-display: optional - `5-font-display-optional/`

**개념:** 100ms 안에 폰트가 로드되지 않으면 폴백 폰트를 사용하고 이후 절대 교체하지 않는 전략

**특징:**

- Block period: ~100ms
- Swap period: 0 (절대 교체 안함)
- FOUT 완전 차단
- CLS 완전 방지

**장점:**

- 레이아웃 시프트 완전 차단
- 느린 네트워크에서 불필요한 폰트 다운로드 방지
- CLS 점수 0 달성 가능

**단점:**

- 느린 네트워크에서 웹 폰트 미적용
- 디자인 일관성 부족 가능

**실행 방법:**

```bash
cd 5-font-display-optional
node server.js
```

브라우저에서:

- **느린 모드**: <http://localhost:3005/?mode=slow>
  - 폰트 200ms 지연 → 100ms 초과로 optional이 포기
  - 시스템 폰트 사용, 이후 교체 없음
- **빠른 모드**: <http://localhost:3005/?mode=fast>
  - 폰트 50ms 지연 → 100ms 이내로 optional 적용 가능
  - OptionalFont 사용

**측정 항목:**

- 폰트 로드 시간
- 100ms 이내 로드 여부
- 누적 CLS (항상 0이어야 함)
- Layout Shifts 횟수 (0이어야 함)

## 🧪 크롬 개발자 도구 활용

각 예제를 더 깊이 분석하려면 크롬 개발자 도구를 활용하세요:

### Performance 패널

1. DevTools 열기 (F12 또는 Cmd+Option+I)
2. Performance 탭 선택
3. 녹화 버튼 클릭 후 페이지 새로고침
4. 확인 항목:
   - **Timings**: FCP, LCP 마커 위치
   - **Experience**: Layout Shift (빨간색 막대)
   - **Network**: 폰트 다운로드 타이밍

### Network 패널

1. Network 탭 선택
2. "Font" 필터 적용
3. 폰트 파일 다운로드 타이밍 확인
4. Throttling 설정하여 느린 네트워크 시뮬레이션:
   - Slow 4G: 폰트 로딩이 느려져서 FOIT/FOUT 더 명확하게 확인
   - Fast 3G: optional이 100ms 내에 로드 실패하는 상황 재현

### Rendering 패널

1. DevTools 메뉴 → More tools → Rendering
2. "Show layout shift regions" 체크
3. 폰트 교체 시 레이아웃 시프트가 파란색으로 강조 표시됨

## 📊 성능 지표 비교

| 전략                     | FOIT | FOUT | CLS 위험 | FCP  | 사용 사례                 |
| ------------------------ | ---- | ---- | -------- | ---- | ------------------------- |
| font-display 없음 (FOIT) | 예   | 예   | 높음     | 느림 | 권장하지 않음             |
| font-display: swap       | 없음 | 예   | 중간     | 빠름 | 일반 텍스트 (가장 일반적) |
| font-display: optional   | 짧음 | 없음 | 없음     | 빠름 | CLS 절대 방지, 성능 우선  |

## 🎯 실전 권장사항

### 1. 본문 텍스트

```css
@font-face {
  font-family: 'BodyFont';
  src: url('/fonts/body.woff2') format('woff2');
  font-display: swap; /* 또는 optional */
}
```

### 2. 헤드라인

```css
@font-face {
  font-family: 'HeadlineFont';
  src: url('/fonts/headline.woff2') format('woff2');
  font-display: swap; /* 브랜드 폰트 확실히 적용 */
}
```

### 3. CLS 절대 방지가 필요한 경우

```css
@font-face {
  font-family: 'OptionalFont';
  src: url('/fonts/optional.woff2') format('woff2');
  font-display: optional; /* CLS 완전 차단 */
}
```

## 🔧 추가 최적화 팁

### 1. 폰트 프리로드

```html
<link rel="preload" href="/fonts/font.woff2" as="font" type="font/woff2" crossorigin />
```

### 2. 모든 폰트 변형 로드 (FOFT 방지)

```css
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}

@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/bold.woff2') format('woff2');
  font-weight: 700;
  font-display: swap;
}
```

### 3. 폴백 폰트 스택

```css
body {
  font-family:
    'CustomFont',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Arial,
    sans-serif;
}
```

## 📖 참고 자료

- [Chrome for Developers: font-display](https://developer.chrome.com/blog/font-display)
- [MDN: font-display](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display)
- [Web.dev: Optimize WebFont loading and rendering](https://web.dev/optimize-webfonts/)
- [DebugBear: Fixing Layout Shifts Caused by Web Fonts](https://www.debugbear.com/blog/layout-shifts-webfonts)

## 🐛 문제 해결

### 폰트가 다운로드되지 않았어요

```bash
cd resources/2-7-font-optimization
node download-fonts.js
```

### 서버가 실행되지 않아요

`Node.js`가 설치되어 있는지 확인하세요:

```bash
node --version
```

### 여러 예제를 동시에 실행하고 싶어요

각 예제는 서로 다른 포트를 사용하므로 동시 실행 가능합니다:

- Port 3001: FOIT 예제
- Port 3002: FOUT 예제
- Port 3003: FOFT 예제
- Port 3005: optional 예제

### 크롬 개발자 도구에서 CLS가 측정되지 않아요

1. Performance 패널 → Experience 절 확인
2. Rendering 패널 → "Show layout shift regions" 활성화
3. Console에서 CLS 점수 직접 확인 (예제 코드에 포함됨)

## 📝 라이선스

이 예제들은 교육 목적으로 자유롭게 사용할 수 있습니다.
