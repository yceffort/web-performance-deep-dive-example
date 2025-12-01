# Blur-up 이미지 로딩 데모 (React)

React로 구현한 Blur-up 이미지 로딩 기법 데모입니다.

## 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

## Blur-up 효과 확인하기

1. 개발자 도구(F12) → Network 탭 열기
2. 네트워크 속도를 "Slow 3G"로 설정
3. 페이지 새로고침 또는 "이미지 다시 로드" 버튼 클릭

## 프로젝트 구조

```
├── public/images/          # 원본 이미지
├── src/
│   ├── components/
│   │   ├── OptimizedImage.jsx   # Blur-up 이미지 컴포넌트
│   │   └── OptimizedImage.css
│   ├── data/
│   │   └── image-metadata.json  # 이미지 메타데이터 (크기, 프리뷰)
│   ├── App.jsx
│   └── main.jsx
└── scripts/
    └── generate-placeholders.js # 프리뷰 이미지 생성 스크립트
```

## OptimizedImage 컴포넌트 사용법

```jsx
import { OptimizedImage } from './components/OptimizedImage'
import imageMetadata from './data/image-metadata.json'

function HeroSection() {
  return (
    <OptimizedImage
      src="/images/hero.jpg"
      alt="Hero banner"
      loading="eager"
      metadata={imageMetadata['hero.jpg']}
    />
  )
}
```

### Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `src` | string | 필수 | 이미지 경로 |
| `alt` | string | 필수 | 대체 텍스트 |
| `loading` | `'eager'` \| `'lazy'` | `'lazy'` | 로딩 전략 |
| `metadata` | object | `{}` | `{ width, height, preview }` |

## 프리뷰 이미지 생성

새 이미지를 추가한 후 메타데이터를 갱신하려면:

```bash
npm run generate
```

이 스크립트는 `public/images/` 폴더의 모든 이미지를 스캔해서:
- 이미지 크기(width, height) 추출
- 20px 너비의 Base64 프리뷰 생성
- `src/data/image-metadata.json`에 저장

## 핵심 구현 포인트

1. **aspect-ratio로 레이아웃 안정성 확보**: CLS 방지
2. **Base64 프리뷰를 blur 필터와 함께 표시**: 저해상도 이미지가 흐릿하게 보임
3. **원본 이미지 로드 완료 시 opacity 전환**: 부드러운 페이드인
4. **캐시된 이미지 즉시 표시**: `img.complete` 체크
5. **에러 핸들링**: 로드 실패 시 대체 UI 표시
