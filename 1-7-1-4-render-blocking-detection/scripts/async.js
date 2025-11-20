// 비렌더 블로킹 자바스크립트 (async)
// async 속성으로 다운로드와 HTML 파싱이 병렬로 진행됩니다
// 다운로드 완료 즉시 실행되며, 실행 순서는 보장되지 않습니다

console.log('🟢 Async Script: async.js 로드됨')

// async 스크립트는 DOMContentLoaded 전에 실행될 수 있음
document.addEventListener('DOMContentLoaded', () => {
  console.log('🟢 async.js: DOMContentLoaded 이벤트 발생')
})

// 실행 시점 확인
console.log(
  `🟢 async.js 실행 시점: ${performance.now().toFixed(2)}ms (navigationStart 기준)`,
)

if (document.body) {
  console.log('🟢 async.js: document.body 사용 가능')
} else {
  console.log('🟢 async.js: document.body 아직 사용 불가')
}
