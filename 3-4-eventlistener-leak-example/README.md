# EventListener 메모리 누수 예제

이 예제는 React의 `useEffect` 클린업을 하지 않아 발생하는 EventListener 메모리 누수를 재현합니다.

## 문제 코드

```javascript
// ❌ 문제: cleanup을 하지 않음
function openModal() {
  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      closeModal()
    }
  }

  // 리스너 등록만 하고 제거하지 않음
  window.addEventListener('keydown', handleKeyDown)
}

function closeModal() {
  // ❌ removeEventListener를 호출하지 않음!
}
```

## 메모리 누수 디버깅 방법

### 1. 파일 열기

```bash
open index.html
```

또는 브라우저에서 직접 파일을 엽니다.

### 2. 크롬 개발자 도구로 메모리 누수 확인

1. **크롬 개발자 도구 열기** (F12 또는 Cmd+Option+I)

2. **Memory 탭으로 이동**

3. **첫 번째 Heap Snapshot 찍기**

   - "Heap snapshot" 선택
   - "Take snapshot" 버튼 클릭
   - Snapshot 1 생성됨

4. **메모리 누수 재현**

   - "모달 10번 열고 닫기" 버튼 클릭
   - 모달이 자동으로 10번 열렸다 닫힘
   - 예상: 10개의 EventListener가 메모리에 누수됨

5. **두 번째 Heap Snapshot 찍기**

   - 다시 "Take snapshot" 버튼 클릭
   - Snapshot 2 생성됨

6. **Comparison 뷰로 전환**

   - Snapshot 2를 선택
   - 드롭다운에서 "Comparison" 선택
   - "Compared to Snapshot 1" 확인

7. **메모리 누수 확인**

   - "# Delta" 컬럼 헤더를 클릭하여 내림차순 정렬
   - "EventListener" 또는 "DOMWindow" 항목 찾기
   - **# Delta가 +10인지 확인** (모달을 10번 열었으므로)
   - Size Delta도 확인 (메모리 증가량)

8. **Retainers 추적**

   - EventListener 항목을 펼침
   - 그중 하나를 선택
   - 하단의 "Retainers" 패널 확인
   - 참조 체인 확인:

     ```
     Window
       -> listeners (context)
          -> keydown (array)
             -> [0] (bound handleKeyDown)
                -> onClose (function)
                   -> Closure scope
     ```

## 스크린샷 촬영 가이드

### 스크린샷 1: Heap Snapshot Comparison

**파일명**: `memory-snapshot-comparison-eventlistener.png`

**캡처 내용**:

- Memory 탭 전체 화면
- Comparison 뷰 선택됨
- Summary 리스트에서 EventListener 항목 보임
- **# Delta 컬럼에 +10 (빨간색)** 표시
- Constructor, Size Delta 등의 컬럼도 보이게

**캡처 팁**:

- DevTools를 충분히 크게 확대
- EventListener 항목이 화면 중앙에 오도록

- # Delta 값이 명확히 보이도록

### 스크린샷 2: Retainers View

**파일명**: `memory-retainers-view.png`

**캡처 내용**:

- EventListener 객체가 선택된 상태
- 하단 Retainers 패널 활성화
- 참조 체인이 트리 구조로 전개됨
- Window → listeners → keydown → handleKeyDown 경로 보임

**캡처 팁**:

- Retainers 패널의 트리 구조를 모두 펼침
- 각 항목의 크기 정보도 보이게
- 참조 체인 전체가 한 화면에 들어오도록

## 올바른 수정 방법

```javascript
// ✅ 올바른 방법: cleanup 추가
function openModal() {
  let handleKeyDown = null

  function setupListener() {
    handleKeyDown = function (e) {
      if (e.key === 'Escape') {
        closeModal()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
  }

  function cleanup() {
    if (handleKeyDown) {
      window.removeEventListener('keydown', handleKeyDown)
      handleKeyDown = null
    }
  }

  setupListener()

  // cleanup 함수를 반환하여 나중에 호출할 수 있게 함
  return cleanup
}

// React에서는 useEffect의 cleanup 함수로
useEffect(() => {
  function handleKeyDown(e) {
    if (e.key === 'Escape') onClose()
  }

  window.addEventListener('keydown', handleKeyDown)

  // ✅ cleanup 함수 반환
  return () => {
    window.removeEventListener('keydown', handleKeyDown)
  }
}, [onClose])
```

## 참고 사항

- 이 예제는 의도적으로 메모리 누수를 발생시킵니다
- 실제 프로덕션 코드에서는 항상 cleanup을 수행해야 합니다
- 크롬 개발자 도구 Memory 프로파일링 학습용으로 사용하세요
