;(function () {
  console.log('🔌 [2. plugin-sim.js] 실행 시작 -', new Date().toISOString())

  // jQuery가 먼저 로드되어야 함
  if (typeof window.$ !== 'function') {
    console.error('❌ [2. plugin-sim.js] ERROR: jQuery가 없습니다!')
    throw new Error('jQuery is required')
  }

  const start = performance.now()

  // jQuery 플러그인 추가
  window.$.fn = window.$.fn || {}
  window.$.fn.highlight = function () {
    console.log('🔌 [plugin] highlight 메서드 호출됨')
    return this.addClass('highlight')
  }

  // 200ms 걸리는 초기화
  const items = []
  for (let i = 0; i < 100000; i++) {
    items.push(i * Math.random())
  }

  // 200ms 보장
  while (performance.now() - start < 200) {
    Math.random()
  }

  const duration = performance.now() - start
  window.pluginLoadTime = duration

  console.log('🔌 [2. plugin-sim.js] 실행 완료 -', duration.toFixed(2) + 'ms')
  console.log(
    '🔌 [2. plugin-sim.js] $.fn.highlight 정의됨:',
    typeof window.$.fn.highlight === 'function'
  )
})()
