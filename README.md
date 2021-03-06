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

### 操作 DOM

修改 `class`

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

### 网站性能

获取加载时间

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

### 浏览器信息

```
import { getBrowserType } from 'mazey';

getBrowserType(); // {"engine":"webkit","engineVs":"537.36","platform":"desktop","supporter":"chrome","supporterVs":"85.0.4183.121","system":"windows","systemVs":"10"}
// 外壳和外壳版本 { shell: 'wechat', shellVs: '20' } shell: wechat qq uc 360 2345 sougou liebao maxthon
```

### 安全边际

判断是否是安全的 PWA 运行环境

```
import { isSafePWAEnv } from 'mazey';

isSafePWAEnv(); // true
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