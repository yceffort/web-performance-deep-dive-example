# IntersectionObserver를 활용한 지연 로딩 예제

이 예제는 `IntersectionObserver`를 사용하여 Footer 컴포넌트를 지연 로딩하는 방법을 보여줍니다.

## 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

## 주요 기능

- **IntersectionObserver 활용**: 사용자가 푸터 영역에 가까워지면 자동으로 Footer 컴포넌트 로딩
- **rootMargin 설정**: 실제 Footer 위치보다 200px 전에 미리 로딩 시작
- **React.lazy + Suspense**: 지연 로딩과 로딩 상태 관리

## 확인 방법

1. 브라우저 개발자 도구의 Network 탭을 엽니다.
2. 페이지를 새로고침합니다.
3. 스크롤을 천천히 내립니다.
4. 푸터 영역에 가까워지면 Footer 컴포넌트의 청크가 로드되는 것을 확인할 수 있습니다.

## 참고

- 관련 문서: `/posts/part2/2-3.코드_스플리팅은_기능이_아니라_전략이다.md`의 2-3-2-3-2절
