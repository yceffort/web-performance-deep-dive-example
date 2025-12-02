import DataTable from './DataTable'
import Chart from './Chart'

function heavyComputation(iterations: number) {
  let result = 0
  for (let i = 0; i < iterations; i++) {
    result += Math.sqrt(i) * Math.sin(i)
  }
  return result
}

export default function Dashboard() {
  heavyComputation(100000)

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <StatCard title="총 방문자" value="12,543" color="#3498db" />
        <StatCard title="페이지뷰" value="45,231" color="#2ecc71" />
        <StatCard title="이탈률" value="32.5%" color="#e74c3c" />
        <StatCard title="평균 체류시간" value="3분 42초" color="#9b59b6" />
      </div>

      <div style={{ marginTop: '30px' }}>
        <Chart />
      </div>

      <div style={{ marginTop: '30px' }}>
        <DataTable />
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  color,
}: {
  title: string
  value: string
  color: string
}) {
  heavyComputation(20000)

  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        borderLeft: `4px solid ${color}`,
      }}
    >
      <h3 style={{ margin: 0, fontSize: '14px', color: '#666' }}>{title}</h3>
      <p style={{ margin: '10px 0 0', fontSize: '24px', fontWeight: 'bold' }}>{value}</p>
    </div>
  )
}
