// 렌더 블로킹 자바스크립트 (동기 스크립트)
// async나 defer 속성 없이 head에 배치되어 HTML 파싱을 차단합니다

console.log('🔴 Render Blocking Script: blocking.js 로드됨')

// 의도적으로 실행 시간을 늘려 블로킹 효과를 확인
const startTime = performance.now()

// 간단한 동기 작업
let sum = 0
for (let i = 0; i < 1000000; i++) {
  sum += i
}

const endTime = performance.now()
console.log(
  `🔴 blocking.js 실행 시간: ${(endTime - startTime).toFixed(2)}ms`,
)

// DOM 조작 시도 (head에서 실행되므로 body 요소가 없을 수 있음)
if (document.body) {
  console.log('✅ document.body 사용 가능')
} else {
  console.log('❌ document.body 아직 사용 불가 (파싱 차단 중)')
}
