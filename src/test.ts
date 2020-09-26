import {
  calLongestCommonSubstring,
  calLongestCommonSubsequence,
  getPerformance,
  camelCaseToKebabCase,
  camelCase2Underscore,
  deepCopyObject,
 } from './index';

// 计算两个字符串的最长公共子串
console.log(calLongestCommonSubstring('fish', 'finish')); // 3
// 计算两个字符串的最长公共子序列
console.log(calLongestCommonSubsequence('fish', 'finish')); // 4

window.addEventListener('load', () => {
  setTimeout(() => {
    getPerformance({ camelCase: true })
    .then(res => {
    console.log(JSON.stringify(res));
    // {"os":"others","deviceType":"pc","network":"3g","unloadTime":0,"redirectTime":0,"dnsTime":0,"tcpTime":0,"responseTime":65,"downloadTime":1,"domreadyTime":369,"onloadTime":441,"whiteTime":94,"renderTime":441,"decodedBodySize":210,"encodedBodySize":210}
    })
    .catch(console.error);
  }, 1000)
  
})

console.log(camelCaseToKebabCase('cccAaaaBBB'));
console.log(camelCase2Underscore('cccAaaaBBB'));
console.log(camelCase2Underscore('os'));