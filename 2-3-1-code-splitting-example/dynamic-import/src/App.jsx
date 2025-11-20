import React, { useState } from 'react';

function App() {
  const [showChart, setShowChart] = useState(false);
  const [ChartComponent, setChartComponent] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadChart = async () => {
    setLoading(true);
    try {
      const module = await import('./ChartComponent');
      setChartComponent(() => module.default);
      setShowChart(true);
    } catch (error) {
      console.error('차트 로딩 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>동적 import() 예제</h1>
      <p>Chart.js는 버튼 클릭 시에만 로드됩니다.</p>
      <button
        onClick={loadChart}
        disabled={loading || showChart}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: loading || showChart ? 'not-allowed' : 'pointer',
          backgroundColor: showChart ? '#ccc' : '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
        }}
      >
        {loading ? '로딩 중...' : showChart ? '차트 표시됨' : '차트 보기'}
      </button>

      {loading && <p>차트를 로딩하고 있습니다...</p>}

      {showChart && ChartComponent && (
        <div style={{ marginTop: '20px', maxWidth: '600px' }}>
          <ChartComponent />
        </div>
      )}
    </div>
  );
}

export default App;
