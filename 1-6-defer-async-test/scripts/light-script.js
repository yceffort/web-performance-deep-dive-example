console.log('✅ [light-script.js] 실행 시작 -', new Date().toISOString())

// 가벼운 작업 (~10ms)
const start = performance.now()
let sum = 0
for (let i = 0; i < 100000; i++) {
  sum += i
}
const duration = performance.now() - start

console.log('✅ [light-script.js] 실행 완료 -', duration.toFixed(2) + 'ms')
console.log('✅ [light-script.js] DOM 상태:', document.readyState)
console.log('✅ [light-script.js] body 요소 존재:', !!document.body)
