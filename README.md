English | [简体中文](./README_CN.md)

## Mazey

[![NPM version][npm-image]][npm-url]
[![l][l-image]][l-url]

[npm-image]: https://img.shields.io/npm/v/mazey
[npm-url]: https://npmjs.org/package/mazey
[l-image]: https://img.shields.io/npm/l/mazey
[l-url]: https://github.com/mazeyqian/mazey

Mazey's library for front end.

## Install

You can get Mazey via [npm](https://www.npmjs.com/package/mazey).

```
npm install mazey --save
```

## Usage

### Load Resource

#### Load JavaScript

```
import { loadScript } from 'mazey';

loadScript({
  url: 'http://www.example.com/js/plugin/jquery/jquery-2.1.1.min.js',
  id: 'iamid', // Optional, script ID, default none
  timeout: 5000, // Optional, timeout, default `5000`
  isDefer: false, // Optional, defer, default `false`
})
  .then(
    res => {
      console.log(`Load JavaScript Success: ${res}`);
    }
  )
  .catch(
    err => {
      console.error(`Load JavaScript Fail: ${err}`)
    }
  );
```

#### Load CSS

```
import { loadCSS } from 'mazey';

loadCSS({
  url: 'http://www.example.com/css/mazey-base.css',
  id: 'iamid', // Optional, link ID, default none
})
  .then(
    res => {
      console.log(`Load CSS Success: ${res}`);
    }
  )
  .catch(
    err => {
      console.error(`Load CSS Fail: ${err}`)
    }
  );
```

#### Check Load

Check whether the page is loaded successfully (Keepe the compatibility in case that browser's `load` event has been triggered).

```
import { windowLoaded } from 'mazey';

windowLoaded({ timeout: 30 }) // second
  .then(res => {
    console.log(`Load Success: ${res}`); // Load Success: load
  })
  .catch(err => {
    console.log(`Load Timeout or Fail: ${err}`);
  });
```
### Function

#### Debounce

```
import { debounce } from 'mazey';

const foo = debounce(() => {
  console.log('The debounced function will only be invoked in 1000 milliseconds, the other invoking will disappear during the wait time.');
}, 1000, { leading: true })
```

#### Throttle

```
import { throttle } from 'mazey';

const foo = throttle(() => {
  console.log('The function will be invoked at most once per every wait 1000 milliseconds.');
}, 1000, { leading: true })
```

#### Check Number

Check whether it is a right number.

```
import { isNumber } from 'mazey';

isNumber(123); // true
isNumber('123'); // false
// Default: NaN, Infinity is not Number
isNumber(Infinity); // false
isNumber(Infinity, { isUnFiniteAsNumber: true }); true
isNumber(NaN); // false
isNumber(NaN, { isNaNAsNumber: true, isUnFiniteAsNumber: true }); // true
```

### DOM

#### Class

Modify `class`.

```
import { hasClass, addClass, removeClass } from 'mazey';

const dom = document.querySelector('#box');

// Determine `class`
hasClass(dom, 'test');
// Add `class`
addClass(dom, 'test');
// Remove `class`
removeClass(dom, 'test');
```

#### Style

Add inline-style.

Case 1: Add the inline style with `id`, and repeated invoking will update the content instead of adding a new one.

```
import { addInlineStyle } from 'mazey';

addInlineStyle({
  inlineStyle: `
    body {
      background-color: #333;
    }
  `,
  id: 'test',
});
// <style id="test">
//   body {
//     background-color: #333;
//   }
// </style>
```

Case 2: Add the inline style without `id`, and repeated invoking will adding a new one.

```
import { addInlineStyle } from 'mazey';

addInlineStyle({
  inlineStyle: `
    body {
      background-color: #444;
    }
  `,
});
// <style>
//   body {
//     background-color: #444;
//   }
// </style>
```

### Calculate&Formula

#### Rate

Hit probability (1% ~ 100%).

```
import { inRate } from 'mazey';

inRate(0.5); // 0.01 ~ 1 true / false

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

#### Algorithm

Computes the longest common substring of two strings.

```
import { calLongestCommonSubstring } from 'mazey';

calLongestCommonSubstring('fish', 'finish'); // 3
```

Computes the longest common subsequence of two strings.

```
import { calLongestCommonSubsequence } from 'mazey';

calLongestCommonSubsequence('fish', 'finish'); // 4
```

### Cache Data

#### Storage

Handle Storage (Keep fit for JSON, it can tansfer format automatically).

```
import { setSessionStorage, getSessionStorage, setLocalStorage, getLocalStorage } from 'mazey';

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
import { setCookie, getCookie } from 'mazey';

setCookie('test', '123', 30, 'example.com'); // key value day domain
getCookie('test'); // 123
```

### Browser Information

```
import { getBrowserType } from 'mazey';

getBrowserType(); // {"engine":"webkit","engineVs":"537.36","platform":"desktop","supporter":"chrome","supporterVs":"85.0.4183.121","system":"windows","systemVs":"10"}
// Shell and shell version { shell: 'wechat', shellVs: '20' } shell: wechat qq uc 360 2345 sougou liebao maxthon
```

### Web Performance

Get page load time(PerformanceTiming).

```
import { getPerformance } from 'mazey';

// `camelCase：true`(Default) Return hump data.
// `camelCase：false` Return underline data.
getPerformance({ camelCase: true })
 .then(res => {
  console.log(JSON.stringify(res));
  // {"deviceType":"pc","network":"3g","unloadTime":0,"redirectTime":0,"dnsTime":0,"tcpTime":0,"responseTime":65,"downloadTime":1,"domreadyTime":369,"onloadTime":441,"whiteTime":94,"renderTime":441,"decodedBodySize":210,"encodedBodySize":210}
 })
 .catch(console.error);
```

| Index | Field | Calculation |
| --- | --- | --- |
| * DNS lookup | dns_time | domainLookupEnd - domainLookupStart |
| * Connection negotiation | tcp_time | connectEnd - connectStart |
| * Requests and responses | response_time | responseStart - requestStart |
| * White screen | white_time | responseStart - navigationStart |
| * DomReady | domready_time  | domContentLoadedEventStart - navigationStart |
| * Onload | onload_time | loadEventStart - navigationStart |
| * EventEnd | render_time | loadEventEnd -navigationStart |
| Unload | unload_time | unloadEventEnd - unloadEventStart |
| Redirect | redirect_time | redirectEnd - redirectStart |
| SSL | ssl_time | connectEnd - secureConnectionStart |
| Download | download_time | responseEnd - responseStart |

### Margin of Safety

Determine if it is a secure PWA environment that it can run.

```
import { isSafePWAEnv } from 'mazey';

isSafePWAEnv(); // true
```

### Debug

#### Print

Custom console printing (`console`).

```
import { genCustomConsole } from 'mazey';

const myConsole = genCustomConsole({ prefix: 'MazeyLog:' });
myConsole.log('I am string.'); // MazeyLog: I am string.
myConsole.info('I am boolean.', true); // MazeyLog: I am boolean. true
myConsole.info('I am number.', 123, 456); // MazeyLog: I am number. 123 456
myConsole.info('I am object.', { a: 123, b: 456}); // MazeyLog: I am object. {a: 123, b: 456}
```

[More API>>](https://mazey.cn/docs/mazey/modules/_index_.html)

## Develop

```
# dev
npm run dev

# build
npm run build

# documentation
npm run docs
```
