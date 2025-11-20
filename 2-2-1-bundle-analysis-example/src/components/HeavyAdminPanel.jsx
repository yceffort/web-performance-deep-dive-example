import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import axios from 'axios';
import { format, subDays, parseISO, formatDistanceToNow, addDays, differenceInDays } from 'date-fns';
import { ko } from 'date-fns/locale';

// 관리자 패널 컴포넌트
// 조건부 렌더링이라 초기 로드 시 실행되지 않지만 번들에 포함됨

const HeavyAdminPanel = () => {
  // 대량의 데이터 생성 (실행되지만 대부분의 처리 로직은 사용 안 됨)
  const data = _.range(1, 2000).map(i => ({
    id: i,
    name: `User ${i}`,
    email: `user${i}@example.com`,
    created: moment().subtract(i, 'days').format('YYYY-MM-DD'),
    lastLogin: format(subDays(new Date(), i), 'yyyy-MM-dd HH:mm:ss', { locale: ko }),
    role: _.sample(['admin', 'user', 'moderator', 'guest', 'premium']),
    status: _.sample(['active', 'inactive', 'suspended', 'pending']),
    permissions: _.sampleSize(['read', 'write', 'delete', 'admin', 'moderate', 'export', 'import'], _.random(1, 7)),
    metadata: {
      loginCount: _.random(1, 1000),
      lastIp: `${_.random(1, 255)}.${_.random(1, 255)}.${_.random(1, 255)}.${_.random(1, 255)}`,
      country: _.sample(['KR', 'US', 'JP', 'CN', 'UK']),
      device: _.sample(['mobile', 'desktop', 'tablet']),
    }
  }));

  // 사용되지 않는 복잡한 데이터 처리 함수들
  const processUserData = () => {
    return _.chain(data)
      .groupBy('role')
      .mapValues(users => ({
        count: users.length,
        active: _.filter(users, { status: 'active' }).length,
        inactive: _.filter(users, { status: 'inactive' }).length,
        suspended: _.filter(users, { status: 'suspended' }).length,
        pending: _.filter(users, { status: 'pending' }).length,
        avgPermissions: _.meanBy(users, u => u.permissions.length),
        avgLoginCount: _.meanBy(users, u => u.metadata.loginCount),
        byCountry: _.countBy(users, u => u.metadata.country),
        byDevice: _.countBy(users, u => u.metadata.device),
      }))
      .value();
  };

  const generateTimeSeriesData = () => {
    return _.range(0, 90).map(i => {
      const date = subDays(new Date(), i);
      return {
        date: format(date, 'yyyy-MM-dd'),
        formattedDate: format(date, 'yyyy년 MM월 dd일', { locale: ko }),
        users: _.random(10, 200),
        logins: _.random(50, 1000),
        signups: _.random(5, 100),
        revenue: _.random(1000, 50000),
        activeTime: _.random(100, 10000),
      };
    });
  };

  const calculateStatistics = () => {
    const recentThreshold = subDays(new Date(), 7);
    return {
      total: data.length,
      byRole: _.countBy(data, 'role'),
      byStatus: _.countBy(data, 'status'),
      recentLogins: _.filter(data, u => {
        try {
          return parseISO(u.lastLogin) > recentThreshold;
        } catch {
          return false;
        }
      }).length,
      topPermissions: _.chain(data)
        .flatMap('permissions')
        .countBy()
        .toPairs()
        .orderBy([1], ['desc'])
        .take(10)
        .fromPairs()
        .value(),
      byCountry: _.countBy(data, 'metadata.country'),
      byDevice: _.countBy(data, 'metadata.device'),
      avgLoginCount: _.meanBy(data, 'metadata.loginCount'),
    };
  };

  const generateReportData = () => {
    const timeSeries = generateTimeSeriesData();
    return {
      summary: calculateStatistics(),
      timeSeries,
      trends: {
        userGrowth: _.meanBy(timeSeries, 'signups'),
        loginTrend: _.meanBy(timeSeries, 'logins'),
        revenueTrend: _.meanBy(timeSeries, 'revenue'),
      },
      cohorts: _.groupBy(data, u => moment(u.created).format('YYYY-MM')),
    };
  };

  const handleExport = async () => {
    const processedData = processUserData();
    const stats = calculateStatistics();
    const timeSeriesData = generateTimeSeriesData();
    const reportData = generateReportData();

    try {
      await axios.post('/api/admin/export', {
        data: processedData,
        stats,
        timeSeries: timeSeriesData,
        report: reportData,
        timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      });
      console.log('Export successful');
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const handleBulkAction = async (action) => {
    const selectedUsers = _.sampleSize(data, 100);
    const enrichedUsers = selectedUsers.map(u => ({
      ...u,
      actionTimestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      actionBy: 'admin',
    }));

    try {
      await axios.post(`/api/admin/bulk/${action}`, {
        users: enrichedUsers,
        metadata: {
          totalCount: selectedUsers.length,
          action,
          timestamp: new Date().toISOString(),
        }
      });
      console.log(`Bulk ${action} successful`);
    } catch (error) {
      console.error(`Bulk ${action} failed:`, error);
    }
  };

  const handleUserSync = async () => {
    const batches = _.chunk(data, 100);
    for (const batch of batches) {
      try {
        await axios.post('/api/admin/sync', {
          users: batch,
          batchNumber: batches.indexOf(batch) + 1,
          totalBatches: batches.length,
        });
      } catch (error) {
        console.error('Sync failed:', error);
      }
    }
  };

  const stats = calculateStatistics();

  return (
    <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '4px', marginTop: '20px' }}>
      <h2>관리자 패널</h2>
      <div style={{ marginTop: '15px' }}>
        <h3>통계</h3>
        <p>전체 사용자: {stats.total.toLocaleString()}</p>
        <p>평균 로그인 횟수: {stats.avgLoginCount.toFixed(2)}</p>
        <p>역할별 분포:</p>
        <ul>
          {Object.entries(stats.byRole).map(([role, count]) => (
            <li key={role}>{role}: {count}</li>
          ))}
        </ul>
        <p>상태별 분포:</p>
        <ul>
          {Object.entries(stats.byStatus).map(([status, count]) => (
            <li key={status}>{status}: {count}</li>
          ))}
        </ul>
        <p>최근 7일 로그인: {stats.recentLogins}</p>
      </div>
      <div style={{ marginTop: '15px' }}>
        <button onClick={handleExport} style={{ marginRight: '10px' }}>
          데이터 내보내기
        </button>
        <button onClick={() => handleBulkAction('activate')} style={{ marginRight: '10px' }}>
          일괄 활성화
        </button>
        <button onClick={() => handleBulkAction('suspend')} style={{ marginRight: '10px' }}>
          일괄 정지
        </button>
        <button onClick={handleUserSync}>
          사용자 동기화
        </button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <h3>최근 사용자 (최근 30명)</h3>
        <ul style={{ fontSize: '14px' }}>
          {_.take(data, 30).map(user => (
            <li key={user.id}>
              {user.name} ({user.email}) - {user.role} -
              가입: {user.created} -
              로그인 {user.metadata.loginCount}회
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HeavyAdminPanel;
