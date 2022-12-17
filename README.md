English | [简体中文](https://github.com/mazeyqian/mazey/blob/master/README_CN.md)

# mazey

[![NPM version][npm-image]][npm-url]
[![l][l-image]][l-url]

[npm-image]: https://img.shields.io/npm/v/mazey
[npm-url]: https://npmjs.org/package/mazey
[l-image]: https://img.shields.io/npm/l/mazey
[l-url]: https://github.com/mazeyqian/mazey

Mazey's functional library for daily front-end work. There are already many excellent libraries for front-end development, but creating a file named UtilsJS or CommonJS is generally used to supply common functions in projects. It's boring to copy similar functions among projects again and again. I will consistently update the library during my work life to save time.

## Install

Use mazey via [npm](https://www.npmjs.com/package/mazey).

```
npm install mazey --save
```

Use mazey from CDN.

```
<script type="text/javascript" src="//i.mazey.net/mazey/lib/mazey.min.js"></script>
```

Of course, you can also download this file and serve it yourself.

## Usage

Example: Use a function to load JavaScript script.

Import from [npm](https://www.npmjs.com/package/mazey).

```
import { isNumber } from 'mazey';

isNumber(Infinity, { isUnFiniteAsNumber: true }); // true
```

Import from CDN.

```
<script type="text/javascript" src="//i.mazey.net/mazey/lib/mazey.min.js"></script>
<script>
mazey.isNumber(Infinity, { isUnFiniteAsNumber: true }); // true
</script>
```

## API Examples

There ara some examples maintained by hand below. For more information, please check the [full documentation](https://i.mazey.net/mazey/docs/modules/_index_.html).

**Table of Contents**

<ul>
  <li><a href="#load-resource">Load Resource</a>
    <ul>
      <li><a href="#load-script">Load Script</a></li>
      <li><a href="#load-css">Load CSS</a></li>
      <li><a href="#check-load">Check Load</a></li>
    </ul>
  </li>
  <li><a href="#function">Function</a>
    <ul>
      <li><a href="#debounce">Debounce</a></li>
      <li><a href="#throttle">Throttle</a></li>
      <li><a href="#check-number">Check Number</a></li>
      <li><a href="#camel-case">Camel Case</a></li>
      <li><a href="#trim">Trim</a></li>
      <li><a href="#deep-clone">Deep Clone</a></li>
      <li><a href="#json">JSON</a></li>
      <li><a href="#random">Random</a></li>
    </ul>
  </li>
  <li><a href="#dom">DOM</a>
    <ul>
      <li><a href="#class">Class</a></li>
      <li><a href="#style">Style</a></li>
      <li><a href="#newline">Newline</a></li>
    </ul>
  </li>
  <li><a href="#url">URL</a>
    <ul>
      <li><a href="#query-param">Query Param</a></li>
      <li><a href="#update-param">Update Param</a></li>
      <li><a href="#hash-param">Hash Param</a></li>
      <li><a href="#domain">Domain</a></li>
    </ul>
  </li>
  <li><a href="#cache-data">Cache Data</a>
    <ul>
      <li><a href="#storage">Storage</a></li>
      <li><a href="#cookie">Cookie</a></li>
    </ul>
  </li>
  <li><a href="#calculate-formula">Calculate&amp;Formula</a>
    <ul>
      <li><a href="#rate">Rate</a></li>
      <li><a href="#algorithm">Algorithm</a></li>
    </ul>
  </li>
  <li><a href="#browser-information">Browser Information</a></li>
  <li><a href="#web-performance">Web Performance</a></li>
  <li><a href="#margin-of-safety">Margin of Safety</a></li>
  <li><a href="#debug">Debug</a>
    <ul>
      <li><a href="#print">Print</a></li>
    </ul>
  </li>
</ul>

### Load Resource

#### loadScript

Load a JavaScript file from the server and execute it.

<!-- ZH: 动态加载 JavaScript 文件 -->

```
loadScript(
    'http://example.com/static/js/plugin-2.1.1.min.js',
    {
      id: 'iamid', // (Optional) script ID, default none
      timeout: 5000, // (Optional) timeout, default `5000`
      isDefer: false, // (Optional) defer, default `false`
    }
  )
  .then(
    res => {
      console.log(`Load JavaScript script: ${res}`);
    }
  )
  .catch(
    err => {
      console.error(`Load JavaScript script: ${err.message}`)
    }
  );
```

<!-- @param {string} url -- JavaScript 资源路径
@param {string} options.id -- DOM ID
@param {function} options.callback -- 加载后回调函数
@param {number} options.timeout -- 超时时长
@param {boolean} options.isDefer -- 是否添加 defer 标签
@returns {Promise<boolean>} -- true 成功 -->

#### loadCSS

Load a CSS file from the server.

<!-- ZH: 动态加载 CSS 文件 -->

```
loadCSS(
    'http://example.com/css/mazey-base.css',
    {
      id: 'iamid', // Optional, link ID, default none
    }
  )
  .then(
    res => {
      console.log(`Load CSS Success: ${res}`);
    }
  )
  .catch(
    err => {
      console.error(`Load CSS Fail: ${err.message}`)
    }
  );
```

<!-- @param {string} url -- css资源路径
@param {string} options.id -- link标签id
@returns {Promise<boolean>} true -- 加载成功 -->

#### windowLoaded

Check whether the page is loaded successfully (Keepe the compatibility in case that browser's `load` event has been triggered).

<!-- ZH: 页面加载完成 -->

```
windowLoaded(30) // second
  .then(res => {
    console.log(`Load Success: ${res}`); // Load Success: load
  })
  .catch(err => {
    console.log(`Load Timeout or Fail: ${err.message}`);
  });
```

<!-- @param {number} timeout 超时时间 / 单位：秒
@returns {Promise<string>} document is loaded? 'complete' 'load' / 'timeout' -->

### Function

#### debounce

Debounce

<!-- ZH: 去抖 -->

```
const foo = debounce(() => {
  console.log('The debounced function will only be invoked in 1000 milliseconds, the other invoking will disappear during the wait time.');
}, 1000, true);
```

#### throttle

Throttle

<!-- ZH: 节流 -->

```
const foo = throttle(() => {
  console.log('The function will be invoked at most once per every wait 1000 milliseconds.');
}, 1000, { leading: true });
```

Reference: [Lodash](https://lodash.com/docs/4.17.15#throttle)

#### isNumber

Check whether it is a right number.

<!-- ZH: 判断是否有效数字 -->

```
isNumber(123); // true
isNumber('123'); // false
// Default: NaN, Infinity is not Number
isNumber(Infinity); // false
isNumber(Infinity, { isUnFiniteAsNumber: true }); // true
isNumber(NaN); // false
isNumber(NaN, { isNaNAsNumber: true, isUnFiniteAsNumber: true }); // true
```

<!-- @param {*} num 被判断的值
@param {boolean} options.isNaNAsNumber 是否 NaN 算数字（默认不算）
@param {boolean} options.isUnFiniteAsNumber 是否 无限 算数字（默认不算）
@returns {boolean} true 是数字 -->

#### camelCaseToKebabCase

Transfer CamelCase to KebabCase.

```
camelCaseToKebabCase('ABC'); // a-b-c
camelCaseToKebabCase('aBC'); // a-b-c
```

<!-- @param {string} camelCase 'aBC' or 'ABC'
@returns {string} 'a-b-c' -->

#### camelCase2Underscore

Transfer CamelCase to Underscore.

```
camelCase2Underscore('ABC'); // a_b_c
camelCase2Underscore('aBC'); // a_b_c
```

<!-- @param {string} camelCase 'aBC' or 'ABC'
@returns {string} 'a_b_c' -->

#### mTrim

Remove leading and trailing whitespace or specified characters from string.

```
mTrim(' 1 2 3 '); // '1 2 3'
mTrim('abc '); // 'abc'
```

<!-- @param {string} str The string to trim.
@returns {string} Trimmed string. -->

#### deepCopyObject

Clone Object deeply.

Usage:

```
deepCopyObject(['a', 'b', 'c']);
deepCopyObject('abc');
```

Output:

```
['a', 'b', 'c']
'abc'
```

<!-- @param {object} obj The value to clone.
@returns {object} Returns the deep cloned value. -->

#### isJsonString

Check whether it is a valid JSON string.

Usage:

```
isJsonString(`['a', 'b', 'c']`);
isJsonString(`["a", "b", "c"]`);
```

Output:

```
false
true
```

<!-- @param {string} str The string to check.
@returns {boolean} Return the result of checking. -->

#### Random

Produce a random string of number, `generateRndNum(7)` => '7658495'.

```
generateRndNum(4); // '9730'
generateRndNum(7); // '2262490'
```

### DOM

#### Class

Modify `class`.

```
const dom = document.querySelector('#box');

// Determine `class`
hasClass(dom, 'test');
// Add `class`
addClass(dom, 'test');
// Remove `class`
removeClass(dom, 'test');
```

#### Style

Add `<style>` in `<head>`.

Case 1: Add the `<style>` with `id`, and repeated invoking will update the content instead of adding a new one.

```
addStyle(
  `
    body {
      background-color: #333;
    }
  `,
  {
    id: 'test',
  }
);
// <style id="test">
//   body {
//     background-color: #333;
//   }
// </style>
```

Case 2: Add the `<style>` without `id`, and repeated invoking will adding a new one.

```
addStyle(
  `
    body {
      background-color: #444;
    }
  `
);
// <style>
//   body {
//     background-color: #444;
//   }
// </style>
```

#### Newline

Make a newline of HTML.

```
newLine('a\nb\nc'); // 'a<br />b<br />c'
newLine('a\n\nbc'); // 'a<br /><br />bc'
```

### URL

#### Query Param

**getQueryParam**

Get the query param's value of the current Web URL(`location.search`).

```
// http://example.com/?t1=1&t2=2&t3=3&t4=4#2333
// ?t1=1&t2=2&t3=3&t4=4
getQueryParam('t3'); // 3
getQueryParam('t4'); // 4
```

<!-- @param {string} param Query param.
@returns {string} value -->

**getUrlParam**

Get the query param's value of the input URL.

```
getUrlParam('http://example.com/?t1=1&t2=2&t3=3&t4=4', 't3'); // 3
getUrlParam('http://example.com/?t1=1&t2=2&t3=3&t4=4', 't4'); // 4
```

<!-- @param {string} url URL string.
@param {string} param Query param.
@returns {string} value -->

#### updateQueryParam

Update the query param's value of the input URL.

Usage:

```
updateQueryParam('http://example.com/?t1=1&t2=2&t3=3&t4=4', 't3', 'three');
updateQueryParam('http://example.com/?t1=1&t2=2&t3=3&t4=4', 't4', 'four');
```

Output:

```
http://example.com/?t1=1&t2=2&t3=three&t4=4
http://example.com/?t1=1&t2=2&t3=3&t4=four
```

<!-- @param {string} url URL string.
@param {string} param Query param.
@param {string} value Param's value.
@returns {string} URL. -->

#### getHashQueryParam

Get the hash query param's value of the current Web URL(`location.hash`).

Usage:

```
// http://example.com/?#2333?t1=1&t2=2&t3=3&t4=4
// #2333?t1=1&t2=2&t3=3&t4=4
getHashQueryParam('t3');
getHashQueryParam('t4');
```

Output:

```
3
4
```

<!-- @param {string} param Query param.
@returns {string} value -->

#### getDomain

Get the domain of URL, and other params.

Usage:

```
getDomain('http://example.com/?t1=1&t2=2&t3=3&t4=4');
getDomain('http://example.com/test/thanks?t1=1&t2=2&t3=3&t4=4', ['hostname', 'pathname']);
```

Output:

```
example.com
example.com/test/thanks
```

<!-- @param {string} url
@param {array} rules Object.keys(location), ['href', 'protocol', 'host', 'hostname', 'port', 'pathname', 'search', 'hash'], ['hostname', 'pathname'] = 'km.mazey.net/plugins/servlet/mobile' -->

### Cache Data

#### Storage

Handle Storage (Keep fit for JSON, it can tansfer format automatically).

```
setSessionStorage('test', '123');
getSessionStorage('test'); // 123
setLocalStorage('test', '123');
getLocalStorage('test'); // 123

// or package in usage
const projectName = 'mazey';
function mSetLocalStorage (key, value) {
  return setLocalStorage(`${projectName}_${key}`, value);
}

function mGetLocalStorage (key) {
  return getLocalStorage(`${projectName}_${key}`);
}
```

#### Cookie

Handle Cookie.

```
setCookie('test', '123', 30, 'example.com'); // key value day domain
getCookie('test'); // 123
```

### Calculate&Formula

#### inRate

Hit probability (1% ~ 100%).

<!-- ZH: 百分位概率 -->

Usage:

```
inRate(0.5); // 0.01 ~ 1 true/false
```

Output:

```
true
```

Example: Test the precision.

```
// Test
let trueCount = 0;
let falseCount = 0;
new Array(1000000).fill(0).forEach(() => {
  if (inRate(0.5)) {
    trueCount++;
  } else {
    falseCount++;
  }
});
console.log(trueCount, falseCount); // 499994 500006
```

<!-- @param {number} rate -- 0.1 ~ 1 => 1% ~ 100%
@returns {boolean} true 命中 -->

#### calLongestCommonSubstring

Computes the longest common substring of two strings.

<!-- ZH: 计算两个字符串的最长公共子串 -->

Usage:

```
calLongestCommonSubstring('fish', 'finish');
```

Output:

```
3
```

<!-- @param {string} aStr String
@param {string} bStr String
@returns {number} Length -->

#### calLongestCommonSubsequence

Computes the longest common subsequence of two strings.

<!-- ZH: 计算两个字符串的最长公共子序列 -->

Usage:

```
calLongestCommonSubsequence('fish', 'finish');
```

Output:

```
4
```

<!-- @param {string} aStr 字符串
@param {string} bStr 字符串
@returns {number} 长度 -->

### Browser Information

#### getBrowserInfo

Browser Information

<!-- ZH: 返回浏览器信息 https://github.com/JowayYoung/juejin-code/blob/master/browser-type.js -->

Usage:

```
getBrowserInfo();
```

Output:

```
{"engine":"webkit","engineVs":"537.36","platform":"desktop","supporter":"chrome","supporterVs":"85.0.4183.121","system":"windows","systemVs":"10"}
```

Results:

| Index | Field | Description |
| --- | --- | --- |
| System | system | android, ios, windows, macos, linux |
| System version | systemVs | windows: 2000, xp, 2003, vista, 7, 8, 8.1, 10 <br />macos: ... |
| Platform | platform | desktop, mobile |
| Engine | engine | webkit, gecko, presto, trident |
| Engine version | engineVs | - |
| Supporter | supporter | edge, opera, chrome, safari, firefox, iexplore |
| Supporter version | supporterVs | - |
| Shell | shell | (Optional) wechat, qq_browser, qq_app, uc, 360, 2345, sougou, liebao, maxthon, bilibili |
| Shell version | shellVs | (Optional) 20/... |
| Apple device type | appleType | (Optional) iphone, ipad, ipod, iwatch |

Example: Determine the environment of the mobile QQ.

```
const { system, shell } = getBrowserInfo();
const isMobileQQ = ['android', 'ios'].includes(system) && ['qq_browser', 'qq_app'].includes(shell);
```

<!-- @returns 浏览器信息 -->

### Web Performance

#### getPerformance

Get page load time(PerformanceTiming).

<!-- ZH: 获取页面加载相关的各项数据 -->

Usage:

```
// `camelCase：true`(Default) Return hump data.
// `camelCase：false` Return underline data.
getPerformance(true)
 .then(res => {
  console.log(JSON.stringify(res));
 })
 .catch(console.error);
```

Output:

```
{"deviceType":"pc","network":"3g","unloadTime":0,"redirectTime":0,"dnsTime":0,"tcpTime":0,"responseTime":65,"downloadTime":1,"domreadyTime":369,"onloadTime":441,"whiteTime":94,"renderTime":441,"decodedBodySize":210,"encodedBodySize":210}
```

Results:

| Index | Field | Description |
| --- | --- | --- |
| DNS lookup | dns_time | domainLookupEnd - domainLookupStart |
| Connection negotiation | tcp_time | connectEnd - connectStart |
| Requests and responses | response_time | responseStart - requestStart |
| White screen | white_time | responseStart - navigationStart |
| DomReady | domready_time  | domContentLoadedEventStart - navigationStart |
| Onload | onload_time | loadEventStart - navigationStart |
| EventEnd | render_time | loadEventEnd -navigationStart |
| Unload | unload_time | (Optional) unloadEventEnd - unloadEventStart |
| Redirect | redirect_time | (Optional) redirectEnd - redirectStart |
| SSL | ssl_time | (Optional) connectEnd - secureConnectionStart |
| Download | download_time | (Optional) responseEnd - responseStart |

<!-- @param {boolean} camelCase -- true（默认） 以驼峰形式返回数据 false 以下划线形式返回数据
@returns {Promise<object>} 加载数据 -->

### Margin of Safety

Determine if it is a secure PWA environment that it can run.

<!-- ZH: 判断是否是安全的 PWA 环境 -->

Usage:

```
isSafePWAEnv();
```

Output:

```
true
```

<!-- @returns {boolean} true 是 -->

### Debug

#### genCustomConsole

Custom console printing (`console`).

<!-- ZH: 生成自定义控制台打印 -->

Usage:

```
const myConsole = genCustomConsole('MazeyLog:');
myConsole.log('I am string.');
myConsole.info('I am boolean.', true);
myConsole.info('I am number.', 123, 456);
myConsole.info('I am object.', { a: 123, b: 456});
```

Output:

```
MazeyLog: I am string.
MazeyLog: I am boolean. true
MazeyLog: I am number. 123 456
MazeyLog: I am object. {a: 123, b: 456}
```

<!-- @param {string} prefix 前缀
@param {string} locales A locale string.
@param {function} logFn The function with Log.
@param {function} errorFn The function with Error.
@returns {object} 新实例 -->

## Contributing

```
# Install
npm i --registry=https://registry.npmjs.org

# Serve
npm run dev

# Build
npm run build

# Document
npm run docs

# Test
npm run test
```

## License

This software is released under the terms of the [MIT license](https://github.com/mazeyqian/mazey/blob/master/LICENSE).
