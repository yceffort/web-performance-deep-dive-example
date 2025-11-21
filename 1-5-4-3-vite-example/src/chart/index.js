// chart/index.js - Chart 모듈의 엔트리 포인트
import { renderChart as render } from './renderer.js';
import { getData } from './data.js';

export function renderChart() {
  const data = getData();
  render(data);
  console.log('차트가 렌더링되었습니다:', data);
}
