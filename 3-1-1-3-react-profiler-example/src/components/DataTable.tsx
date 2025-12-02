function heavyComputation(iterations: number) {
  let result = 0
  for (let i = 0; i < iterations; i++) {
    result += Math.sqrt(i) * Math.sin(i)
  }
  return result
}

const mockData = [
  { page: '/home', views: 12543, avgTime: '2:34', bounceRate: '28%' },
  { page: '/products', views: 8921, avgTime: '3:12', bounceRate: '35%' },
  { page: '/about', views: 4532, avgTime: '1:45', bounceRate: '42%' },
  { page: '/contact', views: 2341, avgTime: '2:01', bounceRate: '38%' },
  { page: '/blog', views: 6782, avgTime: '4:23', bounceRate: '25%' },
]

export default function DataTable() {
  heavyComputation(80000)

  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <h3 style={{ marginTop: 0 }}>페이지별 통계</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #eee' }}>
            <th style={{ textAlign: 'left', padding: '12px 8px' }}>페이지</th>
            <th style={{ textAlign: 'right', padding: '12px 8px' }}>조회수</th>
            <th style={{ textAlign: 'right', padding: '12px 8px' }}>평균 체류시간</th>
            <th style={{ textAlign: 'right', padding: '12px 8px' }}>이탈률</th>
          </tr>
        </thead>
        <tbody>
          {mockData.map((row) => (
            <TableRow key={row.page} data={row} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

function TableRow({
  data,
}: {
  data: { page: string; views: number; avgTime: string; bounceRate: string }
}) {
  heavyComputation(15000)

  return (
    <tr style={{ borderBottom: '1px solid #eee' }}>
      <td style={{ padding: '12px 8px' }}>{data.page}</td>
      <td style={{ padding: '12px 8px', textAlign: 'right' }}>
        {data.views.toLocaleString()}
      </td>
      <td style={{ padding: '12px 8px', textAlign: 'right' }}>{data.avgTime}</td>
      <td style={{ padding: '12px 8px', textAlign: 'right' }}>{data.bounceRate}</td>
    </tr>
  )
}
