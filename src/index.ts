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
 * longestComSubstring('fish', 'finish');
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
 * @category Calculate and Formula
 */
export function longestComSubstring(aStr: string, bStr: string): number {
  const aLen = aStr.length;
  const bLen = bStr.length;
  // 创建二维数组并且深拷贝
  const arr = deepCopyObject(new Array(aLen).fill(new Array(bLen).fill(0)));
  for (let i = 0; i < aLen; ++i) {
    for (let j = 0; j < bLen; ++j) {
      if (aStr[i] === bStr[j]) {
        let baseNum = 0;
        if (i > 0 && j > 0) {
          baseNum = arr[i - 1][j - 1];
        }
        arr[i][j] = baseNum + 1;
      }
    }
  }
  // 二维数组转一维数组
  const arr1 = Array.prototype.concat.apply([], arr);
  // 获取最长公共子串
  const maxLong = Math.max(...arr1);
  return maxLong;
}

/**
 * Alias of `longestComSubstring`
 *
 * @hidden
 */
export function calLongestCommonSubstring(aStr: string, bStr: string): number {
  return longestComSubstring(aStr, bStr);
}

/**
 * EN: Computes the longest common subsequence of two strings.
 *
 * ZH: 计算两个字符串的最长公共子序列
 *
 * Usage:
 *
 * ```
 * longestComSubsequence('fish', 'finish');
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
 * @category Calculate and Formula
 */
export function longestComSubsequence(aStr: string, bStr: string): number {
  const aLen = aStr.length;
  const bLen = bStr.length;
  // 创建二维数组并且深拷贝
  const arr = deepCopyObject(new Array(aLen).fill(new Array(bLen).fill(0)));
  for (let i = 0; i < aLen; ++i) {
    for (let j = 0; j < bLen; ++j) {
      if (aStr[i] === bStr[j]) {
        let baseNum = 0;
        if (i > 0 && j > 0) {
          baseNum = arr[i - 1][j - 1];
        }
        arr[i][j] = baseNum + 1;
      } else {
        let [leftValue, topValue] = [0, 0];
        if (j > 0) {
          leftValue = arr[i][j - 1];
        }
        if (i > 0) {
          topValue = arr[i - 1][j];
        }
        arr[i][j] = Math.max(leftValue, topValue);
      }
    }
  }
  // 二维数组转一维数组
  const arr1 = Array.prototype.concat.apply([], arr);
  // 获取最长公共子串
  const maxLong = Math.max(...arr1);
  return maxLong;
}

/**
 * Alias of `longestComSubsequence`
 *
 * @hidden
 */
export function calLongestCommonSubsequence(
  aStr: string,
  bStr: string
): number {
  return longestComSubsequence(aStr, bStr);
}

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
 * @category URL
 */
export function getQueryParam(param: string): string {
  const reg = new RegExp('(^|&)' + param + '=([^&]*)(&|$)');
  const r = location.search.substring(1).match(reg);
  if (r !== null) {
    // return decodeURIComponent(unescape(r[2]));
    return decodeURIComponent(r[2]);
  }
  return '';
}

/**
 * Returns the value of the specified query parameter in the input URL.
 *
 * @example
 * ```
 * getUrlParam('http://example.com/?t1=1&t2=2&t3=3&t4=4', 't3'); // Returns '3'
 * getUrlParam('http://example.com/?t1=1&t2=2&t3=3&t4=4', 't4'); // Returns '4'
 * ```
 *
 * @param {string} url The URL string.
 * @param {string} param The query parameter to retrieve the value for.
 * @returns {string|string[]} The value of the specified query parameter, or an empty string if the parameter is not found.
 * @category URL
 */
export function getUrlParam(url: string, param: string): string | string[] {
  const result: UrlParams = {};
  url.replace(/\??(\w+)=([^&]*)&?/g, function(
    _: string,
    k: string,
    v: string
  ): string {
    if (result[k] !== undefined) {
      const t = result[k];
      // Cast `t` to `string[]` to ensure that `concat` receives an array
      result[k] = ([] as string[]).concat(t, v);
    } else {
      result[k] = v;
    }
    // Return an empty string to satisfy the signature of the replace method
    return '';
  });
  return result[param] || '';
}

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
 * @category URL
 */
export function updateQueryParam(
  url: string,
  param: string,
  value: string
): string {
  const re = new RegExp('([?&])' + param + '=.*?(&|$)', 'i');
  const separator = url.indexOf('?') !== -1 ? '&' : '?';
  if (url.match(re)) {
    return url.replace(re, '$1' + param + '=' + value + '$2');
  } else {
    return url + separator + param + '=' + value;
  }
}

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
 * @category URL
 */
export function getHashQueryParam(param: string): string {
  const hashs = location.hash.split('?');
  if (hashs.length === 1) {
    return '';
  }
  const reg = new RegExp(`(^|&)${param}=([^&]*)(&|$)`);
  const ret = hashs[1].match(reg);
  return ret ? ret[2] : '';
}

/**
 * Get the domain of URL, and other params.
 *
 * Usage:
 *
 * ```
 * getDomain('http://example.com/?t1=1&t2=2&t3=3&t4=4');
 * getDomain('http://example.com/test/thanks?t1=1&t2=2&t3=3&t4=4', ['hostname', 'pathname']);
 * getDomain('http://example.com:7890/test/thanks', ['hostname']);
 * getDomain('http://example.com:7890/test/thanks', ['host']); // With Port
 * getDomain('http://example.com:7890/test/thanks', ['origin']);
 * getDomain('http://example.com:7890/test/thanks?id=1', ['origin', 'pathname', 'search']);
 * ```
 *
 * Output:
 *
 * ```
 * example.com
 * example.com/test/thanks
 * example.com
 * example.com:7890
 * http://example.com:7890
 * http://example.com:7890/test/thanks?id=1
 * ```
 *
 * @param {string} url
 * @param {array} rules Object.keys(location), ['href', 'origin', 'protocol', 'host', 'hostname', 'port', 'pathname', 'search', 'hash'], ['hostname', 'pathname'] = 'km.mazey.net/plugins/servlet/mobile'
 * @category URL
 */
export function getDomain(url: string, rules = ['hostname']): string {
  const aEl: HTMLAnchorElement = document.createElement('a');
  aEl.href = url;
  return rules.reduce((ret, v) => {
    ret += aEl[v as keyof HTMLAnchorElement];
    return ret;
  }, '');
}

/**
 * Transfer CamelCase to KebabCase.
 *
 * ```
 * convertCamelToKebab('ABC'); // a-b-c
 * convertCamelToKebab('aBC'); // a-b-c
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
 * ```
 * convertCamelToUnder('ABC'); // a_b_c
 * convertCamelToUnder('aBC'); // a_b_c
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
 * ```
 * mTrim(' 1 2 3 '); // '1 2 3'
 * mTrim('abc '); // 'abc'
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
 * Make a newline of HTML.
 *
 * ```
 * newLine('a\nb\nc'); // 'a<br />b<br />c'
 * newLine('a\n\nbc'); // 'a<br /><br />bc'
 * ```
 *
 * @param {string} str The string to make a newline.
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
 * Copy/Clone Object deeply.
 *
 * Usage:
 *
 * ```
 * deepCopy(['a', 'b', 'c']);
 * deepCopy('abc');
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
 * @category Util
 */
export function deepCopy<T>(obj: T): T {
  // Jugde whether it is a primitive type
  if (typeof obj !== 'object') {
    return obj;
  }
  // Judge whether its key-value is simple type, string | number | boolean | null | undefined
  // ...rest
  const simpleTypes = ['string', 'number', 'boolean', 'undefined'];
  const values = Object.values(obj as simpleObject);
  const isSimpleTypeObj = values.every(v => simpleTypes.includes(typeof v));
  if (isSimpleTypeObj) {
    // console.log('it is isSimpleTypeObj');
    return {
      ...obj
    };
  }
  // console.log('it is not isSimpleTypeObj');
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Alias of `deepCopy`
 *
 * @hidden
 */
export function deepCopyObject<T>(obj: T): T {
  return deepCopy(obj);
}

/**
 * Check whether it is a valid JSON string.
 *
 * Usage:
 *
 * ```
 * isJSONString(`['a', 'b', 'c']`);
 * isJSONString(`["a", "b", "c"]`);
 * ```
 *
 * Output:
 *
 * ```
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
 * ```
 * genRndNumString(4); // '9730'
 * genRndNumString(7); // '2262490'
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
 * 根据时间生成唯一标志的数字 genUniqueNumString() => 1538324722364123
 *
 * @param {number} n 随机数的长度
 * @category Util
 */
// export function generateUniqueNum(n = 3): string {
export function genUniqueNumString(n = 3): string {
  const [now, rnd] = [mNow(), generateRndNum(n || 3)];
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
 * @category Util
 */
export function floatFixed(num: string, size = 0): string {
  return parseFloat(num).toFixed(size);
}

/**
 * 阻止冒泡
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
 * ```
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
 * ```
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
 * ```
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
 * ```
 * const foo = throttle(() => {
 *   console.log('The function will be invoked at most once per every wait 1000 milliseconds.');
 * }, 1000, { leading: true });
 * ```
 *
 * Reference: [Lodash](https://lodash.com/docs/4.17.15#throttle)
 *
 * @category Util
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options: { leading?: boolean; trailing?: boolean } = {}
): ThrottleFunc<T> {
  options = Object.assign({}, options);
  let context: unknown | null = null;
  let args: Parameters<T> | null = null;
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let [result, previous] = [null, 0];
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
 * ```
 * const foo = debounce(() => {
 *   console.log('The debounced function will only be invoked in 1000 milliseconds, the other invoking will disappear during the wait time.');
 * }, 1000, true);
 * ```
 *
 * @category Util
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate?: boolean
): DebounceFunc<T> {
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
  type: 'd'
};

/**
 * 获取间隔时间
 *
 * @example
 * ```js
 * console.log('getFriendlyInterval:', getFriendlyInterval(new Date('2020-03-28 00:09:27'), new Date('2023-04-18 10:54:00'), { type: 'd' })); // 1116
 * console.log('getFriendlyInterval:', getFriendlyInterval(1585325367000, 1681786440000, { type: 'text' })); // 1116 天 10 时 44 分 33 秒
 * console.log('getFriendlyInterval:', getFriendlyInterval('2020-03-28 00:09:27', '2023-04-18 10:54:00', { type: 'text' })); // 1116 天 10 时 44 分 33 秒
 * ```
 *
 * @param {number/Date} start 开始时间戳 1585325367122
 * @param {number/Date} end 结束时间戳 1585325367122
 * @param {string} options.type 返回类型 d: 2(天) text: 2 天 4 时...
 * @returns {string/number} 取决于 type
 * @category Util
 */
export function getFriendlyInterval(
  start: number | string | Date = 0,
  end: number | string | Date = 0,
  options: { type?: string } = defaultGetFriendlyIntervalOptions
): number | string {
  options = Object.assign(defaultGetFriendlyIntervalOptions, options);
  const { type } = options;
  if (!isNumber(start)) start = new Date(start).getTime();
  if (!isNumber(end)) end = new Date(end).getTime();
  const t = Number(end) - Number(start);
  let ret = '';
  let [d, h, m, s] = new Array(4).fill(0);
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
        ret = d + ' 天 ' + h + ' 时 ' + m + ' 分 ' + s + ' 秒';
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
 * ```
 * isNumber(123); // true
 * isNumber('123'); // false
 * // Default: NaN, Infinity is not Number
 * isNumber(Infinity); // false
 * isNumber(Infinity, { isInfinityAsNumber: true }); // true
 * isNumber(NaN); // false
 * isNumber(NaN, { isNaNAsNumber: true, isInfinityAsNumber: true }); // true
 * ```
 *
 * @param {*} num 被判断的值
 * @param {boolean} options.isNaNAsNumber 是否 NaN 算数字（默认不算）
 * @param {boolean} options.isInfinityAsNumber 是否 无限 算数字（默认不算）
 * @returns {boolean} true 是数字
 * @category Util
 */
export function isNumber(num: unknown, options: IsNumberOptions = {}): boolean {
  const {
    isNaNAsNumber = false,
    isInfinityAsNumber = false,
    isUnFiniteAsNumber = false
  } = options;
  if (typeof num !== 'number') {
    return false;
  }
  if (
    !(isInfinityAsNumber === true || isUnFiniteAsNumber === true) &&
    !isFinite(num)
  ) {
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
 * @param {function} fn 等待被执行的未知是否有效的函数
 * @category Util
 */
export function doFn(
  fn: AnyFunction,
  ...params: Parameters<AnyFunction>
): ReturnType<AnyFunction> | null {
  let ret: ReturnType<AnyFunction> | null = null;
  if (fn && typeof fn === 'function') {
    ret = fn(...params);
  }
  return ret;
}

/**
 * EN: Handle Storage (Keep fit for JSON, it can tansfer format automatically).
 *
 * ZH: 存储/获取数据到 sessionStorage/localStorage
 *
 * ```
 * setSessionStorage('test', '123');
 * getSessionStorage('test'); // 123
 * setLocalStorage('test', '123');
 * getLocalStorage('test'); // 123
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
 * @param {string} key 键
 * @returns {void} 返回值
 * @category Cache Data
 */
export function setSessionStorage<T>(
  key: string,
  value: T | null = null
): void {
  if (key) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
}

/**
 * EN: Handle Storage (Keep fit for JSON, it can tansfer format automatically).
 *
 * ZH: 存储/获取数据到 sessionStorage/localStorage
 *
 * ```
 * setSessionStorage('test', '123');
 * getSessionStorage('test'); // 123
 * setLocalStorage('test', '123');
 * getLocalStorage('test'); // 123
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
 * EN: Handle Storage (Keep fit for JSON, it can tansfer format automatically).
 *
 * ZH: 存储/获取数据到 sessionStorage/localStorage
 *
 * ```
 * setSessionStorage('test', '123');
 * getSessionStorage('test'); // 123
 * setLocalStorage('test', '123');
 * getLocalStorage('test'); // 123
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
 * EN: Handle Storage (Keep fit for JSON, it can tansfer format automatically).
 *
 * ZH: 存储/获取数据到 sessionStorage/localStorage
 *
 * ```
 * setSessionStorage('test', '123');
 * getSessionStorage('test'); // 123
 * setLocalStorage('test', '123');
 * getLocalStorage('test'); // 123
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
 * @param {string} key 键
 * @returns {any} 返回值
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
 * ```
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
 * @param {string} url -- css资源路径
 * @param {string} options.id -- link标签id
 * @returns {Promise<string>} true -- 加载成功
 * @category Load Resource
 */
export function loadCSS(
  url: string,
  options: { id?: string } = { id: '' }
): Promise<boolean | Error | any> {
  const { id } = options;
  let success: (v: boolean | string) => void;
  let fail: (v: Error) => void;
  const status = new Promise((resolve, reject) => {
    [success, fail] = [resolve, reject];
  });
  // const tempCB = (typeof callback === 'function' ? callback : function () { });
  const callback = function() {
    // doFn(success, true);
    success('loaded');
  };
  let node: any = document.createElement('link');
  const supportOnload = 'onload' in node;
  const isOldWebKit =
    +navigator.userAgent.replace(
      /.*(?:AppleWebKit|AndroidWebKit)\/?(\d+).*/i,
      '$1'
    ) < 536; // webkit旧内核做特殊处理
  const protectNum = 300000; // 阈值10分钟，一秒钟执行pollCss 500次

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
      if (/loaded|complete/.test(node.readyState)) {
        onload();
      }
    };
  }

  function onload() {
    // 确保只跑一次下载操作
    node.onload = node.onerror = node.onreadystatechange = null;

    // 清空node引用，在低版本IE，不清除会造成内存泄露
    node = null;

    callback();
  }

  // 循环判断css是否已加载成功
  /*
   * @param node -- link节点
   * @param callback -- 回调函数
   * @param step -- 计步器，避免无限循环
   */
  function pollCss(node: any, callback: any, step: number) {
    const sheet = node.sheet;
    let isLoaded: any;

    step += 1;

    // 保护，大于10分钟，则不再轮询
    if (step > protectNum) {
      isLoaded = true;

      // 清空node引用
      node = null;

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
        // 火狐特殊版本，通过特定值获知是否下载成功
        // The value of `ex.name` is changed from "NS_ERROR_DOM_SECURITY_ERR"
        // to "SecurityError" since Firefox 13.0. But Firefox is less than 9.0
        // in here, So it is ok to just rely on "NS_ERROR_DOM_SECURITY_ERR"
        if ((ex as any).name === 'NS_ERROR_DOM_SECURITY_ERR') {
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
 * @returns {Promise<string>} -- true 成功
 * @category Load Resource
 */
export function loadScript(
  url: string,
  options: {
    id?: string;
    callback?: (...params: any[]) => any;
    timeout?: number;
    isDefer?: boolean;
  } = {
    id: '',
    callback: function() {
      /* pass */
    },
    timeout: 5000,
    isDefer: false
  }
): LoadScriptReturns {
  const { id, callback, timeout, isDefer } = Object.assign(
    {
      id: '',
      callback: function() {
        /* pass */
      },
      timeout: 5000,
      isDefer: false
    },
    options
  );
  let success: any = null;
  let fail: any = null;
  const script: any = document.createElement('script');
  // 如果没有 script 标签，那么代码就不会运行。可以利用这一事实，在页面的第一个 script 标签上使用 insertBefore()。
  const firstScript: any = document.getElementsByTagName('script')[0];
  script.type = 'text/javascript';
  if (isDefer) {
    script.defer = 'defer';
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
    [success, fail] = [resolve, reject];
    if (timeout) {
      setTimeout(fail.bind(null, 'timeout'), timeout);
    }
  });
}

/**
 * 获取时间戳
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
 * ```
 * setCookie('test', '123', 30, 'example.com'); // key value day domain
 * getCookie('test'); // 123
 * ```
 *
 * @category Cache Data
 */
export function setCookie(
  name: string,
  value: string,
  days?: number,
  domain?: string
): void {
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
    document.cookie =
      name + '=' + value + expires + '; path=/; domain=' + domain;
    // check if cookie was successfuly set to the given domain
    // (otherwise it was a Top-Level Domain)
    if (getCookie(name) === null || getCookie(name) !== value) {
      // append "." to current domain
      domain = domain || '.' + host;
      document.cookie =
        name + '=' + value + expires + '; path=/; domain=' + domain;
    }
  }
}

/**
 * EN: Handle Cookie.
 *
 * ZH: 设置/获取 Cookie
 *
 * ```
 * setCookie('test', '123', 30, 'example.com'); // key value day domain
 * getCookie('test'); // 123
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
 * @param name - The name of the cookie to delete.
 * @returns `true` if the cookie was deleted successfully, `false` otherwise.
 * @category Cache Data
 */
export function delCookie(name: string): boolean {
  try {
    setCookie(name, '', -1, '');
    return true;
  } catch (error) {
    console.error(`Error deleting cookie "${name}"`);
    return false;
  }
}

/**
 * @hidden
 */
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
export function getPerformance(
  camelCase = false
): Promise<WebPerformance | Error> {
  let success: (v: WebPerformance) => void;
  let fail: (v: Error) => void;
  const status: Promise<WebPerformance> = new Promise((resolve, reject) => {
    [success, fail] = [resolve, reject];
  });
  const timing = window.performance.timing;
  const startTime = timing.navigationStart || timing.fetchStart;
  let firstPaintTime: any;
  let firstContentfulPaintTime: any;
  // 是否已经形成数据（页面加载完成之后）
  if (
    window.performance &&
    window.performance.timing &&
    window.performance.timing.loadEventEnd > 0
  ) {
    // console.log('created')
    getTiming();
  } else {
    // console.log('creating')
    window.addEventListener('load', function() {
      //不能影响最后的时间计算
      window.setTimeout(function() {
        getTiming();
      }, 0);
    });
  }
  // performance
  function getTiming() {
    // 获取首次渲染时间
    try {
      if (window.performance && Boolean(window.performance.getEntriesByType)) {
        const performance = window.performance;
        const performanceEntries = performance.getEntriesByType('paint');
        performanceEntries.forEach((performanceEntry, i, entries) => {
          const startTime = Math.round(performanceEntry.startTime);
          if (performanceEntry.name === 'first-paint')
            firstPaintTime = startTime;
          else if (performanceEntry.name === 'first-contentful-paint')
            firstContentfulPaintTime = startTime;
        });
      } else {
        console.error('paint');
      }
    } catch (e) {
      console.error((e as any).message);
    }
    // 获取加载时间
    if (
      window.performance &&
      typeof window.performance.getEntries === 'function'
    ) {
      const performanceNavigationTiming: any =
        (window.performance.getEntries() || [])[0] || {};
      const data: any = {
        // url: encodeURI(location.href),
        // ua: navigator.userAgent,
        os: getOS(),
        osVersion: getOSVersion(),
        deviceType: getDeviceType(),
        network: getNetWork(),
        screenDirection: getOrientationStatu(),
        unloadTime: timing.unloadEventEnd - timing.unloadEventStart, //上个文档的卸载时间
        redirectTime: timing.redirectEnd - timing.redirectStart, //*重定向时间
        dnsTime: timing.domainLookupEnd - timing.domainLookupStart, //*DNS查询时间
        tcpTime: timing.connectEnd - timing.connectStart, //*服务器连接时间
        sslTime: getSSLTime(timing.connectEnd, timing.secureConnectionStart), //*ssl连接时间
        responseTime: timing.responseStart - timing.requestStart, //*服务器响应时间
        downloadTime: timing.responseEnd - timing.responseStart, //*网页下载时间
        firstPaintTime: firstPaintTime, //*首次渲染时间
        firstContentfulPaintTime: firstContentfulPaintTime, //*首次渲染内容时间
        domreadyTime: timing.domContentLoadedEventStart - startTime || 0, //*dom ready时间（总和）
        onloadTime: timing.loadEventStart - startTime || 0, //*onload时间（总和）
        whiteTime: timing.responseStart - startTime, //*白屏时间
        renderTime: timing.loadEventEnd - startTime || 0, //整个过程的时间之和
        decodedBodySize: performanceNavigationTiming.decodedBodySize || '', //页面压缩前大小
        encodedBodySize: performanceNavigationTiming.encodedBodySize || '' //页面压缩后大小
      };
      // 过滤异常数据
      Object.keys(data).forEach(k => {
        // 过滤掉 <0 的数据
        if (isNumber(data[k]) && data[k] < 0) {
          data[k] = 0;
        }
      });
      // 过滤掉白屏时间 > onload 的数据
      if (isNumber(data.whiteTime) && data.whiteTime > data.onloadTime) {
        data.whiteTime = 0;
      }
      if (startTime > 0) {
        let Underscore: any;
        if (!camelCase) {
          Object.keys(data).forEach(k => {
            if (!Underscore) Underscore = {};
            // console.log('camelCase2Underscore', k, data, )
            Underscore[camelCase2Underscore(k)] = data[k];
          });
        }
        success(Underscore || data);
      } else {
        fail(Error('startTime'));
      }
    } else {
      fail(Error('getEntries'));
    }
  }
  //获取当前操作系统
  function getOS() {
    let os;
    if (
      navigator.userAgent.indexOf('Android') > -1 ||
      navigator.userAgent.indexOf('Linux') > -1
    ) {
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
  // 获取操作系统版本
  function getOSVersion() {
    let OSVision: any;
    const u = navigator.userAgent;
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //Android
    const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
      OSVision = (navigator.userAgent.split(';')[1].match(/\d+\.\d+/g) ||
        [])[0];
    }
    if (isIOS) {
      OSVision = (navigator.userAgent
        .split(';')[1]
        .match(/(\d+)_(\d+)_?(\d+)?/) || [])[0];
    }
    return OSVision;
  }
  //获取设备类型
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
    if (
      !(
        bIsIpad ||
        bIsIphoneOs ||
        bIsMidp ||
        bIsUc7 ||
        bIsUc ||
        bIsAndroid ||
        bIsCE ||
        bIsWM
      )
    ) {
      deviceType = 'pc'; //pc
    } else if (
      bIsIphoneOs ||
      bIsMidp ||
      bIsUc7 ||
      bIsUc ||
      bIsAndroid ||
      bIsCE ||
      bIsWM
    ) {
      deviceType = 'phone'; //phone
    } else if (bIsIpad) {
      deviceType = 'ipad'; //ipad
    } else {
      deviceType = undefined;
    }
    return deviceType;
  }
  // 获取网络状态
  function getNetWork() {
    let netWork: any;
    if (
      (navigator as any).connection &&
      (navigator as any).connection.effectiveType
    ) {
      switch ((navigator as any).connection.effectiveType) {
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
    return netWork;
  }
  // 获取横竖屏状态
  function getOrientationStatu() {
    let orientationStatu: any;
    if (
      window.screen &&
      window.screen.orientation &&
      window.screen.orientation.angle
    ) {
      if (
        window.screen.orientation.angle === 180 ||
        window.screen.orientation.angle === 0
      ) {
        // 竖屏
        orientationStatu = '|';
      }
      if (
        window.screen.orientation.angle === 90 ||
        window.screen.orientation.angle === -90
      ) {
        // 横屏
        orientationStatu = '-';
      }
    }
    return orientationStatu;
  }
  // 获取ssl连接时间
  function getSSLTime(connectEnd: any, secureConnectionStart: any) {
    let ssl_time: any;
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
 * @category Browser Information
 */
export function isSafePWAEnv(): boolean {
  // 判断是否支持 async await
  function isSupportAsyncAwait() {
    let isSupportAsyncAwaitFunc;
    try {
      // eval("func = async function(){};");
      const fn = new Function('return async function(){};');
      isSupportAsyncAwaitFunc = fn();
      // console.log('isSupportAsyncAwaitFunc', isSupportAsyncAwaitFunc);
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
    if (
      typeof Promise !== 'undefined' &&
      Promise.toString().indexOf('[native code]') !== -1
    ) {
      return true;
    }
    return false;
  }
  // 浏览器信息
  const BrowserType = getBrowserInfo();
  if (
    'serviceWorker' in navigator &&
    isSupportAsyncAwait() &&
    isSupportPromise() &&
    Boolean(window.fetch) &&
    Boolean(window.indexedDB) &&
    Boolean(window.caches) &&
    !BrowserType['shell']
  ) {
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
 * | Attribute | Description | Type | Values |
 * | :------------ | :------------ | :------------ | :------------ |
 * | **system** | System | string | android, ios, windows, macos, linux |
 * | systemVs | System version | string | windows: 2000, xp, 2003, vista, 7, 8, 8.1, 10 <br />macos: ... |
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
 * ```
 * const { system, shell } = getBrowserInfo();
 * const isMobileQQ = ['android', 'ios'].includes(system) && ['qq_browser', 'qq_app'].includes(shell);
 * ```
 *
 * @returns 浏览器信息
 * @category Browser Information
 */
export function getBrowserInfo(): BrowserInfo {
  // Cache
  if (
    window.MAZEY_BROWSER_INFO &&
    typeof window.MAZEY_BROWSER_INFO === 'object'
  ) {
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
    systemVs: ''
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
      appleType
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
      systemVs
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
      platform
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
      supporter
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
      engineVs
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
      supporterVs
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
      shellVs
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
 * @param {string} str 带html标签的字符串
 * @returns {string} 字符串
 * @category Util
 */
export function clearHtml(
  str: string,
  options: { removeNewLine?: boolean } = {}
): string {
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
 * Sanitizes user input to prevent XSS attacks
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
    '/': '&#x2F;'
  };
  if (typeof input !== 'string') {
    throw new Error('Input must be a string');
  }
  return input.replace(
    regex,
    (match: keyof typeof replacements) => replacements[match]
  );
}

/**
 * Reverses the sanitization done by the `sanitizeInput` function.
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
    '&#x2F;': '/'
  };
  if (typeof input !== 'string') {
    throw new Error('Input must be a string');
    // console.error('Input must be a string');
  }
  return input.replace(
    regex,
    (match: keyof typeof replacements) => replacements[match]
  );
}

/**
 * 截取字符串，中文算 2 个字节
 *
 * @param {string} str 要截取的字符串
 * @param {number} len
 * @param {boolean} hasDot
 * @returns {string} 返回截取后的字符串
 * @category Util
 */
export function truncateZHString(
  str: string,
  len: number,
  hasDot = false
): string {
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
 * @category Load Resource
 */
export function windowLoaded(timeout = 90): Promise<string | Error> {
  let loaded: (value: string) => void = () => undefined;
  let loadFail: (value: Error) => void;
  const status = new Promise(
    (resolve: (value: string) => void, reject: (value: Error) => void) => {
      loaded = resolve;
      loadFail = reject;
    }
  );
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
export function addStyle(
  style: string,
  options: { id?: string } = { id: '' }
): boolean {
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
    errorFn: () => undefined
  }
): Console {
  const {
    isClosed,
    showWrap,
    showDate,
    locales,
    logFn,
    errorFn
  } = Object.assign(
    {
      isClosed: false,
      showWrap: false,
      showDate: false,
      locales: 'en-US',
      logFn: () => undefined,
      errorFn: () => undefined
    },
    options
  );
  const methods = ['log', 'info', 'warn', 'error'];
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
      second: 'numeric'
    };
    const todayDateIns = new Date();
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
    // https://datatracker.ietf.org/doc/html/rfc4647
    const dateStr = todayDateIns.toLocaleDateString(locales, dateOptions);
    return dateStr;
  };
  // if (showDate) {
  //   prefix = `${dateStr} ${prefix}`;
  // }
  methods.forEach(method => {
    newConsole[method] = function(...argu: any) {
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
        (console as any)[method](datePrefix, ...argu);
      } else {
        (console as any)[method](...argu);
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
    validStatusRange: [200, 300],
    validCode: [0]
  }
): boolean {
  const { validStatusRange, validCode } = Object.assign(
    {
      validStatusRange: [200, 300],
      validCode: [0]
    },
    options
  );
  if (validStatusRange.length !== 2) {
    console.error('valid validStatusRange is required');
  }
  let ret = false;
  if (
    res &&
    res.status &&
    validStatusRange.length === 2 &&
    res.status >= validStatusRange[0] &&
    res.status < validStatusRange[1]
  ) {
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
 * @category Util
 */
export function isValidData(
  data: any,
  attributes: string[],
  validValue: any
): boolean {
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
    // console.log('foundValue', foundValue);
    return foundValue;
  }, data);
  // console.log('foundRet', foundRet);
  if (foundRet === validValue) {
    ret = true;
  }
  return ret;
}

/**
 * 语义化文件大小, 把字节转换成正常文件大小.
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
    img.src =
      'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
  };
  return new Promise(fn);
}

/**
 * Generate a Hash Code from a string.
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
 * @category Util
 */
export function formatDate(
  dateIns?: Date | number | string,
  format = 'yyyy-MM-dd'
): string {
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
    hh:
      tempDate.getHours() < 10
        ? '0' + tempDate.getHours()
        : tempDate.getHours(),
    mm:
      tempDate.getMinutes() < 10
        ? '0' + tempDate.getMinutes()
        : tempDate.getMinutes(),
    ss:
      tempDate.getSeconds() < 10
        ? '0' + tempDate.getSeconds()
        : tempDate.getSeconds()
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
 * @param type
 * @param fn
 * @category Event
 */
export function addEvent(type: string, fn: any): void {
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
          type: type
        });
      }
    }
  }
}

/**
 * Remove event.
 *
 * @param type
 * @param fn
 * @category Event
 */
export function removeEvent(type: string, fn: any): void {
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
 * Checks if the given string is a valid URL, including scheme URLs.
 *
 * @example
 * ```js
 * isValidUrl('https://www.example.com'); // true
 * isValidUrl('http://example.com/path/exx/ss'); // true
 * isValidUrl('https://www.example.com/?q=hello&age=24#world'); // true
 * isValidUrl('http://www.example.com/#world?id=9'); // true
 * isValidUrl('ftp://example.com'); // true
 * ```
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
 * Check if the given string is a mobile phone number.
 *
 * @example
 * ```js
 * console.log(isMobile('13800138000')); // true
 * console.log(isMobile('1380013800')); // false
 * console.log(isMobile('138001380000')); // false
 * console.log(isMobile('1380013800a')); // false
 * ```
 *
 * @param mobile
 * @returns {boolean} Return true if the given string is a mobile phone number.
 * @category Util
 */
export function isValidPhoneNumber(mobile: string): boolean {
  const reg = /^1[3456789]\d{9}$/;
  return reg.test(mobile);
}

/**
 * Check if the given string is a valid email.
 *
 * @example
 * ```js
 * console.log(isValidEmail('mazeyqian@gmail.com')); // true
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
 * @example
 * ```js
 * console.log(convert10To26(1)); // a
 * console.log(convert10To26(26)); // z
 * console.log(convert10To26(27)); // aa
 * console.log(convert10To26(52)); // az
 * console.log(convert10To26(53)); // ba
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
 * @example
 * ```js
 * console.log(getUrlFileType('https://example.com/a/b/c.png')); // png
 * console.log(getUrlFileType('https://example.com/a/b/c.jpg')); // jpg
 * console.log(getUrlFileType('https://example.com/a/b/c.jpeg')); // jpeg
 * console.log(getUrlFileType('/a/b/c.jpeg')); // jpeg
 * console.log(getUrlFileType('https://example.com/a/b/c.v/a')); // ''
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
  // if (ret.includes('?')) {
  //   const arr = ret.split('?');
  //   if (arr.length > 0) {
  //     ret = arr[0];
  //   }
  // }
  return ret;
}

/**
 * Sets the width and height of all images on the page based on their `src` attribute.
 * The `src` attribute should contain `width` and/or `height` values in the format "width=100" or "height=100".
 * If jQuery is available, this function uses jQuery to select the images. Otherwise, it uses pure JavaScript.
 *
 * @example
 * ```
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
      if (height && isNonEmptyArray(height) && height[1])
        $this.height(height[1]);
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
        if (width && isNonEmptyArray(width) && width[1])
          $this.style.width = width[1];
        if (height && isNonEmptyArray(height) && height[1])
          $this.style.height = height[1];
      });
      return true;
    }
  }
  return false;
}

/**
 * Generate the inline style string from the given parameters, First parameter is the ClassNames, Second parameter is the style array.
 *
 * @example
 * ```js
 * console.log(genStyleString('a', [ 'color:red' ])); // '.a{color:red;}'
 * console.log(genStyleString('b', [ 'color:red', 'font-size:12px' ])); // '.b{color:red;font-size:12px;}'
 * ```
 *
 * @param {string} className
 * @param {Array} styleArray
 * @returns {string} Return the inline style string.
 * @category DOM
 */
export function genStyleString(
  className: string,
  styleArray: Array<string>
): string {
  let style = '';
  if (styleArray && styleArray.length > 0) {
    // It's wrong. Last item will not include `;`.
    // style = styleArray.join(';');
    style = styleArray.join(';') + ';';
  }
  return `.${className}{${style}}`;
}

/**
 * Load an image from the given URL.
 *
 * The target image will be loaded in the background, and the Promise status will change after the image is loaded. If the image fails to load, the Promise status will change to `reject` with the error object. If the image is loaded successfully, the Promise status will change to `resolve` with the image object. This method can be used to preload images and cache them in the browser. It can also be used to implement lazy loading of images.
 *
 * Note that this method will not add the image to the DOM.
 *
 * @example
 * ```js
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
  return 'v3.x';
}

/**
 * Repeatedly fires a callback function with a certain interval until a specified condition is met.
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
export function repeatUntilConditionMet<T extends (...args: any[]) => any>(
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
      const result = await callback.apply(context, args as any[]);
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
 * @example
 * ```js
 * loadScriptIfUndefined('jQuery', 'https://example.com/lib/jquery.min.js')
 *   .then(() => {
 *     console.log('jQuery is loaded.');
 *   })
 *   .catch(err => {
 *     console.log('Failed to load jQuery.', err);
 *   });
 * ```
 *
 * @param {string} windowAttribute - The name of the window attribute to check (e.g. `jQuery`, `axios`, etc.).
 * @param {string} url - The URL of the script to load.
 * @returns {Promise} A Promise that resolves when the script has been loaded.
 * @category Load Resource
 */
export function loadScriptIfUndefined(
  windowAttribute: string,
  url: string
): LoadScriptReturns {
  if ((window as { [k: string]: any })[windowAttribute]) {
    return Promise.resolve('defined');
  }
  return loadScript(url);
}
