# 3-1-3 Astro Islands 예제

## 목적

이 예제는 3-1 장의 **3-1-3절 "Partial Hydration으로 필요한 부분만 하이드레이션"**에서 설명한 Astro Islands 아키텍처를 검증합니다.

## 검증하는 코드

### 문서 위치: `posts/part3/3-1.하이드레이션은_줄이는_게_아니라_제거하는_것이다.md`

- **라인 650-669**: Astro Islands 기본 예제
- **라인 675-690**: 다양한 하이드레이션 전략 (client:load, client:visible, client:idle, 정적)

## 파일 구조

```
├── src/
│   ├── components/
│   │   ├── Header.astro            # 정적 컴포넌트 (JS 없음)
│   │   ├── StaticContent.astro     # 정적 컴포넌트 (JS 없음)
│   │   ├── CommentForm.tsx         # React 컴포넌트 (client:load)
│   │   ├── InteractiveButton.tsx   # client:load 예제
│   │   ├── ImageGallery.tsx        # client:visible 예제
│   │   └── SearchWidget.tsx        # client:idle 예제
│   └── pages/
│       ├── index.astro             # 기본 Islands 예제 (라인 650-669)
│       └── strategies.astro        # 하이드레이션 전략 예제 (라인 675-690)
├── astro.config.mjs
└── package.json
```

## 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서:

- <http://localhost:4321> - 기본 Islands 예제
- <http://localhost:4321/strategies> - 하이드레이션 전략 비교

## 검증 방법

### 크롬 개발자 도구 Network 탭

1. **Network 탭 열기**
2. **Disable cache 체크**
3. **페이지 새로고침**

#### 기본 페이지 (/)

- HTML만 로드됨 (Header, 본문은 JS 없음)
- CommentForm만 React 번들이 로드됨
- 전체 번들 크기가 크게 줄어듦

#### 전략 비교 페이지 (/strategies)

- InteractiveButton: 페이지 로드 즉시 JS 로드
- ImageGallery: 스크롤하여 화면에 보일 때 JS 로드
- SearchWidget: 브라우저 idle 후 JS 로드
- StaticContent: JS 로드 안 됨

### Performance 탭에서 확인

1. **Performance 탭 열기**
2. **Reload 버튼 클릭** (⟳)
3. **Main Thread 확인**:
   - 정적 컴포넌트는 하이드레이션 안 됨
   - React 컴포넌트만 하이드레이션됨

## 검증 결과

✅ **Astro Islands 기본 동작**: 정적 콘텐츠는 HTML만, 인터랙티브 부분만 JS 로드
✅ **client:load**: 페이지 로드 시 즉시 하이드레이션 확인
✅ **client:visible**: Intersection Observer로 뷰포트 진입 시 하이드레이션 확인
✅ **client:idle**: requestIdleCallback으로 idle 시 하이드레이션 확인
✅ **정적 컴포넌트**: 자바스크립트 0KB 확인

## 주요 개념

### Astro Islands의 장점

- **선택적 하이드레이션**: 인터랙티브한 부분만 JS 로드
- **자동 최적화**: 정적 콘텐츠는 HTML만 생성
- **프레임워크 중립**: React, Vue, Svelte 등 혼용 가능
- **번들 크기 감소**: 불필요한 JS 제거

### 전통적 SPA와의 차이

- **SPA**: 모든 컴포넌트가 번들에 포함, 전체 하이드레이션
- **Astro**: 필요한 컴포넌트만 번들에 포함, 부분 하이드레이션

## 문서 검증 내용

### 라인 650-669 검증

```astro
<Header />                      <!-- 정적: JS 없음 -->
<article>본문...</article>      <!-- 정적: JS 없음 -->
<CommentForm client:load />     <!-- 인터랙티브: JS 포함 -->
```

→ ✅ 정확히 동작 확인

### 라인 675-690 검증

```astro
<InteractiveButton client:load />           <!-- 즉시 하이드레이션 -->
<ImageGallery client:visible />             <!-- 보일 때 하이드레이션 -->
<SearchWidget client:idle />                <!-- idle 시 하이드레이션 -->
<StaticContent />                           <!-- 하이드레이션 없음 -->
```

→ ✅ 모든 전략이 문서 설명대로 동작 확인
