export default function Settings() {
  return (
    <div style={{ padding: '20px', border: '2px solid #FF9800' }}>
      <h2>설정</h2>
      <p>이 컴포넌트도 lazy()로 로드됩니다.</p>
      <p>Dashboard와는 별도의 청크로 분리됩니다.</p>
      <div style={{ marginTop: '10px' }}>
        <label>
          <input type="checkbox" /> 알림 받기
        </label>
        <br />
        <label>
          <input type="checkbox" /> 다크 모드
        </label>
      </div>
    </div>
  );
}
