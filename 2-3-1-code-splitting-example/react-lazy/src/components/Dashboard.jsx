export default function Dashboard() {
  // 큰 데이터나 복잡한 차트 라이브러리가 있다고 가정
  const data = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    value: Math.random() * 100,
  }));

  return (
    <div style={{ padding: '20px', border: '2px solid #2196F3' }}>
      <h2>대시보드</h2>
      <p>
        이 컴포넌트는 lazy()로 로드되어 별도 청크로 분리됩니다.
      </p>
      <p>
        버튼을 클릭할 때만 네트워크 요청이 발생합니다.
      </p>
      <div style={{ marginTop: '10px' }}>
        <strong>데이터 포인트:</strong> {data.length}개
      </div>
    </div>
  );
}
