console.log('📊 [analytics.js] 실행 시작 -', new Date().toISOString())

// 분석 스크립트 시뮬레이션
// DOM에 의존하지 않는 독립적인 코드
;(function () {
  const start = performance.now()

  // 데이터 레이어 초기화
  window.dataLayer = window.dataLayer || []

  function trackEvent(event, data) {
    window.dataLayer.push({ event, data, timestamp: Date.now() })
  }

  // 페이지 뷰 추적
  trackEvent('pageview', {
    url: window.location.href,
    title: document.title,
  })

  const duration = performance.now() - start
  console.log('📊 [analytics.js] 실행 완료 -', duration.toFixed(2) + 'ms')
  console.log('📊 [analytics.js] DOM 상태:', document.readyState)
  console.log('📊 [analytics.js] dataLayer:', window.dataLayer)
})()
