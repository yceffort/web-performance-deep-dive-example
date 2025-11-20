import { debounce, throttle, groupBy, sortBy } from 'lodash-es'
import { useState, useCallback } from 'react'

function Settings() {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedValue, setDebouncedValue] = useState('')

  // lodash의 debounce 함수 사용
  const debouncedSearch = useCallback(
    debounce((value) => {
      setDebouncedValue(value)
    }, 500),
    [],
  )

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    debouncedSearch(value)
  }

  // 샘플 데이터
  const sampleData = [
    { id: 1, category: 'UI', name: '테마 설정', priority: 2 },
    { id: 2, category: 'UI', name: '글꼴 크기', priority: 1 },
    { id: 3, category: '알림', name: '이메일 알림', priority: 3 },
    { id: 4, category: '알림', name: '푸시 알림', priority: 2 },
    { id: 5, category: '보안', name: '2단계 인증', priority: 3 },
    { id: 6, category: '보안', name: '비밀번호 변경', priority: 1 },
  ]

  // lodash의 groupBy와 sortBy 사용
  const groupedData = groupBy(sortBy(sampleData, 'priority'), 'category')

  return (
    <div className="page">
      <h2>설정</h2>
      <p>이 페이지는 lodash-es를 사용합니다 (약 70KB)</p>

      <div style={{ marginTop: '2rem' }}>
        <h3>검색 (Debounce 적용)</h3>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="검색어를 입력하세요..."
          style={{
            width: '100%',
            padding: '0.75rem',
            fontSize: '1rem',
            border: '1px solid #ddd',
            borderRadius: '4px',
          }}
        />
        {debouncedValue && (
          <p style={{ marginTop: '0.5rem', color: '#666' }}>
            검색어: {debouncedValue}
          </p>
        )}
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3>설정 항목 (GroupBy & SortBy 적용)</h3>
        {Object.entries(groupedData).map(([category, items]) => (
          <div key={category} style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>
              {category}
            </h4>
            <div className="data-list">
              {items.map((item) => (
                <div key={item.id} className="data-item">
                  <strong>{item.name}</strong>
                  <span style={{ marginLeft: '1rem', color: '#666' }}>
                    우선순위: {item.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="info-box" style={{ marginTop: '2rem' }}>
        <h3>사용된 lodash 함수</h3>
        <ul>
          <li><strong>debounce</strong>: 검색 입력 지연 처리</li>
          <li><strong>groupBy</strong>: 카테고리별 그룹화</li>
          <li><strong>sortBy</strong>: 우선순위로 정렬</li>
        </ul>
        <p>
          lodash-es는 트리 셰이킹이 가능하므로, 실제로는 사용한 함수만 번들에 포함됩니다.
        </p>
      </div>
    </div>
  )
}

export default Settings
