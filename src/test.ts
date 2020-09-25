import { calLongestCommonSubstring, calLongestCommonSubsequence, setCookie, getCookie, loadScript, loadCSS } from './index';

// 计算两个字符串的最长公共子串
console.log(calLongestCommonSubstring('fish', 'finish')); // 3
// 计算两个字符串的最长公共子序列
console.log(calLongestCommonSubsequence('fish', 'finish')); // 4

setCookie('a', '123', 30, '.lilith.com')

console.log(getCookie('a'));

loadScript({
  url: 'http://www.mazey.net/js/plugin/jquery/jquery-2.1.1.min.js'
})
  .then(
    res => {
      console.log(`加载 JavaScript: ${res}`);
    }
  )
  .catch(
    err => {
      console.error(`加载 JavaScript Error: ${err}`)
    }
  );

loadCSS({
  url: 'http://www.mazey.net/css/mazey-base.css'
})
  .then(
    res => {
      console.log(`加载 CSS: ${res}`);
    }
  )
  .catch(
    err => {
      console.error(`加载 CSS Error: ${err}`)
    }
  );
