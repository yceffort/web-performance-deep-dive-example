// helpers.js - 최하위 의존성 (의존성 없음)
console.log('[helpers.js] ✅ 로드됨 - 시간:', new Date().toISOString())

export function multiply(a, b) {
  return a * b
}

export function add(a, b) {
  return a + b
}
