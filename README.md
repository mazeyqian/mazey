# Mazey

Mazey's library for front end.

## Install

You can get Mazey via [npm](http://npmjs.com).

```
npm install mazey --save
```

## Usage

### 加载资源

```
// 加载 JavaScript
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

```
// 加载 CSS
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

```
// Storage
import { setSessionStorage, getSessionStorage, setLocalStorage, getLocalStorage } from 'mazey';

setSessionStorage('test', '123');
getSessionStorage('test'); // 123
setLocalStorage('test', '123');
getLocalStorage('test'); // 123
```

```
// Cookie
import { setCookie, getCookie } from 'mazey';

setCookie('test', '123', 30, 'mazey.net'); // key value day domain
getCookie('test'); // 123
```

### 公式计算

```
// 计算两个字符串的最长公共子串
import { calLongestCommonSubstring } from 'mazey';

calLongestCommonSubstring('fish', 'finish'); // 3
```

```
// 计算两个字符串的最长公共子序列
import { calLongestCommonSubsequence } from 'mazey';

calLongestCommonSubsequence('fish', 'finish'); // 4
```

[More API](https://mazey.cn/docs/mazey/modules/_index_.html)

## Develop

```
# dev
npm run dev

# build
npm run build

# documentation
npm run docs
```