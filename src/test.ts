import {calLongestCommonSubstring, calLongestCommonSubsequence, setCookie, getCookie } from './index';

// 计算两个字符串的最长公共子串
console.log(calLongestCommonSubstring('fish', 'finish')); // 3
// 计算两个字符串的最长公共子序列
console.log(calLongestCommonSubsequence('fish', 'finish')); // 4

setCookie('a', '123', 30, '.lilith.com')

console.log(getCookie('a'));
