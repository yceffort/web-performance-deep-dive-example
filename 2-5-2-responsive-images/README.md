# 반응형 이미지 예제

2-5-2절 "반응형 이미지로 불필요한 전송 막기"에서 다룬 내용을 실제로 확인할 수 있는 예제입니다.

## 빠른 시작

### 1. 테스트 이미지 자동 다운로드 (이미 완료됨!)

```bash
# 이미지 자동 다운로드 (무료 이미지 사용)
node download-images.js

# 로고 생성
npm install
node create-logo.js
```

**생성된 이미지:**

```
images/
├── hero-400.jpg              # 400px 너비 (21KB)
├── hero-800.jpg              # 800px 너비 (74KB)
├── hero-1200.jpg             # 1200px 너비 (158KB)
├── logo.png                  # 200×60 (1x)
├── logo@2x.png               # 400×120 (2x)
├── logo@3x.png               # 600×180 (3x)
├── mobile-portrait.jpg       # 모바일용 세로 (57KB)
├── mobile-portrait@2x.jpg    # 모바일용 세로 2x (212KB)
├── desktop-landscape.jpg     # 데스크톱용 가로 (55KB)
└── desktop-landscape@2x.jpg  # 데스크톱용 가로 2x (187KB)
```

### 2. 브라우저에서 열기

```bash
# 간단히 파일로 열기
open index.html

# 또는 로컬 서버 실행
npx serve
```

### 3. 개발자 도구로 확인하기

**어떤 이미지가 다운로드되는지 확인:**

1. 브라우저 개발자 도구 열기 (F12 또는 Cmd+Opt+I)
2. **Network** 탭 선택
3. **Img** 필터 적용
4. 페이지 새로고침 (Cmd+R 또는 Ctrl+R)
5. 다운로드된 이미지 확인

**화면 크기 변경 테스트:**

1. 개발자 도구에서 **Device Toolbar** 활성화 (Cmd+Shift+M)
2. 다양한 디바이스 선택 (iPhone, iPad, Desktop 등)
3. DPR(Device Pixel Ratio) 변경 가능
4. 각 크기에서 어떤 이미지가 선택되는지 확인

**주요 확인 사항:**

- **srcset 예제**: 화면 크기에 따라 400w/800w/1200w 중 선택
- **DPR 예제**: DPR 1/2/3에 따라 1x/2x/3x 이미지 선택
- **Art Direction**: 모바일/데스크톱에서 완전히 다른 이미지 로드

## 예제 설명

### 1. srcset과 w descriptor (예제 1)

브라우저가 화면 크기와 DPR을 고려해 자동으로 적절한 이미지를 선택합니다.

- **375px 모바일 (DPR 2)**: 750px 필요 → hero-800.jpg 선택
- **768px 태블릿 (DPR 1)**: 768px 필요 → hero-800.jpg 선택
- **1920px 데스크톱 (DPR 1)**: 1920px 필요 → hero-1200.jpg 선택 (또는 더 큰 이미지)

### 2. sizes 속성 (예제 2)

이미지가 레이아웃에서 차지하는 실제 크기를 브라우저에 알려줍니다.

- **모바일**: 화면 너비의 100% 사용
- **태블릿**: 화면 너비의 50% 사용 (2단 그리드)
- **데스크톱**: 화면 너비의 33% 사용 (3단 그리드)

### 3. 고밀도 디스플레이 대응 (예제 3)

로고처럼 고정된 크기의 이미지는 x descriptor를 사용합니다.

- **일반 모니터 (DPR 1)**: logo.png
- **Retina (DPR 2)**: <logo@2x.png>
- **iPhone 14 Pro (DPR 3)**: <logo@3x.png>

### 4. Art Direction (예제 4)

화면 크기에 따라 완전히 다른 이미지(다른 크롭, 구도)를 제공합니다.

- **모바일**: 세로 크롭 이미지
- **데스크톱**: 가로 와이드 이미지

### 5. picture + srcset 결합 (예제 5)

Art Direction과 DPR 대응을 동시에 수행합니다.

## 디버깅 팁

### 브라우저가 엉뚱한 이미지를 선택할 때

1. **sizes 계산 확인**: CSS와 sizes가 일치하는지 확인
2. **캐시 삭제**: 브라우저가 이전 이미지를 캐싱했을 수 있음
3. **Hard Reload**: Cmd+Shift+R (Mac) 또는 Ctrl+Shift+R (Windows)

### 이미지 선택 알고리즘 이해

브라우저는 "가장 가까운 큰 이미지"를 선택합니다.

- 750px 필요 → 800w 선택 (400w는 너무 작음, 1200w는 불필요)
- 정확히 일치하는 크기가 없으면 바로 위 크기 선택

## 성능 측정

### 라이트하우스로 측정

```bash
# Chrome DevTools의 Lighthouse 탭에서
# - Performance 카테고리 선택
# - "Properly size images" 항목 확인
```

### Network 탭에서 확인

- 각 이미지의 다운로드 크기
- Total transfer size
- 불필요하게 큰 이미지가 다운로드되는지 확인

## 참고 자료

- [MDN - Responsive images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
- [web.dev - Serve responsive images](https://web.dev/serve-responsive-images/)
- [Can I Use - srcset](https://caniuse.com/srcset)
