// module-async.js - async module (defer 큐와 무관)

if (window.addLog) {
  window.addLog(
    'module-async.js 실행 - type="module" async (다운로드 완료 즉시)',
    'async-module'
  )
}

// async module은 다운로드 완료 시점에 따라 실행 시점이 달라짐
// 빠르면 HTML 파싱 중, 느리면 defer 큐 실행 후에도 가능

// DOM 상태 확인
const bodyExists = !!document.body
if (window.addLog) {
  if (bodyExists) {
    window.addLog('  └─ ✓ DOM 존재 (파싱 완료 후 실행)', 'async-module')
  } else {
    window.addLog('  └─ ⚠️ DOM 없음 (파싱 중 실행)', 'async-module')
  }
}

// ES 모듈이므로 import/export 가능
export const asyncModuleValue = 'async-module'
