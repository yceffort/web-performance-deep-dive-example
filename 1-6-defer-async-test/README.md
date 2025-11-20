# defer/async 스크립트 실행 시점 테스트

## 테스트 목적

1-6-2-1절의 다음 내용을 검증합니다:

> 실제 사이트에서 이를 확인하려면 크롬 개발자 도구의 Performance 탭을 사용한다. 타임라인에서 "DOMContentLoaded" 마커를 찾고, 그 직전에 "Evaluate Script" 작업이 있는지 확인한다. 만약 `defer` 스크립트가 무겁다면, "Parse HTML" 완료와 "DOMContentLoaded" 사이에 긴 "Evaluate Script" 구간이 보일 것이다.

## 파일 구조

```
.
├── scripts/
│   ├── light-script.js          # 가벼운 스크립트 (~10ms 실행)
│   ├── heavy-script.js          # 무거운 스크립트 (~500ms 실행)
│   └── analytics.js             # 독립적인 분석 스크립트
├── 1-normal.html                # 일반 스크립트 (blocking)
├── 2-defer-light.html           # defer 스크립트 (가벼운)
├── 3-defer-heavy.html           # defer 스크립트 (무거운) - 핵심 테스트
├── 4-async.html                 # async 스크립트
└── 5-mixed.html                 # 혼합 (defer + async)
```

## 테스트 방법

### 1. 로컬 서버 실행

```bash
# 이 디렉토리에서 실행
npx serve .

# 또는
python3 -m http.server 8000
```

### 2. 크롬 개발자 도구 준비

1. 크롬에서 `http://localhost:3000` 접속
2. 개발자 도구 열기 (F12 또는 Cmd+Option+I)
3. **Performance 탭** 선택
4. "Disable cache" 체크 (설정 아이콘 클릭)

### 3. 시나리오별 테스트

#### 시나리오 1: 일반 스크립트 (blocking)

**파일**: `1-normal.html`

**목적**: 스크립트가 HTML 파싱을 블로킹하는 것을 확인

**단계**:

1. `1-normal.html` 접속
2. Performance 탭에서 **Record** 버튼 클릭
3. **페이지 새로고침** (Cmd+R)
4. 몇 초 후 **Stop** 버튼 클릭

**확인 사항**:

- Main 트랙에서 "Parse HTML"이 중단되는 지점 확인
- "Evaluate Script - heavy-script.js" 구간이 HTML 파싱 중간에 있는지 확인
- DOMContentLoaded가 스크립트 실행 후 발생하는지 확인

**예상 결과**:

```
Main Thread:
├─ Parse HTML (0~100ms)
├─ Evaluate Script - heavy-script.js (100~600ms) ← 파싱 블로킹
├─ Parse HTML (600~700ms)
└─ DOMContentLoaded (700ms)
```

#### 시나리오 2: defer 스크립트 (가벼운)

**파일**: `2-defer-light.html`

**목적**: defer 스크립트가 HTML 파싱 후 실행되는 것을 확인

**단계**:

1. `2-defer-light.html` 접속
2. Performance 탭에서 **Record** 및 **새로고침**

**확인 사항**:

- "Parse HTML"이 중단 없이 진행되는지 확인
- HTML 파싱 완료 후 "Evaluate Script" 실행 확인
- **DOMContentLoaded 마커 바로 직전**에 "Evaluate Script" 있는지 확인

**예상 결과**:

```
Main Thread:
├─ Parse HTML (0~500ms) ← 중단 없음
├─ Evaluate Script - light-script.js (500~510ms) ← 파싱 완료 후
└─ DOMContentLoaded (510ms) ← 스크립트 실행 직후
```

#### 시나리오 3: defer 스크립트 (무거운) - 핵심 테스트 ⭐

**파일**: `3-defer-heavy.html`

**목적**: 무거운 defer 스크립트가 DOMContentLoaded를 지연시키는 것을 확인

**단계**:

1. `3-defer-heavy.html` 접속
2. Performance 탭에서 **Record** 및 **새로고침**

**확인 사항**:

- "Parse HTML" 완료 시점 확인 (예: 500ms)
- **"Parse HTML" 완료와 "DOMContentLoaded" 사이에 긴 "Evaluate Script" 구간** 확인 (예: 500~1000ms)
- 콘솔에서 실행 순서 확인:
  1. "HTML 파싱 중..."
  2. "heavy-script.js 실행 시작"
  3. "heavy-script.js 실행 완료"
  4. "DOMContentLoaded 발생"

**예상 결과**:

```
Main Thread:
├─ Parse HTML (0~500ms) ← 중단 없음
├─ Evaluate Script - heavy-script.js (500~1000ms) ← 긴 실행 시간
└─ DOMContentLoaded (1000ms) ← 스크립트 실행 완료 후
```

**이것이 1-6-2-1절에서 설명한 내용입니다:**

> 만약 `defer` 스크립트가 무겁다면, "Parse HTML" 완료와 "DOMContentLoaded" 사이에 긴 "Evaluate Script" 구간이 보일 것이다.

#### 시나리오 4: async 스크립트

**파일**: `4-async.html`

**목적**: async 스크립트가 다운로드 완료 즉시 실행되는 것을 확인

**단계**:

1. `4-async.html` 접속
2. Performance 탭에서 **Record** 및 **새로고침**

**확인 사항**:

- "Evaluate Script"가 HTML 파싱 중간에 실행될 수 있음
- DOMContentLoaded가 async 스크립트를 기다리지 않음
- 콘솔에서 실행 순서 확인 (매번 달라질 수 있음)

**예상 결과** (다운로드가 빠른 경우):

```
Main Thread:
├─ Parse HTML (0~200ms)
├─ Evaluate Script - analytics.js (200~210ms) ← 파싱 중단
├─ Parse HTML (210~500ms)
└─ DOMContentLoaded (500ms) ← async 스크립트와 무관
```

#### 시나리오 5: 혼합 (defer + async)

**파일**: `5-mixed.html`

**목적**: defer와 async를 함께 사용할 때의 실행 순서 확인

**확인 사항**:

- async 스크립트는 다운로드 순서대로 실행
- defer 스크립트는 HTML 순서대로 실행
- DOMContentLoaded는 defer 스크립트만 기다림

## 스크립트 설명

### light-script.js

- 실행 시간: ~10ms
- 간단한 콘솔 출력

### heavy-script.js

- 실행 시간: ~1000ms (1초)
- 의도적으로 무거운 연산 (배열 생성, 정렬, 필터링, 맵핑, busy-waiting)
- Performance 탭에서 명확하게 확인 가능

### analytics.js

- 독립적인 스크립트
- DOM에 의존하지 않음
- async 테스트용

## 핵심 포인트

1. **일반 스크립트 (blocking)**: "Parse HTML" 중단 → "Evaluate Script" → "Parse HTML" 재개
2. **defer 스크립트**: "Parse HTML" 완료 → "Evaluate Script" → "DOMContentLoaded"
3. **무거운 defer 스크립트**: "Parse HTML" 완료와 "DOMContentLoaded" 사이에 긴 간격
4. **async 스크립트**: 다운로드 완료 즉시 실행, DOMContentLoaded와 무관

## 브라우저 호환성

- Chrome/Edge: 모든 기능 지원
- Firefox: 모든 기능 지원
- Safari: 모든 기능 지원

## 참고 자료

- [HTML Spec: script element](https://html.spec.whatwg.org/multipage/scripting.html#the-script-element)
- [MDN: defer attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#defer)
- [MDN: async attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#async)
