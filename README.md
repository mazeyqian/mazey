English | [简体中文](./README_CN.md)

# Mazey

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
  url: 'http://www.mazey.net/js/plugin/jquery/jquery-2.1.1.min.js',
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
  url: 'http://www.mazey.net/css/mazey-base.css',
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

### Browser Data

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

setCookie('test', '123', 30, 'mazey.net'); // key value day domain
getCookie('test'); // 123
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

### Handle DOM

Modify `class`.

```
import { hasClass, addClass, removeClass } from 'mazey';

const dom = document.querySelector('#box');

// 判断 class
hasClass(dom, 'test');
// 增加 class
addClass(dom, 'test');
// 删除 class
removeClass(dom, 'test');
```

Add inline-style.

```
import { addInlineStyle } from 'mazey';

// 添加有 id 的内联样式，重复添加会更新内联样式而不是新增
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

// 添加无 id 的内联样式，重复添加会新增内联样式
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

Add custom scrollbars (For elements moved by `transform`).

```
import { customScrollBarForTransformEle } from 'mazey';

// 使用类名
customScrollBarForTransformEle({
  containerClassName: 'i-am-container',
  imgBoxClassName: 'i-am-img-father-i-can-transform',
  imgClassName: 'i-am-img',
});

// 使用 Dom 对象
customScrollBarForTransformEle({
  containerClassName: 'i-am-container',
  imgBoxDom: document.querySelector('.i-am-img-father-i-can-transform'),
  imgDom: document.querySelector('.i-am-img-father-i-can-transform'),
});

// 按需直接隐藏滚动条
customScrollBarForTransformEle({
  containerClassName: 'i-am-container',
  action: 'hide',
});
```

Calculate the size of the picture that fits the width of the container and the distance from the top.

```
import { calcContainImageSizeAndPosition } from 'mazey';

// 如果高度不足以占满容器，使其垂直居中；如果高度比容器长，由上向下铺开
calcContainImageSizeAndPosition({ oriImageWidth: 300, oriImageHeight: 300, viewportWidth: 375, viewportHeight: 812 });
// {"targetImageWidth":375,"targetImageHeight":375,"top":218.5,"wPer":1.25}
```

### Site Performance

Get load time.

```
import { getPerformance } from 'mazey';

// camelCase：true（默认） 以驼峰形式返回数据 / false 以下划线形式返回数据
getPerformance({ camelCase: true })
 .then(res => {
  console.log(JSON.stringify(res));
  // {"deviceType":"pc","network":"3g","unloadTime":0,"redirectTime":0,"dnsTime":0,"tcpTime":0,"responseTime":65,"downloadTime":1,"domreadyTime":369,"onloadTime":441,"whiteTime":94,"renderTime":441,"decodedBodySize":210,"encodedBodySize":210}
 })
 .catch(console.error);
```

| 指标 | 字段 | 计算⽅法 |
| --- | --- | --- |
| * DNS 查询时间 | dns_time | domainLookupEnd - domainLookupStart |
| * 服务器连接时间 | tcp_time | connectEnd - connectStart |
| * 服务器响应时间 | response_time | responseStart - requestStart |
| * ⽩屏时间 | white_time | responseStart - navigationStart |
| * DomReady 总时间 | domready_time  | domContentLoadedEventStart - navigationStart |
| * 页面加载时间 | onload_time | loadEventStart - navigationStart |
| * EventEnd 总时间 | render_time | loadEventEnd -navigationStart |
| 上个⽂档卸载时间 | unload_time | unloadEventEnd - unloadEventStart |
| 重定向时间 | redirect_time | redirectEnd - redirectStart |
| 客户端⽩屏时间 | custom_white_time | renderTiming - navigationStart |
| SSL连接时间 | ssl_time | connectEnd - secureConnectionStart |
| ⽹⻚下载时间 | download_time | responseEnd - responseStart |
| FCP | first_contentful_paint_time | firstPaintTime |

### Calculate&Formula

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

Hit probability (1% ~ 100%).

```
import { inRate } from 'mazey';

inRate(0.5); // 0.01 ~ 1 true / false

// 测试准确性
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

### Browser Information

```
import { getBrowserType } from 'mazey';

getBrowserType(); // {"engine":"webkit","engineVs":"537.36","platform":"desktop","supporter":"chrome","supporterVs":"85.0.4183.121","system":"windows","systemVs":"10"}
// 外壳和外壳版本 { shell: 'wechat', shellVs: '20' } shell: wechat qq uc 360 2345 sougou liebao maxthon
```

### Margin of Safety

Determine if it is a secure PWA environment that it can run.

```
import { isSafePWAEnv } from 'mazey';

isSafePWAEnv(); // true
```

### Debug

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