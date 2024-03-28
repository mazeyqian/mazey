import { SimpleObject, ThrottleFunc, DebounceFunc, MazeyFnParams, MazeyFnReturn, IsNumberOptions, MazeyFunction } from './typing';

/**
 * Copy/Clone Object deeply.
 *
 * Usage:
 *
 * ```javascript
 * const ret1 = deepCopy(['a', 'b', 'c']);
 * const ret2 = deepCopy('abc');
 * console.log(ret1);
 * console.log(ret2);
 * ```
 *
 * Output:
 *
 * ```text
 * ['a', 'b', 'c']
 * abc
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
  const simpleTypes = [ 'string', 'number', 'boolean', 'undefined' ];
  const values = Object.values(obj as SimpleObject);
  const isSimpleTypeObj = values.every(v => simpleTypes.includes(typeof v));
  if (isSimpleTypeObj) {
    // console.log('it is isSimpleTypeObj');
    return {
      ...obj,
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
export function throttle<T extends (...args: MazeyFnParams) => MazeyFnReturn>(func: T, wait: number, options: { leading?: boolean; trailing?: boolean } = {}): ThrottleFunc<T> {
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
export function debounce<T extends (...args: MazeyFnParams) => MazeyFnReturn>(func: T, wait: number, immediate?: boolean): DebounceFunc<T> {
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
export function doFn(fn: MazeyFunction, ...params: Parameters<MazeyFunction>): ReturnType<MazeyFunction> | null {
  let ret: ReturnType<MazeyFunction> | null = null;
  if (fn && typeof fn === 'function') {
    ret = fn(...params);
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
