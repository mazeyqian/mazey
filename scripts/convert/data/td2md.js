/**
 * EN: Get page load time(PerformanceTiming).
 *
 * ZH: 获取页面加载相关的各项数据
 *
 * @remarks
 * This function uses the [`PerformanceNavigationTiming`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming) API to get page load time data.
 * The `PerformanceNavigationTiming` API provides more accurate and detailed information about page load time than the deprecated [`PerformanceTiming`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming) API.
 * If you are using an older browser that does not support `PerformanceNavigationTiming`, you can still use the `PerformanceTiming` API by using the previous version of this library ([`v3.9.7`](https://www.npmjs.com/package/mazey/v/3.9.7)).
 *
 * Usage:
 *
 * ```
 * // `camelCase：false` (Default) Return underline(`a_b`) data.
 * // `camelCase：true` Return hump(`aB`) data.
 * getPerformance()
 *  .then(res => {
 *   console.log(JSON.stringify(res));
 *  })
 *  .catch(console.error);
 * ```
 *
 * Output:
 *
 * ```
 * {"source":"PerformanceNavigationTiming","os":"others","os_version":"","device_type":"pc","network":"4g","screen_direction":"","unload_time":0,"redirect_time":0,"dns_time":0,"tcp_time":0,"ssl_time":0,"response_time":2,"download_time":2,"first_paint_time":288,"first_contentful_paint_time":288,"dom_ready_time":0,"onload_time":0,"white_time":0,"render_time":0,"decoded_body_size":718,"encoded_body_size":718}
 * ```
 *
 * Results:
 *
 * | Attribute | Description | Type | Values |
 * | :------------ | :------------ | :------------ | :------------ |
 * | dns_time | DNS Lookup | number | domainLookupEnd - domainLookupStart |
 * | tcp_time | Connection Negotiation | number | connectEnd - connectStart |
 * | response_time | Requests and Responses | number | responseStart - requestStart |
 * | white_time | White Screen | number | responseStart - navigationStart |
 * | dom_ready_time | Dom Ready | number | domContentLoadedEventStart - navigationStart |
 * | onload_time | Onload | number | loadEventStart - navigationStart |
 * | render_time | EventEnd | number | loadEventEnd -navigationStart |
 * | unload_time | Unload | number | (Optional) unloadEventEnd - unloadEventStart |
 * | redirect_time | Redirect | number | (Optional) redirectEnd - redirectStart |
 * | ssl_time | SSL | number | (Optional) connectEnd - secureConnectionStart |
 * | download_time | Download | number | (Optional) responseEnd - responseStart |
 *
 * @param {boolean} camelCase -- false（默认） 以下划线形式返回数据 true 以驼峰形式返回数据
 * @returns {Promise<object>} 加载数据
 * @category Web Performance
 */
