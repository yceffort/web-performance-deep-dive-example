# Long Task 캡쳐 예제

3-3-1-3절 "Performance 탭에서 Long Task 찾기"를 위한 실습 예제입니다.

## 파일 목록

- **`index.html`**: 다양한 Long Task 유발 예제 (상품 정렬, DOM 렌더링, 계산, 검색, React)
- **`virtual-scroll-example.html`**: 가상 스크롤 최적화 비교 예제 (일반 렌더링 vs react-window)

## 사용 방법

1. HTML 파일을 브라우저에서 엽니다
2. 크롬 개발자 도구를 엽니다 (F12 또는 Cmd+Option+I)
3. Performance 탭을 선택합니다
4. 녹화 버튼(⚫️)을 클릭합니다
5. 원하는 예제 버튼을 클릭합니다
6. 2-3초 후 녹화를 정지합니다
7. Main 트랙에서 빨간색 삼각형 Long Task 경고를 확인합니다

## 포함된 예제

### 1. 전자상거래 상품 정렬 (1000-2000ms Long Task)

- 20,000개 상품을 복잡한 로직으로 정렬
- 할인가, 배송비, 재고, 평점 가중치를 모두 계산
- 최적화 버전과 비교 가능

### 2. 대량 DOM 렌더링 (300-500ms Long Task)

- 10,000개의 DOM 요소를 한 번에 생성
- DOM 조작으로 인한 Long Task 확인

### 3. CPU 집약적 계산 (400-600ms Long Task)

- 복잡한 수학 계산을 100만 번 반복
- 순수 자바스크립트 실행으로 인한 Long Task

### 4. 검색 필터링 (100-200ms Long Task)

- 타이핑할 때마다 10,000개 데이터 필터링
- 타이핑 지연 체감 가능

### 5. React 리스트 렌더링 (800-1200ms Long Task)

- React로 10,000개 아이템 렌더링
- React 내부 함수 호출 스택 확인 가능
- `React.render` → `reconcileChildren` → `appendChild` 과정

## Performance 탭 분석 포인트

- **Main 트랙**: 빨간색 삼각형으로 표시된 Long Task 찾기
- **함수 호출 스택**: 어떤 함수가 시간을 많이 소비하는지 확인
- **Summary 패널**: Scripting vs Rendering 비율 확인
- **CPU Throttling**: 4x slowdown으로 중저사양 환경 시뮬레이션

## 스크린샷 촬영 가이드

책에 포함할 스크린샷을 촬영할 때:

1. 녹화 전 CPU Throttling을 "No throttling"으로 설정 (일관된 결과)
2. 버튼 클릭 후 2-3초 대기 (충분한 컨텍스트)
3. Main 트랙을 확대하여 Long Task 상세 확인
4. 함수 호출 스택이 명확히 보이도록 확대
