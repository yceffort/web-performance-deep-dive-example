# 렌더 블로킹 리소스 감지 데모

1-7-1-4 절의 렌더 블로킹 리소스 감지 코드를 실제로 테스트할 수 있는 데모입니다.

## 포함된 리소스

이 데모 페이지는 다양한 종류의 리소스를 포함하여 렌더 블로킹 동작을 확인할 수 있습니다:

### 렌더 블로킹 리소스 (🔴)

1. **CSS**: `styles/blocking.css`

   - `media` 속성 없이 로드
   - CSSOM 구성 완료까지 렌더링 차단

2. **자바스크립트**: `scripts/blocking.js`
   - `async`/`defer` 없이 `<head>` 내부에 배치
   - HTML 파싱을 차단하고 동기적으로 실행

### 비렌더 블로킹 리소스 (🟢)

1. **CSS**: `styles/print.css`

   - `media="print"` 속성으로 로드
   - 화면 렌더링을 차단하지 않음

2. **자바스크립트**: `scripts/async.js`

   - `async` 속성으로 비동기 로드
   - HTML 파싱과 병렬로 다운로드

3. **자바스크립트**: `scripts/defer.js`
   - `defer` 속성으로 지연 실행
   - HTML 파싱 완료 후 실행

## 실행 방법

### 1. 로컬 서버 실행

```bash
# 이 디렉토리에서
npx serve -l 8801 .

# 또는 pnpm 사용
pnpm dlx serve -l 8801 .
```

### 2. 브라우저에서 접속

```
http://localhost:8801
```

### 3. 렌더 블로킹 리소스 분석

1. 페이지가 로드되면 "📊 렌더 블로킹 리소스 분석" 버튼 클릭
2. 결과에서 다음 정보 확인:
   - 렌더 블로킹 vs 비렌더 블로킹 리소스 개수
   - 각 리소스의 타입, 크기, 로딩 시간
   - 최적화 제안

### 4. 개발자 도구에서 확인

**Console 탭**:

- 각 스크립트의 실행 순서와 시점 확인
- 렌더 블로킹 리소스 테이블 출력

**Network 탭**:

- 리소스 다운로드 타임라인
- Waterfall 차트에서 블로킹 구간 확인

**Performance 탭**:

1. 녹화 시작 (⚫️ 버튼)
2. 페이지 새로고침
3. 녹화 중지
4. Main 스레드에서 Parse HTML 구간 확인
5. CSS/JS 블로킹으로 인한 파싱 중단 시점 확인

**라이트하우스**:

1. 라이트하우스 탭 열기
2. "Analyze page load" 실행
3. "Eliminate render-blocking resources" 항목 확인

## 학습 포인트

### 1. CSS 블로킹

- `blocking.css`는 `media` 속성이 없어서 렌더링 차단
- `print.css`는 `media="print"`로 화면 렌더링에 영향 없음
- Critical CSS 인라인화로 블로킹 제거 가능

### 2. 자바스크립트 블로킹

- `blocking.js`: 동기 스크립트로 HTML 파싱 차단
- `async.js`: 다운로드와 파싱 병렬, 실행 순서 비보장
- `defer.js`: 파싱 후 순서대로 실행

### 3. 감지 방법

```javascript
// 렌더 블로킹 CSS 감지
document.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
  const isBlocking = !link.media || link.media === 'all' || link.media === 'screen'
  console.log(link.href, isBlocking ? '🔴 Blocking' : '🟢 Non-blocking')
})

// 렌더 블로킹 JS 감지
document.querySelectorAll('script[src]').forEach((script) => {
  const inHead = script.closest('head') !== null
  const isBlocking = !script.async && !script.defer && inHead
  console.log(script.src, isBlocking ? '🔴 Blocking' : '🟢 Non-blocking')
})
```

## 최적화 실험

### 실험 1: CSS 인라인화

`index.html`에서 `blocking.css`를 인라인 `<style>` 태그로 변경:

```html
<!-- 변경 전 -->
<link rel="stylesheet" href="styles/blocking.css" />

<!-- 변경 후 -->
<style>
  /* blocking.css 내용 복사 */
</style>
```

**결과**: 렌더 블로킹 리소스 1개 감소, FCP 개선

### 실험 2: 자바스크립트 defer 적용

`index.html`에서 `blocking.js`에 `defer` 추가:

```html
<!-- 변경 전 -->
<script src="scripts/blocking.js"></script>

<!-- 변경 후 -->
<script src="scripts/blocking.js" defer></script>
```

**결과**: HTML 파싱 차단 제거, DOM 로딩 시간 단축

### 실험 3: CSS 비동기 로드

`blocking.css`를 비동기로 로드:

```html
<link rel="preload" href="styles/blocking.css" as="style" onload="this.onload=null;this.rel='stylesheet'" />
<noscript>
  <link rel="stylesheet" href="styles/blocking.css" />
</noscript>
```

**결과**: 초기 렌더링 블로킹 제거, 약간의 FOUC 발생 가능

## 참고

- 1-7-1-4: 실무에서 렌더 블로킹 리소스 확인하기
- 크롬 개발자 도구 Performance 탭 활용법
- 라이트하우스 최적화 제안 해석
