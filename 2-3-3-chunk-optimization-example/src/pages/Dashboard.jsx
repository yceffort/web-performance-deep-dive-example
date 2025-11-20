import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function Dashboard() {
  const data = {
    labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
    datasets: [
      {
        label: '월별 방문자 수',
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '2024년 상반기 방문자 통계',
      },
    },
  }

  return (
    <div className="page">
      <h2>대시보드</h2>
      <p>이 페이지는 Chart.js를 사용합니다 (약 155KB)</p>

      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>

      <div className="info-box" style={{ marginTop: '2rem' }}>
        <h3>포함된 라이브러리</h3>
        <ul>
          <li><strong>chart.js</strong>: 약 190KB (압축 전)</li>
          <li><strong>react-chartjs-2</strong>: Chart.js의 React 래퍼</li>
        </ul>
        <p>
          이 페이지를 방문하지 않는 사용자는 Chart.js를 다운로드하지 않아도 됩니다.
        </p>
      </div>
    </div>
  )
}

export default Dashboard
