import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <nav className="nav">
          <h1>청크 최적화 예제</h1>
          <div className="nav-links">
            <Link to="/dashboard">대시보드</Link>
            <Link to="/settings">설정</Link>
            <Link to="/profile">프로필</Link>
          </div>
        </nav>

        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

function Home() {
  return (
    <div className="page">
      <h2>홈</h2>
      <p>상단 메뉴에서 페이지를 선택하세요.</p>
      <div className="info-box">
        <h3>이 예제의 목적</h3>
        <ul>
          <li>
            <strong>Dashboard</strong>: Chart.js를 사용하여 차트를 표시합니다
            (약 155KB)
          </li>
          <li>
            <strong>Settings</strong>: lodash-es를 사용하여 데이터를 처리합니다
            (약 70KB)
          </li>
          <li>
            <strong>Profile</strong>: date-fns를 사용하여 날짜를 포맷팅합니다
            (약 70KB)
          </li>
        </ul>
        <p>
          빌드 후 <code>dist/stats.html</code>을 열면 각 라이브러리의 크기를
          확인할 수 있습니다.
        </p>
      </div>
    </div>
  )
}

export default App
