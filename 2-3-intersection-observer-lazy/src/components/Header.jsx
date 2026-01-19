export default function Header() {
  return (
    <header style={{
      padding: '20px',
      backgroundColor: '#4CAF50',
      color: 'white',
      marginBottom: '20px'
    }}>
      <h1>IntersectionObserver를 활용한 지연 로딩 예제</h1>
      <p>스크롤을 내려 푸터 영역에 도달하면 Footer 컴포넌트가 자동으로 로드됩니다.</p>
    </header>
  );
}
