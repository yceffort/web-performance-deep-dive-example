// 비렌더 블로킹 자바스크립트 (defer)
// defer 속성으로 HTML 파싱과 병렬로 다운로드됩니다
// HTML 파싱이 완료된 후, DOMContentLoaded 전에 순서대로 실행됩니다

console.log('🟢 Defer Script: defer.js 로드됨')

// defer 스크립트는 DOMContentLoaded 전에 실행됨
document.addEventListener('DOMContentLoaded', () => {
  console.log('🟢 defer.js: DOMContentLoaded 이벤트 발생')
})

// 실행 시점 확인
console.log(
  `🟢 defer.js 실행 시점: ${performance.now().toFixed(2)}ms (navigationStart 기준)`,
)

// defer는 항상 HTML 파싱 후 실행되므로 DOM 접근 안전
if (document.body) {
  console.log('🟢 defer.js: document.body 사용 가능 (HTML 파싱 완료)')
} else {
  console.log('🟢 defer.js: document.body 사용 불가 (예상치 못한 상황)')
}

// DOM이 완전히 로드된 상태이므로 안전하게 조작 가능
console.log(`🟢 defer.js: body 내 요소 수 = ${document.body.children.length}`)
