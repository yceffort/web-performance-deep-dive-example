;(function () {
  console.log('🚀 [3. app-sim.js] 실행 시작 -', new Date().toISOString())

  // jQuery와 Plugin이 먼저 로드되어야 함
  if (typeof window.$ !== 'function') {
    console.error('❌ [3. app-sim.js] ERROR: jQuery가 없습니다!')
    throw new Error('jQuery is required')
  }

  if (typeof window.$.fn.highlight !== 'function') {
    console.error('❌ [3. app-sim.js] ERROR: Plugin이 없습니다!')
    throw new Error('Plugin is required')
  }

  const start = performance.now()

  // 플러그인 사용
  console.log('🚀 [app] jQuery와 Plugin을 사용하여 초기화 중...')

  // DOM 조작
  window.$('#status').text('✅ 모든 스크립트 로드 완료!')
  window.$('#jquery-time').text(
    '📚 jQuery: ' + (window.jqueryLoadTime || 0).toFixed(2) + 'ms'
  )
  window.$('#plugin-time').text(
    '🔌 Plugin: ' + (window.pluginLoadTime || 0).toFixed(2) + 'ms'
  )

  // 300ms 걸리는 초기화
  const results = []
  for (let i = 0; i < 200000; i++) {
    results.push(Math.sqrt(i))
  }

  // 300ms 보장
  while (performance.now() - start < 300) {
    Math.random()
  }

  const duration = performance.now() - start
  window.appLoadTime = duration

  window.$('#app-time').text('🚀 App: ' + duration.toFixed(2) + 'ms')

  console.log('🚀 [3. app-sim.js] 실행 완료 -', duration.toFixed(2) + 'ms')
  console.log('🚀 [3. app-sim.js] 모든 스크립트가 순서대로 실행됨')
})()
