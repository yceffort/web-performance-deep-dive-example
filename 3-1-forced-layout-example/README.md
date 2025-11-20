# 강제 동기 레이아웃 (Forced Synchronous Layout) 예시

이 예시는 3-1 포스트의 "강제 동기 레이아웃 문제"를 실제로 DevTools에서 확인할 수 있도록 만든 데모입니다.

## 파일 구성

- `bad-example.html`: 강제 동기 레이아웃을 유발하는 나쁜 예시
- `good-example.html`: 읽기/쓰기를 분리한 좋은 예시

## 실행 방법

1. Chrome 브라우저에서 각 HTML 파일을 엽니다
2. DevTools를 열고 (F12 또는 Cmd+Option+I) Performance 탭으로 이동
3. "Start profiling and reload page" (⟳) 버튼 클릭
4. 프로파일링이 완료되면 Main 스레드를 확인

## 확인할 내용

### 나쁜 예시 (bad-example.html)

- **"Recalculate Style"과 "Layout"이 반복**되는 패턴 확인
- 각 요소마다 레이아웃 재계산이 발생하여 지그재그 패턴
- 보라색 경고 표시 "Forced reflow is a likely performance bottleneck"

### 좋은 예시 (good-example.html)

- 모든 읽기 작업 후 한 번에 쓰기 작업 수행
- "Layout"이 한 번만 발생
- 성능이 크게 개선됨

## 성능 차이

1000개 요소 기준:

- **나쁜 예시**: ~500-800ms (기기에 따라 다름)
- **좋은 예시**: ~50-100ms (약 **5-10배 빠름**)

## 원리

### 나쁜 예시 (강제 동기 레이아웃)

```javascript
elements.forEach((el) => {
  const height = el.offsetHeight // DOM 읽기 → 레이아웃 계산 강제
  el.style.height = height + 10 + 'px' // DOM 쓰기
  // 다음 반복에서 다시 읽기 → 레이아웃 재계산 강제
})
```

### 좋은 예시 (읽기/쓰기 분리)

```javascript
// 1단계: 모든 읽기 먼저
const heights = elements.map((el) => el.offsetHeight)

// 2단계: 모든 쓰기 나중에
elements.forEach((el, i) => {
  el.style.height = heights[i] + 10 + 'px'
})
```

## DevTools에서 확인하는 방법

1. Performance 패널에서 Main 스레드 확대
2. "Recalculate Style"과 "Layout" 블록 찾기
3. 나쁜 예시: 여러 번 반복되는 패턴
4. 좋은 예시: 한 번만 발생

![DevTools 예시](../../posts/part3/images/forced-layout-devtools.png)

## 참고

- [Avoid Large, Complex Layouts and Layout Thrashing - Web.dev](https://web.dev/avoid-large-complex-layouts-and-layout-thrashing/)
- [What forces layout / reflow - Gist by Paul Irish](https://gist.github.com/paulirish/5d52fb081b3570c81e3a)
