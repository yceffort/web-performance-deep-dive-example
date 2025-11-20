import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import axios from 'axios';
import { Chart } from 'chart.js/auto';
import { format, subDays, startOfWeek, endOfWeek, eachDayOfInterval, addWeeks } from 'date-fns';

// 대시보드 컴포넌트
// 조건부 렌더링이라 초기 로드 시 실행되지 않지만 번들에 포함됨

const HeavyDashboard = () => {
  const chartRef = React.useRef(null);
  const [chartData, setChartData] = React.useState(null);

  // moment.js의 다양한 기능을 모두 사용
  const now = moment();
  const dates = [];

  // 대량의 날짜 데이터 생성
  for (let i = 0; i < 730; i++) {
    const date = moment().subtract(i, 'days');
    dates.push({
      date: date.format('YYYY-MM-DD'),
      dayOfWeek: date.format('dddd'),
      week: date.week(),
      month: date.format('MMMM'),
      quarter: date.quarter(),
      fromNow: date.fromNow(),
      toNow: date.toNow(),
      calendar: date.calendar(),
      unix: date.unix(),
      iso: date.toISOString(),
      utc: date.utc().format(),
      formatted: date.format('YYYY년 MM월 DD일 HH:mm:ss'),
    });
  }

  // 복잡한 통계 계산
  const stats = {
    today: now.format('YYYY-MM-DD'),
    week: now.week(),
    month: now.month() + 1,
    quarter: now.quarter(),
    daysInMonth: now.daysInMonth(),
    isLeapYear: now.isLeapYear(),
    weekday: now.weekday(),
    isoWeekday: now.isoWeekday(),
    dayOfYear: now.dayOfYear(),
    weeksInYear: now.isoWeeksInYear(),
  };

  // Chart.js를 사용한 복잡한 차트 데이터
  const generateChartData = () => {
    const labels = _.range(0, 30).map(i =>
      moment().subtract(i, 'days').format('MM/DD')
    ).reverse();

    return {
      labels,
      datasets: [
        {
          label: '페이지뷰',
          data: _.range(30).map(() => _.random(1000, 10000)),
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
        {
          label: '방문자',
          data: _.range(30).map(() => _.random(500, 5000)),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
        },
        {
          label: '전환',
          data: _.range(30).map(() => _.random(10, 500)),
          borderColor: 'rgb(54, 162, 235)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
        },
      ],
    };
  };

  // date-fns를 사용한 복잡한 날짜 계산
  const weekRanges = _.range(0, 52).map(i => {
    const weekStart = startOfWeek(subDays(new Date(), i * 7));
    const weekEnd = endOfWeek(subDays(new Date(), i * 7));
    const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

    return {
      weekNumber: i + 1,
      start: format(weekStart, 'yyyy-MM-dd'),
      end: format(weekEnd, 'yyyy-MM-dd'),
      days: days.map(d => format(d, 'yyyy-MM-dd')),
      metrics: {
        views: _.random(10000, 100000),
        users: _.random(1000, 10000),
        revenue: _.random(10000, 100000),
      }
    };
  });

  const handleLoadChart = async () => {
    const data = generateChartData();
    setChartData(data);

    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data,
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: '대시보드 통계' },
          },
          scales: {
            y: { beginAtZero: true }
          }
        },
      });
    }
  };

  const handleExportData = async () => {
    try {
      await axios.post('/api/dashboard/export', {
        dates,
        stats,
        weekRanges,
        chartData: generateChartData(),
        timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
      });
      console.log('Dashboard data exported');
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const handleGenerateReport = async () => {
    const weeklyStats = weekRanges.map(week => ({
      ...week,
      avgDaily: {
        views: week.metrics.views / 7,
        users: week.metrics.users / 7,
        revenue: week.metrics.revenue / 7,
      }
    }));

    try {
      await axios.post('/api/dashboard/report', {
        weekly: weeklyStats,
        summary: {
          totalViews: _.sumBy(weekRanges, 'metrics.views'),
          totalUsers: _.sumBy(weekRanges, 'metrics.users'),
          totalRevenue: _.sumBy(weekRanges, 'metrics.revenue'),
        },
      });
      console.log('Report generated');
    } catch (error) {
      console.error('Report generation failed:', error);
    }
  };

  return (
    <div style={{ padding: '20px', background: '#f0f8ff', borderRadius: '4px', marginTop: '20px' }}>
      <h2>대시보드</h2>
      <div style={{ marginTop: '15px' }}>
        <h3>통계</h3>
        <pre style={{ fontSize: '14px' }}>{JSON.stringify(stats, null, 2)}</pre>
      </div>

      <div style={{ marginTop: '20px' }}>
        <button onClick={handleLoadChart} style={{ marginRight: '10px' }}>
          차트 로드
        </button>
        <button onClick={handleExportData} style={{ marginRight: '10px' }}>
          데이터 내보내기
        </button>
        <button onClick={handleGenerateReport}>
          리포트 생성
        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <canvas ref={chartRef} style={{ maxHeight: '300px' }}></canvas>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>주간 통계 (최근 10주)</h3>
        <div style={{ maxHeight: '300px', overflow: 'auto' }}>
          {_.take(weekRanges, 10).map((week, i) => (
            <div key={i} style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
              <strong>Week {week.weekNumber}</strong>: {week.start} ~ {week.end}
              <div>조회수: {week.metrics.views.toLocaleString()},
                   사용자: {week.metrics.users.toLocaleString()},
                   매출: ${week.metrics.revenue.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>최근 365일</h3>
        <div style={{ maxHeight: '200px', overflow: 'auto', fontSize: '12px' }}>
          {_.take(dates, 365).map((d, i) => (
            <div key={i}>{d.date} - {d.dayOfWeek} - {d.fromNow} - Q{d.quarter}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeavyDashboard;
