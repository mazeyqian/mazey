Check whether the page is loaded successfully (Keep the compatibility if the browser's `load` event has been triggered).

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