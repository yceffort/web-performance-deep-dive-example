// chart/utils.js - 차트 유틸리티
export function formatChartData(data) {
  return data.map(item => ({
    ...item,
    formatted: `${item.label}: ${item.value}개`
  }));
}
