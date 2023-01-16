/**
 * @author: Mazey Chu
 */
/**
 * EN: Computes the longest common substring of two strings.
 *
 * ZH: 计算两个字符串的最长公共子串
 *
 * Usage:
 *
 * ```
 * calLongestCommonSubstring('fish', 'finish');
 * ```
 *
 * Output:
 *
 * ```
 * 3
 * ```
 *
 * @param {string} aStr String
 * @param {string} bStr String
 * @returns {number} Length
 */
export declare function calLongestCommonSubstring(aStr: string, bStr: string): number;
/**
 * EN: Computes the longest common subsequence of two strings.
 *
 * ZH: 计算两个字符串的最长公共子序列
 *
 * Usage:
 *
 * ```
 * calLongestCommonSubsequence('fish', 'finish');
 * ```
 *
 * Output:
 *
 * ```
 * 4
 * ```
 *
 * @param {string} aStr 字符串
 * @param {string} bStr 字符串
 * @returns {number} 长度
 */
export declare function calLongestCommonSubsequence(aStr: string, bStr: string): number;
/**
 * Get the query param's value of the current Web URL(`location.search`).
 *
 * ```
 * // http://example.com/?t1=1&t2=2&t3=3&t4=4#2333
 * // ?t1=1&t2=2&t3=3&t4=4
 * getQueryParam('t3'); // 3
 * getQueryParam('t4'); // 4
 * ```
 *
 * @param {string} param Query param.
 * @returns {string} value
 */
export declare function getQueryParam(param: string): string;
/**
 * Get the query param's value of the input URL.
 *
 * ```
 * getUrlParam('http://example.com/?t1=1&t2=2&t3=3&t4=4', 't3'); // 3
 * getUrlParam('http://example.com/?t1=1&t2=2&t3=3&t4=4', 't4'); // 4
 * ```
 *
 * @param {string} url URL string.
 * @param {string} param Query param.
 * @returns {string} value
 */
export declare function getUrlParam(url: string, param: string): string | string[];
/**
 * Update the query param's value of the input URL.
 *
 * Usage:
 *
 * ```
 * updateQueryParam('http://example.com/?t1=1&t2=2&t3=3&t4=4', 't3', 'three');
 * updateQueryParam('http://example.com/?t1=1&t2=2&t3=3&t4=4', 't4', 'four');
 * ```
 *
 * Output:
 *
 * ```
 * http://example.com/?t1=1&t2=2&t3=three&t4=4
 * http://example.com/?t1=1&t2=2&t3=3&t4=four
 * ```
 *
 * @param {string} url URL string.
 * @param {string} param Query param.
 * @param {string} value Param's value.
 * @returns {string} URL.
 */
export declare function updateQueryParam(url: string, param: string, value: string): string;
/**
 * Get the hash query param's value of the current Web URL(`location.hash`).
 *
 * Usage:
 *
 * ```
 * // http://example.com/?#2333?t1=1&t2=2&t3=3&t4=4
 * // #2333?t1=1&t2=2&t3=3&t4=4
 * getHashQueryParam('t3');
 * getHashQueryParam('t4');
 * ```
 *
 * Output:
 *
 * ```
 * 3
 * 4
 * ```
 *
 * @param {string} param Query param.
 * @returns {string} value
 */
export declare function getHashQueryParam(param: string): string;
/**
 * Get the domain of URL, and other params.
 *
 * Usage:
 *
 * ```
 * getDomain('http://example.com/?t1=1&t2=2&t3=3&t4=4');
 * getDomain('http://example.com/test/thanks?t1=1&t2=2&t3=3&t4=4', ['hostname', 'pathname']);
 * ```
 *
 * Output:
 *
 * ```
 * example.com
 * example.com/test/thanks
 * ```
 *
 * @param {string} url
 * @param {array} rules Object.keys(location), ['href', 'protocol', 'host', 'hostname', 'port', 'pathname', 'search', 'hash'], ['hostname', 'pathname'] = 'km.mazey.net/plugins/servlet/mobile'
 */
export declare function getDomain(url: string, rules?: string[]): string;
/**
 * Transfer CamelCase to KebabCase.
 *
 * ```
 * camelCaseToKebabCase('ABC'); // a-b-c
 * camelCaseToKebabCase('aBC'); // a-b-c
 * ```
 *
 * @param {string} camelCase 'aBC' or 'ABC'
 * @returns {string} 'a-b-c'
 */
export declare function camelCaseToKebabCase(camelCase: string): string;
/**
 * Transfer CamelCase to Underscore.
 *
 * ```
 * camelCase2Underscore('ABC'); // a_b_c
 * camelCase2Underscore('aBC'); // a_b_c
 * ```
 *
 * @param {string} camelCase 'aBC' or 'ABC'
 * @returns {string} 'a_b_c'
 */
export declare function camelCase2Underscore(camelCase: string): string;
/**
 * Remove leading and trailing whitespace or specified characters from string.
 *
 * ```
 * mTrim(' 1 2 3 '); // '1 2 3'
 * mTrim('abc '); // 'abc'
 * ```
 *
 * @param {string} str The string to trim.
 * @returns {string} Trimmed string.
 */
export declare function mTrim(str: string): string;
/**
 * @method newLine
 * @description Make a newline of HTML.
 * @param {string} str The string to make a newline.
 * @returns {string} A newline with `br`.
 */
export declare function newLine(str: string): string;
/**
 * Clone Object deeply.
 *
 * Usage:
 *
 * ```
 * deepCopyObject(['a', 'b', 'c']);
 * deepCopyObject('abc');
 * ```
 *
 * Output:
 *
 * ```
 * ['a', 'b', 'c']
 * 'abc'
 * ```
 *
 * @param {object} obj The value to clone.
 * @returns {object} Returns the deep cloned value.
 */
export declare function deepCopyObject(obj: any): any;
/**
 * Check whether it is a valid JSON string.
 *
 * Usage:
 *
 * ```
 * isJsonString(`['a', 'b', 'c']`);
 * isJsonString(`["a", "b", "c"]`);
 * ```
 *
 * Output:
 *
 * ```
 * false
 * true
 * ```
 */
export declare function isJsonString(str: string): boolean;
/**
 * @method generateRndNum
 * @description Produce a random string of number, `generateRndNum(7)` => '7658495'.
 * @param {number} n Length
 * @returns {string} Return the random string.
 */
export declare function generateRndNum(n?: number): string;
/**
 * @method generateUniqueNum
 * @description 根据时间生成唯一标志的数字 mGenerateUniqueNum() => 1538324722364123。
 * @param {number} n 随机数的长度
 */
export declare function generateUniqueNum(n?: number): string;
/**
 * @method floatToPercent
 * @description 浮点数转为百分比 0.2 => 20%。
 * @param {number} num 浮点数
 * @param {number} fixSize 保留几位浮点数
 */
export declare function floatToPercent(num: number, fixSize?: number): string;
/**
 * @method floatFixed
 * @description 浮点数保留指定位。
 */
export declare function floatFixed(num: string, size?: number): string;
/**
 * @method cancelBubble
 * @description 阻止冒泡。
 */
export declare function cancelBubble(e: any): void;
/**
 * @method hasClass
 */
export declare function hasClass(obj: any, cls: string): boolean;
/**
 * @method addClass
 */
export declare function addClass(obj: any, cls: string): void;
/**
 * @method removeClass
 */
export declare function removeClass(obj: any, cls: string): void;
/**
 * EN: Throttle
 *
 * ZH: 节流
 *
 * ```
 * const foo = throttle(() => {
 *   console.log('The function will be invoked at most once per every wait 1000 milliseconds.');
 * }, 1000, { leading: true });
 * ```
 *
 * Reference: [Lodash](https://lodash.com/docs/4.17.15#throttle)
 */
export declare function throttle(func: any, wait: number, options?: {
    leading?: boolean;
    trailing?: boolean;
}): any;
/**
 * EN: Debounce
 *
 * ZH: 去抖
 *
 * ```
 * const foo = debounce(() => {
 *   console.log('The debounced function will only be invoked in 1000 milliseconds, the other invoking will disappear during the wait time.');
 * }, 1000, true);
 * ```
 */
export declare function debounce(func: any, wait: number, immediate?: any): any;
/**
 * @method friendlyInterval
 * @description 获取间隔时间。
 * @param {number/Date} start 开始时间戳 1585325367122
 * @param {number/Date} end 结束时间戳 1585325367122
 * @param {string} options.type 返回类型 d: 2(天) text: 2 天 4 时...
 * @returns {string/number} 取决于 type
 */
export declare function friendlyInterval(start?: number, end?: number, options?: {
    type?: string;
}): number | string;
/**
 * EN: Check whether it is a right number.
 *
 * ZH: 判断是否有效数字
 *
 * ```
 * isNumber(123); // true
 * isNumber('123'); // false
 * // Default: NaN, Infinity is not Number
 * isNumber(Infinity); // false
 * isNumber(Infinity, { isUnFiniteAsNumber: true }); // true
 * isNumber(NaN); // false
 * isNumber(NaN, { isNaNAsNumber: true, isUnFiniteAsNumber: true }); // true
 * ```
 *
 * @param {*} num 被判断的值
 * @param {boolean} options.isNaNAsNumber 是否 NaN 算数字（默认不算）
 * @param {boolean} options.isUnFiniteAsNumber 是否 无限 算数字（默认不算）
 * @returns {boolean} true 是数字
 */
export declare function isNumber(num: any, options?: {
    isNaNAsNumber?: boolean;
    isUnFiniteAsNumber?: boolean;
}): boolean;
/**
 * @method doFn
 * @description 执行有效函数
 * @param {function} fn 等待被执行的未知是否有效的函数
 */
export declare function doFn(fn: any, ...params: any[]): any;
/**
 * @method setSessionStorage
 * @description 存储数据到 sessionStorage
 * @param {string} key 键
 * @param {string} value 值
 */
export declare function setSessionStorage(key: string, value?: any): void;
/**
 * @method getSessionStorage
 * @description 存储数据到 sessionStorage
 * @param {string} key 键
 * @returns {*} 返回值
 */
export declare function getSessionStorage(key: string): any;
/**
 * @method setLocalStorage
 * @description 存储数据到 localStorage
 * @param {string} key 键
 * @param {string} value 值
 */
export declare function setLocalStorage(key: string, value?: any): void;
/**
 * @method getLocalStorage
 * @description 存储数据到 localStorage
 * @param {string} key 键
 * @returns {*} 返回值
 */
export declare function getLocalStorage(key: string): any;
/**
 * EN: Load a CSS file from the server.
 *
 * ZH: 动态加载 CSS 文件
 *
 * ```
 * loadCSS(
 *     'http://example.com/css/mazey-base.css',
 *     {
 *       id: 'iamid', // Optional, link ID, default none
 *     }
 *   )
 *   .then(
 *     res => {
 *       console.log(`Load CSS Success: ${res}`);
 *     }
 *   )
 *   .catch(
 *     err => {
 *       console.error(`Load CSS Fail: ${err.message}`)
 *     }
 *   );
 * ```
 *
 * @param {string} url -- css资源路径
 * @param {string} options.id -- link标签id
 * @returns {Promise<boolean>} true -- 加载成功
 */
export declare function loadCSS(url: string, options?: {
    id?: string;
}): Promise<boolean | Error | any>;
/**
 * EN: Load a JavaScript file from the server and execute it.
 *
 * ZH: 动态加载 JavaScript 文件
 *
 * ```
 * loadScript(
 *     'http://example.com/static/js/plugin-2.1.1.min.js',
 *     {
 *       id: 'iamid', // (Optional) script ID, default none
 *       timeout: 5000, // (Optional) timeout, default `5000`
 *       isDefer: false, // (Optional) defer, default `false`
 *     }
 *   )
 *   .then(
 *     res => {
 *       console.log(`Load JavaScript script: ${res}`);
 *     }
 *   )
 *   .catch(
 *     err => {
 *       console.error(`Load JavaScript script: ${err.message}`)
 *     }
 *   );
 * ```
 *
 * @param {string} url -- JavaScript 资源路径
 * @param {string} options.id -- DOM ID
 * @param {function} options.callback -- 加载后回调函数
 * @param {number} options.timeout -- 超时时长
 * @param {boolean} options.isDefer -- 是否添加 defer 标签
 * @returns {Promise<boolean>} -- true 成功
 */
export declare function loadScript(url: string, options?: {
    id?: string;
    callback?: (...params: any[]) => any;
    timeout?: number;
    isDefer?: boolean;
}): Promise<boolean | string | Error>;
/**
 * @method mNow
 * @description 获取时间戳
 */
export declare function mNow(): number;
/**
 * @method setCookie
 * @description 设置 Cookie
 */
export declare function setCookie(name: string, value: string, days: number, domain: string): void;
/**
 * @method getCookie
 * @description 获取 Cookie
 */
export declare function getCookie(name: string): string;
interface WebPerformance {
    [key: string]: string | number;
}
/**
 * EN: Get page load time(PerformanceTiming).
 *
 * ZH: 获取页面加载相关的各项数据
 *
 * Usage:
 *
 * ```
 * // `camelCase：true`(Default) Return hump data.
 * // `camelCase：false` Return underline data.
 * getPerformance(true)
 *  .then(res => {
 *   console.log(JSON.stringify(res));
 *  })
 *  .catch(console.error);
 * ```
 *
 * Output:
 *
 * ```
 * {"deviceType":"pc","network":"3g","unloadTime":0,"redirectTime":0,"dnsTime":0,"tcpTime":0,"responseTime":65,"downloadTime":1,"domreadyTime":369,"onloadTime":441,"whiteTime":94,"renderTime":441,"decodedBodySize":210,"encodedBodySize":210}
 * ```
 *
 * Results:
 *
 * | Index | Field | Description |
 * | --- | --- | --- |
 * | DNS lookup | dns_time | domainLookupEnd - domainLookupStart |
 * | Connection negotiation | tcp_time | connectEnd - connectStart |
 * | Requests and responses | response_time | responseStart - requestStart |
 * | White screen | white_time | responseStart - navigationStart |
 * | DomReady | domready_time  | domContentLoadedEventStart - navigationStart |
 * | Onload | onload_time | loadEventStart - navigationStart |
 * | EventEnd | render_time | loadEventEnd -navigationStart |
 * | Unload | unload_time | (Optional) unloadEventEnd - unloadEventStart |
 * | Redirect | redirect_time | (Optional) redirectEnd - redirectStart |
 * | SSL | ssl_time | (Optional) connectEnd - secureConnectionStart |
 * | Download | download_time | (Optional) responseEnd - responseStart |
 *
 * @param {boolean} camelCase -- true（默认） 以驼峰形式返回数据 false 以下划线形式返回数据
 * @returns {Promise<object>} 加载数据
 */
export declare function getPerformance(camelCase?: boolean): Promise<WebPerformance | Error>;
/**
 * EN: Hit probability (1% ~ 100%).
 *
 * ZH: 百分位概率
 *
 * Usage:
 *
 * ```
 * inRate(0.5); // 0.01 ~ 1 true/false
 * ```
 *
 * Output:
 *
 * ```
 * true
 * ```
 *
 * Example: Test the precision.
 *
 * ```
 * // Test
 * let trueCount = 0;
 * let falseCount = 0;
 * new Array(1000000).fill(0).forEach(() => {
 *   if (inRate(0.5)) {
 *     trueCount++;
 *   } else {
 *     falseCount++;
 *   }
 * });
 * console.log(trueCount, falseCount); // 499994 500006
 * ```
 *
 * @param {number} rate -- 0.1 ~ 1 => 1% ~ 100%
 * @returns {boolean} true 命中
 */
export declare function inRate(rate: number): boolean;
/**
 * EN: Determine if it is a secure PWA environment that it can run.
 *
 * ZH: 判断是否是安全的 PWA 环境
 *
 * Usage:
 *
 * ```
 * isSafePWAEnv();
 * ```
 *
 * Output:
 *
 * ```
 * true
 * ```
 *
 * @returns {boolean} true 是
 */
export declare function isSafePWAEnv(): boolean;
/**
 * EN: Browser Information
 *
 * ZH: 返回浏览器信息 https://github.com/JowayYoung/juejin-code/blob/master/browser-type.js
 *
 * Usage:
 *
 * ```
 * getBrowserInfo();
 * ```
 *
 * Output:
 *
 * ```
 * {"engine":"webkit","engineVs":"537.36","platform":"desktop","supporter":"chrome","supporterVs":"85.0.4183.121","system":"windows","systemVs":"10"}
 * ```
 *
 * Results:
 *
 * | Index | Field | Description |
 * | --- | --- | --- |
 * | System | system | android, ios, windows, macos, linux |
 * | System version | systemVs | windows: 2000, xp, 2003, vista, 7, 8, 8.1, 10 <br />macos: ... |
 * | Platform | platform | desktop, mobile |
 * | Engine | engine | webkit, gecko, presto, trident |
 * | Engine version | engineVs | - |
 * | Supporter | supporter | edge, opera, chrome, safari, firefox, iexplore |
 * | Supporter version | supporterVs | - |
 * | Shell | shell | (Optional) wechat, qq_browser, qq_app, uc, 360, 2345, sougou, liebao, maxthon, bilibili |
 * | Shell version | shellVs | (Optional) 20/... |
 * | Apple device type | appleType | (Optional) iphone, ipad, ipod, iwatch |
 *
 * Example: Determine the environment of the mobile QQ.
 *
 * ```
 * const { system, shell } = getBrowserInfo();
 * const isMobileQQ = ['android', 'ios'].includes(system) && ['qq_browser', 'qq_app'].includes(shell);
 * ```
 *
 * @returns 浏览器信息
 */
export declare function getBrowserInfo(): {
    engine: string;
    engineVs: string;
    platform: string;
    supporter: string;
    supporterVs: string;
    system: string;
    systemVs: string;
    shell?: string;
    shellVs?: string;
    appleType?: string;
};
/**
 * @method clearHtml
 * @description 去除HTML标签
 * @param {string} str 带html标签的字符串
 * @returns {string} 字符串
 */
export declare function clearHtml(str: string): string;
/**
 * @method cutCHSString
 * @description 截取字符串，中文算2个字节
 * @param {string} str 要截取的字符串
 * @param {number} len
 * @param {boolean} hasDot
 * @returnss {string} 返回截取后的字符串
 */
export declare function cutCHSString(str: string, len: number, hasDot?: boolean): string;
/**
 * EN: Check whether the page is loaded successfully (Keepe the compatibility in case that browser's `load` event has been triggered).
 *
 * ZH: 页面加载完成
 *
 * ```
 * windowLoaded(30) // second
 *   .then(res => {
 *     console.log(`Load Success: ${res}`); // Load Success: load
 *   })
 *   .catch(err => {
 *     console.log(`Load Timeout or Fail: ${err.message}`);
 *   });
 * ```
 *
 * @param {number} timeout 超时时间 / 单位：秒
 * @returns {Promise<string>} document is loaded? 'complete' 'load' / 'timeout'
 */
export declare function windowLoaded(timeout?: number): Promise<string | Error>;
/**
 * EN: Add `<style>` in `<head>`.
 *
 * ZH: 添加样式标签; style: 样式标签内的字符串; id: `<style>` 标签的 `id`; 返回: 添加成功/失败.
 *
 * Example 1: Add the `<style>` with `id`, and repeated invoking will update the content instead of adding a new one.
 *
 * ```
 * addStyle(
 *   `
 *     body {
 *       background-color: #333;
 *     }
 *   `,
 *   {
 *     id: 'test',
 *   }
 * );
 * // <style id="test">
 * //   body {
 * //     background-color: #333;
 * //   }
 * // </style>
 * ```
 *
 * Example 2: Add the `<style>` without `id`, and repeated invoking will adding a new one.
 *
 * ```
 * addStyle(
 *   `
 *     body {
 *       background-color: #333;
 *     }
 *   `
 * );
 * // <style>
 * //   body {
 * //     background-color: #333;
 * //   }
 * // </style>
 * ```
 *
 * @param style Style string.
 * @param options.id `id` in `<style>`
 * @returns Success/Fail
 */
export declare function addStyle(style: string, options?: {
    id?: string;
}): boolean;
/**
 * EN: Custom console printing (`console`).
 *
 * ZH: 生成自定义控制台打印
 *
 * Usage:
 *
 * ```
 * const myConsole = genCustomConsole('MazeyLog:');
 * myConsole.log('I am string.');
 * myConsole.info('I am boolean.', true);
 * myConsole.info('I am number.', 123, 456);
 * myConsole.info('I am object.', { a: 123, b: 456});
 * ```
 *
 * Output:
 *
 * ```
 * MazeyLog: I am string.
 * MazeyLog: I am boolean. true
 * MazeyLog: I am number. 123 456
 * MazeyLog: I am object. {a: 123, b: 456}
 * ```
 *
 * @param {string} prefix 前缀
 * @param {string} locales A locale string.
 * @param {function} logFn The function with Log.
 * @param {function} errorFn The function with Error.
 * @returns {object} 新实例
 */
export declare function genCustomConsole(prefix?: string, options?: {
    isClosed?: boolean;
    showWrap?: boolean;
    showDate?: boolean;
    locales?: string;
    logFn?: () => void;
    errorFn?: () => void;
}): Console;
/**
 * Verify the validity of axios response.
 *
 * Reference: [Handling Errors](https://axios-http.com/docs/handling_errors)
 */
export declare function zAxiosIsValidRes(res: any, options?: {
    validStatusRange?: number[];
    validCode?: number[];
}): boolean;
/**
 * Verify the validity of a non-empty array.
 */
export declare function isNonEmptyArray(arr: any[]): boolean;
/**
 * Determine the validity of the data.
 *
 * Usage:
 *
 * ```
 * const validData = {
 *   a: {
 *     b: {
 *       c: 413
 *     }
 *   }
 * };
 *
 * const isValidDataResA = isValidData(validData, ['a', 'b', 'c'], 2333);
 * const isValidDataResB = isValidData(validData, ['a', 'b', 'c'], 413);
 * const isValidDataResC = isValidData(validData, ['d', 'd'], 413);
 *
 * console.log('isValidDataResA:', isValidDataResA);
 * console.log('isValidDataResB:', isValidDataResB);
 * console.log('isValidDataResC:', isValidDataResC);
 * ```
 *
 * Output:
 *
 * ```
 * isValidDataResA: false
 * isValidDataResB: true
 * isValidDataResC: false
 * ```
 *
 * @param {any} data Original Data
 * @param {string[]} attributes Data Attributes
 * @param {any} validValue Given Value for verifying.
 * @returns {boolean} Return TRUE if the data is valid.
 */
export declare function isValidData(data: any, attributes: string[], validValue: any): boolean;
/**
 * 语义化文件大小, 把字节转换成正常文件大小.
 */
export declare function getFileSize(size: number): string;
/**
 * Detect webp support.
 *
 * Reference: [Detect WEBP Support with JavaScript](https://davidwalsh.name/detect-webp)
 */
export declare function isSupportWebp(): Promise<boolean>;
/**
 * Generate a Hash Code from a string.
 *
 * Reference: [Generate a Hash from string in Javascript](https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript-jquery)
 */
export declare function genHashCode(str: string): number;
/**
 * Return the formatted date string in the given format.
 *
 * Usage:
 *
 * ```
 * console.log('Default formatDate value:', formatDate());
 * console.log('String formatDate value:', formatDate('Tue Jan 11 2022 14:12:26 GMT+0800 (China Standard Time)', 'yyyy-MM-dd hh:mm:ss'));
 * console.log('Number formatDate value:', formatDate(1641881235000, 'yyyy-MM-dd hh:mm:ss'));
 * console.log('Date formatDate value:', formatDate(new Date(2014, 1, 11), 'MM/dd/yyyy'));
 * ```
 *
 * Output:
 *
 * ```
 * Default formatDate value: 2023-01-11
 * String formatDate value: 2022-01-11 14:12:26
 * Number formatDate value: 2022-01-11 14:07:15
 * Date formatDate value: 02/11/2014
 * ```
 *
 * @param {Date|number|string} dateIns Original Date
 * @param {string} format Format String
 * @returns {string} Return the formatted date string.
 */
export declare function formatDate(dateIns?: Date | number | string, format?: string): string;
export {};
//# sourceMappingURL=index.d.ts.map