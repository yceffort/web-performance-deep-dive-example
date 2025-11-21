// chart/renderer.js - 차트 렌더링 로직
import { formatChartData } from './utils.js';

export function renderChart(data) {
  const formattedData = formatChartData(data);
  console.log('차트 렌더링:', formattedData);

  // 실제로는 여기서 Canvas나 SVG로 차트를 그림
  return formattedData;
}
