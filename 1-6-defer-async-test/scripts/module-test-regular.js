// Regular script - 파싱을 블로킹하며 즉시 실행됨
;(function () {
  const startTime = performance.now()

  // 일반 스크립트는 파싱 중간에 실행되므로
  // 아직 window.executionLogs가 없을 수도 있음
  if (!window.executionLogs) {
    window.executionLogs = []
  }

  if (!window.addLog) {
    window.addLog = function (step, message) {
      const timestamp = (performance.now() - window.startTime || 0).toFixed(2)
      window.executionLogs.push({ step, message, timestamp })
      console.log(`[${timestamp}ms] ${step}. ${message}`)
    }
  }

  // 약간의 실행 시간 시뮬레이션 (50ms)
  const data = []
  for (let i = 0; i < 50000; i++) {
    data.push(Math.sqrt(i))
  }

  const duration = performance.now() - startTime

  window.addLog(
    2,
    `Regular script 실행 - 파싱을 블로킹함 (실행 시간: ${duration.toFixed(2)}ms)`
  )
})()
