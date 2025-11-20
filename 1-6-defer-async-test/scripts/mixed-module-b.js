// module-b.js - defer 큐 순서 2 (모듈 스크립트)

if (window.addLog) {
  window.addLog(
    'module-b.js 실행 - defer 큐 순서 2 (type="module")',
    'module'
  )
}

// 모듈 스크립트는 strict mode 자동 적용, 스코프 격리
const moduleVariable = 'module-b scope'

// DOM 접근 확인
const bodyExists = !!document.body
if (window.addLog && bodyExists) {
  window.addLog('  └─ ✓ DOM 접근 가능 (모듈 스크립트)', 'module')
}

// ES 모듈 export (선택적)
export const testValue = 'module-b'
