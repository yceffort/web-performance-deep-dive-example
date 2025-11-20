// defer-a.js - defer 큐 순서 1
;(function () {
  if (window.addLog) {
    window.addLog('defer-a.js 실행 - defer 큐 순서 1', 'defer')
  }

  // defer 스크립트는 DOM에 안전하게 접근 가능
  const bodyExists = !!document.body
  if (window.addLog && bodyExists) {
    window.addLog('  └─ ✓ DOM 접근 가능 (body 존재)', 'defer')
  }
})()
