function heavyComputation(iterations: number) {
  let result = 0
  for (let i = 0; i < iterations; i++) {
    result += Math.sqrt(i) * Math.sin(i)
  }
  return result
}

export default function Chart() {
  heavyComputation(150000)

  const data = [65, 59, 80, 81, 56, 55, 72, 68, 75, 82, 90, 85]
  const maxValue = Math.max(...data)

  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <h3 style={{ marginTop: 0 }}>월별 트래픽</h3>
      <div style={{ display: 'flex', alignItems: 'flex-end', height: '200px', gap: '8px' }}>
        {data.map((value, index) => (
          <ChartBar key={index} value={value} maxValue={maxValue} month={index + 1} />
        ))}
      </div>
    </div>
  )
}

function ChartBar({
  value,
  maxValue,
  month,
}: {
  value: number
  maxValue: number
  month: number
}) {
  heavyComputation(5000)

  const height = (value / maxValue) * 100

  return (
    <div style={{ flex: 1, textAlign: 'center' }}>
      <div
        style={{
          height: `${height * 1.8}px`,
          backgroundColor: '#3498db',
          borderRadius: '4px 4px 0 0',
          transition: 'height 0.3s',
        }}
      />
      <span style={{ fontSize: '12px', color: '#666' }}>{month}월</span>
    </div>
  )
}
