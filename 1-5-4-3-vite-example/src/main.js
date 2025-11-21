// main.js - 엔트리 포인트
import { setupButton } from './ui.js';
import { logger } from './utils/logger.js';

logger.info('앱이 시작되었습니다');

// 동적 import로 chart 모듈 로드
document.getElementById('load-chart').addEventListener('click', async () => {
  try {
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = '차트 모듈을 로드하는 중...';

    const { renderChart } = await import('./chart/index.js');
    renderChart();

    resultDiv.innerHTML = `
      <h3>✅ 차트 모듈 로드 완료</h3>
      <p>개발자 도구의 Network 탭을 확인해보세요.</p>
      <p><strong>개발 모드:</strong> 각 모듈이 개별 파일로 로드됨</p>
      <p><strong>프로덕션 빌드:</strong> dist/index.html에서 modulepreload 태그 확인 가능</p>
    `;
  } catch (error) {
    logger.error('차트 로드 실패:', error);
  }
});

setupButton();
