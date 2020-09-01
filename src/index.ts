/* Deal */

/**
 * @method calLongestCommonSubstring
 * @description 计算两个字符串的最长公共子串
 * @param {String} aStr 字符串
 * @param {String} bStr 字符串
 * @return {Number} 长度
 */
export function calLongestCommonSubstring(aStr: any, bStr: any) {
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
export function calLongestCommonSubsequence(aStr: any, bStr: any) {
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
  let [ret, len] = ['', joinStr.length];
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
  };
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
  let [end, ws] = [str.length - 1, /\s/];
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
 * @param {Number} 浮点数。
 * */
export function floatToPercent(num: any, isFix: any) {
  if (isFix) {
    num = (num * 100).toFixed(isFix);
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
  let context: any = null
  let args: any = null
  let timeout: any = null
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
  return function () {
    const now = mNow();
    if (!previous && options.leading === false) {
      previous = now;
    }
    const remaining = wait - (now - previous);
    context = this;
    args = arguments;
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
  let context: any = null
  let timeout: any = null
  let timestamp: any = null
  let args: any = null
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
  return function () {
    context = this;
    args = arguments;
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
 * @description 判断是否数字
 * @param {Any} 被判断的值
 * @return {Boolean} true 是数字
 */
export function isNumber(v: any) {
  return typeof v === 'number' && isFinite(v);
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
  } catch (e) { }
  return false;
}

/**
 * @method getUrlParam
 * @description 链接参数。
 * */
export function getUrlParam(sUrl: string, sKey: string) {
  const result: any = {};
  sUrl.replace(/\??(\w+)=(\w+)&?/g, function (a, k, v): any {
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
 * @param {String} value 值
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
 * @param {String} value 值
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

/*
 * @method loadCSS
 * @description 动态加载css文件
 * @param {String} url -- css资源路径
 * @param {Function} callback -- 加载后回调函数
 * @param {String} id -- link标签id
 */
export function loadCSS({ url = '', callback = function () { }, id = '' }) {
  callback = typeof callback === 'function' ? callback : function () { };
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
    return;
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
}

/*
 * @method loadScript
 * @description 动态加载js文件
 * @param {String} url -- js资源路径
 * @param {Function} callback -- 加载后回调函数
 */
export function loadScript({ url = '', callback = function () { } }) {
  const script: any = document.createElement('script');
  // 如果没有 script 标签，那么代码就不会运行。可以利用这一事实，在页面的第一个 script 标签上使用 insertBefore()。
  const firstScript: any = document.getElementsByTagName('script')[0];
  script.type = 'text/javascript';
  if (script.readyState) {
    // IE
    script.onreadystatechange = function () {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null;
        doFn(callback);
      }
    };
  } else {
    // Others
    script.onload = function () {
      doFn(callback);
    };
  }
  script.src = url;
  firstScript && firstScript.parentNode.insertBefore(script, firstScript);
}

/*
 * @method mNow
 * @description 获取时间戳
 */
export function mNow() {
  let ret = 0
  if (Date.now) {
    ret = Date.now()
  } else {
    ret = new Date().getTime()
  }
  return ret
}

/*
 * @method setCookie
 * @description 设置 Cookie
 */
export function setCookie(name: string, value: string, days: number) {
  let domain, domainParts, expires, host;
  let date: any
  if (days) {
    date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toGMTString();
  } else {
    expires = "";
  }
  host = location.host;
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
    domain = '.' + domainParts.join('.');
    document.cookie = name + "=" + value + expires + "; path=/; domain=" + domain;
    // check if cookie was successfuly set to the given domain
    // (otherwise it was a Top-Level Domain)
    if (getCookie(name) === null || getCookie(name) !== value) {
      // append "." to current domain
      domain = '.' + host;
      document.cookie = name + "=" + value + expires + "; path=/; domain=" + domain;
    }
  }
}

/*
 * @method getCookie
 * @description 获取 Cookie
 */
function getCookie (name: string) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}