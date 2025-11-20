// chart.js - chart-utils.js와 chart-axis.js를 import
console.log('[chart.js] ✅ 로드됨 - 시간:', new Date().toISOString())

import { formatData } from './chart-utils.js'
import { drawAxis } from './chart-axis.js'

export class Chart {
  constructor(data) {
    console.log('[chart.js] Chart 생성자 호출됨')
    this.data = formatData(data)
    this.axis = drawAxis()
  }

  render() {
    console.log('[chart.js] render() 호출됨')
    console.log('데이터:', this.data)
    console.log('축:', this.axis)
  }
}
