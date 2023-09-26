English | [简体中文](https://github.com/mazeyqian/mazey/blob/master/README_ZH.md)

# mazey

[![NPM version][npm-image]][npm-url]
[![l][l-image]][l-url]

[npm-image]: https://img.shields.io/npm/v/mazey
[npm-url]: https://npmjs.org/package/mazey
[l-image]: https://img.shields.io/npm/l/mazey
[l-url]: https://github.com/mazeyqian/mazey

**mazey** is a functional library for daily front-end work. There are already many excellent libraries for front-end development, but creating a file named `utils.js` or `common.js` is generally used to supply common functions in projects. It's boring to copy similar functions across multiple projects. That's why I've created this library and will keep updating it to serve as a reliable resource for front-end needs.

## Install

Use mazey via [npm](https://www.npmjs.com/package/mazey).

```shell
npm install mazey --save
```

Use mazey from CDN.

```html
<script type="text/javascript" src="//i.mazey.net/mazey/lib/mazey.min.js"></script>
```

Of course, you can also download this file and serve it yourself. The file locates at the `lib/mazey.min.js`.

## Usage

Example: Use a function to load JavaScript script.

Import from [npm](https://www.npmjs.com/package/mazey).

```javascript
import { isNumber } from 'mazey';

const x = Infinity;
isNumber(x); // <=> typeof x === 'string' && !isNaN(x) && isFinite(x)
// Output: false
```

Import from CDN.

```html
<script type="text/javascript" src="//i.mazey.net/mazey/lib/mazey.min.js"></script>
<script>
  const x = Infinity;
  mazey.isNumber(x, { isInfinityAsNumber: true }); // <=> typeof x === 'string' && !isNaN(x)
  // Output: true
</script>
```

## API Examples

There are some examples maintained by hand below. For more information, please check the [full documentation](https://mazey.cn/t/m).

### Table of Contents

<!-- toc - begin -->
- Generated with ❤️
- [Load Resource](#load-resource)
  * [loadScript](#loadscript)
  * [loadScriptIfUndefined](#loadscriptifundefined)
  * [loadCSS](#loadcss)
  * [loadImage](#loadimage)
  * [windowLoaded](#windowloaded)
- [Util](#util)
  * [isNumber](#isnumber)
  * [isJSONString](#isjsonstring)
  * [isValidData](#isvaliddata)
  * [genRndNumString](#genrndnumstring)
  * [formatDate](#formatdate)
  * [debounce](#debounce)
  * [throttle](#throttle)
  * [convertCamelToKebab](#convertcameltokebab)
  * [convertCamelToUnder](#convertcameltounder)
  * [deepCopy](#deepcopy)
- [URL](#url)
  * [getQueryParam](#getqueryparam)
  * [getUrlParam](#geturlparam)
  * [getHashQueryParam](#gethashqueryparam)
  * [getDomain](#getdomain)
  * [updateQueryParam](#updatequeryparam)
  * [isValidUrl](#isvalidurl)
  * [isValidHttpUrl](#isvalidhttpurl)
- [Cache Data](#cache-data)
  * [Cookie](#cookie)
  * [Storage](#storage)
- [DOM](#dom)
  * [addStyle](#addstyle)
  * [Class](#class)
  * [newLine](#newline)
- [Calculate and Formula](#calculate-and-formula)
  * [inRate](#inrate)
  * [longestComSubstring](#longestcomsubstring)
  * [longestComSubsequence](#longestcomsubsequence)
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

Usage:

```javascript
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

Output:

```text
Load JavaScript script: loaded
```

#### loadScriptIfUndefined

Load a script from the given URL if it (`window['attribute']`) has not already been loaded.

Usage:

```javascript
loadScriptIfUndefined('xyz', 'https://example.com/lib/xyz.min.js')
  .then(() => {
    console.log('xyz is loaded.');
  })
  .catch(err => {
    console.log('Failed to load xyz.', err);
  });
```

Output:

```text
xyz is loaded.
```

#### loadCSS

Load a CSS file from the server.

Usage:

```javascript
loadCSS(
    'http://example.com/path/example.css',
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

Output:

```text
Load CSS Success: loaded
```

#### loadImage

Load an image from the given URL.

The target image will be loaded in the background, and the Promise status will change after the image is loaded. If the image fails to load, the Promise status will change to `reject` with the error object. If the image is loaded successfully, the Promise status will change to `resolve` with the image object. This method can be used to preload images and cache them in the browser. It can also be used to implement lazy loading of images.

Note that this method will not add the image to the DOM.

Usage:

```javascript
loadImage('https://example.com/example.png')
  .then((img) => {
    console.log(img);
  })
  .catch((err) => {
    console.log(err);
  });
```

#### windowLoaded

Check whether the page is loaded successfully (Keep the compatibility if the browser's `load` event has been triggered).

Usage:

```javascript
windowLoaded(30) // second
  .then(res => {
    console.log(`Load Success: ${res}`);
  })
  .catch(err => {
    console.log(`Load Timeout or Fail: ${err.message}`);
  });
```

Output:

```text
Load Success: load
```

### Util

#### isNumber

Check whether it is a right number.

Usage:

```javascript
const ret1 = isNumber(123);
const ret2 = isNumber('123');
// Default: NaN, Infinity is not Number
const ret3 = isNumber(Infinity);
const ret4 = isNumber(Infinity, { isInfinityAsNumber: true });
const ret5 = isNumber(NaN);
const ret6 = isNumber(NaN, { isNaNAsNumber: true, isInfinityAsNumber: true });
console.log(ret1, ret2, ret3, ret4, ret5, ret6);
```

Output:

```text
true false false true false true
```

#### isJSONString

Check whether it is a valid JSON string.

Usage:

```javascript
const ret1 = isJSONString(`['a', 'b', 'c']`);
const ret2 = isJSONString(`["a", "b", "c"]`);
console.log(ret1);
console.log(ret2);
```

Output:

```text
false
true
```

#### isValidData

Determine the validity of the data.

Usage:

```javascript
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

```text
isValidDataResA: false
isValidDataResB: true
isValidDataResC: false
```

#### genRndNumString

Produce a random string of number, `genRndNumString(7)` => '7658495'.

Usage:

```javascript
const ret1 = genRndNumString(4);
const ret2 = genRndNumString(7);
console.log(ret1);
console.log(ret2);
```

Output:

```text
9730
2262490
```

#### formatDate

Return the formatted date string in the given format.

Usage:

```javascript
const ret1 = formatDate();
const ret2 = formatDate('Tue Jan 11 2022 14:12:26 GMT+0800 (China Standard Time)', 'yyyy-MM-dd hh:mm:ss');
const ret3 = formatDate(1641881235000, 'yyyy-MM-dd hh:mm:ss');
const ret4 = formatDate(new Date(2014, 1, 11), 'MM/dd/yyyy');
console.log('Default formatDate value:', ret1);
console.log('String formatDate value:', ret2);
console.log('Number formatDate value:', ret3);
console.log('Date formatDate value:', ret4);
```

Output:

```text
Default formatDate value: 2023-01-11
String formatDate value: 2022-01-11 14:12:26
Number formatDate value: 2022-01-11 14:07:15
Date formatDate value: 02/11/2014
```

#### debounce

Debounce

Usage:

```javascript
const foo = debounce(() => {
  console.log('The debounced function will only be invoked in 1000 milliseconds, the other invoking will disappear during the wait time.');
}, 1000, true);
```

#### throttle

Throttle

Usage:

```javascript
const foo = throttle(() => {
  console.log('The function will be invoked at most once per every wait 1000 milliseconds.');
}, 1000, { leading: true });
```

Reference: [Lodash](https://lodash.com/docs/4.17.15#throttle)

#### convertCamelToKebab

Transfer CamelCase to KebabCase.

Usage:

```javascript
const ret1 = convertCamelToKebab('ABC');
const ret2 = convertCamelToKebab('aBC');
console.log(ret1);
console.log(ret2);
```

Output:

```text
a-b-c
a-b-c
```

#### convertCamelToUnder

Transfer CamelCase to Underscore.

Usage:

```javascript
const ret1 = convertCamelToUnder('ABC');
const ret2 = convertCamelToUnder('aBC');
console.log(ret1);
console.log(ret2);
```

Output:

```text
a_b_c
a_b_c
```

#### deepCopy

Copy/Clone Object deeply.

Usage:

```javascript
const ret1 = deepCopy(['a', 'b', 'c']);
const ret2 = deepCopy('abc');
console.log(ret1);
console.log(ret2);
```

Output:

```text
['a', 'b', 'c']
abc
```

### URL

#### getQueryParam

Get the query param's value of the current Web URL(`location.search`).

```
// http://example.com/?t1=1&t2=2&t3=3&t4=4#2333
// ?t1=1&t2=2&t3=3&t4=4
getQueryParam('t3'); // 3
getQueryParam('t4'); // 4
```

#### getUrlParam

Returns the value of the specified query parameter in the input URL.

```
getUrlParam('http://example.com/?t1=1&t2=2&t3=3&t4=4', 't3'); // Returns '3'
getUrlParam('http://example.com/?t1=1&t2=2&t3=3&t4=4', 't4'); // Returns '4'
```

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

#### getDomain

Get the domain of URL, and other params.

Usage:

```
getDomain('http://example.com/?t1=1&t2=2&t3=3&t4=4');
getDomain('http://example.com/test/thanks?t1=1&t2=2&t3=3&t4=4', ['hostname', 'pathname']);
getDomain('http://example.com:7890/test/thanks', ['hostname']);
getDomain('http://example.com:7890/test/thanks', ['host']); // With Port
getDomain('http://example.com:7890/test/thanks', ['origin']);
getDomain('http://example.com:7890/test/thanks?id=1', ['origin', 'pathname', 'search']);
```

Output:

```
example.com
example.com/test/thanks
example.com
example.com:7890
http://example.com:7890
http://example.com:7890/test/thanks?id=1
```

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

#### isValidUrl

Checks if the given string is a valid URL, including **scheme URLs**.

```js
isValidUrl('https://www.example.com'); // true
isValidUrl('http://example.com/path/exx/ss'); // true
isValidUrl('https://www.example.com/?q=hello&age=24#world'); // true
isValidUrl('http://www.example.com/#world?id=9'); // true
isValidUrl('ftp://example.com'); // true
```

If you are specifically checking for HTTP/HTTPS URLs, it is recommended to use the `isValidHttpUrl` function instead.
The `isValidUrl` function matches all scheme URLs, including FTP and other non-HTTP schemes.

#### isValidHttpUrl

Check if the given string is a valid HTTP/HTTPS URL.

```js
isValidHttpUrl('https://www.example.com'); // true
isValidHttpUrl('http://example.com/path/exx/ss'); // true
isValidHttpUrl('https://www.example.com/?q=hello&age=24#world'); // true
isValidHttpUrl('http://www.example.com/#world?id=9'); // true
isValidHttpUrl('ftp://example.com'); // false
```

### Cache Data

#### Cookie

Handle Cookie.

<!-- ZH: 设置/获取 Cookie -->

```
setCookie('test', '123', 30, 'example.com'); // key value day domain
getCookie('test'); // 123
```

#### Storage

Handle Storage (Keep fit for JSON, it can transfer format automatically).

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

Example 2: Add the `<style>` without `id`, and repeated invoking will add a new one.

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

#### newLine

Make a new line of HTML.

```
newLine('a\nb\nc'); // 'a<br />b<br />c'
newLine('a\n\nbc'); // 'a<br /><br />bc'
```

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

#### longestComSubstring

Computes the longest common substring of two strings.

Usage:

```
longestComSubstring('fish', 'finish');
```

Output:

```
3
```

#### longestComSubsequence

Computes the longest common subsequence of two strings.

Usage:

```
longestComSubsequence('fish', 'finish');
```

Output:

```
4
```

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
| :------------ | :------------ | :------------ | :------------ |
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

### Web Performance

#### getPerformance

Get page load time(`PerformanceNavigationTiming`).

This function uses the [`PerformanceNavigationTiming`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming) API to get page load time data.
The `PerformanceNavigationTiming` API provides more accurate and detailed information about page load time than the deprecated [`PerformanceTiming`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming) API.
If you are using an older browser that does not support `PerformanceNavigationTiming`, you can still use the `PerformanceTiming` API by using the previous version of this library ([`v3.9.7`](https://www.npmjs.com/package/mazey/v/3.9.7)).

Usage:

```
// `camelCase：false` (Default) Return underline(`a_b`) data.
// `camelCase：true` Return hump(`aB`) data.
getPerformance()
 .then(res => {
  console.log(JSON.stringify(res));
 })
 .catch(console.error);
```

Output:

```
{"source":"PerformanceNavigationTiming","os":"others","os_version":"","device_type":"pc","network":"4g","screen_direction":"","unload_time":0,"redirect_time":0,"dns_time":0,"tcp_time":0,"ssl_time":0,"response_time":2,"download_time":2,"first_paint_time":288,"first_contentful_paint_time":288,"dom_ready_time":0,"onload_time":0,"white_time":0,"render_time":0,"decoded_body_size":718,"encoded_body_size":718}
```

Results:

| Attribute | Description | Type | Values |
| :------------ | :------------ | :------------ | :------------ |
| dns_time | DNS Lookup | number | domainLookupEnd - domainLookupStart |
| tcp_time | Connection Negotiation | number | connectEnd - connectStart |
| response_time | Requests and Responses | number | responseStart - requestStart |
| white_time | White Screen | number | responseStart - navigationStart |
| dom_ready_time | Dom Ready | number | domContentLoadedEventStart - navigationStart |
| onload_time | Onload | number | loadEventStart - navigationStart |
| render_time | EventEnd | number | loadEventEnd -navigationStart |
| unload_time | Unload | number | (Optional) unloadEventEnd - unloadEventStart |
| redirect_time | Redirect | number | (Optional) redirectEnd - redirectStart |
| ssl_time | SSL | number | (Optional) connectEnd - secureConnectionStart |
| download_time | Download | number | (Optional) responseEnd - responseStart |

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

## Contributing

### Development Environment

#### Node.js

- v14.21.3
- v14.7.0

#### TypeScript

- v4.4.4

### Scripts

Install Dependencies:

```shell
npm i
```

Development:

```shell
npm run dev
```

Build:

```shell
npm run build
```

Document:

```shell
npm run docs
```

Test:

```shell
npm run test
```

### Returns

| Values    | Description                              | Type    |
| :-------- | :--------------------------------------- | :------ |
| ok        | The operation was successful.            | string  |
| loaded    | Some assets have been loaded.            | string  |
| fail      | An error occurred.                       | string  |
| defined   | The value is defined.                    | string  |
| undefined | The value is undefined.                  | string  |
| timeout   | The operation timed out.                 | string  |
| true      | The value is true.                       | boolean |
| false     | The value is false.                      | boolean |

## License

This software is released under the terms of the [MIT license](https://github.com/mazeyqian/mazey/blob/master/LICENSE).
