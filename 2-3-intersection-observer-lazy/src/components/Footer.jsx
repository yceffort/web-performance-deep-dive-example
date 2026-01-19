export default function Footer() {
  return (
    <footer style={{
      padding: '40px 20px',
      backgroundColor: '#333',
      color: 'white',
      marginTop: '20px'
    }}>
      <h3>푸터 컴포넌트</h3>
      <p>이 컴포넌트는 지연 로딩되었습니다.</p>
      <p>스크롤해서 푸터 영역에 가까워질 때만 로드됩니다.</p>
      <div style={{ marginTop: '20px' }}>
        <p>© 2024 Example Company. All rights reserved.</p>
        <p>Contact: example@example.com</p>
      </div>
    </footer>
  );
}
