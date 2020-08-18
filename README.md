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
import { loadScript, loadCSS } from 'mazey';

// 加载 JavaScript
loadScript({
    url: 'https://blog.mazey.net',
    callback: () => console.log('ok')
})
// 加载 CSS
loadCSS({
    url: 'https://blog.mazey.net',
    callback: () => console.log('ok')
})
```

### 存储数据

```
import { setSessionStorage, getSessionStorage, setLocalStorage, getLocalStorage } from 'mazey';

setSessionStorage('key', 'value');
console.log(getSessionStorage('key')); // value
setLocalStorage('key', 'value');
console.log(getLocalStorage('key')); // value
```

### 公式计算

```
import { calLongestCommonSubstring, calLongestCommonSubsequence } from 'mazey';

// 计算两个字符串的最长公共子串
console.log(calLongestCommonSubstring('fish', 'finish')); // 3
// 计算两个字符串的最长公共子序列
console.log(calLongestCommonSubsequence('fish', 'finish')); // 4
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