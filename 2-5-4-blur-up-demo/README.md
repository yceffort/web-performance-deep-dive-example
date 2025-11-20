# Blur-up 이미지 로딩 효과 데모

2-5-4-2절 "Blur-up과 LQIP 기법"의 스크린샷을 촬영하기 위한 데모 프로젝트입니다.

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 작은 프리뷰 이미지 생성
npm run generate

# 브라우저에서 index.html 열기
open index.html
```

## 스크린샷 촬영 방법

### 1. 네트워크 속도 조절

효과를 명확히 보려면 네트워크 속도를 느리게 설정하세요:

1. 크롬 개발자 도구 열기 (F12 또는 Cmd+Option+I)
2. **Network** 탭 선택
3. **Throttling** 드롭다운에서 **Slow 4G** 선택

### 2. 단계별 비교 스크린샷

페이지 상단의 "단계별 비교" 절에서 세 가지 상태를 각각 스크린샷으로 캡처하세요:

- **1단계**: 흐릿한 프리뷰만 표시
- **2단계**: 고해상도 이미지 로딩 중 (50% 전환)
- **3단계**: 최종 선명한 이미지

### 3. 실제 동작 캡처

"실제 동작 데모" 절에서:

1. **"캐시 무시하고 새로고침"** 버튼 클릭
2. 로딩 과정을 화면 녹화 또는 연속 스크린샷
3. 흐릿한 이미지 → 페이드 인 → 선명한 이미지 전환 과정을 캡처

### 4. 추천 캡처 도구

- **macOS**: Cmd+Shift+4 (영역 스크린샷)
- **화면 녹화**: Cmd+Shift+5 → 녹화 시작
- **크롬 확장**: Awesome Screenshot

## 단축키

- **R**: 이미지 재로드
- **C**: 캐시 무시하고 재로드

## 파일 설명

- `index.html` - 데모 페이지
- `styles.css` - 스타일 (blur, transition 효과)
- `script.js` - 이미지 로딩 로직
- `demo-image.jpg` - 원본 이미지 (2.3MB)
- `placeholder-small.jpg` - 작은 프리뷰 (약 600 bytes)
- `generate-placeholder.js` - 프리뷰 생성 스크립트

## 주요 CSS 클래스

```css
.image-placeholder {
  filter: blur(10px); /* 흐림 효과 */
  transform: scale(1.1); /* blur 테두리 제거 */
}

.image-full {
  opacity: 0; /* 초기에는 투명 */
  transition: opacity 0.4s ease-in; /* 페이드 인 */
}

.image-full.loaded {
  opacity: 1; /* 로드 완료 시 불투명 */
}
```

## 팁

- 네트워크가 너무 빠르면 효과가 잘 안 보일 수 있습니다. Slow 4G 또는 3G를 사용하세요.
- 캐시 때문에 효과가 안 보이면 "캐시 무시하고 새로고침" 버튼을 사용하세요.
- 크롬의 Network 탭에서 "Disable cache" 체크박스를 활성화할 수도 있습니다.
