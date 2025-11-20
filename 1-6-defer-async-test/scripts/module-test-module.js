// Module script - HTML 파싱 완료 후 실행됨 (defer처럼 동작)
const startTime = performance.now()

// 모듈 스크립트는 파싱 완료 후 실행되므로
// window.addLog가 이미 정의되어 있음
if (window.addLog) {
  window.addLog(
    3,
    'Module script 실행 - HTML 파싱 완료 후 실행 (defer처럼 동작)'
  )
}

// DOM이 이미 준비되어 있음을 확인
const body = document.querySelector('body')
if (body) {
  const duration = performance.now() - startTime
  window.addLog(
    3,
    `✓ DOM 접근 가능 - body.children.length: ${body.children.length} (실행 시간: ${duration.toFixed(2)}ms)`
  )
}

// ES 모듈 특징: strict mode 자동 적용, 스코프 격리
const moduleMessage = '이 변수는 모듈 스코프에만 존재'
console.log(`[Module] ${moduleMessage}`)

// 전역 스코프에 접근하려면 window 명시 필요
window.moduleExecuted = true

// 모듈은 import/export 사용 가능 (이 예시에서는 생략)
export const testValue = 'module export test'
