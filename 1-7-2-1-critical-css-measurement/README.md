# Critical CSS 크기 측정 데모

1-7-2-1 절의 Critical CSS 크기 측정 코드를 실제로 테스트할 수 있는 데모입니다.

## 기능

이 데모는 다음 기능을 제공합니다:

1. **Critical CSS 크기 측정**: `data-critical` 속성이 있는 `<style>` 태그의 크기를 바이트와 KB 단위로 측정
2. **14KB 임계값 확인**: TCP 초기 혼잡 윈도우(IW) 10 패킷 기준 14KB 임계값 준수 여부 확인
3. **시각적 프로그레스 바**: 현재 크기와 임계값을 한눈에 비교
4. **상태 분류**:
   - ✅ 최적 (0-14KB): 첫 RTT에서 전송 가능
   - ⚠️ 주의 (14-20KB): 추가 RTT 발생, 최적화 권장
   - ❌ 위험 (20KB 초과): 즉시 최적화 필요
5. **CSS 내용 보기**: 실제 Critical CSS 내용 확인
6. **측정 코드 복사**: 다른 프로젝트에서 사용할 수 있도록 측정 함수 복사

## 실행 방법

### 1. 로컬 서버 실행

```bash
# 이 디렉토리에서
npx serve -l 8802 .

# 또는 pnpm 사용
pnpm dlx serve -l 8802 .
```

### 2. 브라우저에서 접속

```
http://localhost:8802
```

### 3. Critical CSS 크기 측정

1. "📏 Critical CSS 크기 측정" 버튼 클릭
2. 결과에서 다음 정보 확인:
   - 파일 크기 (바이트/KB)
   - 14KB 대비 비율
   - 최적화 상태 및 권장사항
   - 프로그레스 바로 시각적 확인

### 4. 추가 기능 사용

**CSS 내용 보기**:

- "👁️ CSS 내용 보기" 버튼으로 전체 CSS 코드 확인

**측정 코드 복사**:

- "📋 측정 코드 복사" 버튼으로 측정 함수를 클립보드에 복사
- 다른 프로젝트의 브라우저 콘솔에 붙여넣어 사용 가능

## 현재 데모 페이지의 Critical CSS 크기

이 데모 페이지의 Critical CSS는 약 **7-8KB** 정도로, 14KB 임계값의 약 50-60% 수준입니다.

포함된 스타일:

- 리셋 및 기본 타이포그래피
- 헤더와 히어로 절
- 버튼 스타일 (3가지 변형)
- 메트릭 카드와 프로그레스 바
- 절 레이아웃
- 반응형 미디어 쿼리

## 14KB 제한의 실체

### 정확한 크기: 14.26KB (14,600바이트)

TCP 초기 혼잡 윈도우(IW)는 연결 직후 ACK 없이 전송 가능한 최대 데이터 양을 제한합니다:

- **RFC 6928** 표준: IW = 10 패킷
- **MTU**: 1500바이트 (Ethernet 표준)
- **TCP/IP 헤더**: 40바이트 (IP 20바이트 + TCP 20바이트)
- **실제 데이터 공간**: 1460바이트/패킷
- **계산**: 10 패킷 × 1460바이트 = 14,600바이트 ≈ **14.26KB**

### ⚠️ 중요: Critical CSS만이 아니다!

**첫 RTT (10 패킷)에 포함되는 모든 것:**

```
HTML 마크업
+ <style> 인라인 Critical CSS
+ <script> 인라인 JavaScript
+ 기타 HTML 콘텐츠 (메타 태그, 구조적 마크업 등)
────────────────────────────────────────
= 총합 14,600바이트 (14.26KB) 이하
```

즉, **HTML 문서 전체 크기**가 14.26KB를 넘으면 추가 RTT가 발생합니다.

### 실무 예시

```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>페이지 제목</title>
    <!-- ↑ 메타 태그: ~200 bytes -->

    <style>
      /* Critical CSS: 4-6KB */
    </style>
    <!-- ↑ Critical CSS: 4000-6000 bytes -->

    <script>
      // 인라인 JS (예: 폰트 로더): 1-2KB
    </script>
    <!-- ↑ 인라인 JS: 1000-2000 bytes -->
  </head>
  <body>
    <header>...</header>
    <main>...</main>
    <!-- ↑ HTML 마크업: 3-5KB -->
  </body>
</html>
<!-- 총합: 8-13KB → ✅ 안전 -->
```

### 크기 분해 예시

| 항목                | 크기       | 비율    |
| ------------------- | ---------- | ------- |
| HTML 마크업         | 4.5 KB     | 31%     |
| Critical CSS        | 6.0 KB     | 41%     |
| 인라인 자바스크립트 | 2.0 KB     | 14%     |
| 메타 태그 등        | 0.5 KB     | 3%      |
| **총 HTML 문서**    | **13 KB**  | **89%** |
| **남은 여유**       | **1.3 KB** | **11%** |

**결론**: Critical CSS를 6KB로 제한해도, HTML 마크업과 인라인 JS까지 합치면 13KB가 되어 여유가 거의 없습니다!

### 14KB를 초과하면?

```
클라이언트 → 서버: GET /index.html
서버 → 클라이언트: 첫 10 패킷 (14KB)
[대기] 서버는 ACK를 기다림
클라이언트 → 서버: ACK
서버 → 클라이언트: 나머지 데이터
```

**추가 RTT 발생** → FCP 지연

- 3G 네트워크 (RTT 200ms): 200ms 추가 지연
- 4G 네트워크 (RTT 50ms): 50ms 추가 지연

1KB만 초과해도 추가 왕복이 발생하므로 14KB는 엄격한 한계선입니다.

## 실무 팁

### 1. 크기 측정 시 주의사항

- **압축 전 크기**: 이 도구는 압축 전 크기를 측정합니다
- **Gzip/Brotli**: 실제 전송 시 약 50-70% 압축됨
- **HTML 크기 포함**: Critical CSS만이 아니라 HTML 전체가 14KB 기준

### 2. 최적화 체크리스트

- [ ] Above-the-fold CSS만 포함했는가?
- [ ] 미사용 CSS 규칙을 제거했는가?
- [ ] CSS를 최소화(minify)했는가?
- [ ] 불필요한 벤더 프리픽스를 제거했는가?
- [ ] 중복 선언을 제거했는가?
- [ ] 나머지 CSS는 비동기로 로드하는가?

### 3. 모범 사례

```html
<!-- ✅ 좋은 예: Critical CSS 14KB 이하 -->
<head>
  <style data-critical="true">
    /* Above-the-fold 최소 스타일만 */
  </style>

  <!-- 나머지 CSS는 비동기 로드 -->
  <link rel="preload" href="/styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'" />
</head>
```

```html
<!-- ❌ 나쁜 예: 모든 CSS 동기 로드 -->
<head>
  <link rel="stylesheet" href="/styles.css" />
  <!-- 200KB, 렌더 블로킹 -->
</head>
```

## 브라우저 콘솔에서 직접 측정

페이지의 "📋 측정 코드 복사" 버튼을 클릭하거나, 다음 코드를 복사하여 브라우저 콘솔에 붙여넣으세요:

```javascript
// Critical CSS 크기 측정
function measureCriticalCSSSize() {
  const criticalStyles = document.querySelector('style[data-critical]')
  if (!criticalStyles) {
    console.log('Critical CSS not found')
    return
  }

  const cssContent = criticalStyles.textContent
  const sizeInBytes = new Blob([cssContent]).size
  const sizeInKB = (sizeInBytes / 1024).toFixed(2)

  console.log(`Critical CSS size: ${sizeInKB} KB (${sizeInBytes} bytes)`)

  if (sizeInBytes > 14336) {
    // 14KB
    console.warn('⚠️ Critical CSS exceeds 14KB threshold')
    console.log(`Recommended: reduce by ${sizeInKB - 14} KB`)
  } else {
    console.log('✅ Critical CSS size is optimal')
  }

  return { sizeInBytes, sizeInKB }
}

// 사용 예시
measureCriticalCSSSize()
```

## 실험: Critical CSS 크기 변경해보기

### 실험 1: 스타일 추가하기

개발자 도구에서 `<style data-critical>` 태그에 CSS를 추가하고 다시 측정해보세요:

```css
/* 추가 스타일 예시 */
.extra-large-component {
  /* ... 많은 스타일 ... */
}
```

### 실험 2: 14KB 초과 시나리오

임의의 큰 스타일을 추가하여 14KB를 초과시켜보고 경고 메시지를 확인하세요.

### 실험 3: 최소화 효과 확인

CSS를 최소화(공백 제거)하기 전후의 크기 차이를 비교해보세요.

## 관련 자료

- RFC 6928: Increasing TCP's Initial Window - <https://datatracker.ietf.org/doc/html/rfc6928>
- 1-7-2-1: Critical CSS란 무엇이고 왜 필요한가
- 1-7-2-2: Critical CSS 수동 추출 방법
- 1-7-2-3: 자동화 도구를 활용한 Critical CSS 추출
