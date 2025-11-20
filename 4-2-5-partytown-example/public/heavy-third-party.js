// 무거운 서드파티 스크립트 시뮬레이션
// 실제 분석 도구처럼 DOM을 조작하고 CPU를 사용함

console.log('[Third-Party] 스크립트 시작')

// 1. 초기화 작업 (CPU 집약적)
function heavyInitialization() {
  const start = performance.now()

  // 100ms 동안 CPU 차단
  while (performance.now() - start < 100) {
    // 의미 없는 계산으로 CPU 점유
    Math.sqrt(Math.random())
  }
}

// 2. DOM 조작
function manipulateDOM() {
  const container = document.createElement('div')
  container.id = 'third-party-widget'
  container.style.cssText = 'position:fixed;bottom:10px;left:10px;padding:10px;background:#333;color:#fff;font-size:12px;border-radius:4px;z-index:10000'

  // 50ms CPU 차단
  const start = performance.now()
  while (performance.now() - start < 50) {
    Math.sqrt(Math.random())
  }

  container.innerHTML = '📊 Analytics Running'
  document.body.appendChild(container)
}

// 3. 이벤트 리스너 등록
function trackEvents() {
  let clickCount = 0

  document.addEventListener('click', function(e) {
    clickCount++
    console.log('[Third-Party] Click tracked:', clickCount)

    // 이벤트 처리 시 CPU 사용 (30ms)
    const start = performance.now()
    while (performance.now() - start < 30) {
      Math.sqrt(Math.random())
    }
  })

  document.addEventListener('scroll', function(e) {
    // 스크롤 시 CPU 사용 (20ms)
    const start = performance.now()
    while (performance.now() - start < 20) {
      Math.sqrt(Math.random())
    }
  })
}

// 4. 주기적인 분석 데이터 전송
function sendAnalytics() {
  setInterval(function() {
    // 데이터 수집 및 전송 시뮬레이션 (40ms CPU 차단)
    const start = performance.now()
    while (performance.now() - start < 40) {
      Math.sqrt(Math.random())
    }

    console.log('[Third-Party] Analytics data sent')
  }, 5000) // 5초마다
}

// 5. 실행
heavyInitialization()
manipulateDOM()
trackEvents()
sendAnalytics()

console.log('[Third-Party] 스크립트 완료')
