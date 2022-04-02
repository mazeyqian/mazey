/**
 * @method calLongestCommonSubstring
 * @description 计算两个字符串的最长公共子串
 * @param {String} aStr 字符串
 * @param {String} bStr 字符串
 * @return {Number} 长度
 */
export declare function calLongestCommonSubstring(aStr: any, bStr: any): number;
/**
 * @method calLongestCommonSubsequence
 * @description 计算两个字符串的最长公共子序列
 * @param {String} aStr 字符串
 * @param {String} bStr 字符串
 * @return {Number} 长度
 */
export declare function calLongestCommonSubsequence(aStr: any, bStr: any): number;
/**
 * @method join
 * @description 将一系列值连接成固定字符分隔的字符串 123,456 => 123 - 456。
 * @param {String} joinStr 连接值的字符串。
 * @param {Rest} ...rest 需要连接的值 。
 * */
export declare function join(joinStr: any, ...rest: any[]): string;
/**
 * @method renderTable
 * @description 渲染表格
 * @param {DOM Object} tbID
 * @param {Array} data
 * @param {Array} property
 */
export declare function renderTable(tbID?: null, data?: never[], property?: never[]): void;
/**
 * @method getHashQueryParam
 * @description 获取地址栏 hash 后面的参数。
 * @param {String} param 获取参数的名字。
 */
export declare function getHashQueryParam(param: string): string | null;
/**
 * @method camelCaseToKebabCase
 * @description 驼峰转连接线。
 * @param {String} camelCase
 * */
export declare function camelCaseToKebabCase(camelCase: string): string;
/**
 * @method camelCase2Underscore
 * @description 驼峰转下划线。
 * @param {String} camelCase
 * */
export declare function camelCase2Underscore(camelCase: string): string;
/**
 * @method getDomain
 * @description 获取地址中的域名（及其他参数）。
 * @param {String} url
 * @param {Array} rules ['hostname', 'pathname'] = 'km.mazey.net/plugins/servlet/mobile'
 * */
export declare function getDomain({ url, rules }?: {
    url?: string | undefined;
    rules?: string[] | undefined;
}): string;
/**
 * @method trim
 * @description 去除左右空格。
 * @param {String} str 需要去除两边空格的字符串。
 * */
export declare function trim(str: string): string;
/**
 * @method newLine
 * @description html换行。
 * @param {String} str
 * */
export declare function newLine(str: string): string;
/**
 * @method deepCopyObject
 * @description 对象深拷贝。
 * @param {Object} obj 被拷贝的对象。
 * @return {Object}
 * */
export declare function deepCopyObject(obj: any): any;
/**
 * @method generateRndNum
 * @description 生成随机数 mGenerateRndNum(7) => 7658495。
 * @param {Number} n 随机数的长度
 * @return {String}
 * */
export declare function generateRndNum(n: number): string;
/**
 * @method generateUniqueNum
 * @description 根据时间生成唯一标志的数字 mGenerateUniqueNum() => 1538324722364123。
 * @param {Number} n 随机数的长度
 * */
export declare function generateUniqueNum(n: number): string;
/**
 * @method resetForm
 * @description 重置表单输入值为原始（空）状态。
 * @param {String} rest name1,name2,name3...NAME属性，可以多个。
 * */
export declare function resetForm(...rest: any[]): void;
/**
 * @method floatToPercent
 * @description 浮点数转为百分比 0.2 => 20%。
 * @param {Number} num 浮点数
 * @param {Number} fixSize 保留几位浮点数
 * */
export declare function floatToPercent(num: any, fixSize?: number): string;
/**
 * @method floatFixed
 * @description 浮点数保留指定位。
 * */
export declare function floatFixed(num: any, size: any): string;
/**
 * @method compatibleExist
 * @description 不存在返回 ——。
 * */
export declare function compatibleExist(instance: string, replaceStr: string): string;
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
export declare function throttle(func: any, wait: number, options: any): (...argRest: Array<any>) => null;
/**
 * @method debounce
 * @description 去抖。
 * */
export declare function debounce(func: any, wait: number, immediate: any): (...argRest: Array<any>) => null;
/**
 * @method friendlyInterval
 * @description 获取间隔时间。
 * @param {Number/Date} start 开始时间戳 1585325367122
 * @param {Number/Date} end 结束时间戳 1585325367122
 * @type {String} type 返回类型 d: 2(天) text: 2 天 4 时...
 * @return {String/Number} 取决于 type
 * */
export declare function friendlyInterval({ start, end, type }?: {
    start?: number | undefined;
    end?: number | undefined;
    type?: string | undefined;
}): any;
/**
 * @method isNumber
 * @description 判断是否有效数字
 * @param {Any} num 被判断的值
 * @param {Boolean} isNaNAsNumber 是否 NaN 算数字（默认不算）
 * @param {Boolean} isUnFiniteAsNumber 是否 无限 算数字（默认不算）
 * @return {Boolean} true 是数字
 */
export declare function isNumber(num: any, { isNaNAsNumber, isUnFiniteAsNumber }?: {
    isNaNAsNumber?: boolean | undefined;
    isUnFiniteAsNumber?: boolean | undefined;
}): boolean;
/**
 * @method updateQueryStringParameter
 * @description 替换或添加地址栏参数。
 * */
export declare function updateQueryStringParameter(uri: string, key: string, value: string): string;
/**
 * @method isJsonString
 * @description 判断是否合法 JSON 字符串。
 * */
export declare function isJsonString(str: string): boolean;
/**
 * @method getUrlParam
 * @description 链接参数
 * @param {String} sUrl 链接
 * @param {String} sKey 参数
 * */
export declare function getUrlParam(sUrl: string, sKey: string): any;
/**
 * @method getSearchQueryParam
 * @description 地址栏参数。
 * */
export declare function getSearchQueryParam(name: string): string | null;
/**
 * @method getQueryParam
 * @description 地址栏参数，getSearchQueryParam 的别名。
 * */
export declare function getQueryParam(name: string): string | null;
/**
 * @method doFn
 * @description 执行有效函数
 * @param {Function} fn 等待被执行的未知是否有效的函数
 * */
export declare function doFn(fn: any, ...params: any[]): any;
/**
 * @method setSessionStorage
 * @description 存储数据到 sessionStorage
 * @param {String} key 键
 * @param {String} value 值
 * */
export declare function setSessionStorage(key: string, value?: any): void;
/**
 * @method getSessionStorage
 * @description 存储数据到 sessionStorage
 * @param {String} key 键
 * @return {Any} 返回值
 * */
export declare function getSessionStorage(key: string): any;
/**
 * @method setLocalStorage
 * @description 存储数据到 localStorage
 * @param {String} key 键
 * @param {String} value 值
 * */
export declare function setLocalStorage(key: string, value?: any): void;
/**
 * @method getLocalStorage
 * @description 存储数据到 localStorage
 * @param {String} key 键
 * @return {Any} 返回值
 * */
export declare function getLocalStorage(key: string): any;
/**
 * @method loadCSS
 * @description 动态加载css文件
 * @param {String} url -- css资源路径
 * @param {String} id -- link标签id
 * @return {Promise<Boolean>} true -- 加载成功
 */
export declare function loadCSS({ url, id }?: {
    url?: string | undefined;
    id?: string | undefined;
}): Promise<unknown>;
/**
 * @method loadScript
 * @description 动态加载js文件
 * @param {String} url -- js资源路径
 * @param {String} id -- DOM ID
 * @param {Function} callback -- 加载后回调函数
 * @param {Number} timeout -- 超时时长
 * @param {Boolean} isDefer -- 是否添加 defer 标签
 * @return {Promise<Boolean>} -- true 成功
 */
export declare function loadScript({ url, id, callback, timeout, isDefer }?: {
    url?: string | undefined;
    id?: string | undefined;
    callback?: (() => void) | undefined;
    timeout?: number | undefined;
    isDefer?: boolean | undefined;
}): any;
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
export declare function getCookie(name: string): string | null;
/**
 * @method getPerformance
 * @description 获取页面加载相关的各项数据
 * @param {Boolean} camelCase -- true（默认） 以驼峰形式返回数据 false 以下划线形式返回数据
 * @return {Promise<Object>} 加载数据
 */
export declare function getPerformance({ camelCase }?: {
    camelCase?: boolean | undefined;
}): Promise<unknown>;
/**
 * @method inRate
 * @description 百分位概率
 * @param {Number} rate -- 0.1 ~ 1 => 1% ~ 100%
 * @return {Boolean} true 命中
 */
export declare function inRate(rate: number): boolean;
/**
 * @method isSafePWAEnv
 * @description 判断是否是安全的 PWA 环境
 * @return {Boolean} true 是
 */
export declare function isSafePWAEnv(): boolean;
/**
 * @method getBrowserType
 * @description 返回浏览器信息 https://github.com/JowayYoung/juejin-code/blob/master/browser-type.js
 * @return {Object} 浏览器信息
 */
export declare function getBrowserType(): any;
/**
 * @method clearHtml
 * @description 去除HTML标签
 * @param {String} string 带html标签的字符串
 * @return {String} 字符串
 */
export declare function clearHtml(string?: string): string;
/**
 * @method cutCHSString
 * @description 截取字符串，中文算2个字节
 * @param {String} str 要截取的字符串
 * @param {Number} len
 * @param {Boolean} hasDot
 * @returns {String} 返回截取后的字符串
 */
export declare function cutCHSString(str?: string, len?: number, hasDot?: boolean): string;
/**
 * @method windowLoaded
 * @description 页面加载完成
 * @param {Number} timeout 超时时间 / 单位：秒
 * @return {Promise<string>} document is loaded? 'complete' 'load' / 'timeout'
*/
export declare function windowLoaded({ timeout }?: {
    timeout?: number | undefined;
}): Promise<string>;
/**
 * @method addInlineStyle
 * @description 添加内联样式
 * @param {String} inlineStyle 内联样式字符串
 * @param {String} id <style> 标签的 ID
 * @return {Boolean} 添加成功/失败
*/
export declare function addInlineStyle({ inlineStyle, id }?: {
    inlineStyle?: string | undefined;
    id?: string | undefined;
}): boolean;
/**
 * @method customScrollBarForTransformEle
 * @description 为进行变换（transform）的元素设置滚动条
 * @param {String} containerClassName 进行变换（transform）的元素↓的容器（Father）的类名
 * @param {String} imgBoxClassName 图片的容器（transform It's YOU!）的类名
 * @param {String} imgBoxDom 图片的容器 Dom 对象
 * @param {String} imgClassName 图片的类名
 * @param {Object} imgDom 图片 Dom 对象
 * @param {String} action 操作类型 hide 隐藏指定 `containerClassName` 滚动条
 * @param {String} customStyle 滚动条的定制样式，会覆盖默认样式
 * @return {Boolean} 设置成功
*/
export declare function customScrollBarForTransformEle({ containerClassName, imgBoxClassName, imgBoxDom, imgClassName, imgDom, action, customStyle }?: {
    containerClassName?: string | undefined;
    imgBoxClassName?: string | undefined;
    imgBoxDom?: null | undefined;
    imgClassName?: string | undefined;
    imgDom?: null | undefined;
    action?: string | undefined;
    customStyle?: string | undefined;
}): boolean;
/**
 * @method calcContainImageSizeAndPosition
 * @description 计算适配容器宽度的图片的尺寸、距离顶部的距离。如果高度不足以占满容器，使其垂直居中；如果高度比容器长，由上向下铺开。
 * @param {Number} oriImageWidth 图片原始宽度
 * @param {Number} oriImageHeight 图片原始高度
 * @param {Number} viewportWidth 可视窗口宽度
 * @param {Number} viewportHeight 可视窗口高度
 * @return {Object} 结果 {"targetImageWidth":375,"targetImageHeight":375,"top":218.5,"wPer":1.25}
*/
export declare function calcContainImageSizeAndPosition({ oriImageWidth, oriImageHeight, viewportWidth, viewportHeight }?: {
    oriImageWidth?: number | undefined;
    oriImageHeight?: number | undefined;
    viewportWidth?: number | undefined;
    viewportHeight?: number | undefined;
}): any;
/**
 * @method genCustomConsole
 * @description 生成自定义控制台打印
 * @param {String} prefix 前缀
 * @param {Function} allowFn 允许打印的判断函数
 * @return {Object} 新实例
*/
export declare function genCustomConsole({ prefix }?: {
    prefix?: string | undefined;
}): any;
//# sourceMappingURL=index.d.ts.map