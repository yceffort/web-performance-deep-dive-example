# 이미지 포맷 비교 테스트

2-5-1절 "JPEG vs PNG vs WebP vs AVIF 성능 비교"를 위한 실제 데이터 측정 도구입니다.

## 사용 방법

### 1. 의존성 설치

```bash
npm install
```

### 2. 테스트 이미지 준비

`images/` 폴더에 테스트할 이미지를 추가하세요.

**추천 이미지 유형:**

- **사진** (landscape.jpg): 복잡한 자연 풍경, 1920x1080 이상
- **로고** (logo.png): 투명 배경이 있는 로고, 500x200 정도
- **스크린샷** (screenshot.png): 텍스트가 많은 UI 화면
- **단순 그래픽** (icon.png): 플랫 디자인 아이콘

**이미지 소스 추천:**

- [Unsplash](https://unsplash.com/) - 고품질 무료 사진
- [Pexels](https://pexels.com/) - 무료 스톡 이미지
- [Google WebP Gallery](https://developers.google.com/speed/webp/gallery1) - 공식 테스트 이미지

### 3. 변환 실행

```bash
npm run compare
```

## 출력 정보

각 이미지에 대해 다음 정보를 출력합니다:

- **원본 크기**: 입력 이미지 크기
- **JPEG (품질 80)**: Progressive JPEG
- **PNG (압축 9)**: 최대 압축
- **WebP (품질 80)**: 손실 압축
- **AVIF (품질 70)**: 손실 압축, effort 6

각 포맷별로:

- 절대 크기 (KB/MB)
- 원본 대비 절감률
- JPEG 대비 절감률 (WebP, AVIF)

## 결과물

변환된 이미지는 `output/` 폴더에 저장됩니다:

```
output/
├── filename.jpg
├── filename.png
├── filename.webp
└── filename.avif
```

## 출력 예시

```
📸 landscape.jpg
────────────────────────────────────────────────────────────────────────────────
원본: 3.2 MB                    (기준)
JPEG (품질 80):      245 KB             절감: 92.3%
PNG (압축 9):        892 KB             절감: 72.1%
WebP (품질 80):      168 KB             절감: 94.8%        vs JPEG: 31.4%
AVIF (품질 70):      118 KB             절감: 96.3%        vs JPEG: 51.8%
```

## 주의사항

- AVIF 변환은 시간이 오래 걸립니다 (JPEG의 5-10배)
- 큰 이미지는 처리 시간이 더 걸립니다
- 품질 설정은 `compare.js`에서 조정 가능합니다

## 데이터 활용

이 테스트 결과를 `2-5.이미지는_화질이_아니라_전달_방식이_성능을_좌우한다.md`에서 실제 데이터로 활용합니다.
