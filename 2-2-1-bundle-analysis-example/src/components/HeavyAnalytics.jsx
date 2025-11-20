import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import { Chart } from 'chart.js/auto';
import { format, subMonths, eachMonthOfInterval, startOfMonth, endOfMonth } from 'date-fns';

// 분석 도구 컴포넌트
// 조건부 렌더링이라 초기 로드 시 실행되지 않지만 번들에 포함됨

const HeavyAnalytics = () => {
  const [analytics, setAnalytics] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const chartRef = React.useRef(null);

  // 대량의 분석 데이터 생성
  const generateAnalytics = () => {
    const data = [];
    for (let i = 0; i < 5000; i++) {
      const date = moment().subtract(i, 'hours');
      data.push({
        id: i,
        timestamp: date.format('YYYY-MM-DD HH:mm:ss'),
        pageViews: _.random(100, 50000),
        uniqueVisitors: _.random(50, 25000),
        bounceRate: (Math.random() * 100).toFixed(2),
        avgSessionDuration: _.random(30, 3600),
        conversions: _.random(0, 500),
        revenue: (Math.random() * 50000).toFixed(2),
        traffic: {
          organic: _.random(100, 10000),
          direct: _.random(50, 5000),
          social: _.random(20, 2000),
          referral: _.random(10, 1000),
          paid: _.random(5, 500),
        },
        devices: {
          mobile: _.random(100, 20000),
          desktop: _.random(50, 15000),
          tablet: _.random(10, 5000),
        },
        locations: _.sampleSize(['KR', 'US', 'JP', 'CN', 'UK', 'DE', 'FR', 'CA', 'AU', 'IN'], _.random(1, 10)),
      });
    }
    return data;
  };

  // 월별 데이터 집계
  const generateMonthlyData = () => {
    const months = eachMonthOfInterval({
      start: subMonths(new Date(), 24),
      end: new Date()
    });

    return months.map(month => {
      const start = startOfMonth(month);
      const end = endOfMonth(month);

      return {
        month: format(month, 'yyyy-MM'),
        formatted: format(month, 'yyyy년 MM월'),
        start: format(start, 'yyyy-MM-dd'),
        end: format(end, 'yyyy-MM-dd'),
        metrics: {
          pageViews: _.random(100000, 1000000),
          users: _.random(10000, 100000),
          sessions: _.random(50000, 500000),
          revenue: _.random(50000, 500000),
          conversions: _.random(500, 5000),
        }
      };
    });
  };

  // Chart.js 차트 데이터 생성
  const generateChartData = () => {
    const monthlyData = generateMonthlyData();

    return {
      labels: monthlyData.map(m => m.formatted),
      datasets: [
        {
          label: '페이지뷰',
          data: monthlyData.map(m => m.metrics.pageViews),
          borderColor: 'rgb(75, 192, 192)',
          yAxisID: 'y',
        },
        {
          label: '사용자',
          data: monthlyData.map(m => m.metrics.users),
          borderColor: 'rgb(255, 99, 132)',
          yAxisID: 'y',
        },
        {
          label: '매출',
          data: monthlyData.map(m => m.metrics.revenue),
          borderColor: 'rgb(54, 162, 235)',
          yAxisID: 'y1',
        },
      ],
    };
  };

  // 복잡한 분석 계산
  const calculateAdvancedMetrics = (data) => {
    const totalViews = _.sumBy(data, 'pageViews');
    const totalRevenue = _.sumBy(data, d => parseFloat(d.revenue));
    const avgBounceRate = _.meanBy(data, d => parseFloat(d.bounceRate));
    const avgSessionDuration = _.meanBy(data, 'avgSessionDuration');

    const trafficSources = {
      organic: _.sumBy(data, 'traffic.organic'),
      direct: _.sumBy(data, 'traffic.direct'),
      social: _.sumBy(data, 'traffic.social'),
      referral: _.sumBy(data, 'traffic.referral'),
      paid: _.sumBy(data, 'traffic.paid'),
    };

    const deviceDistribution = {
      mobile: _.sumBy(data, 'devices.mobile'),
      desktop: _.sumBy(data, 'devices.desktop'),
      tablet: _.sumBy(data, 'devices.tablet'),
    };

    const locationCounts = _.chain(data)
      .flatMap('locations')
      .countBy()
      .toPairs()
      .orderBy([1], ['desc'])
      .take(10)
      .fromPairs()
      .value();

    return {
      overview: {
        totalViews,
        totalRevenue,
        avgBounceRate: avgBounceRate.toFixed(2),
        avgSessionDuration: Math.floor(avgSessionDuration),
        conversionRate: ((_.sumBy(data, 'conversions') / totalViews) * 100).toFixed(2),
      },
      traffic: trafficSources,
      devices: deviceDistribution,
      topLocations: locationCounts,
      trends: {
        viewsGrowth: calculateGrowthRate(data, 'pageViews'),
        revenueGrowth: calculateGrowthRate(data, 'revenue'),
        conversionGrowth: calculateGrowthRate(data, 'conversions'),
      }
    };
  };

  const calculateGrowthRate = (data, field) => {
    const recent = _.take(data, 100);
    const previous = _.slice(data, 100, 200);
    const recentAvg = _.meanBy(recent, field);
    const previousAvg = _.meanBy(previous, field);
    return (((recentAvg - previousAvg) / previousAvg) * 100).toFixed(2);
  };

  // axios를 사용한 데이터 페칭
  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const promises = Array.from({ length: 50 }, (_, i) =>
        axios.get(`https://jsonplaceholder.typicode.com/posts/${(i % 100) + 1}`)
      );
      const results = await Promise.all(promises);
      setAnalytics(results.map(r => r.data));
    } catch (error) {
      console.error('분석 데이터 가져오기 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportAnalytics = async () => {
    const mockData = generateAnalytics();
    const metrics = calculateAdvancedMetrics(mockData);
    const monthlyData = generateMonthlyData();

    try {
      await axios.post('/api/analytics/export', {
        raw: mockData,
        metrics,
        monthly: monthlyData,
        timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
      });
      console.log('Analytics exported');
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const handleGenerateChart = () => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      const data = generateChartData();

      new Chart(ctx, {
        type: 'line',
        data,
        options: {
          responsive: true,
          interaction: { mode: 'index', intersect: false },
          plugins: {
            title: { display: true, text: '월별 분석 데이터' },
          },
          scales: {
            y: { type: 'linear', display: true, position: 'left' },
            y1: { type: 'linear', display: true, position: 'right', grid: { drawOnChartArea: false } },
          },
        },
      });
    }
  };

  const mockData = generateAnalytics();
  const metrics = calculateAdvancedMetrics(mockData);

  const totalViews = mockData.reduce((sum, item) => sum + item.pageViews, 0);
  const totalRevenue = mockData.reduce((sum, item) => sum + parseFloat(item.revenue), 0);

  return (
    <div style={{ padding: '20px', background: '#fff3e0', borderRadius: '4px', marginTop: '20px' }}>
      <h2>분석 도구</h2>

      <div style={{ marginTop: '15px' }}>
        <h3>개요</h3>
        <p>총 페이지뷰: {totalViews.toLocaleString()}</p>
        <p>총 매출: ${totalRevenue.toLocaleString()}</p>
        <p>평균 이탈률: {metrics.overview.avgBounceRate}%</p>
        <p>평균 세션 시간: {metrics.overview.avgSessionDuration}초</p>
        <p>전환율: {metrics.overview.conversionRate}%</p>
      </div>

      <div style={{ marginTop: '15px' }}>
        <h3>트래픽 소스</h3>
        <ul>
          {Object.entries(metrics.traffic).map(([source, count]) => (
            <li key={source}>{source}: {count.toLocaleString()}</li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: '15px' }}>
        <h3>기기 분포</h3>
        <ul>
          {Object.entries(metrics.devices).map(([device, count]) => (
            <li key={device}>{device}: {count.toLocaleString()}</li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: '20px' }}>
        <button onClick={fetchAnalytics} disabled={loading} style={{ marginRight: '10px' }}>
          {loading ? '로딩 중...' : '분석 데이터 로드'}
        </button>
        <button onClick={handleExportAnalytics} style={{ marginRight: '10px' }}>
          분석 데이터 내보내기
        </button>
        <button onClick={handleGenerateChart}>
          차트 생성
        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <canvas ref={chartRef} style={{ maxHeight: '300px' }}></canvas>
      </div>

      {analytics.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>가져온 데이터 ({analytics.length}개)</h3>
          <pre style={{ maxHeight: '300px', overflow: 'auto', fontSize: '12px' }}>
            {JSON.stringify(_.take(analytics, 10), null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default HeavyAnalytics;
