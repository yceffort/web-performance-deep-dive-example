// defer-c.js - defer 큐 순서 3
;(function () {
  if (window.addLog) {
    window.addLog('defer-c.js 실행 - defer 큐 순서 3', 'defer')
  }

  // defer 큐에서 마지막으로 실행
  // DOMContentLoaded는 이 스크립트 실행 완료 후 발생
  if (window.addLog) {
    window.addLog(
      '  └─ ✓ defer 큐 마지막 스크립트 (DOMContentLoaded 직전)',
      'defer'
    )
  }
})()
