# YouTube Facade 성능 측정

4-2-4절에서 언급된 YouTube iframe과 Facade 패턴의 성능 차이를 실제로 측정하기 위한 예제입니다.

## 측정 목적

- YouTube iframe 임베드의 실제 자바스크립트 전송 크기 확인
- Facade 패턴 적용 시 초기 로드 크기 비교
- 사용자가 재생 버튼을 클릭하지 않을 때의 성능 이득 확인

## 파일 구성

- `youtube-iframe.html`: 실제 YouTube iframe 임베드
- `youtube-facade.html`: Facade 패턴 적용 버전

## 측정 방법

### 1. 로컬 서버 실행

```bash
cd resources/4-2-4-facade-measurement
npx http-server -p 8080
```

또는 Python:

```bash
python3 -m http.server 8080
```

### 2. 측정 환경 설정

1. Chrome 시크릿 모드 열기
2. 개발자 도구 열기 (F12)
3. Network 탭 이동
4. **Disable cache** 체크
5. **Fast 3G** 네트워크 스로틀링 적용 (선택사항)

### 3. YouTube iframe 측정

1. `http://localhost:8080/youtube-iframe.html` 접속
2. Network 탭에서 JS 필터 적용
3. 페이지 로드 완료 대기
4. 하단 transferred 크기 확인
5. Console에 출력된 상세 정보 확인

### 4. Facade 버전 측정

1. `http://localhost:8080/youtube-facade.html` 접속
2. Network 탭 Clear
3. 페이지 새로고침
4. **재생 버튼 클릭하지 않고** 초기 로드 크기 확인
5. (선택) 재생 버튼 클릭 후 추가 로드 크기 확인

## 예상 측정 결과

### YouTube iframe (실제 임베드)

**초기 로드 시:**

- HTML 문서: ~3 KB
- YouTube iframe 리소스:
  - `www.youtube.com/embed/...`: ~10-20 KB
  - `www.youtube.com/s/player/...` (JS): **300-600 KB** (메인 플레이어 스크립트)
  - 추가 리소스 (이미지, CSS 등): ~50-100 KB
- **총 전송 크기: 약 400-700 KB**

### Facade 버전

**초기 로드 시 (클릭 전):**

- HTML 문서: ~3 KB
- 썸네일 이미지 (`img.youtube.com/vi/.../maxresdefault.jpg`): **20-50 KB**
- 인라인 CSS/JS: ~1 KB
- **총 전송 크기: 약 24-54 KB**

**클릭 후 추가 로드:**

- iframe과 동일한 리소스 로드
- 추가 전송 크기: 약 400-700 KB

## 주요 발견점

1. **초기 로드 차이**: Facade는 iframe 대비 **약 10-15배 가볍습니다**
2. **사용자가 재생하지 않으면**: 400-700 KB를 완전히 절약
3. **체감 성능**: Facade는 즉시 렌더링, iframe은 로드 대기 시간 발생

## 측정 시 주의사항

1. **캐시 비활성화 필수**: 캐시가 있으면 실제 전송 크기를 알 수 없음
2. **네트워크 환경**: 실제 크기는 네트워크 상태와 무관하지만 로드 시간은 영향받음
3. **YouTube 업데이트**: YouTube는 지속적으로 플레이어를 업데이트하므로 크기가 변할 수 있음
4. **압축**: transferred 크기 확인 (압축 후), size는 압축 전 크기

## 책에 반영할 내용

측정 결과에 따라 다음과 같이 표현:

**옵션 1 (구체적 수치 + 측정 조건):**

> 예를 들어 YouTube 임베드는 2025년 1월 측정 기준 약 400-700KB의 리소스를 다운로드하지만, Facade를 사용하면 초기 로드는 20-50KB(썸네일 이미지)로 줄일 수 있다. 측정 방법은 resources/4-2-4-facade-measurement를 참고하라.

**옵션 2 (일반화된 표현):**

> 예를 들어 YouTube 임베드는 페이지 로드 시 수백 KB의 리소스를 다운로드하지만, Facade를 사용하면 초기 로드는 썸네일 이미지만으로 시작할 수 있다. 사용자가 재생 버튼을 클릭할 때만 실제 플레이어를 로드한다.

## 추가 테스트

다른 서드파티도 동일한 방식으로 측정 가능:

- Twitter 임베드
- Facebook SDK
- Google Maps
- Intercom 채팅 위젯

각각에 대한 측정 예제를 추가할 수 있습니다.
