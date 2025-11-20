# 3-1-4 Qwik Resumability 예제

## 목적

이 예제는 3-1 장의 **3-1-4절 "Resumability로 하이드레이션 완전 제거"**에서 설명한 Qwik의 Resumability 개념을 검증합니다.

## 검증하는 코드

### 문서 위치: `posts/part3/3-1.하이드레이션은_줄이는_게_아니라_제거하는_것이다.md`

- **라인 837-850**: Qwik 컴포넌트 예제 (component$, useSignal, onClick$)
- **라인 857-867**: 서버 렌더링 HTML 예제 (on:click, QRL, 직렬화된 상태)
- **라인 800-825**: 전통적 하이드레이션 vs Resumability 비교

## 파일 구조

```
├── src/
│   └── routes/
│       └── index.tsx           # Qwik 컴포넌트 예제 (라인 837-850)
├── package.json
└── vite.config.ts
```

## 실행 방법

```bash
# 의존성 설치 (이미 설치됨)
npm install

# 개발 서버 실행
npm start
```

브라우저에서:

- <http://localhost:5173>

## 검증 방법

### 크롬 개발자 도구 Network 탭

1. **Network 탭 열기**
2. **Disable cache 체크**
3. **페이지 새로고침**

#### 초기 로드

- 초기 자바스크립트 번들이 매우 작음 (Qwik 런타임만)
- 컴포넌트 로직은 로드되지 않음
- 상태는 HTML에 직렬화되어 포함됨

#### 버튼 클릭

- 클릭하는 순간 필요한 청크만 다운로드됨
- Network 탭에서 `q-*.js` 파일이 동적으로 로드되는 것을 확인
- 이전에 로드되지 않았던 코드만 가져옴

### Elements 탭에서 HTML 확인

1. **Elements 탭 열기**
2. **버튼 요소 검사**
3. **`on:click` 속성 확인**:

   ```html
   <button on:click="./chunk-[hash].js#s_[hash][0]">Increment</button>
   ```

   이것이 QRL (Qwik Resource Locator) 형식입니다.

### Performance 탭에서 측정

1. **Performance 탭 열기**
2. **Reload 버튼 클릭** (⟳)
3. **Main Thread 확인**:
   - 초기 로드 시 자바스크립트 실행이 거의 없음
   - 하이드레이션 작업이 없음
   - TTI가 FCP와 거의 동시에 달성됨

## 검증 결과

✅ **component$ 문법**: 문서의 예제 코드가 정확히 동작함
✅ **onClick$ Lazy Loading**: 버튼 클릭 시에만 코드가 로드됨
✅ **QRL 형식**: HTML의 `on:click` 속성에서 파일 경로와 함수 정보 확인
✅ **상태 직렬화**: 서버 상태가 클라이언트에서 복원됨
✅ **Zero Hydration**: 하이드레이션 작업이 전혀 발생하지 않음

## 주요 개념

### Resumability의 장점

- **하이드레이션 제거**: 클라이언트에서 컴포넌트를 재실행하지 않음
- **초기 JS 최소화**: 페이지 로드 시 자바스크립트 실행이 거의 없음
- **즉시 인터랙티브**: TTI ≈ FCP
- **Lazy Execution**: 필요한 코드만 필요한 시점에 로드

### 전통적 하이드레이션과의 차이

#### 전통적 하이드레이션 (React, Vue 등)

1. 서버: 컴포넌트 실행 → HTML 생성
2. 클라이언트: 컴포넌트 **재실행** → 가상 DOM 생성 → DOM 비교 → 이벤트 연결

#### Qwik Resumability

1. 서버: 컴포넌트 실행 → HTML + 상태 직렬화
2. 클라이언트: 상태 복원 → 이벤트 연결 (재실행 없음)

### QRL (Qwik Resource Locator)

문서 라인 869에서 설명한 형식:

```
./chunk-abc123.js#Counter_onClick[0]
│                 │                │
│                 │                └─ 인덱스
│                 └─ 함수명
└─ 파일 경로
```

## 문서 검증 내용

### 라인 837-850 검증

```tsx
const count = useSignal(0)
return <button onClick$={() => count.value++}>Increment</button>
```

→ ✅ `$` 문법이 정확히 동작하며, lazy loading 확인

### 라인 857-867 검증

```html
<button on:click="./chunk-abc123.js#Counter_onClick[0]">Increment</button>
```

→ ✅ 실제 HTML에서 `on:click` 속성과 QRL 형식 확인

### 라인 871-875 성능 이점 검증

- ✅ 초기 자바스크립트 실행 거의 없음
- ✅ 즉시 상호작용 가능 (TTI ≈ FCP)
- ✅ 필요한 것만 다운로드

## 실험

더 많은 패턴을 테스트하려면:

```tsx
// 여러 이벤트 핸들러
<button onClick$={() => console.log('Lazy loaded!')}>
  Click me
</button>

// Visible 전략 (Astro처럼)
<Component client:visible />

// 상태 직렬화 확인
const state = useStore({ count: 0, name: 'test' })
// → HTML script 태그에서 직렬화된 상태 확인 가능
```

Network 탭에서 각 이벤트가 발생할 때마다 동적으로 청크가 로드되는 것을 확인할 수 있습니다.

## 언제 Qwik을 선택할 것인가

문서 라인 879-890에서 설명한 내용:

### Qwik이 유리한 경우

- 콘텐츠 위주 사이트 (블로그, 뉴스, 문서)
- 초기 로딩 성능이 극도로 중요한 경우
- 모바일 환경이 주요 타겟인 경우

### Qwik이 불리한 경우

- 복잡한 상태 관리 (Resumability가 직렬화 어려움)
- 실시간 인터랙션 (lazy load가 지연 느껴질 수 있음)
- 생태계 의존성 (React/Vue 라이브러리 사용 불가)
