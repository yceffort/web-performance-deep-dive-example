console.log('🔴 [heavy-script.js] 실행 시작 -', new Date().toISOString())

// 무거운 작업 (~1000ms)
// Performance 탭에서 긴 "Evaluate Script" 구간으로 보임
const start = performance.now()

// CPU 집약적 작업 - 더 무겁게!
let result = 0
const data = []

// 1. 배열 생성 및 복잡한 연산
for (let i = 0; i < 1000000; i++) {
  data.push({
    id: i,
    value: Math.sqrt(i) * Math.random(),
    nested: {
      a: Math.sin(i),
      b: Math.cos(i),
      c: Math.tan(i),
    },
  })
  result += data[i].value
}

// 2. 배열 정렬 (무거운 작업)
data.sort((a, b) => b.value - a.value)

// 3. 배열 필터링 및 맵핑
const filtered = data.filter((item) => item.value > 0).map((item) => item.value * 2)

// 4. reduce로 합계 계산
const sum = filtered.reduce((acc, val) => acc + val, 0)

// 5. 추가 루프 (최소 1초 보장)
const targetDuration = 1000
while (performance.now() - start < targetDuration) {
  // busy waiting - 더 복잡한 연산
  result += Math.sqrt(Math.random() * 1000)
}

const duration = performance.now() - start

console.log('🔴 [heavy-script.js] 실행 완료 -', duration.toFixed(2) + 'ms')
console.log('🔴 [heavy-script.js] DOM 상태:', document.readyState)
console.log('🔴 [heavy-script.js] body 요소 존재:', !!document.body)
console.log('🔴 [heavy-script.js] 처리한 데이터:', data.length, '개')
console.log('🔴 [heavy-script.js] 합계:', sum.toFixed(2))
