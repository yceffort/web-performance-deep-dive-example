import { useState } from 'react'
import Dashboard from './components/Dashboard'
import Sidebar from './components/Sidebar'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'system-ui' }}>
      <Sidebar onNavigate={() => setCount((c) => c + 1)} />
      <main style={{ flex: 1, padding: '20px' }}>
        <h1>React DevTools Profiler 예제</h1>
        <p style={{ color: '#666', marginBottom: '20px' }}>
          React DevTools의 Profiler 탭에서 "Reload and start profiling"을 클릭하여
          Flamegraph를 확인하세요.
        </p>
        <Dashboard key={count} />
      </main>
    </div>
  )
}
