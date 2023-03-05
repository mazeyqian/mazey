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
export function calLongestCommonSubstring(aStr: string, bStr: string): number {
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
export function calLongestCommonSubsequence(
  aStr: string,
  bStr: string
): number {
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
  const r = location.search.substr(1).match(reg);
  if (r !== null) {
    // return decodeURIComponent(unescape(r[2]));
    return decodeURIComponent(r[2]);
  }
  return '';
}

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
 * @category URL
 */
export function getUrlParam(url: string, param: string): string | string[] {
  const result: {
    [key: string]: string | string[] | any;
  } = {};
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
  url.replace(/\??(\w+)=([^&]*)&?/g, function(a, k, v): any {
    if (result[k] !== undefined) {
      const t = result[k];
      result[k] = [].concat(t, v);
    } else {
      result[k] = v;
    }
  });
  // if (param === undefined) {
  //   return result;
  // } else {
  //   return result[param] || '';
  // }
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
 * @category URL
 */
export function getDomain(url: string, rules = ['hostname']): string {
  const aEl: any = document.createElement('a');
  aEl.href = url;
  return rules.reduce((ret, v) => {
    ret += aEl[v];
    return ret;
  }, '');
}

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
export function camelCaseToKebabCase(camelCase: string): string {
  const kebabCase = camelCase.replace(/([A-Z])/g, '-$1').toLowerCase();
  return kebabCase[0] === '-' ? kebabCase.substr(1) : kebabCase;
}

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
export function camelCase2Underscore(camelCase: string): string {
  const kebabCase = camelCase.replace(/([A-Z])/g, '_$1').toLowerCase();
  return kebabCase[0] === '_' ? kebabCase.substr(1) : kebabCase;
}

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
 * @method newLine
 * @description Make a newline of HTML.
 * @param {string} str The string to make a newline.
 * @returns {string} A newline with `br`.
 */
export function newLine(str: string): string {
  if (!str) {
    return '';
  }
  const reg = new RegExp('\\n', 'g');
  return str.replace(reg, '<br />');
}

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
export function deepCopyObject(obj: any): any {
  return JSON.parse(JSON.stringify(obj));
}

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
export function isJsonString(str: string): boolean {
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
 * @method generateRndNum
 * @description Produce a random string of number, `generateRndNum(7)` => '7658495'.
 * @param {number} n Length
 * @returns {string} Return the random string.
 */
export function generateRndNum(n = 5): string {
  let ret = '';
  while (n--) {
    ret += Math.floor(Math.random() * 10);
  }
  return ret;
}

/**
 * @method generateUniqueNum
 * @description 根据时间生成唯一标志的数字 mGenerateUniqueNum() => 1538324722364123。
 * @param {number} n 随机数的长度
 */
export function generateUniqueNum(n = 3): string {
  const [now, rnd] = [mNow(), generateRndNum(n || 3)];
  return now + rnd;
}

/**
 * @method floatToPercent
 * @description 浮点数转为百分比 0.2 => 20%。
 * @param {number} num 浮点数
 * @param {number} fixSize 保留几位浮点数
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
 * @method floatFixed
 * @description 浮点数保留指定位。
 */
export function floatFixed(num: string, size = 0): string {
  return parseFloat(num).toFixed(size);
}

/**
 * @method cancelBubble
 * @description 阻止冒泡。
 */
export function cancelBubble(e: any): void {
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
 * @method hasClass
 */
export function hasClass(obj: any, cls: string): boolean {
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
 * @method addClass
 */
export function addClass(obj: any, cls: string): void {
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
 * @method removeClass
 */
export function removeClass(obj: any, cls: string): void {
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
 */
export function throttle(
  func: any,
  wait: number,
  options: { leading?: boolean; trailing?: boolean } = {}
): any {
  options = Object.assign({}, options);
  // timeout: setTimeout Handle
  // previous: 上次时间戳
  let context: any = null;
  let args: any = null;
  let timeout: any = null;
  let [result, previous] = [null, 0];
  // if (!options) {
  //   options = {};
  // }
  const later = function() {
    previous = options.leading === false ? 0 : mNow();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) {
      context = args = null;
    }
  };
  return function(...argRest: Array<any>) {
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
      result = func.apply(context, args);
      if (!timeout) {
        context = args = null;
      }
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
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
 */
export function debounce(func: any, wait: number, immediate?: any): any {
  let context: any = null;
  let timeout: any = null;
  let timestamp: any = null;
  let args: any = null;
  let [result] = [null];
  const later = function() {
    const last = mNow() - timestamp;
    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) {
          context = args = null;
        }
      }
    }
  };
  return function(...argRest: Array<any>) {
    context = this;
    args = argRest;
    timestamp = mNow();
    const callNow = immediate && !timeout;
    if (!timeout) {
      timeout = setTimeout(later, wait);
    }
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }
    return result;
  };
}

/**
 * @method friendlyInterval
 * @description 获取间隔时间。
 * @param {number/Date} start 开始时间戳 1585325367122
 * @param {number/Date} end 结束时间戳 1585325367122
 * @param {string} options.type 返回类型 d: 2(天) text: 2 天 4 时...
 * @returns {string/number} 取决于 type
 */
export function friendlyInterval(
  start = 0,
  end = 0,
  options: { type?: string } = { type: 'd' }
): number | string {
  const { type } = options;
  if (!isNumber(start)) start = new Date(start).getTime();
  if (!isNumber(end)) end = new Date(end).getTime();
  const t = end - start;
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
export function isNumber(
  num: any,
  options: { isNaNAsNumber?: boolean; isUnFiniteAsNumber?: boolean } = {
    isNaNAsNumber: false,
    isUnFiniteAsNumber: false
  }
): boolean {
  const { isNaNAsNumber, isUnFiniteAsNumber } = Object.assign(
    { isNaNAsNumber: false, isUnFiniteAsNumber: false },
    options
  );
  let ret = true;
  // 数字类型
  if (typeof num !== 'number') {
    ret = false;
  }
  // 无限值
  if (isUnFiniteAsNumber === false && !isFinite(num)) {
    // console.log('1333');
    ret = false;
  }
  // NaN
  if (isNaNAsNumber === false && isNaN(num)) {
    // console.log('2333');
    ret = false;
  }
  return ret;
}

/**
 * @method doFn
 * @description 执行有效函数
 * @param {function} fn 等待被执行的未知是否有效的函数
 */
export function doFn(fn: any, ...params: any[]): any {
  let ret = null;
  if (fn && typeof fn === 'function') {
    ret = fn(...params);
  }
  return ret;
}

/**
 * @method setSessionStorage
 * @description 存储数据到 sessionStorage
 * @param {string} key 键
 * @param {string} value 值
 */
export function setSessionStorage(key: string, value: any = null): void {
  if (key) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
}

/**
 * @method getSessionStorage
 * @description 存储数据到 sessionStorage
 * @param {string} key 键
 * @returns {*} 返回值
 */
export function getSessionStorage(key: string): any {
  let ret = null;
  if (key) {
    const value = sessionStorage.getItem(key);
    if (value) {
      ret = JSON.parse(value);
    }
  }
  return ret;
}

/**
 * @method setLocalStorage
 * @description 存储数据到 localStorage
 * @param {string} key 键
 * @param {string} value 值
 */
export function setLocalStorage(key: string, value: any = null): void {
  if (key) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

/**
 * @method getLocalStorage
 * @description 存储数据到 localStorage
 * @param {string} key 键
 * @returns {*} 返回值
 */
export function getLocalStorage(key: string): any {
  let ret = null;
  if (key) {
    const value = localStorage.getItem(key);
    if (value) {
      ret = JSON.parse(value);
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
 * @category Load Resource
 */
export function loadCSS(
  url: string,
  options: { id?: string } = { id: '' }
): Promise<boolean | Error | any> {
  const { id } = options;
  let success: (v: boolean) => void;
  let fail: (v: Error) => void;
  const status = new Promise((resolve, reject) => {
    [success, fail] = [resolve, reject];
  });
  // const tempCB = (typeof callback === 'function' ? callback : function () { });
  const callback = function() {
    // doFn(success, true);
    success(true);
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
 * @returns {Promise<boolean>} -- true 成功
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
): Promise<boolean | string | Error> {
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
        doFn(success, true);
      }
    };
  } else {
    // Others
    script.onload = function() {
      doFn(callback);
      doFn(success, true);
    };
  }
  script.src = url;
  firstScript && firstScript.parentNode.insertBefore(script, firstScript);
  return new Promise((resolve, reject) => {
    [success, fail] = [resolve, reject];
    if (timeout) {
      setTimeout(fail.bind(null, Error('timeout')), timeout);
    }
  });
}

/**
 * @method mNow
 * @description 获取时间戳
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
 * @method setCookie
 * @description 设置 Cookie
 */
export function setCookie(
  name: string,
  value: string,
  days: number,
  domain: string
): void {
  let domainParts, expires;
  let date: any;
  if (days) {
    date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toGMTString();
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
 * @method getCookie
 * @description 获取 Cookie
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
 * @param {boolean} camelCase -- false（默认） 以下划线形式返回数据 true 以驼峰形式返回数据
 * @returns {Promise<object>} 加载数据
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
 */
export function inRate(rate: number): boolean {
  if (Math.random() < rate) {
    return true;
  }
  return false;
}

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
export function getBrowserInfo(): {
  engine: string; // webkit gecko presto trident
  engineVs: string;
  platform: string; // desktop mobile
  supporter: string; // chrome safari firefox opera iexplore edge
  supporterVs: string;
  system: string; // windows macos linux android ios
  systemVs: string;
  shell?: string; // wechat qq uc 360 2345 sougou liebao maxthon
  shellVs?: string;
  appleType?: string;
} {
  try {
    // 权重：系统 + 系统版本 > 平台 > 内核 + 载体 + 内核版本 + 载体版本 > 外壳 + 外壳版本
    const ua: string = navigator.userAgent.toLowerCase();
    const testUa: (regexp: RegExp) => boolean = regexp => regexp.test(ua);
    const testVs: (regexp: RegExp) => string = regexp => {
      const matchRes = ua.match(regexp);
      let ret = '';
      if (matchRes) {
        ret = matchRes
          .toString()
          .replace(/[^0-9|_.]/g, '')
          .replace(/_/g, '.');
      }
      return ret;
    };
    // 系统
    let system = '';
    // Apple device type.
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
      if (testUa(/iphone/g)) {
        appleType = 'iphone';
      } else if (testUa(/ipad/g)) {
        appleType = 'ipad';
      } else if (testUa(/iwatch/g)) {
        appleType = 'iwatch';
      } else if (testUa(/ipod/g)) {
        appleType = 'ipod';
      }
    }
    // 系统版本
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
      systemVs = testVs(/android [\d._]+/g);
    } else if (system === 'ios') {
      systemVs = testVs(/os [\d._]+/g);
    }
    // 平台
    let platform = '';
    if (system === 'windows' || system === 'macos' || system === 'linux') {
      platform = 'desktop'; // 桌面端
    } else if (system === 'android' || system === 'ios' || testUa(/mobile/g)) {
      platform = 'mobile'; // 移动端
    }
    // 内核和载体
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
    // 内核版本
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
    // 载体版本
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
    // 外壳和外壳版本
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
    return Object.assign(
      {
        engine, // webkit gecko presto trident
        engineVs,
        platform, // desktop mobile
        supporter, // chrome safari firefox opera iexplore edge
        supporterVs,
        system, // windows macos linux android ios
        systemVs
      },
      {
        shell, // wechat qq uc 360 2345 sougou liebao maxthon
        shellVs,
        appleType
      }
    );
  } catch (err) {
    console.warn('mazey:', err);
    return {
      engine: '', // webkit gecko presto trident
      engineVs: '',
      platform: '', // desktop mobile
      supporter: '', // chrome safari firefox opera iexplore edge
      supporterVs: '',
      system: '', // windows macos linux android ios
      systemVs: ''
    };
  }
}

/**
 * @method clearHtml
 * @description 去除HTML标签
 * @param {string} str 带html标签的字符串
 * @returns {string} 字符串
 */
export function clearHtml(str: string): string {
  return str.replace(/<\/?.+?>/g, '').replace(/[\r\n]/g, '');
}

/**
 * @method cutCHSString
 * @description 截取字符串，中文算2个字节
 * @param {string} str 要截取的字符串
 * @param {number} len
 * @param {boolean} hasDot
 * @returnss {string} 返回截取后的字符串
 */
export function cutCHSString(str: string, len: number, hasDot = false): string {
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
 */
export function zAxiosIsValidRes(
  res: any,
  options: {
    validStatusRange?: number[];
    validCode?: number[];
  } = {
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
 */
export function isNonEmptyArray(arr: any[]): boolean {
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
 */
export function isValidData(
  data: any,
  attributes: string[],
  validValue: any
): boolean {
  let ret = false;
  const foundRet = attributes.reduce((foundValue, curr) => {
    if (foundValue[curr]) {
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
    dd: tempDate.getDate(),
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
