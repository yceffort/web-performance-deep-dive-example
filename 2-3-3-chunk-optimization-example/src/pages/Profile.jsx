import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import { ko } from 'date-fns/locale'

function Profile() {
  const now = new Date()
  const yesterday = subDays(now, 1)
  const lastWeek = subDays(now, 7)

  const activities = [
    { date: now, action: '프로필 수정' },
    { date: yesterday, action: '설정 변경' },
    { date: subDays(now, 3), action: '비밀번호 변경' },
    { date: lastWeek, action: '계정 생성' },
  ]

  return (
    <div className="page">
      <h2>프로필</h2>
      <p>이 페이지는 date-fns를 사용합니다 (약 70KB)</p>

      <div style={{ marginTop: '2rem' }}>
        <h3>사용자 정보</h3>
        <div className="data-item" style={{ marginTop: '1rem' }}>
          <p>
            <strong>이름:</strong> 홍길동
          </p>
          <p>
            <strong>이메일:</strong> user@example.com
          </p>
          <p>
            <strong>가입일:</strong>{' '}
            {format(lastWeek, 'yyyy년 MM월 dd일', { locale: ko })}
          </p>
          <p>
            <strong>가입 후:</strong>{' '}
            {formatDistance(lastWeek, now, { addSuffix: true, locale: ko })}
          </p>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3>최근 활동</h3>
        <div className="data-list">
          {activities.map((activity, index) => (
            <div key={index} className="data-item">
              <strong>{activity.action}</strong>
              <div style={{ marginTop: '0.5rem', color: '#666', fontSize: '0.9rem' }}>
                <div>
                  {format(activity.date, 'yyyy-MM-dd HH:mm:ss')}
                </div>
                <div>
                  {formatRelative(activity.date, now, { locale: ko })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="info-box" style={{ marginTop: '2rem' }}>
        <h3>사용된 date-fns 함수</h3>
        <ul>
          <li><strong>format</strong>: 날짜 포맷팅</li>
          <li><strong>formatDistance</strong>: 상대적 시간 표시 (예: "7일 전")</li>
          <li><strong>formatRelative</strong>: 상대적 날짜 표시 (예: "지난 월요일")</li>
          <li><strong>subDays</strong>: 날짜 계산</li>
        </ul>
        <p>
          date-fns는 트리 셰이킹이 가능하므로, 실제로는 사용한 함수만 번들에 포함됩니다.
        </p>
      </div>
    </div>
  )
}

export default Profile
