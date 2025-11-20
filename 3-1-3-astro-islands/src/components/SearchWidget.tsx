import { useState } from 'react'

export default function SearchWidget() {
  const [query, setQuery] = useState('')

  return (
    <div style={{ padding: '1rem', border: '1px solid #ddd', margin: '1rem 0' }}>
      <h3>client:idle 예제</h3>
      <p>브라우저가 idle 상태일 때 하이드레이션됩니다</p>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="검색어 입력..."
        style={{ width: '100%', padding: '0.5rem' }}
      />
      {query && <p style={{ marginTop: '0.5rem' }}>검색어: {query}</p>}
    </div>
  )
}
