# modulepreload 의존성 자동 다운로드 테스트

## 테스트 목적

1-5-4-3절의 다음 주장을 검증합니다:

> `modulepreload`의 장점은 모듈과 그 모듈이 import하는 의존성을 함께 다운로드한다는 것이다. 일반 `preload`는 명시된 파일만 다운로드하지만, `modulepreload`는 모듈이 import하는 다른 모듈까지 크롤링해서 다운로드한다.

## 파일 구조

```
.
├── modules/
│   ├── chart.js          # 메인 모듈 (chart-utils.js와 chart-axis.js를 import)
│   ├── chart-utils.js    # 의존성 모듈 1
│   └── chart-axis.js     # 의존성 모듈 2
├── index-with-modulepreload.html       # chart.js만 modulepreload 선언
├── index-with-all-modulepreload.html   # 모든 모듈을 modulepreload 선언
└── index-without-modulepreload.html    # modulepreload 없음 (비교용)
```

## 테스트 방법

### 1. 로컬 서버 실행

ES 모듈은 파일 프로토콜(`file://`)에서 작동하지 않으므로 로컬 서버가 필요합니다.

```bash
# 이 디렉토리에서 실행
npx serve .

# 또는
python3 -m http.server 8000

# 또는
php -S localhost:8000
```

### 2. 테스트 시나리오

#### 시나리오 1: chart.js만 modulepreload 선언

1. `http://localhost:8000/index-with-modulepreload.html` 접속
2. 개발자 도구 → Network 탭 열기
3. "Disable cache" 체크
4. JS 파일 필터 적용
5. **페이지 새로고침**
6. 결과 확인:
   - **만약 의존성이 자동으로 다운로드된다면**: chart.js, chart-utils.js, chart-axis.js 세 파일 모두 페이지 로드 시점에 다운로드됨
   - **만약 명시된 모듈만 다운로드된다면**: chart.js만 페이지 로드 시점에 다운로드됨
7. "Chart 모듈 import 하기" 버튼 클릭
8. 의존성 모듈들이 언제 다운로드되는지 확인

#### 시나리오 2: 모든 모듈을 명시적으로 modulepreload 선언

1. `http://localhost:8000/index-with-all-modulepreload.html` 접속
2. 개발자 도구 → Network 탭 열기
3. "Disable cache" 체크
4. JS 파일 필터 적용
5. **페이지 새로고침**
6. 결과 확인:
   - chart.js, chart-utils.js, chart-axis.js 세 파일 모두 페이지 로드 시점에 다운로드되어야 함
7. "Chart 모듈 import 하기" 버튼 클릭
8. 이미 다운로드된 모듈을 재사용하는지 확인

#### 시나리오 3: modulepreload 없음 (비교용)

1. `http://localhost:8000/index-without-modulepreload.html` 접속
2. 개발자 도구 → Network 탭 열기
3. "Disable cache" 체크
4. JS 파일 필터 적용
5. **페이지 새로고침**
6. 결과 확인:
   - 페이지 로드 시점에는 JS 파일이 다운로드되지 않아야 함 (HTML만)
7. "Chart 모듈 import 하기" 버튼 클릭
8. 버튼 클릭 시점에 chart.js → chart-utils.js → chart-axis.js 순으로 순차 다운로드됨

## 예상 결과

### 가설 A: modulepreload가 의존성을 자동으로 크롤링한다면

- **시나리오 1**: chart.js, chart-utils.js, chart-axis.js 세 파일 모두 페이지 로드 시 다운로드
- **시나리오 2**: 세 파일 모두 페이지 로드 시 다운로드
- **시나리오 3**: 버튼 클릭 시에만 다운로드

### 가설 B: modulepreload가 명시된 모듈만 다운로드한다면

- **시나리오 1**: chart.js만 페이지 로드 시 다운로드, 나머지는 버튼 클릭 시 다운로드
- **시나리오 2**: 세 파일 모두 페이지 로드 시 다운로드
- **시나리오 3**: 버튼 클릭 시에만 다운로드

## 확인 포인트

### Network 탭에서 확인할 사항

1. **Initiator 컬럼**: 각 파일이 누구에 의해 요청되었는지
   - `<link rel="modulepreload">`에 의한 요청: "Other" 또는 HTML 파일명
   - `import` 구문에 의한 요청: 해당 JS 파일명
2. **Waterfall**: 다운로드 타이밍
   - 페이지 로드 직후 다운로드: modulepreload 효과
   - 버튼 클릭 후 다운로드: 동적 import 효과
3. **Priority**: 우선순위
   - modulepreload로 요청된 파일: High 우선순위

## 브라우저별 차이

- Chrome/Edge: modulepreload 지원
- Firefox: modulepreload 지원 (Firefox 115+)
- Safari: modulepreload 지원 (Safari 16.4+)

## 참고 자료

- [MDN: rel="modulepreload"](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/modulepreload)
- [HTML Spec: Link type "modulepreload"](https://html.spec.whatwg.org/multipage/links.html#link-type-modulepreload)
