# Partytown 적용 전후 비교 예제

Google Analytics 스크립트를 Partytown을 사용하여 Web Worker에서 실행하는 예제입니다. 메인 스레드 차단을 제거하고 성능을 개선하는 효과를 직접 확인할 수 있습니다.

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:8080)
npm start
```

서버가 시작되면 브라우저가 자동으로 열립니다.

## 프로젝트 구조

```
public/
├── index.html              # 메인 페이지 (비교 화면)
├── index-before.html       # Partytown 적용 전
├── index-after.html        # Partytown 적용 후
└── ~partytown/            # Partytown 라이브러리 파일 (자동 복사)
```

## 테스트 방법

### 1. 적용 전 페이지 테스트

1. `index-before.html` 열기
2. 크롬 개발자 도구 > Performance 탭 열기
3. 녹화 버튼 클릭 후 페이지 새로고침
4. Main 트랙에서 `gtag.js` 실행 시간 확인
5. 라이트하우스 실행하여 Performance 점수 확인

### 2. 적용 후 페이지 테스트

1. `index-after.html` 열기
2. Console 탭에서 Partytown 로그 확인
3. Performance 탭에서 프로파일링
4. Main 트랙이 깨끗한지 확인
5. Worker 트랙에 `gtag.js` 실행 확인
6. 라이트하우스로 점수 비교

## 주요 차이점

### 적용 전

```html
<!-- 일반 방식: 메인 스레드에서 실행 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || []
  function gtag() {
    dataLayer.push(arguments)
  }
  gtag('js', new Date())
  gtag('config', 'G-XXXXXXXXXX')
</script>
```

### 적용 후

```html
<!-- Partytown 설정 -->
<script>
  partytown = {
    forward: ['dataLayer.push', 'gtag'],
    lib: '/~partytown/',
  }
</script>

<!-- Partytown 스니펫 -->
<script>
  /* Partytown initialization */
</script>

<!-- type="text/partytown" 속성 추가: Web Worker에서 실행 -->
<script type="text/partytown" async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script type="text/partytown">
  window.dataLayer = window.dataLayer || []
  function gtag() {
    dataLayer.push(arguments)
  }
  gtag('js', new Date())
  gtag('config', 'G-XXXXXXXXXX')
</script>
```

## 예상 성능 개선

- **Total Blocking Time (TBT):** 100-300ms 감소
- **Main Thread Work:** 대폭 감소
- **라이트하우스 Performance 점수:** 5-15점 향상

## 실제 프로덕션 적용 시 주의사항

1. **GA 추적 ID 변경:** 예제의 `G-XXXXXXXXXX`를 실제 추적 ID로 변경
2. **디버그 모드 끄기:** `partytown.debug: false`로 설정
3. **호환성 테스트:** 모든 이벤트와 커스텀 디멘션이 정상 작동하는지 확인
4. **Partytown 파일 배포:** `~partytown` 폴더를 프로덕션 서버에 배포

## 관련 링크

- [Partytown 공식 문서](https://partytown.builder.io/)
- [Google Analytics 4 문서](https://developers.google.com/analytics/devguides/collection/ga4)
- [Web Workers MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
