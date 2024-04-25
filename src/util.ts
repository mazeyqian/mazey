import type {
  ThrottleFunc, DebounceFunc, IsNumberOptions,
  ZResResponse, ZResIsValidResOptions,
  SimpleObject, SimpleType,
  MazeyObject, MazeyFnParams, MazeyFnReturn, MazeyFunction,
} from "./typing";

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
  if (typeof obj !== "object") {
    return obj;
  }
  // Judge whether its key-value is simple type, string | number | boolean | null | undefined
  // ...rest
  const simpleTypes = [ "string", "number", "boolean", "undefined" ];
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
 * Alias of `deepCopy`.
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
  const kebabCase = camelCase.replace(/([A-Z])/g, "-$1").toLowerCase();
  return kebabCase[0] === "-" ? kebabCase.substring(1) : kebabCase;
}

/**
 * Convert CamelCase to KebabCase.
 * 
 * @param {string} kebabCase 
 * @returns {string}
 * @category Util
 */
export function convertKebabToCamel(kebabCase: string): string {
  const camelCase = kebabCase.replace(/-([a-z])/g, (_all, letter) => letter.toUpperCase());
  return camelCase.endsWith("-") ? camelCase.slice(0, -1) : camelCase;
}

/**
 * Alias of `convertCamelToKebab`.
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
  const kebabCase = camelCase.replace(/([A-Z])/g, "_$1").toLowerCase();
  return kebabCase[0] === "_" ? kebabCase.substring(1) : kebabCase;
}

/**
 * Alias of `convertCamelToUnder`.
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
  str = str.replace(/^\s+/, ""); // 去除头部空格
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
    if (typeof JSON.parse(str) === "object") {
      return true;
    }
  } catch (e) {
    /* pass */
  }
  return false;
}

/**
 * Alias of `isJSONString`.
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
  let ret = "";
  while (n--) {
    ret += Math.floor(Math.random() * 10);
  }
  return ret;
}

/**
 * Alias of `genRndNumString`.
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
 * Alias of `genUniqueNumString`.
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
  let ret = "";
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
  type: "d",
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
  let ret = "";
  let [ d, h, m, s ] = new Array(4).fill(0);
  const zhD = decodeURIComponent("%20%E5%A4%A9%20"); // ' 天 '
  const zhH = decodeURIComponent("%20%E6%97%B6%20"); // ' 时 '
  const zhM = decodeURIComponent("%20%E5%88%86%20"); // ' 分 '
  const zhS = decodeURIComponent("%20%E7%A7%92"); // ' 秒'
  if (t >= 0) {
    d = Math.floor(t / 1000 / 60 / 60 / 24);
    h = Math.floor(t / 1000 / 60 / 60);
    m = Math.floor(t / 1000 / 60);
    s = Math.floor(t / 1000);
    switch (type) {
      case "d":
        ret = d;
        break;
      case "text":
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
  if (typeof num !== "number") {
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
 * const ret = invokeFn(() => {
 *  console.log('invokeFn');
 * });
 * ```
 *
 * @param {function} fn 等待被执行的未知是否有效的函数
 * @category Util
 */
export function invokeFn(fn: MazeyFunction, ...params: Parameters<MazeyFunction>): ReturnType<MazeyFunction> | null {
  let ret: ReturnType<MazeyFunction> | null = null;
  if (fn && typeof fn === "function") {
    ret = fn(...params);
  }
  return ret;
}

/**
 * Alias of `invokeFn`.
 * 
 * @hidden
 */
export function doFn(fn: MazeyFunction, ...params: Parameters<MazeyFunction>): ReturnType<MazeyFunction> | null {
  return invokeFn(fn, ...params);
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
 * Convert newline characters `\n` into HTML line breaks `<br />`.
 *
 * Usage:
 *
 * ```javascript
 * const ret1 = convertToHtmlBreaks('a\nb\nc');
 * const ret2 = convertToHtmlBreaks('a\n\nbc');
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
 * @category Util
 */
export function convertToHtmlBreaks(str: string): string {
  if (!str) {
    return "";
  }
  const reg = new RegExp("\\n", "g");
  return str.replace(reg, "<br />");
}

/**
 * Alias of `convertToHtmlBreaks`.
 * 
 * @hidden
 */
export function newLine(str: string): string {
  return convertToHtmlBreaks(str);
}

/**
 * Remove HTML tags from a string, and optionally newline characters.
 *
 * Usage:
 *
 * ```javascript
 * const ret = removeHtml('<div>hello world</div>');
 * console.log(ret);
 * ```
 *
 * Output:
 *
 * ```text
 * hello world
 * ```
 *
 * @param {string} str 带 HTML 标签的字符串
 * @returns {string} 字符串
 * @category Util
 */
export function removeHtml(str: string, options: { removeNewLine?: boolean } = {}): string {
  const { removeNewLine = false } = options;
  let ret = "";
  if (str) {
    ret = str.replace(/<\/?.+?>/g, "");
    if (removeNewLine) {
      ret = ret.replace(/[\r\n]/g, "");
    }
  }
  return ret;
}

/**
 * Alias of `removeHtml`.
 *
 * @hidden
 */
export function clearHtml(str: string, options: { removeNewLine?: boolean } = {}): string {
  return removeHtml(str, options);
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
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  };
  if (typeof input !== "string") {
    throw new Error("Input must be a string");
  }
  return input.replace(regex, (match: keyof typeof replacements) => replacements[match]);
}

/**
 * Reverses the sanitization done by the `sanitizeInput` function.
 *
 * Usage:
 *
 * ```javascript
 * const ret = unsanitizeInput('&lt;div&gt;hello world&lt;/div&gt;');
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
export function unsanitizeInput(input: string): string {
  const regex = /(&amp;|&lt;|&gt;|&quot;|&#x27;|&#x2F;)/g;
  const replacements: { [key: string]: string } = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": "\"",
    "&#x27;": "'",
    "&#x2F;": "/",
  };
  if (typeof input !== "string") {
    throw new Error("Input must be a string");
    // console.error('Input must be a string');
  }
  return input.replace(regex, (match: keyof typeof replacements) => replacements[match]);
}

/**
 * Alias of `unsanitizeInput`.
 *
 * @hidden
 */
export function unsanitize(str: string): string {
  return unsanitizeInput(str);
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
  if (str == "" || !str) {
    return "";
  } else {
    let newLength = 0;
    let newStr = "";
    // eslint-disable-next-line no-control-regex
    const chineseRegex = /[^\x00-\xff]/g;
    let singleChar = "";
    const strLength = str.replace(chineseRegex, "**").length;
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
      newStr += "...";
    }
    return newStr;
  }
}

/**
 * Alias of `truncateZHString`.
 *
 * @hidden
 */
export function cutCHSString(str: string, len: number, hasDot = false): string {
  return truncateZHString(str, len, hasDot);
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
    console.error("valid validStatusRange is required");
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
export function isValidData(data: MazeyObject, attributes: string[], validValue: SimpleType): boolean {
  let ret = false;
  if (typeof data !== "object") {
    return ret;
  }
  const foundRet = attributes.reduce((foundValue, curr) => {
    if (typeof foundValue[curr] !== "undefined") {
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
  if (!size || size < 0) return "";
  const num = 1024.0; // byte
  if (size < num) {
    return size + " B";
  }
  if (size < Math.pow(num, 2)) {
    return toCeilStr(size / num) + " KB";
  } // kb
  if (size < Math.pow(num, 3)) {
    return toCeilStr(size / Math.pow(num, 2)) + " MB";
  } // M
  if (size < Math.pow(num, 4)) {
    return toCeilStr(size / Math.pow(num, 3)) + " G";
  } // G
  return toCeilStr(size / Math.pow(num, 4)) + " T";
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
export function formatDate(dateIns?: Date | number | string, format = "yyyy-MM-dd"): string {
  if (!dateIns) {
    dateIns = new Date();
  }
  const tempDate = new Date(dateIns);
  const o: {
    [key: string]: string | number;
  } = {
    yyyy: tempDate.getFullYear(),
    MM: tempDate.getMonth() + 1,
    dd: tempDate.getDate() < 10 ? "0" + tempDate.getDate() : tempDate.getDate(),
    hh: tempDate.getHours() < 10 ? "0" + tempDate.getHours() : tempDate.getHours(),
    mm: tempDate.getMinutes() < 10 ? "0" + tempDate.getMinutes() : tempDate.getMinutes(),
    ss: tempDate.getSeconds() < 10 ? "0" + tempDate.getSeconds() : tempDate.getSeconds(),
  };
  let tempFormat = format || "yyyy-MM-dd";
  Object.keys(o).forEach(key => {
    let value = o[key];
    if (key === "MM" && Number(value) <= 9) {
      value = `0${value}`;
    }
    tempFormat = tempFormat.replace(key, String(value));
  });
  return tempFormat;
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
