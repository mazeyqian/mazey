English | [简体中文](https://github.com/mazeyqian/mazey/blob/master/README_CN.md)

# mazey

[![NPM version][npm-image]][npm-url]
[![l][l-image]][l-url]

[npm-image]: https://img.shields.io/npm/v/mazey
[npm-url]: https://npmjs.org/package/mazey
[l-image]: https://img.shields.io/npm/l/mazey
[l-url]: https://github.com/mazeyqian/mazey

Mazey's functional library for daily front-end work. There are already many excellent libraries for front-end development, but creating a file named UtilsJS or CommonJS is generally used to supply common functions in projects. It's boring to copy similar functions among projects again and again. Therefore, I will consistently update the library during my work life to save time.

## Install

Use mazey via [npm](https://www.npmjs.com/package/mazey).

```
npm install mazey --save
```

Use mazey from CDN.

```
<script type="text/javascript" src="//i.mazey.net/mazey/lib/mazey.min.js"></script>
```

Of course, you can also download this file and serve it yourself. The file locates at the `lib/mazey.min.js`.

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

There ara some examples maintained by hand below. For more information, please check the [full documentation](https://mazey.cn/t/m).

**Table of Contents**

<!-- toc - begin -->
- Generated with ❤️
- [Load Resource](#load-resource)
  * [loadScript](#loadscript)
  * [loadCSS](#loadcss)
  * [windowLoaded](#windowloaded)
- [Util](#util)
  * [isNumber](#isnumber)
  * [generateRndNum](#generaterndnum)
  * [isJsonString](#isjsonstring)
  * [formatDate](#formatdate)
  * [debounce](#debounce)
  * [throttle](#throttle)
  * [camelCaseToKebabCase](#camelcasetokebabcase)
  * [camelCase2Underscore](#camelcase2underscore)
  * [mTrim](#mtrim)
  * [deepCopyObject](#deepcopyobject)
  * [isValidData](#isvaliddata)
- [DOM](#dom)
  * [addStyle](#addstyle)
  * [newLine](#newline)
  * [Class](#class)
- [URL](#url)
  * [getQueryParam](#getqueryparam)
  * [getUrlParam](#geturlparam)
  * [getHashQueryParam](#gethashqueryparam)
  * [getDomain](#getdomain)
  * [updateQueryParam](#updatequeryparam)
- [Cache Data](#cache-data)
  * [Storage](#storage)
  * [Cookie](#cookie)
- [Calculate and Formula](#calculate-and-formula)
  * [inRate](#inrate)
  * [calLongestCommonSubstring](#callongestcommonsubstring)
  * [calLongestCommonSubsequence](#callongestcommonsubsequence)
- [Browser Information](#browser-information)
  * [getBrowserInfo](#getbrowserinfo)
  * [isSafePWAEnv](#issafepwaenv)
- [Web Performance](#web-performance)
  * [getPerformance](#getperformance)
- [Debug](#debug)
  * [genCustomConsole](#gencustomconsole)
<!-- toc - end -->

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
@returns {Promise<boolean>} -- true 成功
@category Load Resource -->

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
@returns {Promise<boolean>} true -- 加载成功
@category Load Resource -->

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
@returns {Promise<string>} document is loaded? 'complete' 'load' / 'timeout'
@category Load Resource -->

### Util

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
@returns {boolean} true 是数字
@category Util -->

#### generateRndNum

Produce a random string of number, `generateRndNum(7)` => '7658495'.

```
generateRndNum(4); // '9730'
generateRndNum(7); // '2262490'
```

<!-- @param {number} n Length
@returns {string} Return the random string.
@category Util -->

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
@returns {boolean} Return the result of checking.
@category Util -->

#### formatDate

Return the formatted date string in the given format.

Usage:

```
console.log('Default formatDate value:', formatDate());
console.log('String formatDate value:', formatDate('Tue Jan 11 2022 14:12:26 GMT+0800 (China Standard Time)', 'yyyy-MM-dd hh:mm:ss'));
console.log('Number formatDate value:', formatDate(1641881235000, 'yyyy-MM-dd hh:mm:ss'));
console.log('Date formatDate value:', formatDate(new Date(2014, 1, 11), 'MM/dd/yyyy'));
```

Output:

```
Default formatDate value: 2023-01-11
String formatDate value: 2022-01-11 14:12:26
Number formatDate value: 2022-01-11 14:07:15
Date formatDate value: 02/11/2014
```

<!-- @param {Date|number|string} dateIns Original Date
@param {string} format Format String
@returns {string} Return the formatted date string.
@category Util -->

#### debounce

Debounce

<!-- ZH: 去抖 -->

```
const foo = debounce(() => {
  console.log('The debounced function will only be invoked in 1000 milliseconds, the other invoking will disappear during the wait time.');
}, 1000, true);
```

<!-- @category Util -->

#### throttle

Throttle

<!-- ZH: 节流 -->

```
const foo = throttle(() => {
  console.log('The function will be invoked at most once per every wait 1000 milliseconds.');
}, 1000, { leading: true });
```

Reference: [Lodash](https://lodash.com/docs/4.17.15#throttle)

<!-- @category Util -->

#### camelCaseToKebabCase

Transfer CamelCase to KebabCase.

```
camelCaseToKebabCase('ABC'); // a-b-c
camelCaseToKebabCase('aBC'); // a-b-c
```

<!-- @param {string} camelCase 'aBC' or 'ABC'
@returns {string} 'a-b-c'
@category Util -->

#### camelCase2Underscore

Transfer CamelCase to Underscore.

```
camelCase2Underscore('ABC'); // a_b_c
camelCase2Underscore('aBC'); // a_b_c
```

<!-- @param {string} camelCase 'aBC' or 'ABC'
@returns {string} 'a_b_c'
@category Util -->

#### mTrim

Remove leading and trailing whitespace or specified characters from string.

```
mTrim(' 1 2 3 '); // '1 2 3'
mTrim('abc '); // 'abc'
```

<!-- @param {string} str The string to trim.
@returns {string} Trimmed string.
@category Util -->

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
@returns {object} Returns the deep cloned value.
@category Util -->

#### isValidData

Determine the validity of the data.

Usage:

```
const validData = {
  a: {
    b: {
      c: 413
    }
  }
};

const isValidDataResA = isValidData(validData, ['a', 'b', 'c'], 2333);
const isValidDataResB = isValidData(validData, ['a', 'b', 'c'], 413);
const isValidDataResC = isValidData(validData, ['d', 'd'], 413);

console.log('isValidDataResA:', isValidDataResA);
console.log('isValidDataResB:', isValidDataResB);
console.log('isValidDataResC:', isValidDataResC);
```

Output:

```
isValidDataResA: false
isValidDataResB: true
isValidDataResC: false
```

<!-- @param {any} data Original Data
@param {string[]} attributes Data Attributes
@param {any} validValue Given Value for verifying.
@returns {boolean} Return TRUE if the data is valid.
@category Util -->

### DOM

#### addStyle

Add `<style>` in `<head>`.

<!-- ZH: 添加样式标签; style: 样式标签内的字符串; id: `<style>` 标签的 `id`; 返回: 添加成功/失败 -->

Example 1: Add the `<style>` with `id`, and repeated invoking will update the content instead of adding a new one.

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

Example 2: Add the `<style>` without `id`, and repeated invoking will adding a new one.

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

<!-- @category DOM -->

#### newLine

Make a newline of HTML.

```
newLine('a\nb\nc'); // 'a<br />b<br />c'
newLine('a\n\nbc'); // 'a<br /><br />bc'
```

<!-- @param {string} str The string to make a newline.
@returns {string} A newline with `br`.
@category DOM -->

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

<!-- @category DOM -->

### URL

#### getQueryParam

Get the query param's value of the current Web URL(`location.search`).

```
// http://example.com/?t1=1&t2=2&t3=3&t4=4#2333
// ?t1=1&t2=2&t3=3&t4=4
getQueryParam('t3'); // 3
getQueryParam('t4'); // 4
```

<!-- @param {string} param Query param.
@returns {string} value
@category URL -->

#### getUrlParam

Get the query param's value of the input URL.

```
getUrlParam('http://example.com/?t1=1&t2=2&t3=3&t4=4', 't3'); // 3
getUrlParam('http://example.com/?t1=1&t2=2&t3=3&t4=4', 't4'); // 4
```

<!-- @param {string} url URL string.
@param {string} param Query param.
@returns {string} value
@category URL -->

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
@returns {string} value
@category URL -->

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
@param {array} rules Object.keys(location), ['href', 'protocol', 'host', 'hostname', 'port', 'pathname', 'search', 'hash'], ['hostname', 'pathname'] = 'km.mazey.net/plugins/servlet/mobile'
@category URL -->

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
@returns {string} URL.
@category URL -->

### Cache Data

#### Storage

Handle Storage (Keep fit for JSON, it can tansfer format automatically).

<!-- ZH: 存储/获取数据到 sessionStorage/localStorage -->

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

<!-- @param {string} key 键
@returns {any} 返回值
@category Cache Data -->

#### Cookie

Handle Cookie.

<!-- ZH: 设置/获取 Cookie -->

```
setCookie('test', '123', 30, 'example.com'); // key value day domain
getCookie('test'); // 123
```

<!-- @category Cache Data -->

### Calculate and Formula

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
@returns {boolean} true 命中
@category Calculate and Formula -->

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
@returns {number} Length
@category Calculate and Formula -->

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
@returns {number} 长度
@category Calculate and Formula -->

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

| Attribute | Description | Type | Values |
| --- | --- | --- | --- |
| **system** | System | string | android, ios, windows, macos, linux |
| systemVs | System version | string | windows: 2000, xp, 2003, vista, 7, 8, 8.1, 10 <br />macos: ... |
| platform | Platform | string | desktop, mobile |
| engine | Engine | string | webkit, gecko, presto, trident |
| engineVs | Engine version | string | - |
| supporter | Supporter | string | edge, opera, chrome, safari, firefox, iexplore |
| supporterVs | Supporter version | string | - |
| shell | Shell | string | (Optional) wechat, qq_browser, qq_app, uc, 360, 2345, sougou, liebao, maxthon, bilibili |
| shellVs | Shell version | string | (Optional) 20/... |
| appleType | Apple device type | string | (Optional) ipad, iphone, ipod, iwatch |

Example: Determine the environment of the mobile QQ.

```
const { system, shell } = getBrowserInfo();
const isMobileQQ = ['android', 'ios'].includes(system) && ['qq_browser', 'qq_app'].includes(shell);
```

<!-- @returns 浏览器信息
@category Browser Information -->

#### isSafePWAEnv

Detect the margin of Safety. Determine if it is a secure PWA environment that it can run.

<!-- ZH: 判断是否是安全的 PWA 环境 -->

Usage:

```
isSafePWAEnv();
```

Output:

```
true
```

<!-- @returns {boolean} true 是
@category Browser Information -->

### Web Performance

#### getPerformance

Get page load time(PerformanceTiming).

<!-- ZH: 获取页面加载相关的各项数据 -->

Usage:

```
// `camelCase：false` (Default) Return underline data.
// `camelCase：true` Return hump data.
getPerformance()
 .then(res => {
  console.log(JSON.stringify(res));
 })
 .catch(console.error);
```

Output:

```
{"os":"ios","os_version":"13_2_3","device_type":"phone","network":"4g","unload_time":0,"redirect_time":0,"dns_time":0,"tcp_time":0,"response_time":289,"download_time":762,"first_paint_time":469,"first_contentful_paint_time":469,"domready_time":1318,"onload_time":2767,"white_time":299,"render_time":2768,"decoded_body_size":979570,"encoded_body_size":324938}
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

<!-- @param {boolean} camelCase -- false（默认） 以下划线形式返回数据 true 以驼峰形式返回数据
@returns {Promise<object>} 加载数据
@category Web Performance -->

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
@returns {object} 新实例
@category Debug -->

## Contributing

```
# Install
npm i

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
