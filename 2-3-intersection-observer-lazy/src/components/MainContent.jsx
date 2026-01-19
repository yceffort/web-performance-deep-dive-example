export default function MainContent() {
  return (
    <main style={{ padding: '20px', minHeight: '150vh' }}>
      <h2>메인 콘텐츠</h2>
      <p>이 영역은 충분히 길게 설정되어 있어 스크롤이 필요합니다.</p>

      <section style={{ marginTop: '40px' }}>
        <h3>섹션 1</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </section>

      <section style={{ marginTop: '40px' }}>
        <h3>섹션 2</h3>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </section>

      <section style={{ marginTop: '40px' }}>
        <h3>섹션 3</h3>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
      </section>

      <section style={{ marginTop: '40px' }}>
        <h3>섹션 4</h3>
        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </section>

      <div style={{
        marginTop: '60px',
        padding: '20px',
        backgroundColor: '#f0f0f0',
        borderRadius: '8px'
      }}>
        <h3>💡 개발자 도구로 확인하기</h3>
        <ol>
          <li>브라우저 개발자 도구의 Network 탭을 엽니다.</li>
          <li>페이지를 새로고침합니다.</li>
          <li>스크롤을 천천히 내립니다.</li>
          <li>푸터 영역에 가까워지면 Footer 컴포넌트의 청크가 로드되는 것을 확인할 수 있습니다.</li>
        </ol>
      </div>
    </main>
  );
}
