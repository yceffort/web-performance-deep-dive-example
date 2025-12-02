# 3-6-1-2. Animation Performance Comparison

width 애니메이션과 transform 애니메이션의 렌더링 파이프라인 차이를 비교하는 예제입니다.

## 실행 방법

```bash
npx http-server -p 8080
# 또는
open index.html
```

## 캡쳐 방법

1. 크롬 개발자 도구 → Performance 탭
2. 각 애니메이션 시작 후 녹화
3. Main 스레드에서 렌더링 바 확인:
   - **width**: 보라색 Layout + 녹색 Paint 바
   - **transform**: 주황색 Composite 바만
