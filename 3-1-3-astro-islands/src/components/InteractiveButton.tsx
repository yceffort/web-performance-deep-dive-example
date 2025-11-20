import { useState } from 'react'

export default function InteractiveButton() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ padding: '1rem', border: '1px solid #ddd', margin: '1rem 0' }}>
      <h3>client:load 예제</h3>
      <p>페이지 로드 시 즉시 하이드레이션됩니다</p>
      <button onClick={() => setCount(count + 1)} style={{ padding: '0.5rem 1rem' }}>
        클릭 횟수: {count}
      </button>
    </div>
  )
}
