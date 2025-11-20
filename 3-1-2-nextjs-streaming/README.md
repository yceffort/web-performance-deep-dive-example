# 3-1-2 Next.js Streaming SSR 예제

## 목적

이 예제는 3-1 장의 하이드레이션과 Streaming SSR 개념을 검증합니다.

## 검증하는 코드

### 문서 위치: `posts/part3/3-1.하이드레이션은_줄이는_게_아니라_제거하는_것이다.md`

- **라인 22-76**: SSR과 하이드레이션 동작 원리 (Counter 컴포넌트)
- **라인 397-411**: 전통적 SSR 방식 (모든 데이터를 기다림)
- **라인 418-431**: Streaming SSR 방식 (Suspense 사용)
- **라인 485-518**: Next.js App Router에서 Streaming 구현

## 파일 구조

```
├── app/
│   ├── page.tsx              # Streaming SSR 예제 (라인 485-518)
│   ├── hydration/
│   │   ├── page.tsx          # 하이드레이션 설명 페이지 (라인 22-76)
│   │   └── Counter.tsx       # Counter 컴포넌트 예제
│   └── traditional/
│       └── page.tsx          # 전통적 SSR 예제 (라인 397-411)
├── package.json
├── next.config.ts
└── README.md
```

## 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서:

- <http://localhost:3000> - Streaming SSR 예제
- <http://localhost:3000/hydration> - SSR과 하이드레이션 개념 (라인 22-76)
- <http://localhost:3000/traditional> - 전통적 SSR 예제

## 검증 방법

### 크롬 개발자 도구에서 확인

1. **Network 탭 열기**
2. **Disable cache 체크**
3. **페이지 새로고침**

#### Streaming SSR (/)

- 초기 HTML이 즉시 전송됨 (TTFB 빠름)
- "로딩 중..." fallback이 먼저 보임
- 2초 후 댓글이 스트리밍으로 추가됨
- Response 탭에서 청크 단위 전송 확인 가능

#### 전통적 SSR (/traditional)

- 모든 데이터를 기다린 후 HTML 전송 (TTFB 느림)
- 약 2초 후 완전한 페이지가 한 번에 나타남
- 그 전까지 빈 화면

### Performance 탭에서 측정

1. **Performance 탭 열기**
2. **Reload 버튼 클릭** (⟳)
3. **Timings 확인**:
   - Streaming: FCP 빠름
   - Traditional: FCP 느림 (2초+ 대기)

## 검증 결과

✅ **Suspense 기본 동작**: 문서의 예제 코드가 정확히 동작함
✅ **Streaming SSR**: 준비된 부분부터 먼저 전송됨
✅ **전통적 SSR 비교**: 모든 데이터를 기다리는 동작 확인
✅ **Next.js App Router 통합**: Suspense가 자동으로 Streaming 활성화

## 주요 개념

### Streaming SSR의 장점

- **TTFB 개선**: 느린 데이터를 기다리지 않음
- **FCP 개선**: 부분적 HTML을 즉시 렌더링
- **점진적 하이드레이션**: 먼저 온 부분부터 인터랙티브

### 전통적 SSR의 문제점

- 가장 느린 데이터 요청을 기다려야 함
- TTFB와 FCP 모두 지연됨
- 사용자가 오래 빈 화면을 봄

## 추가 실험

문서의 다른 예제들도 테스트하려면:

```tsx
// 여러 Suspense 경계 테스트
<Suspense fallback={<UserSkeleton />}>
  <UserProfile />
</Suspense>
<Suspense fallback={<PostsSkeleton />}>
  <Posts />
</Suspense>
<Suspense fallback={<CommentsSkeleton />}>
  <Comments />
</Suspense>
```

각 컴포넌트가 준비되는 대로 순차적으로 렌더링되는 것을 확인할 수 있습니다.
