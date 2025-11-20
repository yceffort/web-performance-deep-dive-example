import React, { lazy, Suspense, useState } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import Home from './components/Home';

// lazy()로 컴포넌트 동적 로드
const Dashboard = lazy(() => import('./components/Dashboard'));
const Settings = lazy(() => import('./components/Settings'));
const Profile = lazy(() => import('./components/Profile'));

function LoadingFallback({ message = '로딩 중...' }) {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
      {message}
    </div>
  );
}

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [suspensePattern, setSuspensePattern] = useState('single');

  const renderContent = () => {
    if (suspensePattern === 'single') {
      // 패턴 1: 하나의 Suspense로 모든 컴포넌트 감싸기
      return (
        <Suspense fallback={<LoadingFallback message="컴포넌트 로딩 중..." />}>
          {currentView === 'home' && <Home />}
          {currentView === 'dashboard' && <Dashboard />}
          {currentView === 'settings' && <Settings />}
          {currentView === 'profile' && <Profile />}
        </Suspense>
      );
    } else if (suspensePattern === 'multiple') {
      // 패턴 2: 각 컴포넌트를 독립적인 Suspense로 감싸기
      return (
        <div>
          {currentView === 'home' && <Home />}
          {currentView === 'dashboard' && (
            <Suspense fallback={<LoadingFallback message="대시보드 로딩 중..." />}>
              <Dashboard />
            </Suspense>
          )}
          {currentView === 'settings' && (
            <Suspense fallback={<LoadingFallback message="설정 로딩 중..." />}>
              <Settings />
            </Suspense>
          )}
          {currentView === 'profile' && (
            <Suspense fallback={<LoadingFallback message="프로필 로딩 중..." />}>
              <Profile />
            </Suspense>
          )}
        </div>
      );
    } else {
      // 패턴 3: ErrorBoundary와 함께 사용
      return (
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback message="컴포넌트 로딩 중..." />}>
            {currentView === 'home' && <Home />}
            {currentView === 'dashboard' && <Dashboard />}
            {currentView === 'settings' && <Settings />}
            {currentView === 'profile' && <Profile />}
          </Suspense>
        </ErrorBoundary>
      );
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>React.lazy()와 Suspense 예제</h1>

      <div style={{ marginBottom: '20px' }}>
        <h3>Suspense 패턴 선택:</h3>
        <label style={{ marginRight: '15px' }}>
          <input
            type="radio"
            name="pattern"
            checked={suspensePattern === 'single'}
            onChange={() => setSuspensePattern('single')}
          />
          단일 Suspense
        </label>
        <label style={{ marginRight: '15px' }}>
          <input
            type="radio"
            name="pattern"
            checked={suspensePattern === 'multiple'}
            onChange={() => setSuspensePattern('multiple')}
          />
          독립적 Suspense
        </label>
        <label>
          <input
            type="radio"
            name="pattern"
            checked={suspensePattern === 'error'}
            onChange={() => setSuspensePattern('error')}
          />
          ErrorBoundary 포함
        </label>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>페이지 선택:</h3>
        <button
          onClick={() => setCurrentView('home')}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            backgroundColor: currentView === 'home' ? '#4CAF50' : '#ddd',
            color: currentView === 'home' ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          홈
        </button>
        <button
          onClick={() => setCurrentView('dashboard')}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            backgroundColor: currentView === 'dashboard' ? '#2196F3' : '#ddd',
            color: currentView === 'dashboard' ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          대시보드
        </button>
        <button
          onClick={() => setCurrentView('settings')}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            backgroundColor: currentView === 'settings' ? '#FF9800' : '#ddd',
            color: currentView === 'settings' ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          설정
        </button>
        <button
          onClick={() => setCurrentView('profile')}
          style={{
            padding: '10px 20px',
            backgroundColor: currentView === 'profile' ? '#9C27B0' : '#ddd',
            color: currentView === 'profile' ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          프로필
        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        {renderContent()}
      </div>

      <div style={{ marginTop: '40px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
        <h3>설명:</h3>
        <ul>
          <li>
            <strong>단일 Suspense:</strong> 모든 lazy 컴포넌트를 하나의 Suspense로 감싸면,
            어떤 컴포넌트라도 로딩 중일 때 같은 fallback이 표시됩니다.
          </li>
          <li>
            <strong>독립적 Suspense:</strong> 각 컴포넌트를 별도 Suspense로 감싸면,
            각각 독립적인 로딩 상태를 관리할 수 있습니다.
          </li>
          <li>
            <strong>ErrorBoundary 포함:</strong> 로딩 실패 시 에러를 처리할 수 있습니다.
          </li>
        </ul>
        <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
          💡 팁: 브라우저 개발자 도구의 Network 탭을 열고 페이지를 전환해보세요.
          각 컴포넌트의 청크가 언제 로드되는지 확인할 수 있습니다.
        </p>
      </div>
    </div>
  );
}

export default App;
