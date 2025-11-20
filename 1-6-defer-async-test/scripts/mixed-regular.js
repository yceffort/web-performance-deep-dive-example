// Regular script - 파싱 블로킹
;(function () {
  const start = performance.now()

  // 약간의 실행 시간 시뮬레이션
  const data = []
  for (let i = 0; i < 30000; i++) {
    data.push(Math.sqrt(i))
  }

  const duration = (performance.now() - start).toFixed(2)

  if (window.addLog) {
    window.addLog(
      `Regular script 실행 - 파싱 블로킹 (실행: ${duration}ms)`,
      'regular'
    )
  }
})()
