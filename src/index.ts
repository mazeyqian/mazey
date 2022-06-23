/* Deal */

/**
 * @method calLongestCommonSubstring
 * @description 计算两个字符串的最长公共子串
 * @param {String} aStr 字符串
 * @param {String} bStr 字符串
 * @return {Number} 长度
 */
export function calLongestCommonSubstring(aStr = '', bStr = ''): number {
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
 * @method calLongestCommonSubsequence
 * @description 计算两个字符串的最长公共子序列
 * @param {String} aStr 字符串
 * @param {String} bStr 字符串
 * @return {Number} 长度
 */
export function calLongestCommonSubsequence(aStr = '', bStr = ''): number {
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
 * @method join
 * @description 将一系列值连接成固定字符分隔的字符串 123,456 => 123 - 456。
 * @param {String} joinStr 连接值的字符串。
 * @param {Rest} ...rest 需要连接的值 。
 * */
export function join(joinStr: any, ...rest: any[]) {
  let ret = '';
  const len = joinStr.length;
  for (const v of rest) {
    if (v) {
      ret += `${joinStr}${v}`;
    }
  }
  if (ret) {
    ret = ret.substring(len);
  }
  return ret;
}

/**
 * @method renderTable
 * @description 渲染表格
 * @param {DOM Object} tbID
 * @param {Array} data
 * @param {Array} property
 */
export function renderTable(tbID = null, data = [], property = []) {
  const TBODY: any = document.querySelector(`#${tbID} tbody`);
  function mNullToNA(str: any) {
    return str === null ? 'N.A.' : str;
  }
  let content = '';
  TBODY.innerHTML = '';
  // 无数据
  if (!data.length) {
    content = `<tr><td colspan="${property.length}">无数据</td></tr>`;
  } else {
    for (let [i, max] = [0, data.length]; i < max; ++i) {
      const item = data[i];
      content += '<tr>';
      for (let [i, max] = [0, property.length]; i < max; ++i) {
        content += `<td>${mNullToNA(item[property[i]])}</td>`;
      }
      content += '</tr>';
    }
  }
  TBODY.innerHTML = content;
}

/**
 * @method getHashQueryParam
 * @description 获取地址栏 hash 后面的参数。
 * @param {String} param 获取参数的名字。
 */
export function getHashQueryParam(param: string) {
  const hashs = window.location.hash.split('?');
  if (hashs.length === 1) {
    return null;
  }
  const reg = new RegExp(`(^|&)${param}=([^&]*)(&|$)`);
  const ret = hashs[1].match(reg);
  return ret ? ret[2] : null;
}

/**
 * @method camelCaseToKebabCase
 * @description 驼峰转连接线。
 * @param {String} camelCase
 * */
export function camelCaseToKebabCase(camelCase: string) {
  const kebabCase = camelCase.replace(/([A-Z])/g, '-$1').toLowerCase();
  return kebabCase[0] === '-' ? kebabCase.substr(1) : kebabCase;
}

/**
 * @method camelCase2Underscore
 * @description 驼峰转下划线。
 * @param {String} camelCase
 * */
export function camelCase2Underscore(camelCase: string) {
  const kebabCase = camelCase.replace(/([A-Z])/g, '_$1').toLowerCase();
  return kebabCase[0] === '_' ? kebabCase.substr(1) : kebabCase;
}

/**
 * @method getDomain
 * @description 获取地址中的域名（及其他参数）。
 * @param {String} url
 * @param {Array} rules ['hostname', 'pathname'] = 'km.mazey.net/plugins/servlet/mobile'
 * */
export function getDomain({ url = '', rules = ['hostname'] } = {}) {
  const aEl: any = document.createElement('a');
  aEl.href = url;
  return rules.reduce((ret, v, index) => {
    ret += aEl[v];
    return ret;
  }, '');
}

/**
 * @method trim
 * @description 去除左右空格。
 * @param {String} str 需要去除两边空格的字符串。
 * */
export function trim(str: string) {
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
 * @description html换行。
 * @param {String} str
 * */
export function newLine(str: string) {
  if (!str) {
    return '';
  }
  const reg = new RegExp('\\n', 'g');
  return str.replace(reg, '<br />');
}

/**
 * @method deepCopyObject
 * @description 对象深拷贝。
 * @param {Object} obj 被拷贝的对象。
 * @return {Object}
 * */
export function deepCopyObject(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * @method generateRndNum
 * @description 生成随机数 mGenerateRndNum(7) => 7658495。
 * @param {Number} n 随机数的长度
 * @return {String}
 * */
export function generateRndNum(n: number) {
  let ret = '';
  while (n--) {
    ret += Math.floor(Math.random() * 10);
  }
  return ret;
}

/**
 * @method generateUniqueNum
 * @description 根据时间生成唯一标志的数字 mGenerateUniqueNum() => 1538324722364123。
 * @param {Number} n 随机数的长度
 * */
export function generateUniqueNum(n: number) {
  const [now, rnd] = [mNow(), generateRndNum(n || 3)];
  return now + rnd;
}

/**
 * @method resetForm
 * @description 重置表单输入值为原始（空）状态。
 * @param {String} rest name1,name2,name3...NAME属性，可以多个。
 * */
export function resetForm(...rest: any[]) {
  for (let i = 0; i < rest.length; i++) {
    const tagMz: any = document.getElementsByName(rest[i])[0]; // tag object
    const tagNameMz = tagMz.tagName.toLowerCase(); // tag name
    if (tagNameMz === 'input') {
      tagMz.value = '';
    } else if (tagNameMz === 'select') {
      tagMz.options[0].selected = true;
    }
  }
}

/**
 * @method floatToPercent
 * @description 浮点数转为百分比 0.2 => 20%。
 * @param {Number} num 浮点数
 * @param {Number} fixSize 保留几位浮点数
 * */
export function floatToPercent(num: any, fixSize = 0): string {
  if (fixSize) {
    num = (num * 100).toFixed(fixSize);
  } else {
    num = Math.floor(num * 100);
  }
  return `${num}%`;
}

/**
 * @method floatFixed
 * @description 浮点数保留指定位。
 * */
export function floatFixed(num: any, size: any) {
  return parseFloat(num).toFixed(size);
}

/**
 * @method compatibleExist
 * @description 不存在返回 ——。
 * */
export function compatibleExist(instance: string, replaceStr: string) {
  let ret = '';
  try {
    ret = instance || replaceStr || '——';
  } catch (e) {
    ret = '——';
  }
  return ret;
}

/**
 * @method cancelBubble
 * @description 阻止冒泡。
 * */
export function cancelBubble(e: any) {
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
 * */
export function hasClass(obj: any, cls: string) {
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
 * */
export function addClass(obj: any, cls: string) {
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
 * */
export function removeClass(obj: any, cls: string) {
  const oriCls = obj.className;
  let newCls; // 获取对象的class值
  newCls = ' ' + oriCls + ' '; // 前后加空格
  newCls = newCls.replace(/(\s+)/gi, ' '); // 将多余的空格替换成一个空格
  newCls = newCls.replace(' ' + cls + ' ', ' '); // 将加了前后空格的cls替换成空格' '
  newCls = newCls.replace(/(^\s+)|(\s+$)/g, ''); // 去掉前后空格
  obj.className = newCls;
}

/**
 * @method throttle
 * @description 节流。
 * */
export function throttle(func: any, wait: number, options: any) {
  // timeout: setTimeout Handle
  // previous: 上次时间戳
  let context: any = null;
  let args: any = null;
  let timeout: any = null;
  let [result, previous] = [null, 0];
  if (!options) {
    options = {};
  }
  const later = function () {
    previous = options.leading === false ? 0 : mNow();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) {
      context = args = null;
    }
  };
  return function (...argRest: Array<any>) {
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
 * @method debounce
 * @description 去抖。
 * */
export function debounce(func: any, wait: number, immediate: any) {
  let context: any = null;
  let timeout: any = null;
  let timestamp: any = null;
  let args: any = null;
  let [result] = [null];
  const later = function () {
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
  return function (...argRest: Array<any>) {
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
 * @param {Number/Date} start 开始时间戳 1585325367122
 * @param {Number/Date} end 结束时间戳 1585325367122
 * @type {String} type 返回类型 d: 2(天) text: 2 天 4 时...
 * @return {String/Number} 取决于 type
 * */
export function friendlyInterval({ start = 0, end = 0, type = 'd' } = {}) {
  if (!isNumber(start)) start = new Date(start).getTime();
  if (!isNumber(end)) end = new Date(end).getTime();
  const t = end - start;
  let ret = null;
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
 * @method isNumber
 * @description 判断是否有效数字
 * @param {Any} num 被判断的值
 * @param {Boolean} isNaNAsNumber 是否 NaN 算数字（默认不算）
 * @param {Boolean} isUnFiniteAsNumber 是否 无限 算数字（默认不算）
 * @return {Boolean} true 是数字
 */
export function isNumber(num: any, { isNaNAsNumber = false, isUnFiniteAsNumber = false } = {}): boolean {
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
 * @method updateQueryStringParameter
 * @description 替换或添加地址栏参数。
 * */
export function updateQueryStringParameter(uri: string, key: string, value: string) {
  const re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
  const separator = uri.indexOf('?') !== -1 ? '&' : '?';
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + '=' + value + '$2');
  } else {
    return uri + separator + key + '=' + value;
  }
}

/**
 * @method isJsonString
 * @description 判断是否合法 JSON 字符串。
 * */
export function isJsonString(str: string) {
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
 * @method getUrlParam
 * @description 链接参数
 * @param {String} sUrl 链接
 * @param {String} sKey 参数
 * */
export function getUrlParam(sUrl: string, sKey: string) {
  const result: any = {};
  sUrl.replace(/\??(\w+)=([^&]*)&?/g, function (a, k, v): any {
    if (result[k] !== undefined) {
      const t = result[k];
      result[k] = [].concat(t, v);
    } else {
      result[k] = v;
    }
  });
  if (sKey === undefined) {
    return result;
  } else {
    return result[sKey] || '';
  }
}

/**
 * @method getSearchQueryParam
 * @description 地址栏参数。
 * */
export function getSearchQueryParam(name: string) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  const r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return decodeURIComponent(unescape(r[2]));
  }
  return null;
}

/**
 * @method getQueryParam
 * @description 地址栏参数，getSearchQueryParam 的别名。
 * */
export function getQueryParam(name: string) {
  return getSearchQueryParam(name);
}

/**
 * @method doFn
 * @description 执行有效函数
 * @param {Function} fn 等待被执行的未知是否有效的函数
 * */
export function doFn(fn: any, ...params: any[]) {
  let ret = null;
  if (fn && typeof fn === 'function') {
    ret = fn(...params);
  }
  return ret;
}

/**
 * @method setSessionStorage
 * @description 存储数据到 sessionStorage
 * @param {String} key 键
 * @param {String} value 值
 * */
export function setSessionStorage(key: string, value: any = null) {
  if (key) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
}

/**
 * @method getSessionStorage
 * @description 存储数据到 sessionStorage
 * @param {String} key 键
 * @return {Any} 返回值
 * */
export function getSessionStorage(key: string) {
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
 * @param {String} key 键
 * @param {String} value 值
 * */
export function setLocalStorage(key: string, value: any = null) {
  if (key) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

/**
 * @method getLocalStorage
 * @description 存储数据到 localStorage
 * @param {String} key 键
 * @return {Any} 返回值
 * */
export function getLocalStorage(key: string) {
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
 * @method loadCSS
 * @description 动态加载css文件
 * @param {String} url -- css资源路径
 * @param {String} id -- link标签id
 * @return {Promise<Boolean>} true -- 加载成功
 */
export function loadCSS({ url = '', id = '' } = {}) {
  let success: any = null;
  let fail: any = null;
  const status = new Promise((resolve, reject) => {
    ([success, fail] = [resolve, reject]);
  });
  // const tempCB = (typeof callback === 'function' ? callback : function () { });
  const callback = function () {
    doFn(success, true);
  };
  let node: any = document.createElement('link');
  const supportOnload = 'onload' in node;
  const isOldWebKit = +navigator.userAgent.replace(/.*(?:AppleWebKit|AndroidWebKit)\/?(\d+).*/i, '$1') < 536; // webkit旧内核做特殊处理
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
    setTimeout(function () {
      pollCss(node, callback, 0);
    }, 1);
    return status;
  }

  if (supportOnload) {
    node.onload = onload;
    node.onerror = function () {
      // 加载失败(404)
      onload();
    };
  } else {
    // todo: 和 !supportOnload 重复
    node.onreadystatechange = function () {
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
        if (ex.name === 'NS_ERROR_DOM_SECURITY_ERR') {
          isLoaded = true;
        }
      }
    }

    setTimeout(function () {
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
 * @method loadScript
 * @description 动态加载js文件
 * @param {String} url -- js资源路径
 * @param {String} id -- DOM ID
 * @param {Function} callback -- 加载后回调函数
 * @param {Number} timeout -- 超时时长
 * @param {Boolean} isDefer -- 是否添加 defer 标签
 * @return {Promise<Boolean>} -- true 成功
 */
export function loadScript({ url = '', id = '', callback = function () { /* pass */ }, timeout = 5000, isDefer = false } = {}): any {
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
    script.onreadystatechange = function () {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null;
        doFn(callback);
        doFn(success, true);
      }
    };
  } else {
    // Others
    script.onload = function () {
      doFn(callback);
      doFn(success, true);
    };
  }
  script.src = url;
  firstScript && firstScript.parentNode.insertBefore(script, firstScript);
  return new Promise((resolve, reject) => {
    ([success, fail] = [resolve, reject]);
    if (timeout) {
      setTimeout(fail.bind(null, 'timeout'), timeout);
    }
  });
}

/**
 * @method mNow
 * @description 获取时间戳
 */
export function mNow() {
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
export function setCookie(name: string, value: string, days: number, domain: string) {
  let domainParts, expires;
  let date: any;
  if (days) {
    date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toGMTString();
  } else {
    expires = "";
  }
  const host = location.host;
  if (host.split('.').length === 1) {
    // no "." in a domain - it's localhost or something similar
    document.cookie = name + "=" + value + expires + "; path=/";
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
    domain = domain || ('.' + domainParts.join('.'));
    document.cookie = name + "=" + value + expires + "; path=/; domain=" + domain;
    // check if cookie was successfuly set to the given domain
    // (otherwise it was a Top-Level Domain)
    if (getCookie(name) === null || getCookie(name) !== value) {
      // append "." to current domain
      domain = domain || ('.' + host);
      document.cookie = name + "=" + value + expires + "; path=/; domain=" + domain;
    }
  }
}

/**
 * @method getCookie
 * @description 获取 Cookie
 */
export function getCookie(name: string) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

/**
 * @method getPerformance
 * @description 获取页面加载相关的各项数据
 * @param {Boolean} camelCase -- true（默认） 以驼峰形式返回数据 false 以下划线形式返回数据
 * @return {Promise<Object>} 加载数据
 */
export function getPerformance({ camelCase = true } = {}) {
  let success: any;
  let fail: any;
  const status = new Promise((resolve, reject) => {
    ([success, fail] = [resolve, reject]);
  });
  const timing = window.performance.timing;
  const startTime = timing.navigationStart || timing.fetchStart;
  let firstPaintTime: any;
  let firstContentfulPaintTime: any;
  // 是否已经形成数据（页面加载完成之后）
  if (window.performance && window.performance.timing && window.performance.timing.loadEventEnd > 0) {
    // console.log('created')
    getTiming();
  } else {
    // console.log('creating')
    window.addEventListener("load", function() {
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
      console.error(e.message);
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
        encodedBodySize: performanceNavigationTiming.encodedBodySize || '', //页面压缩后大小
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
        fail('startTime');
      }
    } else {
      fail('getEntries');
    }
  }
  //获取当前操作系统
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
  // 获取操作系统版本
  function getOSVersion() {
    let OSVision: any;
    const u = navigator.userAgent;
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //Android
    const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
      OSVision = (navigator.userAgent.split(';')[1].match(/\d+\.\d+/g) || [])[0];
    }
    if (isIOS) {
      OSVision = (navigator.userAgent.split(';')[1].match(/(\d+)_(\d+)_?(\d+)?/) || [])[0];
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
    if (!(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)) {
      deviceType = 'pc'; //pc
    } else if (bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
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
    if ((navigator as any).connection && (navigator as any).connection.effectiveType) {
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
    if (window.screen && window.screen.orientation && window.screen.orientation.angle) {
      if (window.screen.orientation.angle === 180 || window.screen.orientation.angle === 0) { // 竖屏
        orientationStatu = '|';
      }
      if (window.screen.orientation.angle === 90 || window.screen.orientation.angle === -90) { // 横屏
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
 * @method inRate
 * @description 百分位概率
 * @param {Number} rate -- 0.1 ~ 1 => 1% ~ 100%
 * @return {Boolean} true 命中
 */
export function inRate(rate: number): boolean {
  if(Math.random() < rate) {
    return true;
  }
  return false;
}

/**
 * @method isSafePWAEnv
 * @description 判断是否是安全的 PWA 环境
 * @return {Boolean} true 是
 */
export function isSafePWAEnv(): boolean {
  // 判断是否支持 async await
  function isSupportAsyncAwait() {
    let isSupportAsyncAwaitFunc;
    try {
      // eval("func = async function(){};");
      const fn = new Function("return async function(){};");
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
    if(typeof Promise !== "undefined" && Promise.toString().indexOf("[native code]") !== -1){
      return true;
    }
    return false;
  }
  // 浏览器信息
  const BrowserType = getBrowserType();
  if (
    ('serviceWorker' in navigator) &&
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
 * @method getBrowserType
 * @description 返回浏览器信息 https://github.com/JowayYoung/juejin-code/blob/master/browser-type.js
 * @return {Object} 浏览器信息
 */
export function getBrowserType(): any {
  try {
    // 权重：系统 + 系统版本 > 平台 > 内核 + 载体 + 内核版本 + 载体版本 > 外壳 + 外壳版本
    const ua: any = navigator.userAgent.toLowerCase();
    const testUa: (regexp: any) => any = regexp => regexp.test(ua);
    const testVs: (regexp: any) => any = regexp => ua.match(regexp)
      .toString()
      .replace(/[^0-9|_.]/g, "")
      .replace(/_/g, ".");
    // 系统
    let system = "unknow";
    if (testUa(/windows|win32|win64|wow32|wow64/g)) {
      system = "windows"; // windows系统
    } else if (testUa(/macintosh|macintel/g)) {
      system = "macos"; // macos系统
    } else if (testUa(/x11/g)) {
      system = "linux"; // linux系统
    } else if (testUa(/android|adr/g)) {
      system = "android"; // android系统
    } else if (testUa(/ios|iphone|ipad|ipod|iwatch/g)) {
      system = "ios"; // ios系统
    }
    // 系统版本
    let systemVs = "unknow";
    if (system === "windows") {
      if (testUa(/windows nt 5.0|windows 2000/g)) {
        systemVs = "2000";
      } else if (testUa(/windows nt 5.1|windows xp/g)) {
        systemVs = "xp";
      } else if (testUa(/windows nt 5.2|windows 2003/g)) {
        systemVs = "2003";
      } else if (testUa(/windows nt 6.0|windows vista/g)) {
        systemVs = "vista";
      } else if (testUa(/windows nt 6.1|windows 7/g)) {
        systemVs = "7";
      } else if (testUa(/windows nt 6.2|windows 8/g)) {
        systemVs = "8";
      } else if (testUa(/windows nt 6.3|windows 8.1/g)) {
        systemVs = "8.1";
      } else if (testUa(/windows nt 10.0|windows 10/g)) {
        systemVs = "10";
      }
    } else if (system === "macos") {
      systemVs = testVs(/os x [\d._]+/g);
    } else if (system === "android") {
      systemVs = testVs(/android [\d._]+/g);
    } else if (system === "ios") {
      systemVs = testVs(/os [\d._]+/g);
    }
    // 平台
    let platform = "unknow";
    if (system === "windows" || system === "macos" || system === "linux") {
      platform = "desktop"; // 桌面端
    } else if (system === "android" || system === "ios" || testUa(/mobile/g)) {
      platform = "mobile"; // 移动端
    }
    // 内核和载体
    let engine = "unknow";
    let supporter = "unknow";
    if (testUa(/applewebkit/g)) {
      engine = "webkit"; // webkit内核
      if (testUa(/edge/g)) {
        supporter = "edge"; // edge浏览器
      } else if (testUa(/opr/g)) {
        supporter = "opera"; // opera浏览器
      } else if (testUa(/chrome/g)) {
        supporter = "chrome"; // chrome浏览器
      } else if (testUa(/safari/g)) {
        supporter = "safari"; // safari浏览器
      }
    } else if (testUa(/gecko/g) && testUa(/firefox/g)) {
      engine = "gecko"; // gecko内核
      supporter = "firefox"; // firefox浏览器
    } else if (testUa(/presto/g)) {
      engine = "presto"; // presto内核
      supporter = "opera"; // opera浏览器
    } else if (testUa(/trident|compatible|msie/g)) {
      engine = "trident"; // trident内核
      supporter = "iexplore"; // iexplore浏览器
    }
    // 内核版本
    let engineVs = "unknow";
    if (engine === "webkit") {
      engineVs = testVs(/applewebkit\/[\d._]+/g);
    } else if (engine === "gecko") {
      engineVs = testVs(/gecko\/[\d._]+/g);
    } else if (engine === "presto") {
      engineVs = testVs(/presto\/[\d._]+/g);
    } else if (engine === "trident") {
      engineVs = testVs(/trident\/[\d._]+/g);
    }
    // 载体版本
    let supporterVs = "unknow";
    if (supporter === "chrome") {
      supporterVs = testVs(/chrome\/[\d._]+/g);
    } else if (supporter === "safari") {
      supporterVs = testVs(/version\/[\d._]+/g);
    } else if (supporter === "firefox") {
      supporterVs = testVs(/firefox\/[\d._]+/g);
    } else if (supporter === "opera") {
      supporterVs = testVs(/opr\/[\d._]+/g);
    } else if (supporter === "iexplore") {
      supporterVs = testVs(/(msie [\d._]+)|(rv:[\d._]+)/g);
    } else if (supporter === "edge") {
      supporterVs = testVs(/edge\/[\d._]+/g);
    }
    // 外壳和外壳版本
    let shell = "none";
    let shellVs = "unknow";
    if (testUa(/micromessenger/g)) {
      shell = "wechat"; // 微信浏览器
      shellVs = testVs(/micromessenger\/[\d._]+/g);
    } else if (testUa(/qqbrowser/g)) {
      shell = "qq"; // QQ浏览器
      shellVs = testVs(/qqbrowser\/[\d._]+/g);
    } else if (testUa(/ucbrowser/g)) {
      shell = "uc"; // UC浏览器
      shellVs = testVs(/ucbrowser\/[\d._]+/g);
    } else if (testUa(/qihu 360se/g)) {
      shell = "360"; // 360浏览器(无版本)
    } else if (testUa(/2345explorer/g)) {
      shell = "2345"; // 2345浏览器
      shellVs = testVs(/2345explorer\/[\d._]+/g);
    } else if (testUa(/metasr/g)) {
      shell = "sougou"; // 搜狗浏览器(无版本)
    } else if (testUa(/lbbrowser/g)) {
      shell = "liebao"; // 猎豹浏览器(无版本)
    } else if (testUa(/maxthon/g)) {
      shell = "maxthon"; // 遨游浏览器
      shellVs = testVs(/maxthon\/[\d._]+/g);
    }
    return Object.assign({
      engine, // webkit gecko presto trident
      engineVs,
      platform, // desktop mobile
      supporter, // chrome safari firefox opera iexplore edge
      supporterVs,
      system, // windows macos linux android ios
      systemVs
    }, shell === "none" ? {} : {
      shell, // wechat qq uc 360 2345 sougou liebao maxthon
      shellVs
    });
  } catch (err) {
    return {};
  }
}

/**
 * @method clearHtml
 * @description 去除HTML标签
 * @param {String} string 带html标签的字符串
 * @return {String} 字符串
 */
export function clearHtml (string = ''): string {
  return string.replace(/<\/?.+?>/g, '').replace(/[\r\n]/g, '');
}

/**
 * @method cutCHSString
 * @description 截取字符串，中文算2个字节
 * @param {String} str 要截取的字符串
 * @param {Number} len
 * @param {Boolean} hasDot
 * @returns {String} 返回截取后的字符串
 */
export function cutCHSString(str = '', len = str.length, hasDot = false): string {
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
 * @method windowLoaded
 * @description 页面加载完成
 * @param {Number} timeout 超时时间 / 单位：秒
 * @return {Promise<string>} document is loaded? 'complete' 'load' / 'timeout'
*/
export function windowLoaded({ timeout = 90 } = {}): Promise<string> {
  let loaded: (value: string) => void = () => undefined;
  let loadFail: (value: string) => void = () => undefined;
  const status = new Promise((resolve: (value: string) => void, reject: (value: string) => void) => {
      loaded = resolve;
      loadFail = reject;
  });
  if (document.readyState === 'complete') {
      loaded('complete');
  } else {
      window.addEventListener('load', () => loaded('load'));
  }
  // 超过 timeout 秒后加载失败
  setTimeout(() => loadFail('timeout'), timeout * 1000);
  return status;
}

/**
 * @method addInlineStyle
 * @description 添加内联样式
 * @param {String} inlineStyle 内联样式字符串
 * @param {String} id <style> 标签的 ID
 * @return {Boolean} 添加成功/失败 
*/
export function addInlineStyle({ inlineStyle = '', id = '' } = {}): boolean {
  if (!inlineStyle) {
    return false;
  }
  // 创建 style 文档碎片
  const styleFrag = document.createDocumentFragment();
  let idDom = null;
  let domId = '';
  // Custom Style
  const customStyle = document.createElement('style');
  // 如果需要 ID
  if (id) {
    domId = `${id}`;
    idDom = document.getElementById(domId);
    // 如果 Dom 不存在，插入 style
    if (!idDom) {
      customStyle.setAttribute('id', id);
      customStyle.innerHTML = inlineStyle;
      styleFrag.appendChild(customStyle);
      document.head.appendChild(styleFrag);
    } else { // 如果 Dom 存在，直接更新
      idDom.innerHTML = inlineStyle;
    }
  } else { // 不需要 ID，直接添加新标签
    customStyle.innerHTML = inlineStyle;
    styleFrag.appendChild(customStyle);
    document.head.appendChild(styleFrag);
  }
  return true;
}

/**
 * @method genCustomConsole
 * @description 生成自定义控制台打印
 * @param {String} prefix 前缀
 * @param {Function} allowFn 允许打印的判断函数
 * @return {Object} 新实例
*/
export function genCustomConsole({ prefix = '' } = {}): any {
  // ...
  const methods = ['log', 'info', 'warn', 'error'];
  const newConsole = Object.create(null);
  methods.forEach(method => {
    newConsole[method] = function (...argu: any) {
      if (prefix) {
        (console as any)[method](prefix, ...argu);
      } else {
        (console as any)[method](...argu);
      }
    };
  });
  return newConsole;
}
