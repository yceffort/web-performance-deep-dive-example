import React, { useState } from 'react';
// ❌ 문제 1: moment.js 전체를 import (약 300KB)
import moment from 'moment';
// ❌ 문제 2: lodash 전체를 import (트리 셰이킹 안 됨, 약 70KB)
import _ from 'lodash';
// ❌ 문제 3: axios를 사용 (fetch API로 대체 가능, 약 13KB)
import axios from 'axios';

// ❌ 문제 4: 사용하지 않는 무거운 컴포넌트를 초기에 import
import HeavyAdminPanel from './components/HeavyAdminPanel';
import HeavyDashboard from './components/HeavyDashboard';
import HeavyAnalytics from './components/HeavyAnalytics';

// ❌ 문제 5: 사용하지 않는 유틸 함수들
import { unusedUtils } from './utils/unusedUtils';

function App() {
  const [currentTime, setCurrentTime] = useState('');
  const [data, setData] = useState(null);
  // ❌ 문제: 대부분의 사용자는 이 기능을 사용하지 않는데도 번들에 포함됨
  const [showAdmin, setShowAdmin] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);

  // lodash의 debounce 사용 (실제로는 한 번만 사용하는데 전체 라이브러리 포함됨)
  const handleClick = _.debounce(() => {
    // moment.js로 현재 시간 포맷팅
    const now = moment().format('YYYY-MM-DD HH:mm:ss');
    setCurrentTime(now);
  }, 300);

  // axios로 데이터 가져오기 (fetch API로 대체 가능)
  const fetchData = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
      setData(response.data);
    } catch (error) {
      console.error('데이터 가져오기 실패:', error);
    }
  };

  return (
    <div className="container">
      <h1>번들 분석 예제</h1>
      <p className="subtitle">의도적으로 문제가 있는 번들 구성</p>

      <div className="info">
        <h3>📦 이 번들의 문제점:</h3>
        <ul>
          <li><code>moment.js</code> 전체 포함 (~300KB) - 간단한 날짜 포맷팅만 사용</li>
          <li><code>lodash</code> 전체 포함 (~70KB) - debounce 하나만 사용</li>
          <li><code>chart.js</code> 전체 포함 (~190KB) - 조건부 컴포넌트에만 사용</li>
          <li><code>date-fns</code> 포함 (~70KB) - 조건부 컴포넌트에만 사용</li>
          <li><code>axios</code> 사용 (~13KB) - fetch API로 대체 가능</li>
          <li>대부분 사용자가 접근하지 않는 무거운 컴포넌트 3개가 초기 번들에 포함</li>
          <li>사용하지 않는 유틸 함수 포함</li>
        </ul>
        <p style={{ marginTop: '15px', fontSize: '14px', color: '#666', fontWeight: 'bold' }}>
          → 예상 번들 크기: ~800KB (gzip 전)
        </p>
      </div>

      <div className="warning">
        <h3>🔍 번들 분석 방법:</h3>
        <ol>
          <li>터미널에서 <code>npm run analyze</code> 실행</li>
          <li>생성된 <code>dist/bundle-report.html</code> 파일 열기</li>
          <li>Chrome DevTools Coverage 도구로 사용되지 않는 코드 확인</li>
        </ol>
      </div>

      <div style={{ marginTop: '30px' }}>
        <button onClick={handleClick}>
          현재 시간 표시 (moment.js 사용)
        </button>
        <button onClick={fetchData}>
          데이터 가져오기 (axios 사용)
        </button>
      </div>

      {currentTime && (
        <div style={{ marginTop: '20px', padding: '15px', background: '#f0f0f0', borderRadius: '4px' }}>
          <strong>현재 시간:</strong> {currentTime}
        </div>
      )}

      {data && (
        <div style={{ marginTop: '20px', padding: '15px', background: '#f0f0f0', borderRadius: '4px' }}>
          <strong>가져온 데이터:</strong>
          <pre style={{ marginTop: '10px', overflow: 'auto' }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}

      <div style={{ marginTop: '30px', padding: '20px', background: '#fff3cd', borderRadius: '4px' }}>
        <h3>⚠️ 관리자 전용 기능 (대부분의 사용자는 사용하지 않음)</h3>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
          아래 버튼을 눌러도 무거운 컴포넌트들이 이미 번들에 포함되어 있습니다.
          <br />
          → 동적 import (React.lazy)를 사용하면 필요할 때만 로드할 수 있습니다.
        </p>
        <button onClick={() => setShowAdmin(!showAdmin)}>
          {showAdmin ? '관리자 패널 숨기기' : '관리자 패널 보기'}
        </button>
        <button onClick={() => setShowDashboard(!showDashboard)} style={{ marginLeft: '10px' }}>
          {showDashboard ? '대시보드 숨기기' : '대시보드 보기'}
        </button>
        <button onClick={() => setShowAnalytics(!showAnalytics)} style={{ marginLeft: '10px' }}>
          {showAnalytics ? '분석 도구 숨기기' : '분석 도구 보기'}
        </button>

        {showAdmin && <HeavyAdminPanel />}
        {showDashboard && <HeavyDashboard />}
        {showAnalytics && <HeavyAnalytics />}
      </div>

      <div style={{ marginTop: '40px', fontSize: '14px', color: '#666' }}>
        <p><strong>💡 이 예제의 목적:</strong></p>
        <p style={{ lineHeight: '1.6', marginBottom: '10px' }}>
          이 예제는 번들 분석 도구로 <strong>문제를 발견하고 측정하는 방법</strong>을 익히기 위한 것입니다.
        </p>
        <p style={{ lineHeight: '1.6' }}>
          발견한 문제들을 어떻게 해결하는지는 책의 다음 절들에서 자세히 다룹니다:
        </p>
        <ul style={{ lineHeight: '1.8', marginTop: '10px' }}>
          <li><strong>2-2-2</strong>: 사용하지 않는 코드 삭제</li>
          <li><strong>2-2-3</strong>: 트리 셰이킹과 동적 import</li>
          <li><strong>2-2-4</strong>: 브라우저 네이티브 API 활용</li>
          <li><strong>2-2-5</strong>: 가벼운 라이브러리로 교체</li>
          <li><strong>2-2-6</strong>: 중복 패키지 제거</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
