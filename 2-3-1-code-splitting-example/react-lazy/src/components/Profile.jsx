export default function Profile() {
  return (
    <div style={{ padding: '20px', border: '2px solid #9C27B0' }}>
      <h2>프로필</h2>
      <p>이 컴포넌트도 독립적인 청크로 분리됩니다.</p>
      <div style={{ marginTop: '10px' }}>
        <p><strong>이름:</strong> 홍길동</p>
        <p><strong>이메일:</strong> hong@example.com</p>
        <p><strong>가입일:</strong> 2024-01-01</p>
      </div>
    </div>
  );
}
