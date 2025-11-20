import Header from './components/Header';
import Footer from './components/Footer';
import CommentForm from './components/CommentForm';
import './App.css';

function App() {
  return (
    <>
      <Header />

      <main className="main-content">
        <div className="info-box">
          <h3>🎯 개발자 도구로 확인하세요!</h3>
          <p>
            F12를 눌러 개발자 도구를 열고 Network 탭에서 JavaScript 파일들을 확인해보세요.
            전통적 React SPA에서는 모든 컴포넌트(Header, 본문, Footer, CommentForm)가 하나의 JavaScript 번들로 제공됩니다.
          </p>
        </div>

        <div className="section static-section">
          <div className="react-badge">
            ⚛️ React로 렌더링 | ✅ 모든 컴포넌트 하이드레이션 | 📦 JavaScript 포함
          </div>

          <article>
            <h1>전통적 React SPA 비교 데모</h1>
            <p className="subtitle">모든 컴포넌트가 React로 렌더링</p>

            <h2>전통적 React SPA 방식</h2>
            <p>
              이 페이지는 전통적인 React SPA 방식으로 구현되었습니다.
              Header, 본문, Footer, CommentForm 모든 컴포넌트가 React로 렌더링되고 하이드레이션됩니다.
              정적 콘텐츠조차도 React 컴포넌트로 만들어져 JavaScript 번들에 포함됩니다.
            </p>

            <p>
              이 방식의 문제점은 인터랙션이 필요 없는 정적 콘텐츠(헤더, 푸터, 본문 텍스트)까지
              모두 JavaScript를 다운로드하고 실행해야 한다는 것입니다.
              사용자는 JavaScript가 모두 로드되고 실행될 때까지 기다려야 하며,
              이는 초기 로딩 시간과 TTI(Time to Interactive)를 증가시킵니다.
            </p>

            <h2>이 페이지의 구조</h2>
            <p>
              모든 것이 React 컴포넌트입니다:
            </p>

            <ul style={{ marginLeft: '2rem', marginBottom: '1rem' }}>
              <li><strong>Header</strong>: React 컴포넌트 (JavaScript 포함)</li>
              <li><strong>본문</strong>: React로 렌더링 (JavaScript 포함)</li>
              <li><strong>CommentForm</strong>: React 컴포넌트 (JavaScript 포함)</li>
              <li><strong>Footer</strong>: React 컴포넌트 (JavaScript 포함)</li>
            </ul>

            <p>
              아래로 스크롤하면 댓글 작성 폼이 보입니다.
              이 부분만 인터랙션이 필요하지만, 전체 페이지가 React로 구동됩니다.
            </p>
          </article>

          <div className="stats">
            <div className="stat-card">
              <h3>React 번들</h3>
              <div className="number">측정 중</div>
              <div className="label">빌드 후 확인</div>
            </div>
            <div className="stat-card">
              <h3>컴포넌트</h3>
              <div className="number">100%</div>
              <div className="label">모두 React로 렌더링</div>
            </div>
            <div className="stat-card">
              <h3>하이드레이션</h3>
              <div className="number">전체</div>
              <div className="label">모든 컴포넌트</div>
            </div>
          </div>
        </div>

        <div className="section">
          <CommentForm />
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
