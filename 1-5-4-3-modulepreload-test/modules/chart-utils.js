// chart-utils.js - helpers.js를 import (2단계 의존성)
console.log('[chart-utils.js] ✅ 로드됨 - 시간:', new Date().toISOString())

import { multiply } from './helpers.js'

export function formatData(data) {
  console.log('[chart-utils.js] formatData() 호출됨')
  return data.map((item) => multiply(item, 2))
}
