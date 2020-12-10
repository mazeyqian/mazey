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

### 加载资源

加载 JavaScript

```
import { loadScript } from 'mazey';

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
```

加载 CSS

```
import { loadCSS } from 'mazey';

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
```

### 存储数据

Storage

```
import { setSessionStorage, getSessionStorage, setLocalStorage, getLocalStorage } from 'mazey';

setSessionStorage('test', '123');
getSessionStorage('test'); // 123
setLocalStorage('test', '123');
getLocalStorage('test'); // 123
```

Cookie

```
import { setCookie, getCookie } from 'mazey';

setCookie('test', '123', 30, 'mazey.net'); // key value day domain
getCookie('test'); // 123
```

### 网站性能

获取加载时间

```
import { getPerformance } from 'mazey';

getPerformance({ camelCase: true })
 .then(res => {
  console.log(JSON.stringify(res));
  // {"deviceType":"pc","network":"3g","unloadTime":0,"redirectTime":0,"dnsTime":0,"tcpTime":0,"responseTime":65,"downloadTime":1,"domreadyTime":369,"onloadTime":441,"whiteTime":94,"renderTime":441,"decodedBodySize":210,"encodedBodySize":210}
 })
 .catch(console.error);
```

### 公式计算

计算两个字符串的最长公共子串

```
import { calLongestCommonSubstring } from 'mazey';

calLongestCommonSubstring('fish', 'finish'); // 3
```

计算两个字符串的最长公共子序列

```
import { calLongestCommonSubsequence } from 'mazey';

calLongestCommonSubsequence('fish', 'finish'); // 4
```

命中概率（1% ~ 100%）

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

[更多接口>>](https://mazey.cn/docs/mazey/modules/_index_.html)

## Develop

```
# dev
npm run dev

# build
npm run build

# documentation
npm run docs
```