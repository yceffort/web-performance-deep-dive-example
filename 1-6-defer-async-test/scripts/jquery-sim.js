;(function () {
  console.log('📚 [1. jquery-sim.js] 실행 시작 -', new Date().toISOString())

  const start = performance.now()

  // jQuery 시뮬레이션 - 500ms 걸리는 무거운 라이브러리
  window.$ = function (selector) {
    return {
      text: function (value) {
        const elements = document.querySelectorAll(selector)
        elements.forEach((el) => (el.textContent = value))
        return this
      },
      addClass: function (className) {
        const elements = document.querySelectorAll(selector)
        elements.forEach((el) => el.classList.add(className))
        return this
      },
    }
  }

  // 무거운 초기화 작업
  const data = []
  for (let i = 0; i < 500000; i++) {
    data.push(Math.sqrt(i) * Math.random())
  }

  // 500ms 보장
  while (performance.now() - start < 500) {
    Math.random()
  }

  const duration = performance.now() - start
  window.jqueryLoadTime = duration

  console.log('📚 [1. jquery-sim.js] 실행 완료 -', duration.toFixed(2) + 'ms')
  console.log('📚 [1. jquery-sim.js] $ 함수 정의됨:', typeof window.$ === 'function')
})()
