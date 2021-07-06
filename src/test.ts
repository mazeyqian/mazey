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
  // getPerformance,
 } from './index';

// 计算两个字符串的最长公共子串
// console.log(calLongestCommonSubstring('fish', 'finish')); // 3
// 计算两个字符串的最长公共子序列
// console.log(calLongestCommonSubsequence('fish', 'finish')); // 4

// const url = 'https://www.bilibili.com/bangumi/play/ss28296?bsource=douban&topic=blog.mazey.net'

// console.log(getUrlParam(url, 'bsource'))
// console.log(getUrlParam(url, 'topic'))

// loadScript({
//   url: 'https://www.bilibili.com/bangumi/play/ss28296?bsource=douban&topic=blog.mazey.net',
//   id: 'abbb',
// })

console.log('isSafePWAEnv', isSafePWAEnv());
console.log('getBrowserType', JSON.stringify(getBrowserType()));
console.log('getPerformance', getPerformance());
getPerformance().then(console.log);