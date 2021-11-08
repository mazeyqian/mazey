import {
  calLongestCommonSubstring,
  calLongestCommonSubsequence,
  getPerformance,
  camelCaseToKebabCase,
  camelCase2Underscore,
  deepCopyObject,
  inRate,
  getUrlParam,
  loadScript,
  isSafePWAEnv,
  getBrowserType,
  debounce,
  windowLoaded,
  isNumber,
  // getPerformance,
 } from './index';

// 计算两个字符串的最长公共子串
// console.log(calLongestCommonSubstring('fish', 'finish')); // 3
// 计算两个字符串的最长公共子序列
// console.log(calLongestCommonSubsequence('fish', 'finish')); // 4

// const url = 'https://www.bilibili.com/bangumi/play/ss28296?bsource=douban&topic=blog.mazey.net'

// console.log(getUrlParam(url, 'bsource'))
// console.log(getUrlParam(url, 'topic'))

loadScript({
  url: 'https://www.bilibili.com/bangumi/play/ss28296?bsource=douban&topic=blog.mazey.net',
  id: 'abbb',
  isDefer: true,
});

console.log('isSafePWAEnv', isSafePWAEnv());
console.log('getBrowserType', JSON.stringify(getBrowserType()));
console.log('getPerformance', getPerformance());
getPerformance().then(console.log);

const foo = debounce(() => {
  console.log('执行 1 秒内再次执行无反应');
}, 1000, { leading: true });

foo();

setTimeout(foo, 500);

setTimeout(foo, 2500);

windowLoaded({ timeout: 30 })
  .then(res => {
    console.log(`加载完成：${res}`);
  })
  .catch(err => {
    console.log(`加载超时：${err}`);
  });

// 数字测试
console.log('数字测试：', isNumber(Infinity, { isUnFiniteAsNumber: true }));
