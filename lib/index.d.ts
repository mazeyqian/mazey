/**
 * @method calLongestCommonSubstring
 * @description Computes the longest common substring of two strings.
 * @param {string} aStr String
 * @param {string} bStr String
 * @return {number} Length
 */
export declare function calLongestCommonSubstring(aStr?: string, bStr?: string): number;
/**
 * @method calLongestCommonSubsequence
 * @description 计算两个字符串的最长公共子序列
 * @param {string} aStr 字符串
 * @param {string} bStr 字符串
 * @return {number} 长度
 */
export declare function calLongestCommonSubsequence(aStr?: string, bStr?: string): number;
/**
 * @method getQueryParam
 * @description Get the query param's value of the current Web URL(`location.search`).
 * @param {string} param Query param.
 * @return {string} value
 * */
export declare function getQueryParam(param?: string): string;
/**
 * @method getUrlParam
 * @description Get the query param's value of the input URL.
 * @param {string} url URL string.
 * @param {string} param Query param.
 * @return {string} value
 * */
export declare function getUrlParam(url?: string, param?: string): string;
/**
 * @method updateQueryParam
 * @description Update the query param's value of the input URL.
 * @param {string} url URL string.
 * @param {string} param Query param.
 * @param {string} value Param's value.
 * @return {string} URL.
 * */
export declare function updateQueryParam(url?: string, param?: string, value?: string): string;
/**
 * @method getHashQueryParam
 * @description Get the hash query param's value of the current Web URL(`location.hash`).
 * @param {string} param Query param.
 * @return {string} value
 */
export declare function getHashQueryParam(param?: string): string;
/**
 * @method getDomain
 * @description Get the domain of URL, and other params.
 * @param {string} url
 * @param {array} rules Object.keys(location), ['href', 'protocol', 'host', 'hostname', 'port', 'pathname', 'search', 'hash'], ['hostname', 'pathname'] = 'km.mazey.net/plugins/servlet/mobile'
 * */
export declare function getDomain(url?: string, rules?: string[]): string;
/**
 * @method camelCaseToKebabCase
 * @description Transfer CamelCase to KebabCase.
 * @param {string} camelCase 'aBC' or 'ABC'
 * @return {string} 'a-b-c'
 * */
export declare function camelCaseToKebabCase(camelCase?: string): string;
/**
 * @method camelCase2Underscore
 * @description Transfer CamelCase to Underscore.
 * @param {string} camelCase 'aBC' or 'ABC'
 * @return {string} 'a_b_c'
 * */
export declare function camelCase2Underscore(camelCase?: string): string;
/**
 * @method mTrim
 * @description Remove leading and trailing whitespace or specified characters from string.
 * @param {string} str The string to trim.
 * @return {string} Trimmed string.
 * */
export declare function mTrim(str?: string): string;
/**
 * @method newLine
 * @description Make a newline of HTML.
 * @param {string} str The string to make a newline.
 * @return {string} A newline with `<br />`.
 * */
export declare function newLine(str?: string): string;
/**
 * @method deepCopyObject
 * @description Clone Object deeply.
 * @param {object} obj The value to clone.
 * @return {object} Returns the deep cloned value.
 * */
export declare function deepCopyObject(obj: any): any;
/**
 * @method isJsonString
 * @description Check whether it is a valid JSON string.
 * @param {string} str The string to check.
 * @return {boolean} Return the result of checking.
 * */
export declare function isJsonString(str?: string): boolean;
/**
 * @method generateRndNum
 * @description Produce a random string of number, `generateRndNum(7)` => '7658495'.
 * @param {number} n Length
 * @return {string} Return the random string.
 * */
export declare function generateRndNum(n?: number): string;
/**
 * @method generateUniqueNum
 * @description 根据时间生成唯一标志的数字 mGenerateUniqueNum() => 1538324722364123。
 * @param {number} n 随机数的长度
 * */
export declare function generateUniqueNum(n?: number): string;
/**
 * @method floatToPercent
 * @description 浮点数转为百分比 0.2 => 20%。
 * @param {number} num 浮点数
 * @param {number} fixSize 保留几位浮点数
 * */
export declare function floatToPercent(num?: number, fixSize?: number): string;
/**
 * @method floatFixed
 * @description 浮点数保留指定位。
 * */
export declare function floatFixed(num: string, size?: number): string;
/**
 * @method cancelBubble
 * @description 阻止冒泡。
 * */
export declare function cancelBubble(e: any): void;
/**
 * @method hasClass
 * */
export declare function hasClass(obj: any, cls: string): boolean;
/**
 * @method addClass
 * */
export declare function addClass(obj: any, cls: string): void;
/**
 * @method removeClass
 * */
export declare function removeClass(obj: any, cls: string): void;
/**
 * @method throttle
 * @description 节流。
 * */
export declare function throttle(func: any, wait: number, options: any): any;
/**
 * @method debounce
 * @description 去抖。
 * */
export declare function debounce(func: any, wait: number, immediate: any): any;
/**
 * @method friendlyInterval
 * @description 获取间隔时间。
 * @param {number/Date} start 开始时间戳 1585325367122
 * @param {number/Date} end 结束时间戳 1585325367122
 * @type {string} type 返回类型 d: 2(天) text: 2 天 4 时...
 * @return {String/number} 取决于 type
 * */
export declare function friendlyInterval(start?: number, end?: number, { type }?: {
    type?: string | undefined;
}): number | string;
/**
 * @method isNumber
 * @description 判断是否有效数字
 * @param {*} num 被判断的值
 * @param {boolean} isNaNAsNumber 是否 NaN 算数字（默认不算）
 * @param {boolean} isUnFiniteAsNumber 是否 无限 算数字（默认不算）
 * @return {boolean} true 是数字
 */
export declare function isNumber(num: any, { isNaNAsNumber, isUnFiniteAsNumber }?: {
    isNaNAsNumber?: boolean | undefined;
    isUnFiniteAsNumber?: boolean | undefined;
}): boolean;
/**
 * @method doFn
 * @description 执行有效函数
 * @param {function} fn 等待被执行的未知是否有效的函数
 * */
export declare function doFn(fn: any, ...params: any[]): any;
/**
 * @method setSessionStorage
 * @description 存储数据到 sessionStorage
 * @param {string} key 键
 * @param {string} value 值
 * */
export declare function setSessionStorage(key: string, value?: any): void;
/**
 * @method getSessionStorage
 * @description 存储数据到 sessionStorage
 * @param {string} key 键
 * @return {*} 返回值
 * */
export declare function getSessionStorage(key: string): any;
/**
 * @method setLocalStorage
 * @description 存储数据到 localStorage
 * @param {string} key 键
 * @param {string} value 值
 * */
export declare function setLocalStorage(key: string, value?: any): void;
/**
 * @method getLocalStorage
 * @description 存储数据到 localStorage
 * @param {string} key 键
 * @return {*} 返回值
 * */
export declare function getLocalStorage(key: string): any;
/**
 * @method loadCSS
 * @description 动态加载css文件
 * @param {string} url -- css资源路径
 * @param {string} id -- link标签id
 * @return {Promise<boolean>} true -- 加载成功
 */
export declare function loadCSS(url?: string, { id }?: {
    id?: string | undefined;
}): Promise<any>;
/**
 * @method loadScript
 * @description 动态加载js文件
 * @param {string} url -- js资源路径
 * @param {string} id -- DOM ID
 * @param {function} callback -- 加载后回调函数
 * @param {number} timeout -- 超时时长
 * @param {boolean} isDefer -- 是否添加 defer 标签
 * @return {Promise<boolean>} -- true 成功
 */
export declare function loadScript(url?: string, { id, callback, timeout, isDefer }?: {
    id?: string | undefined;
    callback?: (() => void) | undefined;
    timeout?: number | undefined;
    isDefer?: boolean | undefined;
}): Promise<any>;
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
/**
 * @method getPerformance
 * @description 获取页面加载相关的各项数据
 * @param {boolean} camelCase -- true（默认） 以驼峰形式返回数据 false 以下划线形式返回数据
 * @return {Promise<object>} 加载数据
 */
export declare function getPerformance(camelCase?: boolean): Promise<any>;
/**
 * @method inRate
 * @description 百分位概率
 * @param {number} rate -- 0.1 ~ 1 => 1% ~ 100%
 * @return {boolean} true 命中
 */
export declare function inRate(rate: number): boolean;
/**
 * @method isSafePWAEnv
 * @description 判断是否是安全的 PWA 环境
 * @return {boolean} true 是
 */
export declare function isSafePWAEnv(): boolean;
/**
 * @method getBrowserInfo
 * @description 返回浏览器信息 https://github.com/JowayYoung/juejin-code/blob/master/browser-type.js
 * @return {object} 浏览器信息
 */
export declare function getBrowserInfo(): any;
/**
 * @method clearHtml
 * @description 去除HTML标签
 * @param {string} string 带html标签的字符串
 * @return {string} 字符串
 */
export declare function clearHtml(string?: string): string;
/**
 * @method cutCHSString
 * @description 截取字符串，中文算2个字节
 * @param {string} str 要截取的字符串
 * @param {number} len
 * @param {boolean} hasDot
 * @returns {string} 返回截取后的字符串
 */
export declare function cutCHSString(str?: string, len?: number, hasDot?: boolean): string;
/**
 * @method windowLoaded
 * @description 页面加载完成
 * @param {number} timeout 超时时间 / 单位：秒
 * @return {Promise<string>} document is loaded? 'complete' 'load' / 'timeout'
*/
export declare function windowLoaded(timeout?: number): Promise<string>;
/**
 * @method addInlineStyle
 * @description 添加内联样式
 * @param {string} inlineStyle 内联样式字符串
 * @param {string} id <style> 标签的 ID
 * @return {boolean} 添加成功/失败
*/
export declare function addInlineStyle(inlineStyle?: string, { id }?: {
    id?: string | undefined;
}): boolean;
/**
 * @method genCustomConsole
 * @description 生成自定义控制台打印
 * @param {string} prefix 前缀
 * @param {function} allowFn 允许打印的判断函数
 * @return {object} 新实例
*/
export declare function genCustomConsole(prefix?: string): any;
//# sourceMappingURL=index.d.ts.map