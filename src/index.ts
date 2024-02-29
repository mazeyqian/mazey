/**
 * @author Cheng
 */
// eslint-disable-next-line spaced-comment
/// <reference path="../global.d.ts" />

import {
  BrowserInfo,
  DefineListeners,
  TestUa,
  TestVs,
  // UrlParams,
  ThrottleFunc,
  DebounceFunc,
  IsNumberOptions,
  AnyFunction,
  ZResResponse,
  ZResIsValidResOptions,
  RepeatUntilOptions,
  LoadScriptReturns,
  SimpleType,
  // SimpleObject,
  UnknownFnParams,
  UnknownFnReturn,
  UnknownObject,
  UnknownFn,
  UnknownWindow,
} from './typing';

export * from './calc';
export * from './util';
export * from './url';

/**
 * Transfer CamelCase to KebabCase.
 *
 * Usage:
 *
 * ```javascript
 * const ret1 = convertCamelToKebab('ABC');
 * const ret2 = convertCamelToKebab('aBC');
 * console.log(ret1);
 * console.log(ret2);
 * ```
 *
 * Output:
 *
 * ```text
 * a-b-c
 * a-b-c
 * ```
 *
 * @param {string} camelCase 'aBC' or 'ABC'
 * @returns {string} 'a-b-c'
 * @category Util
 */
export function convertCamelToKebab(camelCase: string): string {
  const kebabCase = camelCase.replace(/([A-Z])/g, '-$1').toLowerCase();
  return kebabCase[0] === '-' ? kebabCase.substring(1) : kebabCase;
}

/**
 * Alias of `convertCamelToKebab`
 *
 * @hidden
 */
export function camelCaseToKebabCase(camelCase: string): string {
  return convertCamelToKebab(camelCase);
}

/**
 * Transfer CamelCase to Underscore.
 *
 * Usage:
 *
 * ```javascript
 * const ret1 = convertCamelToUnder('ABC');
 * const ret2 = convertCamelToUnder('aBC');
 * console.log(ret1);
 * console.log(ret2);
 * ```
 *
 * Output:
 *
 * ```text
 * a_b_c
 * a_b_c
 * ```
 *
 * @param {string} camelCase 'aBC' or 'ABC'
 * @returns {string} 'a_b_c'
 * @category Util
 */
export function convertCamelToUnder(camelCase: string): string {
  const kebabCase = camelCase.replace(/([A-Z])/g, '_$1').toLowerCase();
  return kebabCase[0] === '_' ? kebabCase.substring(1) : kebabCase;
}

/**
 * Alias of `convertCamelToUnder`
 *
 * @hidden
 */
export function camelCase2Underscore(camelCase: string): string {
  return convertCamelToUnder(camelCase);
}

/**
 * Remove leading and trailing whitespace or specified characters from string.
 *
 * Note: This method is used to replace the native `String.prototype.trim()`. But it is not necessary to use it in modern browsers.
 *
 * Usage:
 *
 * ```javascript
 * const ret1 = mTrim(' 1 2 3 ');
 * const ret2 = mTrim('abc ');
 * console.log(ret1);
 * console.log(ret2);
 * ```
 *
 * Output:
 *
 * ```text
 * 1 2 3
 * abc
 * ```
 *
 * @param {string} str The string to trim.
 * @returns {string} Trimmed string.
 * @category Util
 * @hidden
 */
export function mTrim(str: string): string {
  str = str.replace(/^\s+/, ''); // 去除头部空格
  let end = str.length - 1;
  const ws = /\s/;
  while (ws.test(str.charAt(end))) {
    end--; // 最后一个非空格字符的索引
  }
  return str.slice(0, end + 1);
}

/**
 * Make a new line of HTML.
 *
 * Usage:
 *
 * ```javascript
 * const ret1 = newLine('a\nb\nc');
 * const ret2 = newLine('a\n\nbc');
 * console.log(ret1);
 * console.log(ret2);
 * ```
 *
 * Output:
 *
 * ```text
 * a<br />b<br />c
 * a<br /><br />bc
 * ```
 *
 * @param {string} str The string to make a new line.
 * @returns {string} A newline with `br`.
 * @category DOM
 */
export function newLine(str: string): string {
  if (!str) {
    return '';
  }
  const reg = new RegExp('\\n', 'g');
  return str.replace(reg, '<br />');
}

/**
 * Check whether it is a valid JSON string.
 *
 * Usage:
 *
 * ```javascript
 * const ret1 = isJSONString(`['a', 'b', 'c']`);
 * const ret2 = isJSONString(`["a", "b", "c"]`);
 * console.log(ret1);
 * console.log(ret2);
 * ```
 *
 * Output:
 *
 * ```text
 * false
 * true
 * ```
 *
 * @param {string} str The string to check.
 * @returns {boolean} Return the result of checking.
 * @category Util
 */
export function isJSONString(str: string): boolean {
  try {
    if (typeof JSON.parse(str) === 'object') {
      return true;
    }
  } catch (e) {
    /* pass */
  }
  return false;
}

/**
 * Alias of `isJSONString`
 *
 * @hidden
 */
export function isJsonString(str: string): boolean {
  return isJSONString(str);
}

/**
 * Produce a random string of number, `genRndNumString(7)` => '7658495'.
 *
 * Usage:
 *
 * ```javascript
 * const ret1 = genRndNumString(4);
 * const ret2 = genRndNumString(7);
 * console.log(ret1);
 * console.log(ret2);
 * ```
 *
 * Output:
 *
 * ```text
 * 9730
 * 2262490
 * ```
 *
 * @param {number} n Length
 * @returns {string} Return the random string.
 * @category Util
 */
export function genRndNumString(n = 5): string {
  let ret = '';
  while (n--) {
    ret += Math.floor(Math.random() * 10);
  }
  return ret;
}

/**
 * Alias of `genRndNumString`
 *
 * @hidden
 */
export function generateRndNum(n = 5): string {
  return genRndNumString(n);
}

/**
 * 根据时间生成唯一标志的数字 `genUniqueNumString()` => `1538324722364123`
 *
 * Usage:
 *
 * ```javascript
 * const ret1 = genUniqueNumString();
 * const ret2 = genUniqueNumString(3);
 * console.log(ret1);
 * console.log(ret2);
 * ```
 *
 * Output:
 *
 * ```text
 * 1538324722364123
 * 1538324722364123
 * ```
 *
 * @param {number} n 随机数的长度
 * @category Util
 */
export function genUniqueNumString(n = 3): string {
  const [ now, rnd ] = [ mNow(), generateRndNum(n || 3) ];
  return now + rnd;
}

/**
 * Alias of `genUniqueNumString`
 *
 * @hidden
 */
export function generateUniqueNum(n = 3): string {
  return genUniqueNumString(n);
}

/**
 * 浮点数转为百分比 0.2 => 20%
 *
 * Usage:
 *
 * ```javascript
 * const ret1 = floatToPercent(0.2);
 * const ret2 = floatToPercent(0.2, 2);
 * console.log(ret1);
 * console.log(ret2);
 * ```
 *
 * Output:
 *
 * ```text
 * 20%
 * 20.00%
 * ```
 *
 * @param {number} num 浮点数
 * @param {number} fixSize 保留几位浮点数
 * @category Util
 */
export function floatToPercent(num: number, fixSize = 0): string {
  let ret = '';
  if (fixSize) {
    ret = (num * 100).toFixed(fixSize);
  } else {
    ret = String(Math.floor(num * 100));
  }
  return `${ret}%`;
}

/**
 * 浮点数保留指定位
 *
 * Usage:
 *
 * ```javascript
 * const ret1 = floatFixed(0.2);
 * const ret2 = floatFixed(0.2, 2);
 * console.log(ret1);
 * console.log(ret2);
 * ```
 *
 * Output:
 *
 * ```text
 * 0
 * 0.20
 * ```
 *
 * @category Util
 */
export function floatFixed(num: string, size = 0): string {
  return parseFloat(num).toFixed(size);
}

/**
 * 阻止冒泡
 *
 * Usage:
 *
 * ```javascript
 * const ret1 = cancelBubble(e);
 * ```
 *
 * @category Event
 */
export function cancelBubble(e: Event): void {
  const ev = e || window.event;
  if (ev.stopPropagation) {
    // W3C
    ev.stopPropagation();
  } else {
    // IE
    ev.cancelBubble = true;
  }
}

/**
 * Modify `class`.
 *
 * Usage:
 *
 * ```javascript
 * const dom = document.querySelector('#box');
 *
 * // Determine `class`
 * hasClass(dom, 'test');
 * // Add `class`
 * addClass(dom, 'test');
 * // Remove `class`
 * removeClass(dom, 'test');
 * ```
 *
 * @category DOM
 */
export function hasClass(obj: HTMLElement, cls: string): boolean {
  const oriCls = obj.className; // 获取对象的class值
  const oriClsArr = oriCls.split(/\s+/); // 分隔空格转换成数组
  for (let i = 0; i < oriClsArr.length; i++) {
    if (oriClsArr[i] === cls) {
      return true; // 若匹配到class则返回True
    }
  }
  return false; // 否则返回False
}

/**
 * Modify `class`.
 *
 * Usage:
 *
 * ```javascript
 * const dom = document.querySelector('#box');
 *
 * // Determine `class`
 * hasClass(dom, 'test');
 * // Add `class`
 * addClass(dom, 'test');
 * // Remove `class`
 * removeClass(dom, 'test');
 * ```
 *
 * @category DOM
 */
export function addClass(obj: HTMLElement, cls: string): void {
  const oriCls = obj.className;
  let space = '';
  let newCls = ''; // 获取对象的class值
  if (oriCls !== '') {
    space = ' '; // 若原来的class不为空，跟一个空格
  }
  newCls = oriCls + space + cls; // 将新的class加进去
  obj.className = newCls; // 替换新class
}

/**
 * Modify `class`.
 *
 * Usage:
 *
 * ```javascript
 * const dom = document.querySelector('#box');
 *
 * // Determine `class`
 * hasClass(dom, 'test');
 * // Add `class`
 * addClass(dom, 'test');
 * // Remove `class`
 * removeClass(dom, 'test');
 * ```
 *
 * @category DOM
 */
export function removeClass(obj: HTMLElement, cls: string): void {
  const oriCls = obj.className;
  let newCls; // 获取对象的class值
  newCls = ' ' + oriCls + ' '; // 前后加空格
  newCls = newCls.replace(/(\s+)/gi, ' '); // 将多余的空格替换成一个空格
  newCls = newCls.replace(' ' + cls + ' ', ' '); // 将加了前后空格的cls替换成空格' '
  newCls = newCls.replace(/(^\s+)|(\s+$)/g, ''); // 去掉前后空格
  obj.className = newCls;
}

/**
 * EN: Throttle
 *
 * ZH: 节流
 *
 * Usage:
 *
 * ```javascript
 * const foo = throttle(() => {
 *   console.log('The function will be invoked at most once per every wait 1000 milliseconds.');
 * }, 1000, { leading: true });
 * ```
 *
 * Reference: [Lodash](https://lodash.com/docs/4.17.15#throttle)
 *
 * @category Util
 */
export function throttle<T extends (...args: UnknownFnParams) => UnknownFnReturn>(func: T, wait: number, options: { leading?: boolean; trailing?: boolean } = {}): ThrottleFunc<T> {
  options = Object.assign({}, options);
  let context: unknown | null = null;
  let args: Parameters<T> | null = null;
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let [ result, previous ] = [ null, 0 ];
  const later = function(this: unknown) {
    previous = options.leading === false ? 0 : mNow();
    timeout = null;
    result = func.apply(this as T, args!);
    if (!timeout) {
      context = args = null;
    }
  };
  return function(this: unknown, ...argRest: Parameters<T>) {
    const now = mNow();
    if (!previous && options.leading === false) {
      previous = now;
    }
    const remaining = wait - (now - previous);
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    context = this;
    args = argRest;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context as T, args!);
      if (!timeout) {
        context = args = null;
      }
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later.bind(context), remaining);
    }
    return result;
  };
}

/**
 * EN: Debounce
 *
 * ZH: 去抖
 *
 * Usage:
 *
 * ```javascript
 * const foo = debounce(() => {
 *   console.log('The debounced function will only be invoked in 1000 milliseconds, the other invoking will disappear during the wait time.');
 * }, 1000, true);
 * ```
 *
 * @category Util
 */
export function debounce<T extends (...args: UnknownFnParams) => UnknownFnReturn>(func: T, wait: number, immediate?: boolean): DebounceFunc<T> {
  let context: unknown | null = null;
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let timestamp: number | null = null;
  let args: Parameters<T> | null = null;
  let result: ReturnType<T> | null = null;
  const later = function() {
    const last = mNow() - (timestamp as number);
    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context as T, args!);
        if (!timeout) {
          context = args = null;
        }
      }
    }
  };
  return function(this: unknown, ...argRest: Parameters<T>) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    context = this;
    args = argRest;
    timestamp = mNow();
    const callNow = immediate && !timeout;
    if (!timeout) {
      timeout = setTimeout(later, wait);
    }
    if (callNow) {
      result = func.apply(context as T, args!);
      context = args = null;
    }
    return result as ReturnType<T>;
  };
}

const defaultGetFriendlyIntervalOptions = {
  type: 'd',
};

/**
 * 获取间隔时间
 *
 * Usage:
 *
 * ```javascript
 * const ret1 = getFriendlyInterval(new Date('2020-03-28 00:09:27'), new Date('2023-04-18 10:54:00'), { type: 'd' });
 * const ret2 = getFriendlyInterval(1585325367000, 1681786440000, { type: 'text' });
 * const ret3 = getFriendlyInterval('2020-03-28 00:09:27', '2023-04-18 10:54:00', { type: 'text' });
 * console.log(ret1);
 * console.log(ret2);
 * console.log(ret3);
 * ```
 *
 * Output:
 *
 * ```text
 * 1116
 * 1116 天 10 时 44 分 33 秒
 * 1116 天 10 时 44 分 33 秒
 * ```
 *
 * @param {number/Date} start 开始时间戳 1585325367122
 * @param {number/Date} end 结束时间戳 1585325367122
 * @param {string} options.type 返回类型 d: 2(天) text: 2 天 4 时...
 * @returns {string/number} 取决于 type
 * @category Util
 */
export function getFriendlyInterval(start: number | string | Date = 0, end: number | string | Date = 0, options: { type?: string } = defaultGetFriendlyIntervalOptions): number | string {
  options = Object.assign(defaultGetFriendlyIntervalOptions, options);
  const { type } = options;
  if (!isNumber(start)) start = new Date(start).getTime();
  if (!isNumber(end)) end = new Date(end).getTime();
  const t = Number(end) - Number(start);
  let ret = '';
  let [ d, h, m, s ] = new Array(4).fill(0);
  const zhD = decodeURIComponent('%20%E5%A4%A9%20'); // ' 天 '
  const zhH = decodeURIComponent('%20%E6%97%B6%20'); // ' 时 '
  const zhM = decodeURIComponent('%20%E5%88%86%20'); // ' 分 '
  const zhS = decodeURIComponent('%20%E7%A7%92'); // ' 秒'
  if (t >= 0) {
    d = Math.floor(t / 1000 / 60 / 60 / 24);
    h = Math.floor(t / 1000 / 60 / 60);
    m = Math.floor(t / 1000 / 60);
    s = Math.floor(t / 1000);
    switch (type) {
      case 'd':
        ret = d;
        break;
      case 'text':
        d = Math.floor(t / 1000 / 60 / 60 / 24);
        h = Math.floor((t / 1000 / 60 / 60) % 24);
        m = Math.floor((t / 1000 / 60) % 60);
        s = Math.floor((t / 1000) % 60);
        // ret = d + ' 天 ' + h + ' 时 ' + m + ' 分 ' + s + ' 秒';
        ret = d + zhD + h + zhH + m + zhM + s + zhS;
        break;
      default:
        ret = s;
    }
  }
  return ret;
}

/**
 * EN: Check whether it is a right number.
 *
 * ZH: 判断是否有效数字
 *
 * Usage:
 *
 * ```javascript
 * const ret1 = isNumber(123);
 * const ret2 = isNumber('123');
 * // Default: NaN, Infinity is not Number
 * const ret3 = isNumber(Infinity);
 * const ret4 = isNumber(Infinity, { isInfinityAsNumber: true });
 * const ret5 = isNumber(NaN);
 * const ret6 = isNumber(NaN, { isNaNAsNumber: true, isInfinityAsNumber: true });
 * console.log(ret1, ret2, ret3, ret4, ret5, ret6);
 * ```
 *
 * Output:
 *
 * ```text
 * true false false true false true
 * ```
 *
 * @param {*} num 被判断的值
 * @param {boolean} options.isNaNAsNumber 是否 NaN 算数字（默认不算）
 * @param {boolean} options.isInfinityAsNumber 是否 无限 算数字（默认不算）
 * @returns {boolean} true 是数字
 * @category Util
 */
export function isNumber(num: unknown, options: IsNumberOptions = {}): boolean {
  const { isNaNAsNumber = false, isInfinityAsNumber = false, isUnFiniteAsNumber = false } = options;
  if (typeof num !== 'number') {
    return false;
  }
  if (!(isInfinityAsNumber === true || isUnFiniteAsNumber === true) && !isFinite(num)) {
    return false;
  }
  // Be compatible with previous versions.
  // if (!isUnFiniteAsNumber && !isFinite(num)) {
  //   return false;
  // }
  if (!isNaNAsNumber && isNaN(num)) {
    return false;
  }
  return true;
}

/**
 * 执行有效函数
 *
 * Usage:
 *
 * ```javascript
 * const ret = doFn(() => {
 *  console.log('doFn');
 * });
 * ```
 *
 * @param {function} fn 等待被执行的未知是否有效的函数
 * @category Util
 */
export function doFn(fn: AnyFunction, ...params: Parameters<AnyFunction>): ReturnType<AnyFunction> | null {
  let ret: ReturnType<AnyFunction> | null = null;
  if (fn && typeof fn === 'function') {
    ret = fn(...params);
  }
  return ret;
}

/**
 * EN: Handle Storage (Keep fit for JSON, it can transfer format automatically).
 *
 * ZH: 存储/获取数据到 sessionStorage/localStorage
 *
 * Usage:
 *
 * ```javascript
 * setSessionStorage('test', '123');
 * const ret1 = getSessionStorage('test');
 * setLocalStorage('test', '123');
 * const ret2 = getLocalStorage('test');
 * console.log(ret1, ret2);
 *
 * // or package in usage
 * const projectName = 'mazey';
 * function mSetLocalStorage (key, value) {
 *   return setLocalStorage(`${projectName}_${key}`, value);
 * }
 *
 * function mGetLocalStorage (key) {
 *   return getLocalStorage(`${projectName}_${key}`);
 * }
 * ```
 *
 * Output:
 *
 * ```text
 * 123 123
 * ```
 *
 * @param {string} key 键
 * @returns {void} 返回值
 * @category Cache Data
 */
export function setSessionStorage<T>(key: string, value: T | null = null): void {
  if (key) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
}

/**
 * EN: Handle Storage (Keep fit for JSON, it can transfer format automatically).
 *
 * ZH: 存储/获取数据到 sessionStorage/localStorage
 *
 * Usage:
 *
 * ```javascript
 * setSessionStorage('test', '123');
 * const ret1 = getSessionStorage('test');
 * setLocalStorage('test', '123');
 * const ret2 = getLocalStorage('test');
 * console.log(ret1, ret2);
 *
 * // or package in usage
 * const projectName = 'mazey';
 * function mSetLocalStorage (key, value) {
 *   return setLocalStorage(`${projectName}_${key}`, value);
 * }
 *
 * function mGetLocalStorage (key) {
 *   return getLocalStorage(`${projectName}_${key}`);
 * }
 * ```
 *
 * Output:
 *
 * ```text
 * 123 123
 * ```
 *
 * @param {string} key 键
 * @returns {any} 返回值
 * @category Cache Data
 */
export function getSessionStorage<T>(key: string): T | null {
  let ret: T | null = null;
  if (key) {
    const value = sessionStorage.getItem(key);
    if (value) {
      ret = JSON.parse(value) as T;
    }
  }
  return ret;
}

/**
 * EN: Handle Storage (Keep fit for JSON, it can transfer format automatically).
 *
 * ZH: 存储/获取数据到 sessionStorage/localStorage
 *
 * Usage:
 *
 * ```javascript
 * setSessionStorage('test', '123');
 * const ret1 = getSessionStorage('test');
 * setLocalStorage('test', '123');
 * const ret2 = getLocalStorage('test');
 * console.log(ret1, ret2);
 *
 * // or package in usage
 * const projectName = 'mazey';
 * function mSetLocalStorage (key, value) {
 *   return setLocalStorage(`${projectName}_${key}`, value);
 * }
 *
 * function mGetLocalStorage (key) {
 *   return getLocalStorage(`${projectName}_${key}`);
 * }
 * ```
 *
 * Output:
 *
 * ```text
 * 123 123
 * ```
 *
 * @param {string} key 键
 * @returns {void} 返回值
 * @category Cache Data
 */
export function setLocalStorage<T>(key: string, value: T | null = null): void {
  if (key) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

/**
 * EN: Handle Storage (Keep fit for JSON, it can transfer format automatically).
 *
 * ZH: 存储/获取数据到 sessionStorage/localStorage
 *
 * Usage:
 *
 * ```javascript
 * setSessionStorage('test', '123');
 * const ret1 = getSessionStorage('test');
 * setLocalStorage('test', '123');
 * const ret2 = getLocalStorage('test');
 * console.log(ret1, ret2);
 *
 * // or package in usage
 * const projectName = 'mazey';
 * function mSetLocalStorage (key, value) {
 *   return setLocalStorage(`${projectName}_${key}`, value);
 * }
 *
 * function mGetLocalStorage (key) {
 *   return getLocalStorage(`${projectName}_${key}`);
 * }
 * ```
 *
 * Output:
 *
 * ```text
 * 123 123
 * ```
 *
 * @param {string} key 键
 * @returns {void} 返回值
 * @category Cache Data
 */
export function getLocalStorage<T>(key: string): T | null {
  let ret: T | null = null;
  if (key) {
    const value = localStorage.getItem(key);
    if (value) {
      ret = JSON.parse(value) as T;
    }
  }
  return ret;
}

/**
 * EN: Load a CSS file from the server.
 *
 * ZH: 动态加载 CSS 文件
 *
 * Usage:
 *
 * ```javascript
 * loadCSS(
 *     'http://example.com/path/example.css',
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
 * Output:
 *
 * ```text
 * Load CSS Success: loaded
 * ```
 *
 * @param {string} url -- css资源路径
 * @param {string} options.id -- link标签id
 * @returns {Promise<string>} true -- 加载成功
 * @category Load Resource
 */
export function loadCSS(url: string, options: { id?: string } = { id: '' }): Promise<unknown> {
  const { id } = options;
  let success: (v: boolean | string) => void;
  let fail: (v: Error) => void = () => undefined;
  const status = new Promise((resolve, reject) => {
    [ success, fail ] = [ resolve, reject ];
  });
  // const tempCB = (typeof callback === 'function' ? callback : function () { });
  const callback = function() {
    // doFn(success, true);
    success('loaded');
  };
  let node: HTMLLinkElement | null = document.createElement('link');
  if (!node) {
    fail(new Error('Not support create link element'));
  }
  const supportOnload = 'onload' in node;
  const isOldWebKit = +navigator.userAgent.replace(/.*(?:AppleWebKit|AndroidWebKit)\/?(\d+).*/i, '$1') < 536; // webkit旧内核做特殊处理
  const protectNum = 300000; // 阈值10分钟，一秒钟执行 pollCss 500 次
  node.rel = 'stylesheet';
  node.type = 'text/css';
  node.href = url;
  if (typeof id !== 'undefined') {
    node.id = id;
  }
  document.getElementsByTagName('head')[0].appendChild(node);
  // for Old WebKit and Old Firefox
  if (isOldWebKit || !supportOnload) {
    // Begin after node insertion
    setTimeout(function() {
      pollCss(node, callback, 0);
    }, 1);
    return status;
  }
  if (supportOnload) {
    node.onload = onload;
    node.onerror = function() {
      // 加载失败(404)
      onload();
    };
  } else {
    // todo: 和 !supportOnload 重复
    node.onreadystatechange = function() {
      if (node && /loaded|complete/.test(node.readyState)) {
        onload();
      }
    };
  }
  function onload() {
    // 确保只跑一次下载操作
    if (node) node.onload = node.onerror = node.onreadystatechange = null;
    // 清空 node 引用，在低版本 IE，不清除会造成内存泄露
    node = null;
    callback();
  }
  // 循环判断css是否已加载成功
  /*
   * @param node -- link节点
   * @param callback -- 回调函数
   * @param step -- 计步器，避免无限循环
   */
  function pollCss(node: HTMLLinkElement | null, callback: () => void, step: number) {
    if (!node) return;
    const sheet = node.sheet;
    let isLoaded: boolean;
    step += 1;
    // 保护，大于 10 分钟，则不再轮询
    if (step > protectNum) {
      isLoaded = true;
      // 清空 node 引用
      if (node) node = null;
      callback();
      return;
    }
    if (isOldWebKit) {
      // for WebKit < 536
      if (sheet) {
        isLoaded = true;
      }
    } else if (sheet) {
      // for Firefox < 9.0
      try {
        if (sheet.cssRules) {
          isLoaded = true;
        }
      } catch (ex) {
        const err = ex as ErrorEvent;
        if (!err.name) return;
        // 火狐特殊版本，通过特定值获知是否下载成功
        // The value of `ex.name` is changed from "NS_ERROR_DOM_SECURITY_ERR"
        // to "SecurityError" since Firefox 13.0. But Firefox is less than 9.0
        // in here, So it is ok to just rely on "NS_ERROR_DOM_SECURITY_ERR"
        if (err.name === 'NS_ERROR_DOM_SECURITY_ERR') {
          isLoaded = true;
        }
      }
    }
    setTimeout(function() {
      if (isLoaded) {
        // 延迟20ms是为了给下载的样式留够渲染的时间
        callback();
      } else {
        pollCss(node, callback, step);
      }
    }, 20);
  }
  return status;
}

/**
 * EN: Load a JavaScript file from the server and execute it.
 *
 * ZH: 动态加载 JavaScript 文件
 *
 * Usage:
 *
 * ```javascript
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
 * Output:
 *
 * ```text
 * Load JavaScript script: loaded
 * ```
 *
 * @param {string} url -- JavaScript 资源路径
 * @param {string} options.id -- DOM ID
 * @param {function} options.callback -- 加载后回调函数
 * @param {number} options.timeout -- 超时时长
 * @param {boolean} options.isDefer -- 是否添加 defer 标签
 * @returns {Promise<string>} -- true 成功
 * @category Load Resource
 */
export function loadScript(
  url: string,
  options: {
    id?: string;
    callback?: (...params: UnknownFnParams) => UnknownFnReturn;
    timeout?: number;
    isDefer?: boolean;
  } = {
    id: '',
    callback: function() {
      /* pass */
    },
    timeout: 5000,
    isDefer: false,
  }
): LoadScriptReturns {
  const { id, callback, timeout, isDefer } = Object.assign(
    {
      id: '',
      callback: function() {
        /* pass */
      },
      timeout: 5000,
      isDefer: false,
    },
    options
  );
  let success: (v: string) => void;
  let fail: (v: string) => void;
  const script: HTMLScriptElement = document.createElement('script');
  if (!script) {
    Promise.reject('Not support create script element');
  }
  // 如果没有 script 标签，那么代码就不会运行。可以利用这一事实，在页面的第一个 script 标签上使用 insertBefore()。
  const firstScript: HTMLScriptElement = document.getElementsByTagName('script')[0];
  script.type = 'text/javascript';
  if (isDefer) {
    script.defer = true; // 'defer';
  }
  if (id) {
    script.id = id;
  }
  if (script.readyState) {
    // IE
    script.onreadystatechange = function() {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null;
        doFn(callback);
        doFn(success, 'loaded');
      }
    };
  } else {
    // Others
    script.onload = function() {
      doFn(callback);
      doFn(success, 'loaded');
    };
  }
  script.src = url;
  firstScript && firstScript.parentNode.insertBefore(script, firstScript);
  return new Promise((resolve, reject) => {
    [ success, fail ] = [ resolve, reject ];
    if (timeout) {
      setTimeout(fail.bind(null, 'timeout'), timeout);
    }
  });
}

/**
 * 获取时间戳
 *
 * Usage:
 *
 * ```javascript
 * const ret = mNow();
 * console.log(ret);
 * ```
 *
 * Output:
 *
 * ```text
 * 1585325367122
 * ```
 *
 * @category Util
 */
export function mNow(): number {
  let ret = 0;
  if (Date.now) {
    ret = Date.now();
  } else {
    ret = new Date().getTime();
  }
  return ret;
}

/**
 * EN: Handle Cookie.
 *
 * ZH: 设置/获取 Cookie
 *
 * Usage:
 *
 * ```javascript
 * setCookie('test', '123', 30, 'example.com'); // key value day domain
 * const ret = getCookie('test');
 * console.log(ret);
 * ```
 *
 * Output:
 *
 * ```text
 * 123
 * ```
 *
 * @category Cache Data
 */
export function setCookie(name: string, value: string, days?: number, domain?: string): void {
  let domainParts, expires;
  // let date: any;
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  } else {
    expires = '';
  }
  const host = location.host;
  if (host.split('.').length === 1) {
    // no "." in a domain - it's localhost or something similar
    document.cookie = name + '=' + value + expires + '; path=/';
  } else {
    // Remember the cookie on all subdomains.
    //
    // Start with trying to set cookie to the top domain.
    // (example: if user is on foo.com, try to set
    //  cookie to domain ".com")
    //
    // If the cookie will not be set, it means ".com"
    // is a top level domain and we need to
    // set the cookie to ".foo.com"
    domainParts = host.split('.');
    domainParts.shift();
    domain = domain || '.' + domainParts.join('.');
    document.cookie = name + '=' + value + expires + '; path=/; domain=' + domain;
    // check if cookie was successfuly set to the given domain
    // (otherwise it was a Top-Level Domain)
    if (getCookie(name) === null || getCookie(name) !== value) {
      // append "." to current domain
      domain = domain || '.' + host;
      document.cookie = name + '=' + value + expires + '; path=/; domain=' + domain;
    }
  }
}

/**
 * EN: Handle Cookie.
 *
 * ZH: 设置/获取 Cookie
 *
 * Usage:
 *
 * ```javascript
 * setCookie('test', '123', 30, 'example.com'); // key value day domain
 * const ret = getCookie('test');
 * console.log(ret);
 * ```
 *
 * Output:
 *
 * ```text
 * 123
 * ```
 *
 * @category Cache Data
 */
export function getCookie(name: string): string {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return '';
}

/**
 * Delete a cookie by name.
 *
 * Usage:
 *
 * ```javascript
 * const ret = delCookie('test');
 * console.log(ret);
 * ```
 *
 * Output:
 *
 * ```text
 * true
 * ```
 *
 * @param name - The name of the cookie to delete.
 * @returns `true` if the cookie was deleted successfully, `false` otherwise.
 * @category Cache Data
 */
export function delCookie(name: string): boolean {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();

    if (cookie.startsWith(`${name}=`)) {
      const cookieParts = cookie.split('=');
      const cookieName = cookieParts[0];
      // const cookieValue = cookieParts[1];

      const expires = new Date();
      expires.setTime(expires.getTime() - 1);

      document.cookie = `${cookieName}=;expires=${expires.toUTCString()}`;

      return true;
    }
  }

  return false;
}

/**
 * @hidden
 */
interface WebPerformance {
  [key: string]: string | number;
}

function isSupportedEntryType(name: string) {
  let supportedEntryTypes: readonly string[] = [];
  const perfObs = window.PerformanceObserver;
  if (!perfObs) {
    return false;
  }
  if (isNonEmptyArray(perfObs.supportedEntryTypes as unknown[])) {
    supportedEntryTypes = perfObs.supportedEntryTypes;
  }
  return supportedEntryTypes.includes(name);
}

/**
 * Gets the first contentful paint (FCP) time of a web page using the Performance API.
 * The FCP time is the time it takes for the first piece of content to be painted on the screen.
 *
 * Usage:
 *
 * ```javascript
 * getFCP().then(
 *  res => {
 *   console.log(`FCP: ${res}`);
 *  }
 * );
 * ```
 *
 * Output:
 *
 * ```text
 * FCP: 123
 * ```
 *
 * @returns A promise that resolves with the FCP time in milliseconds, or 0 if the 'paint' entry type is not supported.
 * @category Web Performance
 */
export async function getFCP(): Promise<number> {
  if (!isSupportedEntryType('paint')) {
    return 0;
  }
  return new Promise(resolve => {
    const observer = new PerformanceObserver(list => {
      const entries = list.getEntries();
      const fcpIns = entries.find(entry => entry.name === 'first-contentful-paint');
      if (fcpIns) {
        observer.disconnect();
        resolve(Math.round(fcpIns.startTime));
      }
    });
    observer.observe({ type: 'paint', buffered: true });
  });
}

/**
 * Gets the first paint (FP) time of a web page using the Performance API.
 * The FP time is the time it takes for the first pixel to be painted on the screen.
 *
 * Usage:
 *
 * ```javascript
 * getFP().then(
 *  res => {
 *    console.log(`FP: ${res}`);
 *  }
 * );
 * ```
 *
 * Output:
 *
 * ```text
 * FP: 123
 * ```
 *
 * @returns A promise that resolves with the FP time in milliseconds, or 0 if the 'paint' entry type is not supported.
 * @category Web Performance
 */
export async function getFP(): Promise<number> {
  if (!isSupportedEntryType('paint')) {
    return 0;
  }
  return new Promise(resolve => {
    const observer = new PerformanceObserver(list => {
      const entries = list.getEntries();
      const fpIns = entries.find(entry => entry.name === 'first-paint');
      if (fpIns) {
        observer.disconnect();
        resolve(Math.round(fpIns.startTime));
      }
    });
    observer.observe({ type: 'paint', buffered: true });
  });
}

/**
 * Gets the largest contentful paint (LCP) time of a web page using the Performance API.
 * The LCP time is the time it takes for the largest piece of content to be painted on the screen.
 *
 * Usage:
 *
 * ```javascript
 * getLCP().then(
 *  res => {
 *    console.log(`LCP: ${res}`);
 *  }
 * );
 * ```
 *
 * Output:
 *
 * ```text
 * LCP: 123
 * ```
 *
 * @returns A promise that resolves with the LCP time in milliseconds, or 0 if the 'largest-contentful-paint' entry type is not supported.
 * @category Web Performance
 */
export async function getLCP(): Promise<number> {
  if (!isSupportedEntryType('largest-contentful-paint')) {
    return 0;
  }
  return new Promise(resolve => {
    const observer = new PerformanceObserver(list => {
      const entries = list.getEntries();
      const lcpIns = entries.find(entry => entry.entryType === 'largest-contentful-paint');
      if (lcpIns) {
        observer.disconnect();
        resolve(Math.round(lcpIns.startTime));
      }
    });
    observer.observe({ type: 'largest-contentful-paint', buffered: true });
  });
}

/**
 * Gets the first input delay (FID) of a web page using the Performance API.
 * The FID is the time it takes for the first user input to be processed by the browser.
 *
 * Usage:
 *
 * ```javascript
 * getFID().then(
 *  res => {
 *    console.log(`FID: ${res}`);
 *  }
 * );
 * ```
 *
 * Output:
 *
 * ```text
 * FID: 123
 * ```
 *
 * @returns A promise that resolves with the FID in milliseconds, or 0 if the 'first-input' entry type is not supported.
 * @category Web Performance
 */
export async function getFID(): Promise<number> {
  if (!isSupportedEntryType('first-input')) {
    return 0;
  }
  return new Promise(resolve => {
    const observer = new PerformanceObserver(list => {
      const entries = list.getEntries();
      const fidIns = entries.find(entry => entry.entryType === 'first-input');
      if (fidIns) {
        observer.disconnect();
        const ps = fidIns.processingStart;
        if (ps) {
          resolve(Math.round(fidIns.processingStart - fidIns.startTime));
        } else {
          resolve(0);
        }
      }
    });
    observer.observe({ type: 'first-input', buffered: true });
  });
}

/**
 * Gets the Cumulative Layout Shift (CLS) score of a web page using the Performance API.
 * The CLS score is a measure of how much the page layout shifts during loading.
 *
 * Usage:
 *
 * ```javascript
 * getCLS().then(
 *  res => {
 *    console.log(`CLS: ${res}`);
 *  }
 * );
 * ```
 *
 * Output:
 *
 * ```text
 * CLS: 123
 * ```
 *
 * @returns A promise that resolves with the CLS score, or 0 if the 'layout-shift' entry type is not supported.
 * @category Web Performance
 */
export async function getCLS(): Promise<number> {
  if (!isSupportedEntryType('layout-shift')) {
    return 0;
  }
  return new Promise(resolve => {
    const observer = new PerformanceObserver(list => {
      const entries = list.getEntries();
      const clsScore = entries.reduce((score, entry) => {
        let ev = 0;
        if (isNumber(entry.value)) {
          ev = entry.value as number;
        }
        return score + ev;
      }, 0);
      observer.disconnect();
      resolve(clsScore);
    });
    observer.observe({ type: 'layout-shift', buffered: true });
  });
}

/**
 * Gets the time to first byte (TTFB) of a web page using the Performance API.
 * The TTFB is the time it takes for the first byte of the response to be received by the browser.
 *
 * Usage:
 *
 * ```javascript
 * getTTFB().then(
 *  res => {
 *    console.log(`TTFB: ${res}`);
 *  }
 * );
 * ```
 *
 * Output:
 *
 * ```text
 * TTFB: 123
 * ```
 *
 * @returns The TTFB in milliseconds, or 0 if the navigation timing information is not available.
 * @category Web Performance
 */
export async function getTTFB(): Promise<number> {
  if (!isSupportedEntryType('navigation')) {
    return 0;
  }
  if (!window.performance || !window.performance.getEntriesByType) {
    return 0;
  }
  const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  let ttfb = 0;
  if (!navigationTiming) {
    return 0;
  }
  ttfb = navigationTiming.responseStart - navigationTiming.requestStart;
  return Math.round(ttfb);
}

/**
 * EN: Get page load time(`PerformanceNavigationTiming`).
 *
 * ZH: 获取页面加载相关的各项数据
 *
 * @remarks
 * This function uses the [`PerformanceNavigationTiming`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming) API to get page load time data.
 * The `PerformanceNavigationTiming` API provides more accurate and detailed information about page load time than the deprecated [`PerformanceTiming`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming) API.
 * If you are using an older browser that does not support `PerformanceNavigationTiming`, you can still use the `PerformanceTiming` API by using the previous version of this library ([`v3.9.7`](https://github.com/mazeyqian/mazey/releases/tag/v3.9.7)).
 *
 * Usage:
 *
 * ```javascript
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
 * ```text
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
export async function getPerformance(camelCase = false): Promise<WebPerformance | Error> {
  if (!isSupportedEntryType('navigation')) {
    return Promise.reject(new Error('navigation is not supported'));
  }
  const performance = window.performance;
  if (!(performance && typeof performance.getEntries === 'function' && typeof performance.getEntriesByType === 'function')) {
    return Promise.reject(new Error('performance is not supported'));
  }
  let success: (v: WebPerformance) => void;
  const status: Promise<WebPerformance> = new Promise(resolve => {
    [ success ] = [ resolve ];
  });
  let navigationTiming: PerformanceNavigationTiming | null = null;
  const navs = performance.getEntriesByType('navigation');
  if (isNonEmptyArray(navs)) {
    navigationTiming = navs[0] as PerformanceNavigationTiming;
  }
  let [
    unloadEventEnd,
    unloadEventStart,
    redirectEnd,
    redirectStart,
    domainLookupEnd,
    domainLookupStart,
    connectEnd,
    connectStart,
    secureConnectionStart,
    responseStart,
    requestStart,
    responseEnd,
    domContentLoadedEventStart,
    loadEventStart,
    loadEventEnd,
    navigationStart,
    fetchStart,
    decodedBodySize,
    encodedBodySize,
  ] = new Array(19).fill(0);
  const timing = performance.timing;
  let source = '';
  if (navigationTiming) {
    source = 'PerformanceNavigationTiming';
    ({ decodedBodySize, encodedBodySize } = navigationTiming);
    ({
      unloadEventEnd,
      unloadEventStart,
      redirectEnd,
      redirectStart,
      domainLookupEnd,
      domainLookupStart,
      connectEnd,
      connectStart,
      secureConnectionStart,
      responseStart,
      requestStart,
      responseEnd,
      domContentLoadedEventStart,
      loadEventStart,
      loadEventEnd,
      startTime: navigationStart,
      fetchStart,
    } = navigationTiming);
  } else if (timing) {
    source = 'PerformanceTiming';
    ({
      unloadEventEnd,
      unloadEventStart,
      redirectEnd,
      redirectStart,
      domainLookupEnd,
      domainLookupStart,
      connectEnd,
      connectStart,
      secureConnectionStart,
      responseStart,
      requestStart,
      responseEnd,
      domContentLoadedEventStart,
      loadEventStart,
      loadEventEnd,
      navigationStart,
      fetchStart,
    } = timing);
  } else {
    return Promise.reject(new Error('NavigationTiming and Timing are not supported'));
  }
  let startTime = 0;
  if (isNumber(navigationStart)) {
    startTime = navigationStart;
  } else if (isNumber(fetchStart)) {
    startTime = fetchStart;
  } else {
    return Promise.reject(new Error('startTime, navigationStart or fetchStart are required'));
  }
  const [ firstPaintTime, firstContentfulPaintTime ] = await Promise.all([ getFP(), getFCP() ]);
  // Whether the data has been formed (after the page has finished loading).
  if (isNumber(loadEventEnd) && loadEventEnd > 0) {
    getTiming();
  } else {
    window.addEventListener('load', function() {
      // Cannot affect the final time calculation.
      window.setTimeout(function() {
        getTiming();
      }, 0);
    });
  }
  function getTiming() {
    // Get the loading time.
    const data: WebPerformance = {
      // url: encodeURI(location.href),
      // ua: navigator.userAgent,
      source,
      os: getOS(),
      osVersion: getOSVersion(),
      deviceType: getDeviceType(),
      network: getNetWork(),
      screenDirection: getOrientationStatu(),
      unloadTime: unloadEventEnd - unloadEventStart, // 上个文档的卸载时间
      redirectTime: redirectEnd - redirectStart, // * 重定向时间
      dnsTime: domainLookupEnd - domainLookupStart, // * DNS 查询时间
      tcpTime: connectEnd - connectStart, // * 服务器连接时间
      sslTime: getSSLTime(connectEnd, secureConnectionStart), // * SSL 连接时间
      responseTime: responseStart - requestStart, // * 服务器响应时间
      downloadTime: responseEnd - responseStart, // * 网页下载时间
      firstPaintTime: firstPaintTime, // * 首次渲染时间
      firstContentfulPaintTime: firstContentfulPaintTime, // * 首次渲染内容时间
      domReadyTime: domContentLoadedEventStart - startTime, // * DOM Ready 时间（总和）
      onloadTime: loadEventStart - startTime, // * onload 时间（总和）
      whiteTime: responseStart - startTime, // * 白屏时间
      renderTime: loadEventEnd - startTime, // 整个过程的时间之和
      decodedBodySize: decodedBodySize, // 页面压缩前大小
      encodedBodySize: encodedBodySize, // 页面压缩后大小
    };
    // Filter abnormal data.
    Object.keys(data).forEach(k => {
      // Filter out data less than 0.
      if (isNumber(data[k])) {
        if ((data[k] as number) < 0) {
          data[k] = 0;
        } else {
          data[k] = Math.round(data[k] as number);
        }
      }
    });
    // Filter out data where the blank screen time is greater than the onload time.
    if (isNumber(data.whiteTime) && data.whiteTime > data.onloadTime) {
      data.whiteTime = 0;
    }
    const Underscore: WebPerformance = {};
    if (!camelCase) {
      Object.keys(data).forEach(k => {
        // if (!Underscore) Underscore = {};
        Underscore[camelCase2Underscore(k)] = data[k];
      });
    }
    if (Object.keys(Underscore).length) {
      success(Underscore);
    } else {
      success(data);
    }
  }
  // Get the current operating system.
  function getOS() {
    let os;
    if (navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1) {
      os = 'android';
    } else if (navigator.userAgent.indexOf('iPhone') > -1) {
      os = 'ios';
    } else if (navigator.userAgent.indexOf('Windows Phone') > -1) {
      os = 'wp';
    } else {
      os = 'others';
    }
    return os;
  }
  // Get the operating system version.
  function getOSVersion() {
    let OSVision: string | undefined = '';
    const u = navigator.userAgent;
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; // Android
    const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // iOS 终端
    const uas = navigator.userAgent.split(';');
    if (uas.length < 2) return OSVision;
    const validUaStr = uas[1];
    if (!validUaStr) return OSVision;
    if (isAndroid) {
      OSVision = (validUaStr.match(/\d+\.\d+/g) || [])[0];
    }
    if (isIOS) {
      OSVision = (validUaStr.match(/(\d+)_(\d+)_?(\d+)?/) || [])[0];
    }
    if (!OSVision) OSVision = '';
    return OSVision;
  }
  // Get the device type.
  function getDeviceType() {
    let deviceType;
    const sUserAgent = navigator.userAgent.toLowerCase();
    const bIsIpad = sUserAgent.match(/(ipad)/i) && 'ipad';
    const bIsIphoneOs = sUserAgent.match(/iphone os/i) && 'iphone os';
    const bIsMidp = sUserAgent.match(/midp/i) && 'midp';
    const bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) && 'rv:1.2.3.4';
    const bIsUc = sUserAgent.match(/ucweb/i) && 'ucweb';
    const bIsAndroid = sUserAgent.match(/android/i) && 'android';
    const bIsCE = sUserAgent.match(/windows ce/i) && 'windows ce';
    const bIsWM = sUserAgent.match(/windows mobile/i) && 'windows mobile';
    if (!(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)) {
      deviceType = 'pc'; // pc
    } else if (bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
      deviceType = 'phone'; // phone
    } else if (bIsIpad) {
      deviceType = 'ipad'; // ipad
    } else {
      deviceType = undefined;
    }
    if (!deviceType) deviceType = '';
    return deviceType;
  }
  // Get the network status.
  function getNetWork() {
    let netWork: string | undefined = '';
    const nav = window.navigator;
    if (nav.connection && nav.connection.effectiveType) {
      switch (nav.connection.effectiveType) {
        case 'wifi':
          netWork = 'wifi'; // wifi
          break;
        case '4g':
          netWork = '4g'; // 4g
          break;
        case '2g':
          netWork = '2g'; // 2g
          break;
        case '3g':
          netWork = '3g'; // 3g
          break;
        case 'ethernet':
          netWork = 'ethernet'; // ethernet
          break;
        case 'default':
          netWork = undefined; // 未知
          break;
      }
    }
    if (!netWork) netWork = '';
    return netWork;
  }
  // Get the screen orientation status.
  function getOrientationStatu() {
    let orientationStatu = '';
    if (window.screen && window.screen.orientation && window.screen.orientation.angle) {
      if (window.screen.orientation.angle === 180 || window.screen.orientation.angle === 0) {
        // 竖屏
        orientationStatu = '|';
      }
      if (window.screen.orientation.angle === 90 || window.screen.orientation.angle === -90) {
        // 横屏
        orientationStatu = '-';
      }
    }
    return orientationStatu;
  }
  // Get the SSL connection time.
  function getSSLTime(connectEnd: number, secureConnectionStart: number) {
    let ssl_time = 0;
    if (secureConnectionStart) {
      ssl_time = connectEnd - secureConnectionStart;
    }
    return ssl_time;
  }
  return status;
}

/**
 * EN: Hit probability (1% ~ 100%).
 *
 * ZH: 百分位概率
 *
 * Usage:
 *
 * ```javascript
 * const ret = inRate(0.5); // 0.01 ~ 1 true/false
 * console.log(ret);
 * ```
 *
 * Output:
 *
 * ```text
 * true
 * ```
 *
 * Example: Test the precision.
 *
 * ```javascript
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
 * @category Calculate and Formula
 */
export function inRate(rate: number): boolean {
  if (Math.random() < rate) {
    return true;
  }
  return false;
}

/**
 * EN: Detect the margin of Safety. Determine if it is a secure PWA environment that it can run.
 *
 * ZH: 判断是否是安全的 PWA 环境
 *
 * Usage:
 *
 * ```javascript
 * const ret = isSafePWAEnv();
 * console.log(ret);
 * ```
 *
 * Output:
 *
 * ```text
 * true
 * ```
 *
 * @returns {boolean} true 是
 * @category Browser Information
 */
export function isSafePWAEnv(): boolean {
  // 判断是否支持 async await
  function isSupportAsyncAwait() {
    let isSupportAsyncAwaitFunc;
    try {
      const fn = new Function('return async function(){};');
      isSupportAsyncAwaitFunc = fn();
      // 由于async函数的构造器不是全局对象，所以我们需要由下面代码来获取async函数的构造器
      // 具体可以查看以下MDN上有关于AsyncFunction的说明，
      // 地址：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction
      return Object.getPrototypeOf(isSupportAsyncAwaitFunc).constructor != null;
    } catch (e) {
      return false;
    }
  }
  // 判断是否支持 Promise
  function isSupportPromise() {
    if (typeof Promise !== 'undefined' && Promise.toString().indexOf('[native code]') !== -1) {
      return true;
    }
    return false;
  }
  // 浏览器信息
  const BrowserType = getBrowserInfo();
  if ('serviceWorker' in navigator && isSupportAsyncAwait() && isSupportPromise() && Boolean(window.fetch) && Boolean(window.indexedDB) && Boolean(window.caches) && !BrowserType['shell']) {
    return true;
  }
  return false;
}

/**
 * EN: Browser Information
 *
 * ZH: 返回浏览器信息 https://github.com/JowayYoung/juejin-code/blob/master/browser-type.js
 *
 * Usage:
 *
 * ```javascript
 * const ret = getBrowserInfo();
 * console.log(ret);
 * ```
 *
 * Output:
 *
 * ```text
 * {"engine":"webkit","engineVs":"537.36","platform":"desktop","supporter":"chrome","supporterVs":"85.0.4183.121","system":"windows","systemVs":"10"}
 * ```
 *
 * Results:
 *
 * | Attribute | Description | Type | Values |
 * | :------------ | :------------ | :------------ | :------------ |
 * | **system** | System | string | android, ios, windows, macos, linux |
 * | systemVs | System version | string | Windows: 2000, xp, 2003, vista, 7, 8, 8.1, 10 macOS: ... |
 * | platform | Platform | string | desktop, mobile |
 * | engine | Engine | string | webkit, gecko, presto, trident |
 * | engineVs | Engine version | string | - |
 * | supporter | Supporter | string | edge, opera, chrome, safari, firefox, iexplore |
 * | supporterVs | Supporter version | string | - |
 * | shell | Shell | string | (Optional) wechat, qq_browser, qq_app, uc, 360, 2345, sougou, liebao, maxthon, bilibili |
 * | shellVs | Shell version | string | (Optional) 20/... |
 * | appleType | Apple device type | string | (Optional) ipad, iphone, ipod, iwatch |
 *
 * Example: Determine the environment of the mobile QQ.
 *
 * ```javascript
 * const { system, shell } = getBrowserInfo();
 * const isMobileQQ = ['android', 'ios'].includes(system) && ['qq_browser', 'qq_app'].includes(shell);
 * ```
 *
 * @returns 浏览器信息
 * @category Browser Information
 */
export function getBrowserInfo(): BrowserInfo {
  // Cache
  if (window.MAZEY_BROWSER_INFO && typeof window.MAZEY_BROWSER_INFO === 'object') {
    // console.log('getBrowserInfo cache');
    return window.MAZEY_BROWSER_INFO;
  }
  let browserInfo: BrowserInfo = {
    engine: '', // webkit gecko presto trident
    engineVs: '',
    platform: '', // desktop mobile
    supporter: '', // chrome safari firefox opera iexplore edge
    supporterVs: '',
    system: '', // windows macos linux android ios
    systemVs: '',
  };
  try {
    // 权重：系统 + 系统版本 > 平台 > 内核 + 载体 + 内核版本 + 载体版本 > 外壳 + 外壳版本
    const ua: string = navigator.userAgent.toLowerCase();
    if (!ua) {
      return browserInfo;
    }
    const testUa: TestUa = regexp => regexp.test(ua);
    const testVs: TestVs = regexp => {
      let ret = '';
      const matchRes = ua.match(regexp); // ['os 13_2_3']
      // Confirm the Safety of the match result
      if (matchRes && isNonEmptyArray(matchRes)) {
        ret = matchRes.toString();
        ret = ret.replace(/[^0-9|_.]/g, ''); // 1323
        ret = ret.replace(/_/g, '.'); // 13.2.3
      }
      return ret;
    };
    // System
    let system = '';
    // Apple Device Type
    let appleType = '';
    if (testUa(/windows|win32|win64|wow32|wow64/g)) {
      system = 'windows'; // windows系统
    } else if (testUa(/macintosh|macintel/g)) {
      system = 'macos'; // macos系统
    } else if (testUa(/x11/g)) {
      system = 'linux'; // linux系统
    } else if (testUa(/android|adr/g)) {
      system = 'android'; // android系统
    } else if (testUa(/ios|iphone|ipad|ipod|iwatch/g)) {
      system = 'ios'; // ios系统
      if (testUa(/ipad/g)) {
        appleType = 'ipad';
      } else if (testUa(/iphone/g)) {
        appleType = 'iphone';
      } else if (testUa(/iwatch/g)) {
        appleType = 'iwatch';
      } else if (testUa(/ipod/g)) {
        appleType = 'ipod';
      }
    }
    browserInfo = {
      ...browserInfo,
      system,
      appleType,
    };
    // System Version
    let systemVs = '';
    if (system === 'windows') {
      if (testUa(/windows nt 5.0|windows 2000/g)) {
        systemVs = '2000';
      } else if (testUa(/windows nt 5.1|windows xp/g)) {
        systemVs = 'xp';
      } else if (testUa(/windows nt 5.2|windows 2003/g)) {
        systemVs = '2003';
      } else if (testUa(/windows nt 6.0|windows vista/g)) {
        systemVs = 'vista';
      } else if (testUa(/windows nt 6.1|windows 7/g)) {
        systemVs = '7';
      } else if (testUa(/windows nt 6.2|windows 8/g)) {
        systemVs = '8';
      } else if (testUa(/windows nt 6.3|windows 8.1/g)) {
        systemVs = '8.1';
      } else if (testUa(/windows nt 10.0|windows 10/g)) {
        systemVs = '10';
      }
    } else if (system === 'macos') {
      systemVs = testVs(/os x [\d._]+/g);
    } else if (system === 'android') {
      systemVs = testVs(/android [\d._]+/g); // 8.0
    } else if (system === 'ios') {
      systemVs = testVs(/os [\d._]+/g); // 13.2.3 13.3
    }
    browserInfo = {
      ...browserInfo,
      systemVs,
    };
    // Platform
    let platform = '';
    if (system === 'windows' || system === 'macos' || system === 'linux') {
      platform = 'desktop'; // 桌面端
    } else if (system === 'android' || system === 'ios' || testUa(/mobile/g)) {
      platform = 'mobile'; // 移动端
    }
    browserInfo = {
      ...browserInfo,
      platform,
    };
    // Engine and Shell
    let engine = '';
    let supporter = '';
    if (testUa(/applewebkit/g)) {
      engine = 'webkit'; // webkit内核
      if (testUa(/edge/g)) {
        supporter = 'edge'; // edge浏览器
      } else if (testUa(/opr/g)) {
        supporter = 'opera'; // opera浏览器
      } else if (testUa(/chrome/g)) {
        supporter = 'chrome'; // chrome浏览器
      } else if (testUa(/safari/g)) {
        supporter = 'safari'; // safari浏览器
      }
    } else if (testUa(/gecko/g) && testUa(/firefox/g)) {
      engine = 'gecko'; // gecko内核
      supporter = 'firefox'; // firefox浏览器
    } else if (testUa(/presto/g)) {
      engine = 'presto'; // presto内核
      supporter = 'opera'; // opera浏览器
    } else if (testUa(/trident|compatible|msie/g)) {
      engine = 'trident'; // trident内核
      supporter = 'iexplore'; // iexplore浏览器
    }
    browserInfo = {
      ...browserInfo,
      engine,
      supporter,
    };
    // Engine Version
    let engineVs = '';
    if (engine === 'webkit') {
      engineVs = testVs(/applewebkit\/[\d._]+/g);
    } else if (engine === 'gecko') {
      engineVs = testVs(/gecko\/[\d._]+/g);
    } else if (engine === 'presto') {
      engineVs = testVs(/presto\/[\d._]+/g);
    } else if (engine === 'trident') {
      engineVs = testVs(/trident\/[\d._]+/g);
    }
    browserInfo = {
      ...browserInfo,
      engineVs,
    };
    // Supporter Version
    let supporterVs = '';
    if (supporter === 'chrome') {
      supporterVs = testVs(/chrome\/[\d._]+/g);
    } else if (supporter === 'safari') {
      supporterVs = testVs(/version\/[\d._]+/g);
    } else if (supporter === 'firefox') {
      supporterVs = testVs(/firefox\/[\d._]+/g);
    } else if (supporter === 'opera') {
      supporterVs = testVs(/opr\/[\d._]+/g);
    } else if (supporter === 'iexplore') {
      supporterVs = testVs(/(msie [\d._]+)|(rv:[\d._]+)/g);
    } else if (supporter === 'edge') {
      supporterVs = testVs(/edge\/[\d._]+/g);
    }
    browserInfo = {
      ...browserInfo,
      supporterVs,
    };
    // Shell Name and Shell Version
    let shell = '';
    let shellVs = '';
    if (testUa(/micromessenger/g)) {
      shell = 'wechat'; // 微信浏览器
      shellVs = testVs(/micromessenger\/[\d._]+/g);
    } else if (testUa(/qqbrowser/g)) {
      shell = 'qq_browser'; // QQ Browser
      shellVs = testVs(/qqbrowser\/[\d._]+/g);
    } else if (testUa(/\sqq/g)) {
      shell = 'qq_app'; // QQ APP
    } else if (testUa(/ucbrowser/g)) {
      shell = 'uc'; // UC浏览器
      shellVs = testVs(/ucbrowser\/[\d._]+/g);
    } else if (testUa(/qihu 360se/g)) {
      shell = '360'; // 360浏览器(无版本)
    } else if (testUa(/2345explorer/g)) {
      shell = '2345'; // 2345浏览器
      shellVs = testVs(/2345explorer\/[\d._]+/g);
    } else if (testUa(/metasr/g)) {
      shell = 'sougou'; // 搜狗浏览器(无版本)
    } else if (testUa(/lbbrowser/g)) {
      shell = 'liebao'; // 猎豹浏览器(无版本)
    } else if (testUa(/maxthon/g)) {
      shell = 'maxthon'; // 遨游浏览器
      shellVs = testVs(/maxthon\/[\d._]+/g);
    } else if (testUa(/biliapp/g)) {
      shell = 'bilibili'; // 哔哩哔哩
    }
    browserInfo = {
      ...browserInfo,
      shell,
      shellVs,
    };
    window.MAZEY_BROWSER_INFO = browserInfo;
    return browserInfo;
  } catch (err) {
    console.warn('MazeyCon:', err);
    return browserInfo;
  }
}

/**
 * 去除 HTML 标签
 *
 * Usage:
 *
 * ```javascript
 * const ret = clearHtml('<div>hello world</div>');
 * console.log(ret);
 * ```
 *
 * Output:
 *
 * ```text
 * hello world
 * ```
 *
 * @param {string} str 带html标签的字符串
 * @returns {string} 字符串
 * @category Util
 */
export function clearHtml(str: string, options: { removeNewLine?: boolean } = {}): string {
  const { removeNewLine = false } = options;
  let ret = '';
  if (str) {
    ret = str.replace(/<\/?.+?>/g, '');
    if (removeNewLine) {
      ret = ret.replace(/[\r\n]/g, '');
    }
  }
  return ret;
  // return str.replace(/<\/?.+?>/g, '').replace(/[\r\n]/g, '');
}

/**
 * Sanitizes user input to prevent XSS attacks.
 *
 * Usage:
 *
 * ```javascript
 * const ret = sanitizeInput('<div>hello world</div>');
 * console.log(ret);
 * ```
 *
 * Output:
 *
 * ```text
 * &lt;div&gt;hello world&lt;/div&gt;
 * ```
 *
 * @param input - The input string to sanitize
 * @returns The sanitized input string
 * @category Util
 */
export function sanitizeInput(input: string): string {
  const regex = /[&<>"'/]/g;
  const replacements: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#x27;',
    '/': '&#x2F;',
  };
  if (typeof input !== 'string') {
    throw new Error('Input must be a string');
  }
  return input.replace(regex, (match: keyof typeof replacements) => replacements[match]);
}

/**
 * Reverses the sanitization done by the `sanitizeInput` function.
 *
 * Usage:
 *
 * ```javascript
 * const ret = unsanitize('&lt;div&gt;hello world&lt;/div&gt;');
 * console.log(ret);
 * ```
 *
 * Output:
 *
 * ```text
 * <div>hello world</div>
 * ```
 *
 * @param input - The input string to unsanitize
 * @returns The unsanitized input string
 * @category Util
 */
export function unsanitize(input: string): string {
  const regex = /(&amp;|&lt;|&gt;|&quot;|&#x27;|&#x2F;)/g;
  const replacements: { [key: string]: string } = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#x27;': '\'',
    '&#x2F;': '/',
  };
  if (typeof input !== 'string') {
    throw new Error('Input must be a string');
    // console.error('Input must be a string');
  }
  return input.replace(regex, (match: keyof typeof replacements) => replacements[match]);
}

/**
 * 截取字符串，中文算 2 个字节
 *
 * Usage:
 *
 * ```javascript
 * const ret = truncateZHString('hello world', 5);
 * console.log(ret);
 * ```
 *
 * Output:
 *
 * ```text
 * hello
 * ```
 *
 * @param {string} str 要截取的字符串
 * @param {number} len
 * @param {boolean} hasDot
 * @returns {string} 返回截取后的字符串
 * @category Util
 */
export function truncateZHString(str: string, len: number, hasDot = false): string {
  if (str == '' || !str) {
    return '';
  } else {
    let newLength = 0;
    let newStr = '';
    // eslint-disable-next-line no-control-regex
    const chineseRegex = /[^\x00-\xff]/g;
    let singleChar = '';
    const strLength = str.replace(chineseRegex, '**').length;
    for (let i = 0; i < strLength; i++) {
      singleChar = str.charAt(i).toString();
      if (singleChar.match(chineseRegex) != null) {
        newLength += 2;
      } else {
        newLength++;
      }
      if (newLength > len) {
        break;
      }
      newStr += singleChar;
    }

    if (hasDot && strLength > len) {
      newStr += '...';
    }
    return newStr;
  }
}

/**
 * Alias of `truncateZHString`
 *
 * @hidden
 */
export function cutCHSString(str: string, len: number, hasDot = false): string {
  return truncateZHString(str, len, hasDot);
}

/**
 * EN: Check whether the page is loaded successfully (Keep the compatibility if the browser's `load` event has been triggered).
 *
 * ZH: 页面加载完成
 *
 * Usage:
 *
 * ```javascript
 * windowLoaded(30) // second
 *   .then(res => {
 *     console.log(`Load Success: ${res}`);
 *   })
 *   .catch(err => {
 *     console.log(`Load Timeout or Fail: ${err.message}`);
 *   });
 * ```
 *
 * Output:
 *
 * ```text
 * Load Success: load
 * ```
 *
 * @param {number} timeout 超时时间 / 单位：秒
 * @returns {Promise<string>} document is loaded? 'complete' 'load' / 'timeout'
 * @category Load Resource
 */
export function windowLoaded(timeout = 90): Promise<string | Error> {
  let loaded: (value: string) => void = () => undefined;
  let loadFail: (value: Error) => void;
  const status = new Promise((resolve: (value: string) => void, reject: (value: Error) => void) => {
    loaded = resolve;
    loadFail = reject;
  });
  if (document.readyState === 'complete') {
    loaded('complete');
  } else {
    window.addEventListener('load', () => loaded('load'));
  }
  // 超过 timeout 秒后加载失败
  setTimeout(() => loadFail(Error('timeout')), timeout * 1000);
  return status;
}

/**
 * EN: Add `<style>` in `<head>`.
 *
 * ZH: 添加样式标签; style: 样式标签内的字符串; id: `<style>` 标签的 `id`; 返回: 添加成功/失败
 *
 * Example 1: Add the `<style>` with `id`, and repeated invoking will update the content instead of adding a new one.
 *
 * ```javascript
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
 * Example 2: Add the `<style>` without `id`, and repeated invoking will add a new one.
 *
 * ```javascript
 * addStyle(
 *   `
 *     body {
 *       background-color: #444;
 *     }
 *   `
 * );
 * // <style>
 * //   body {
 * //     background-color: #444;
 * //   }
 * // </style>
 * ```
 *
 * @category DOM
 */
export function addStyle(style: string, options: { id?: string } = { id: '' }): boolean {
  // console.log('_ style', style);
  // console.log('_ options', options);
  if (!style) {
    return false;
  }
  // 创建 style 文档碎片
  const styleFrag = document.createDocumentFragment();
  let idDom: HTMLElement | null = null;
  let domId = '';
  // Custom Style
  const customStyle = document.createElement('style');
  // 如果需要 ID
  if (options.id) {
    domId = `${options.id}`;
    idDom = document.getElementById(domId);
    // 如果 Dom 不存在，插入 style
    if (!idDom) {
      customStyle.setAttribute('id', options.id);
      customStyle.innerHTML = style;
      styleFrag.appendChild(customStyle);
      document.head.appendChild(styleFrag);
    } else {
      // 如果 Dom 存在，直接更新
      idDom.innerHTML = style;
    }
  } else {
    // 不需要 ID，直接添加新标签
    customStyle.innerHTML = style;
    styleFrag.appendChild(customStyle);
    document.head.appendChild(styleFrag);
  }
  return true;
}

/**
 * EN: Custom console printing (`console`).
 *
 * ZH: 生成自定义控制台打印
 *
 * Usage:
 *
 * ```javascript
 * const myConsole = genCustomConsole('MazeyLog:');
 * myConsole.log('I am string.');
 * myConsole.info('I am boolean.', true);
 * myConsole.info('I am number.', 123, 456);
 * myConsole.info('I am object.', { a: 123, b: 456});
 * ```
 *
 * Output:
 *
 * ```text
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
 * @category Debug
 */
export function genCustomConsole(
  prefix = '',
  options: {
    isClosed?: boolean;
    showWrap?: boolean;
    showDate?: boolean;
    locales?: string;
    logFn?: () => void;
    errorFn?: () => void;
  } = {
    isClosed: false,
    showWrap: false,
    showDate: false,
    locales: 'en-US',
    logFn: () => undefined,
    errorFn: () => undefined,
  }
): Console {
  const { isClosed, showWrap, showDate, locales, logFn, errorFn } = Object.assign(
    {
      isClosed: false,
      showWrap: false,
      showDate: false,
      locales: 'en-US',
      logFn: () => undefined,
      errorFn: () => undefined,
    },
    options
  );
  const methods = [ 'log', 'info', 'warn', 'error' ];
  const newConsole = Object.create(null);
  // https://stackoverflow.com/questions/3552461/how-do-i-format-a-date-in-javascript
  const formatDate = () => {
    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      // hourCycle: 'h24',
      minute: 'numeric',
      second: 'numeric',
    };
    const todayDateIns = new Date();
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
    // https://datatracker.ietf.org/doc/html/rfc4647
    const dateStr = todayDateIns.toLocaleDateString(locales, dateOptions);
    return dateStr;
  };
  methods.forEach(method => {
    newConsole[method] = function(...argu: UnknownFnParams) {
      if (isClosed) {
        return false;
      }
      let elaboratePrefix = prefix;
      let datePrefix = prefix;
      if (typeof prefix === 'string' && prefix.length >= 2) {
        const len = prefix.length;
        if (prefix[len - 1] === ':') {
          elaboratePrefix = prefix.substring(0, len - 1);
        } else {
          elaboratePrefix = prefix;
        }
      }
      if (showWrap) {
        console.log(`--- ${elaboratePrefix} - begin ---`);
      }
      if (showDate) {
        if (prefix) {
          datePrefix = `${formatDate()} ${prefix}`;
        } else {
          datePrefix = `${formatDate()}`;
        }
      }
      if (prefix || showDate) {
        console[method](datePrefix, ...argu);
      } else {
        console[method](...argu);
      }
      if (method === 'log') {
        logFn();
      }
      if (method === 'error') {
        errorFn();
      }
      if (showWrap) {
        console.log(`--- ${elaboratePrefix} - end ---`);
      }
    };
  });
  return newConsole;
}

/**
 * Verify the validity of axios response.
 *
 * Reference: [Handling Errors](https://axios-http.com/docs/handling_errors)
 *
 * @category Util
 * @hidden
 */
export function zAxiosIsValidRes(
  res: ZResResponse | undefined,
  options: ZResIsValidResOptions = {
    validStatusRange: [ 200, 300 ],
    validCode: [ 0 ],
  }
): boolean {
  const { validStatusRange, validCode } = Object.assign(
    {
      validStatusRange: [ 200, 300 ],
      validCode: [ 0 ],
    },
    options
  );
  if (validStatusRange.length !== 2) {
    console.error('valid validStatusRange is required');
  }
  let ret = false;
  if (res && res.status && validStatusRange.length === 2 && res.status >= validStatusRange[0] && res.status < validStatusRange[1]) {
    const resData = res.data;
    if (resData && validCode.includes(resData.code)) {
      ret = true;
    }
  }
  return ret;
}

/**
 * Verify the validity of a non-empty array.
 *
 * Usage:
 *
 * ```javascript
 * const ret = isNonEmptyArray([1, 2, 3]);
 * console.log(ret);
 * ```
 *
 * Output:
 *
 * ```text
 * true
 * ```
 *
 * @category Util
 */
export function isNonEmptyArray<T>(arr: Array<T>): boolean {
  let ret = false;
  if (Array.isArray(arr) && arr.length) {
    ret = true;
  }
  return ret;
}

/**
 * Determine the validity of the data.
 *
 * Usage:
 *
 * ```javascript
 * const validData = {
 *   a: {
 *     b: {
 *       c: 413
 *     }
 *   }
 * };
 * const isValidDataResA = isValidData(validData, ['a', 'b', 'c'], 2333);
 * const isValidDataResB = isValidData(validData, ['a', 'b', 'c'], 413);
 * const isValidDataResC = isValidData(validData, ['d', 'd'], 413);
 * console.log('isValidDataResA:', isValidDataResA);
 * console.log('isValidDataResB:', isValidDataResB);
 * console.log('isValidDataResC:', isValidDataResC);
 * ```
 *
 * Output:
 *
 * ```text
 * isValidDataResA: false
 * isValidDataResB: true
 * isValidDataResC: false
 * ```
 *
 * @param {any} data Original Data
 * @param {string[]} attributes Data Attributes
 * @param {any} validValue Given Value for verifying.
 * @returns {boolean} Return TRUE if the data is valid.
 * @category Util
 */
export function isValidData(data: UnknownObject, attributes: string[], validValue: SimpleType): boolean {
  let ret = false;
  if (typeof data !== 'object') {
    return ret;
  }
  const foundRet = attributes.reduce((foundValue, curr) => {
    if (typeof foundValue[curr] !== 'undefined') {
      foundValue = foundValue[curr];
    } else {
      return Object.create(null);
    }
    return foundValue;
  }, data);
  if (foundRet === validValue) {
    ret = true;
  }
  return ret;
}

/**
 * 语义化文件大小，把字节转换成正常文件大小。
 *
 * Usage:
 *
 * ```javascript
 * const ret = getFileSize(1024);
 * console.log(ret);
 * ```
 *
 * Output:
 *
 * ```text
 * 1 KB
 * ```
 *
 * @category Util
 */
export function getFileSize(size: number): string {
  const toCeilStr: (v: number) => string = n => String(Math.ceil(n));
  if (!size) return '';
  const num = 1024.0; // byte
  if (size < num) {
    return size + ' B';
  }
  if (size < Math.pow(num, 2)) {
    return toCeilStr(size / num) + ' KB';
  } // kb
  if (size < Math.pow(num, 3)) {
    return toCeilStr(size / Math.pow(num, 2)) + ' MB';
  } // M
  if (size < Math.pow(num, 4)) {
    return toCeilStr(size / Math.pow(num, 3)) + ' G';
  } // G
  return toCeilStr(size / Math.pow(num, 4)) + ' T';
}

/**
 * Detect webp support.
 *
 * Usage:
 *
 * ```javascript
 * isSupportWebp().then(res => {
 *  console.log('isSupportWebp:', res);
 * });
 * ```
 *
 * Output:
 *
 * ```text
 * isSupportWebp: true
 * ```
 *
 * Reference: [Detect WEBP Support with JavaScript](https://davidwalsh.name/detect-webp)
 *
 * @category Browser Information
 */
export function isSupportWebp(): Promise<boolean> {
  const fn = (resolve: (v: boolean) => void) => {
    const img = new Image();
    img.onload = () => {
      resolve(img.width > 0 && img.height > 0);
    };
    img.onerror = () => {
      resolve(false);
    };
    img.src = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
  };
  return new Promise(fn);
}

/**
 * Generate a Hash Code from a string.
 *
 * Usage:
 *
 * ```javascript
 * const ret = genHashCode('hello world');
 * console.log(ret);
 * ```
 *
 * Output:
 *
 * ```text
 * 1794106052
 * ```
 *
 * Reference: [Generate a Hash from string in Javascript](https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript-jquery)
 *
 * @category Util
 */
export function genHashCode(str: string): number {
  let hash = 0,
    i,
    chr;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
}

/**
 * Return the formatted date string in the given format.
 *
 * Usage:
 *
 * ```javascript
 * const ret1 = formatDate();
 * const ret2 = formatDate('Tue Jan 11 2022 14:12:26 GMT+0800 (China Standard Time)', 'yyyy-MM-dd hh:mm:ss');
 * const ret3 = formatDate(1641881235000, 'yyyy-MM-dd hh:mm:ss');
 * const ret4 = formatDate(new Date(2014, 1, 11), 'MM/dd/yyyy');
 * console.log('Default formatDate value:', ret1);
 * console.log('String formatDate value:', ret2);
 * console.log('Number formatDate value:', ret3);
 * console.log('Date formatDate value:', ret4);
 * ```
 *
 * Output:
 *
 * ```text
 * Default formatDate value: 2023-01-11
 * String formatDate value: 2022-01-11 14:12:26
 * Number formatDate value: 2022-01-11 14:07:15
 * Date formatDate value: 02/11/2014
 * ```
 *
 * @param {Date|number|string} dateIns Original Date
 * @param {string} format Format String
 * @returns {string} Return the formatted date string.
 * @category Util
 */
export function formatDate(dateIns?: Date | number | string, format = 'yyyy-MM-dd'): string {
  if (!dateIns) {
    dateIns = new Date();
  }
  const tempDate = new Date(dateIns);
  const o: {
    [key: string]: string | number;
  } = {
    yyyy: tempDate.getFullYear(),
    MM: tempDate.getMonth() + 1,
    dd: tempDate.getDate() < 10 ? '0' + tempDate.getDate() : tempDate.getDate(),
    hh: tempDate.getHours() < 10 ? '0' + tempDate.getHours() : tempDate.getHours(),
    mm: tempDate.getMinutes() < 10 ? '0' + tempDate.getMinutes() : tempDate.getMinutes(),
    ss: tempDate.getSeconds() < 10 ? '0' + tempDate.getSeconds() : tempDate.getSeconds(),
  };
  let tempFormat = format || 'yyyy-MM-dd';
  Object.keys(o).forEach(key => {
    let value = o[key];
    if (key === 'MM' && Number(value) <= 9) {
      value = `0${value}`;
    }
    tempFormat = tempFormat.replace(key, String(value));
  });
  return tempFormat;
}

/**
 * Get event container.
 *
 * Usage:
 *
 * ```javascript
 * const ret = getEventContainer();
 * ```
 *
 * @category Event
 * @hidden
 */
export function getDefineListeners(): DefineListeners {
  let defineListeners = window.MAZEY_DEFINE_LISTENERS;
  if (typeof defineListeners !== 'object') {
    defineListeners = {};
    window.MAZEY_DEFINE_LISTENERS = defineListeners;
  }
  return defineListeners;
}

/**
 * Add event.
 *
 * Usage:
 *
 * ```javascript
 * addEvent('test', (e) => {
 *  console.log('test event:', e);
 * });
 * ```
 *
 * @param type
 * @param fn
 * @category Event
 */
export function addEvent(type: string, fn: UnknownFn): void {
  const defineListeners = getDefineListeners();
  if (typeof defineListeners[type] === 'undefined') {
    defineListeners[type] = [];
  }
  if (typeof fn === 'function') {
    defineListeners[type].push(fn);
  }
}

/**
 * Invoke event.
 *
 * Usage:
 *
 * ```javascript
 * invokeEvent('test');
 * ```
 *
 * @param type
 * @category Event
 */
export function invokeEvent(type: string): void {
  const defineListeners = getDefineListeners();
  const arrayEvent = defineListeners[type];
  if (arrayEvent instanceof Array) {
    for (let i = 0, length = arrayEvent.length; i < length; i++) {
      if (typeof arrayEvent[i] === 'function') {
        arrayEvent[i]({
          type: type,
        });
      }
    }
  }
}

/**
 * Remove event.
 *
 * Usage:
 *
 * ```javascript
 * removeEvent('test');
 * ```
 *
 * @param type
 * @param fn
 * @category Event
 */
export function removeEvent(type: string, fn: UnknownFn): void {
  const defineListeners = getDefineListeners();
  const arrayEvent = defineListeners[type];
  if (typeof type === 'string' && arrayEvent instanceof Array) {
    if (typeof fn === 'function') {
      for (let i = 0, length = arrayEvent.length; i < length; i++) {
        if (arrayEvent[i] === fn) {
          defineListeners[type].splice(i, 1);
          break;
        }
      }
    } else {
      delete defineListeners[type];
    }
  }
}

/**
 * Checks if the given string is a valid URL, including **scheme URLs**.
 *
 * Usage:
 *
 * ```javascript
 * const ret1 = isValidUrl('https://www.example.com');
 * const ret2 = isValidUrl('http://example.com/path/exx/ss');
 * const ret3 = isValidUrl('https://www.example.com/?q=hello&age=24#world');
 * const ret4 = isValidUrl('http://www.example.com/#world?id=9');
 * const ret5 = isValidUrl('ftp://example.com');
 * console.log(ret1, ret2, ret3, ret4, ret5);
 * ```
 *
 * Output:
 *
 * ```text
 * true true true true true
 * ```
 *
 * @remarks
 * If you are specifically checking for HTTP/HTTPS URLs, it is recommended to use the `isValidHttpUrl` function instead.
 * The `isValidUrl` function matches all scheme URLs, including FTP and other non-HTTP schemes.
 *
 * @param url - The URL to check.
 * @returns Returns `true` if the given string is a valid URL, else `false`.
 * @category URL
 */
export function isValidUrl(url: string): boolean {
  const reg = /^[a-zA-Z0-9]+:\/\/[-a-zA-Z0-9@:%._+~#=]{1,256}\b([-a-zA-Z0-9\u4E00-\u9FA5()!@:%_+.~#?&//=]*)$/;
  return reg.test(url);
}

/**
 * Check if the given string is a valid HTTP/HTTPS URL.
 *
 * Usage:
 *
 * ```javascript
 * const ret1 = isValidHttpUrl('https://www.example.com');
 * const ret2 = isValidHttpUrl('http://example.com/path/exx/ss');
 * const ret3 = isValidHttpUrl('https://www.example.com/?q=hello&age=24#world');
 * const ret4 = isValidHttpUrl('http://www.example.com/#world?id=9');
 * const ret5 = isValidHttpUrl('//example.com/a/b/c?q=1', { strict: false });
 * const ret6 = isValidHttpUrl('ftp://example.com');
 * console.log(ret1, ret2, ret3, ret4, ret5, ret6);
 * ```
 *
 * Output:
 *
 * ```text
 * true true true true true false
 * ```
 *
 * @param url
 * @param options.strict - If `true`, the function only matches standard HTTP/HTTPS URLs. Default is `true`. If `false`, the function also matches protocol-relative URLs, such as `//example.com`.
 * @returns {boolean} Return true if the given string is a valid HTTP/HTTPS URL.
 * @category URL
 */
export function isValidHttpUrl(url: string, options: { strict: boolean } = { strict: true }): boolean {
  let reg = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9\u4E00-\u9FA5()!@:%_+.~#?&//=]*)/;
  if (!options.strict) {
    reg = /^(https?:)?\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9\u4E00-\u9FA5()!@:%_+.~#?&//=]*)/;
  }
  return reg.test(url);
}

/**
 * Check if the given string is a mobile phone number.
 *
 * Usage:
 *
 * ```javascript
 * const ret1 = isMobile('13800138000');
 * const ret2 = isMobile('1380013800');
 * const ret3 = isMobile('138001380000');
 * const ret4 = isMobile('1380013800a');
 * console.log(ret1, ret2, ret3, ret4);
 * ```
 *
 * Output:
 *
 * ```text
 * true false false false
 * ```
 *
 * @param mobile
 * @returns {boolean} Return true if the given string is a mobile phone number.
 * @category Util
 */
export function isValidPhoneNumber(mobile: string): boolean {
  const reg = /^1\d{10}$/;
  return reg.test(mobile);
}

/**
 * Check if the given string is a valid email.
 *
 * Usage:
 *
 * ```javascript
 * const ret = isValidEmail('mazeyqian@gmail.com');
 * console.log(ret);
 * ```
 *
 * Output:
 *
 * ```text
 * true
 * ```
 *
 * @param email
 * @returns {boolean} Return true if the given string is a valid email.
 * @category Util
 */
export function isValidEmail(email: string): boolean {
  const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
}

/**
 * Convert a given 10-hex number to a lowercase 26-hex string.
 *
 * Usage:
 *
 * ```javascript
 * const ret1 = convert10To26(1);
 * const ret2 = convert10To26(26);
 * const ret3 = convert10To26(27);
 * const ret4 = convert10To26(52);
 * const ret5 = convert10To26(53);
 * console.log(ret1, ret2, ret3, ret4, ret5);
 * ```
 *
 * Output:
 *
 * ```text
 * a z aa az ba
 * ```
 *
 * @param {number} num
 * @returns {string} Return a lowercase 26-hex string.
 * @category Util
 */
export function convert10To26(num: number): string {
  let result = '';
  while (num > 0) {
    let remainder = num % 26;
    if (remainder === 0) {
      remainder = 26;
    }
    result = String.fromCharCode(remainder + 96) + result;
    num = (num - remainder) / 26;
  }
  return result;
}

/**
 * EN: Get the file type of the url.
 *
 * ZH: 获取文件后缀名
 *
 * Usage:
 *
 * ```javascript
 * const ret1 = getUrlFileType('https://example.com/a/b/c.png');
 * const ret2 = getUrlFileType('https://example.com/a/b/c.jpg');
 * const ret3 = getUrlFileType('https://example.com/a/b/c.jpeg');
 * const ret4 = getUrlFileType('/a/b/c.jpeg');
 * const ret5 = getUrlFileType('https://example.com/a/b/c.v/a');
 * console.log(ret1, ret2, ret3, ret4, ret5);
 * ```
 *
 * Output:
 *
 * ```text
 * png jpg jpeg jpeg ''
 * ```
 *
 * @param url
 * @returns
 * @category URL
 */
export function getUrlFileType(url: string): boolean | string {
  let ret = '';
  if (typeof url != 'string' || url == '') {
    return ret;
  }
  const type = /\.[^/?#]+$/.exec(url);
  if (!type) {
    return ret;
  }
  if (type[0].length > 1) {
    ret = type[0].substring(1);
  }
  return ret;
}

/**
 * Sets the width and height of all images on the page based on their `src` attribute.
 * The `src` attribute should contain `width` and/or `height` values in the format "width=100" or "height=100".
 * If jQuery is available, this function uses jQuery to select the images. Otherwise, it uses pure JavaScript.
 *
 * Usage:
 *
 * ```javascript
 * // Example images with `src` attributes containing `width` and/or `height` values
 * const img1 = document.createElement('img');
 * img1.setAttribute('src', 'https://example.com/example.png?width=2233&height=111');
 * document.body.appendChild(img1);
 *
 * const img2 = document.createElement('img');
 * img2.setAttribute('src', 'https://example.com/example.png?width=100%&height=auto');
 * document.body.appendChild(img2);
 * ```
 *
 * @returns {boolean} - Returns `true` if images were found and their dimensions were set, otherwise `false`.
 * @category DOM
 */
export function setImgWidHeiBySrc(): boolean {
  // Use jQuery if available, otherwise fall back to pure JavaScript
  const $ = window.jQuery || window.$;
  if ($) {
    // Use jQuery to select all images on the page
    const images = $('img');
    if (!(images && images.length)) return false;
    images.each(function() {
      const $this = $(this);
      if (!$this) return;
      // Get the `src` attribute of the image
      const src = $this.attr('src');
      const canMatch = src && typeof src === 'string' && src.length;
      if (!canMatch) return;
      // Use regular expressions to extract the `width` and `height` values from the `src` attribute
      const width = src.match(/width=([0-9]+[a-z%]*)/);
      const height = src.match(/height=([0-9]+[a-z%]*)/);
      // Set the width and height of the image using jQuery's `width()` and `height()` methods
      if (width && isNonEmptyArray(width) && width[1]) $this.width(width[1]);
      if (height && isNonEmptyArray(height) && height[1]) $this.height(height[1]);
    });
    return true;
  } else {
    // Use pure JavaScript to select all images on the page
    const images = document.getElementsByTagName('img');
    if (images.length > 0) {
      // Loop through each image and set its width and height based on the `src` attribute
      Array.from(images).forEach(function(img) {
        const $this = img;
        if (!$this) return;
        // Get the `src` attribute of the image
        const src = $this.getAttribute('src');
        const canMatch = src && typeof src === 'string' && src.length;
        if (!canMatch) return;
        // Use regular expressions to extract the `width` and `height` values from the `src` attribute
        const width = src.match(/width=([0-9]+[a-z%]*)/);
        const height = src.match(/height=([0-9]+[a-z%]*)/);
        // Set the width and height of the image using the `style.width` and `style.height` properties
        if (width && isNonEmptyArray(width) && width[1]) $this.style.width = width[1];
        if (height && isNonEmptyArray(height) && height[1]) $this.style.height = height[1];
      });
      return true;
    }
  }
  return false;
}

/**
 * Generate the inline style string from the given parameters. The first parameter is the query selector, and the second parameter is the style array.
 *
 * Usage:
 *
 * ```javascript
 * const ret1 = genStyleString('.a', [ 'color:red' ]);
 * const ret2 = genStyleString('#b', [ 'color:red', 'font-size:12px' ]);
 * console.log(ret1);
 * console.log(ret2);
 * ```
 *
 * Output:
 *
 * ```text
 * .a{color:red;}
 * #b{color:red;font-size:12px;}
 * ```
 *
 * @param {string} selector
 * @param {array} styleArray
 * @returns {string} The inline style string.
 * @category DOM
 */
export function genStyleString(selector: string, styleArray: Array<string>): string {
  let style = '';
  if (styleArray && styleArray.length > 0) {
    style = styleArray.join(';') + ';';
  }
  return `${selector}{${style}}`;
}

/**
 * Load an image from the given URL.
 *
 * The target image will be loaded in the background, and the Promise status will change after the image is loaded. If the image fails to load, the Promise status will change to `reject` with the error object. If the image is loaded successfully, the Promise status will change to `resolve` with the image object. This method can be used to preload images and cache them in the browser. It can also be used to implement lazy loading of images.
 *
 * Note that this method will not add the image to the DOM.
 *
 * Usage:
 *
 * ```javascript
 * loadImage('https://example.com/example.png')
 *   .then((img) => {
 *     console.log(img);
 *   })
 *   .catch((err) => {
 *     console.log(err);
 *   });
 * ```
 *
 * @param {string} url - The URL of the image to load.
 * @returns {Promise} A Promise that resolves with the loaded image or rejects with an error.
 * @category Load Resource
 */
export function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve(img);
    };
    img.onerror = err => {
      reject(err);
    };
    img.src = url;
  });
}

/**
 * Get the current version.
 *
 * @hidden
 */
export function getCurrentVersion(): string {
  return 'v3';
}

/**
 * Repeatedly fires a callback function with a certain interval until a specified condition is met.
 *
 * Usage:
 *
 * ```javascript
 * repeatUntilConditionMet(
 *   () => {
 *     console.log('repeatUntilConditionMet');
 *     return true;
 *   }, {
 *     interval: 1000,
 *     times: 10,
 *     context: null,
 *     args: [],
 *   }, (result) => {
 *     return result === true;
 *   }
 * );
 * ```
 *
 * @param callback The callback function to fire.
 * @param options An object containing the options for the function.
 * @param options.interval The interval between each firing of the callback function, in milliseconds. Defaults to 1000.
 * @param options.times The maximum number of times to fire the callback function. Defaults to 10.
 * @param options.context The context to use when calling the callback function. Defaults to null.
 * @param options.args An array of arguments to pass to the callback function.
 * @param condition A function that takes the result of the callback function as its argument and returns a boolean value indicating whether the condition has been met. Defaults to a function that always returns true.
 * @category Util
 */
export function repeatUntilConditionMet<T extends (...args: UnknownFnParams) => UnknownFnReturn>(
  callback: T,
  options: RepeatUntilOptions = {},
  condition: (result: ReturnType<T>) => boolean = res => {
    return res === true;
  }
): void {
  const { interval = 1000, times = 10, context, args } = options;
  let count = 0;

  const clearAndInvokeNext = () => {
    setTimeout(async () => {
      const result = await callback.apply(context, args as UnknownFnParams);
      if (condition(result) || ++count >= times) {
        return;
      }
      clearAndInvokeNext();
    }, interval);
  };

  if (typeof callback !== 'function') {
    console.error('Expected a function.');
  }

  if (typeof interval !== 'number' || interval < 0) {
    console.error('Expected a non-negative number for interval.');
  }

  if (typeof times !== 'number' || times < 0) {
    console.error('Expected a non-negative number for times.');
  }

  clearAndInvokeNext();
}

/**
 * Load a script from the given URL if it (`window['attribute']`) has not already been loaded.
 *
 * Usage:
 *
 * ```javascript
 * loadScriptIfUndefined('xyz', 'https://example.com/lib/jquery.min.js')
 *   .then(() => {
 *     console.log('xyz is loaded.');
 *   })
 *   .catch(err => {
 *     console.log('Failed to load xyz.', err);
 *   });
 * ```
 *
 * Output:
 *
 * ```text
 * xyz is loaded.
 * ```
 *
 * @param {string} windowAttribute - The name of the window attribute to check (e.g. `jQuery`, `axios`, etc.).
 * @param {string} url - The URL of the script to load.
 * @returns {Promise} A Promise that resolves when the script has been loaded.
 * @category Load Resource
 */
export function loadScriptIfUndefined(windowAttribute: string, url: string): LoadScriptReturns {
  if ((window as UnknownWindow)[windowAttribute]) {
    return Promise.resolve('defined');
  }
  return loadScript(url);
}

/**
 * Retrieve a query parameter from a script URL in the browser.
 *
 * Usage:
 *
 * ```javascript
 * const ret = getScriptQueryParam('test', 'https://example.com/example.js');
 * console.log(ret);
 * ```
 *
 * Output:
 *
 * ```text
 * hello
 * ```
 *
 * @param param - The name of the query parameter to retrieve.
 * @param matchString - An optional substring to match in the script URL.
 *                      If not provided, defaults to matching the ".js" substring.
 * @returns The decoded value of the specified query parameter, or an empty string if no matching parameter is found.
 * @category URL
 */
export function getScriptQueryParam(param: string, matchString = ''): string {
  if (!matchString) {
    matchString = '.js';
  }
  const paramRegExp = new RegExp(`[?&]${param}=([^&]*)`);
  const scriptTags = document.querySelectorAll(`script[src*="${matchString}"]`);
  for (let i = 0; i < scriptTags.length; i++) {
    const src = scriptTags[i].getAttribute('src');
    if (src && src.indexOf(matchString) !== -1) {
      const match = src.match(paramRegExp);
      if (match) {
        return decodeURIComponent(match[1]);
      }
    }
  }
  return '';
}

/**
 * Wait for a specified amount of time.
 *
 * Usage:
 *
 * ```javascript
 * waitTime(1000).then((time) => {
 *  console.log('waitTime:', time);
 * });
 * ```
 *
 * Output:
 *
 * ```text
 * waitTime: 1000
 * ```
 *
 * @param time The amount of time to wait, in milliseconds.
 * @returns A Promise that resolves after the specified time has elapsed.
 * @category Util
 */
export async function waitTime(time: number): Promise<number> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(time);
    }, time);
  });
}

/**
 * Alias of `waitTime`.
 *
 * @hidden
 */
export async function sleep(time: number): Promise<number> {
  return waitTime(time);
}
