/**
 * EN: Get page load time(PerformanceTiming).
 * 
 * ZH: 获取页面加载相关的各项数据
 * 
 * Usage:
 * 
 * ```
 * // `camelCase：false` (Default) Return underline data.
 * // `camelCase：true` Return hump data.
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
 * {"os":"ios","os_version":"13_2_3","device_type":"phone","network":"4g","unload_time":0,"redirect_time":0,"dns_time":0,"tcp_time":0,"response_time":289,"download_time":762,"first_paint_time":469,"first_contentful_paint_time":469,"domready_time":1318,"onload_time":2767,"white_time":299,"render_time":2768,"decoded_body_size":979570,"encoded_body_size":324938}
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
 * | domready_time | DomReady | number | domContentLoadedEventStart - navigationStart |
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