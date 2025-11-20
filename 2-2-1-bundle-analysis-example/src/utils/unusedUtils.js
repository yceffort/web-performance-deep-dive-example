// 사용하지 않는 유틸 함수들
// 이 파일은 import만 되고 실제로는 사용되지 않음

import _ from 'lodash';
import moment from 'moment';

export const unusedUtils = {
  // 복잡한 배열 조작 함수들
  processArray: (arr) => {
    return _.chain(arr)
      .filter(item => item > 0)
      .map(item => item * 2)
      .sortBy(item => item)
      .reverse()
      .take(10)
      .value();
  },

  // 날짜 처리 함수들
  formatDates: (dates) => {
    return dates.map(date => ({
      formatted: moment(date).format('YYYY-MM-DD HH:mm:ss'),
      relative: moment(date).fromNow(),
      calendar: moment(date).calendar(),
      unix: moment(date).unix(),
    }));
  },

  // 객체 조작 함수들
  deepClone: (obj) => _.cloneDeep(obj),
  deepMerge: (...objects) => _.merge({}, ...objects),
  pick: (obj, keys) => _.pick(obj, keys),
  omit: (obj, keys) => _.omit(obj, keys),

  // 문자열 처리 함수들
  capitalize: (str) => _.capitalize(str),
  camelCase: (str) => _.camelCase(str),
  snakeCase: (str) => _.snakeCase(str),
  kebabCase: (str) => _.kebabCase(str),

  // 수학 연산 함수들
  sum: (arr) => _.sum(arr),
  mean: (arr) => _.mean(arr),
  median: (arr) => {
    const sorted = _.sortBy(arr);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  },

  // 데이터 검증 함수들
  isEmail: (str) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str),
  isURL: (str) => /^https?:\/\/.+/.test(str),
  isPhoneNumber: (str) => /^\d{3}-\d{3,4}-\d{4}$/.test(str),

  // 디바운스/쓰로틀 유틸리티
  debounce: _.debounce,
  throttle: _.throttle,

  // 타이머 유틸리티
  delay: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
  timeout: (promise, ms) => {
    return Promise.race([
      promise,
      new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), ms))
    ]);
  },

  // 랜덤 유틸리티
  randomInt: (min, max) => _.random(min, max),
  randomItem: (arr) => _.sample(arr),
  randomItems: (arr, n) => _.sampleSize(arr, n),
  shuffle: (arr) => _.shuffle(arr),

  // 캐시 유틸리티
  memoize: _.memoize,
  once: _.once,

  // 함수 조합 유틸리티
  compose: (...fns) => fns.reduce((f, g) => (...args) => f(g(...args))),
  pipe: (...fns) => fns.reduce((f, g) => (...args) => g(f(...args))),

  // 에러 처리 유틸리티
  tryCatch: async (fn, fallback) => {
    try {
      return await fn();
    } catch (error) {
      console.error('Error:', error);
      return fallback;
    }
  },

  // 기타 유틸리티
  noop: () => {},
  identity: (x) => x,
  constant: (x) => () => x,
};

// 더 많은 사용되지 않는 코드를 추가하여 번들 크기 증가
export const moreUnusedUtils = {
  // 100개의 사용되지 않는 함수들
  ...Object.fromEntries(
    Array.from({ length: 100 }, (_, i) => [
      `unusedFunction${i}`,
      () => console.log(`Unused function ${i}`)
    ])
  )
};
