'use strict';

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

// 时间戳
var mNow = Date.now || function () {
  return new Date().getTime();
};

/**
 * @method join
 * @description 将一系列值连接成固定字符分隔的字符串 123,456 => 123 - 456。
 * @param {String} joinStr 连接值的字符串。
 * @param {Rest} ...rest 需要连接的值 。
 * */

function join(joinStr) {
  var _ref = ['', joinStr.length],
      ret = _ref[0],
      len = _ref[1];

  for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rest[_key - 1] = arguments[_key];
  }

  for (var _i = 0, _rest = rest; _i < _rest.length; _i++) {
    var v = _rest[_i];

    if (v) {
      ret += "".concat(joinStr).concat(v);
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

function renderTable() {
  var tbID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var property = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var TBODY = document.querySelector("#".concat(tbID, " tbody"));

  var mNullToNA = function mNullToNA(str) {
    return str === null ? 'N.A.' : str;
  };

  var content = '';
  TBODY.innerHTML = ''; // 无数据

  if (!data.length) {
    content = "<tr><td colspan=\"".concat(property.length, "\">\u65E0\u6570\u636E</td></tr>");
  } else {
    for (var _ref2 = [0, data.length], i = _ref2[0], max = _ref2[1]; i < max; ++i) {
      var item = data[i];
      content += '<tr>';

      for (var _ref3 = [0, property.length], _i2 = _ref3[0], _max = _ref3[1]; _i2 < _max; ++_i2) {
        content += "<td>".concat(mNullToNA(item[property[_i2]]), "</td>");
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

function getHashQueryParam(param) {
  var hashs = window.location.hash.split('?');

  if (hashs.length === 1) {
    return null;
  }

  var reg = new RegExp("(^|&)".concat(param, "=([^&]*)(&|$)"));
  var ret = hashs[1].match(reg);
  return ret ? ret[2] : null;
}
/**
 * @method camelCaseToKebabCase
 * @description 驼峰转连接线。
 * @param {String} camelCase
 * */

function camelCaseToKebabCase(camelCase) {
  var kebabCase = camelCase.replace(/([A-Z])/g, '-$1').toLowerCase();
  return kebabCase[0] === '-' ? kebabCase.substr(1) : kebabCase;
}
/**
 * @method getDomain
 * @description 获取地址中的域名（及其他参数）。
 * @param {String} url
 * @param {Array} rules ['hostname', 'pathname'] = 'km.mazey.net/plugins/servlet/mobile'
 * */

function getDomain() {
  var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      url = _ref4.url,
      _ref4$rules = _ref4.rules,
      rules = _ref4$rules === void 0 ? ['hostname'] : _ref4$rules;

  var _ref5 = [document.createElement('a')],
      aEl = _ref5[0];
  aEl.href = url;
  return rules.reduce(function (ret, v, index) {
    ret += aEl[v];
    return ret;
  }, '');
}
/**
 * @method trim
 * @description 去除左右空格。
 * @param {String} str 需要去除两边空格的字符串。
 * */

function trim(str) {
  str = str.replace(/^\s+/, ''); // 去除头部空格

  var end = str.length - 1,
      ws = /\s/;

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

function newLine(str) {
  if (!str) {
    return '';
  }

  var reg = new RegExp('\\n', 'g');
  return str.replace(reg, '<br />');
}
/**
 * @method deepCopyObject
 * @description 对象深拷贝。
 * @param {Object} obj 被拷贝的对象。
 * @return {Object}
 * */

function deepCopyObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}
/**
 * @method generateRndNum
 * @description 生成随机数 mGenerateRndNum(7) => 7658495。
 * @param {Number} n 随机数的长度
 * @return {String}
 * */

function generateRndNum(n) {
  var ret = '';

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

function generateUniqueNum(n) {
  var _ref6 = [mNow(), generateRndNum(n || 3)],
      now = _ref6[0],
      rnd = _ref6[1];
  return now + rnd;
}
/**
 * @method resetForm
 * @description 重置表单输入值为原始（空）状态。
 * @param {String} rest name1,name2,name3...NAME属性，可以多个。
 * */

function resetForm() {
  for (var i = 0; i < arguments.length; i++) {
    var tagMz = document.getElementsByName(i < 0 || arguments.length <= i ? undefined : arguments[i])[0]; // tag object

    var tagNameMz = tagMz.tagName.toLowerCase(); // tag name

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

function floatToPercent(num, isFix) {
  if (isFix) {
    num = (num * 100).toFixed(isFix);
  } else {
    num = Math.floor(num * 100);
  }

  return "".concat(num, "%");
}
/**
 * @method floatFixed
 * @description 浮点数保留指定位。
 * */

function floatFixed(num, size) {
  return parseFloat(num).toFixed(size);
}
/**
 * @method compatibleExist
 * @description 不存在返回 ——。
 * */

function compatibleExist(instance, replaceStr) {
  var ret = '';

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

function cancelBubble(e) {
  var ev = e || window.event;

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

function hasClass(obj, cls) {
  var oriCls = obj.className; // 获取对象的class值

  var oriClsArr = oriCls.split(/\s+/); // 分隔空格转换成数组

  for (var i = 0; i < oriClsArr.length; i++) {
    if (oriClsArr[i] === cls) {
      return true; // 若匹配到class则返回True
    }
  }

  return false; // 否则返回False
}
/**
 * @method addClass
 * */

function addClass(obj, cls) {
  var oriCls = obj.className;
  var space = '';
  var newCls = ''; // 获取对象的class值

  if (oriCls !== '') {
    space = ' '; // 若原来的class不为空，跟一个空格
  }

  newCls = oriCls + space + cls; // 将新的class加进去

  obj.className = newCls; // 替换新class
}
/**
 * @method removeClass
 * */

function removeClass(obj, cls) {
  var oriCls = obj.className;
  var newCls; // 获取对象的class值

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

function throttle(func, wait, options) {
  // timeout: setTimeout Handle
  // previous: 上次时间戳
  var context = null,
      args = null,
      result = null,
      timeout = null,
      previous = 0;

  if (!options) {
    options = {};
  }

  var later = function later() {
    previous = options.leading === false ? 0 : mNow();
    timeout = null;
    result = func.apply(context, args);

    if (!timeout) {
      context = args = null;
    }
  };

  return function () {
    var now = mNow();

    if (!previous && options.leading === false) {
      previous = now;
    }

    var remaining = wait - (now - previous);
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

function debounce(func, wait, immediate) {
  var timeout = null,
      args = null,
      context = null,
      timestamp = null,
      result = null;

  var later = function later() {
    var last = mNow() - timestamp;

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
    var callNow = immediate && !timeout;

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
 * */

function friendlyInterval(start, end) {
  var t = end.getTime() - start.getTime();
  var ret = '未来不可期';

  if (t >= 0) {
    var d = Math.floor(t / 1000 / 60 / 60 / 24);
    var h = Math.floor(t / 1000 / 60 / 60 % 24);
    var m = Math.floor(t / 1000 / 60 % 60);
    var s = Math.floor(t / 1000 % 60);
    ret = d + ' 天 ' + h + ' 时 ' + m + ' 分 ' + s + ' 秒';
  }

  return ret;
}
/**
 * @method updateQueryStringParameter
 * @description 替换或添加地址栏参数。
 * */

function updateQueryStringParameter(uri, key, value) {
  var re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
  var separator = uri.indexOf('?') !== -1 ? '&' : '?';

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

function isJsonString(str) {
  try {
    if (_typeof(JSON.parse(str)) === 'object') {
      return true;
    }
  } catch (e) {}

  return false;
}
/**
 * @method getUrlParam
 * @description 链接参数。
 * */

function getUrlParam(sUrl, sKey) {
  var result = {};
  sUrl.replace(/\??(\w+)=(\w+)&?/g, function (a, k, v) {
    if (result[k] !== undefined) {
      var t = result[k];
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

function getSearchQueryParam(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  var r = window.location.search.substr(1).match(reg);

  if (r != null) {
    return decodeURIComponent(unescape(r[2]));
  }

  return null;
}
/**
 * @method getQueryParam
 * @description 地址栏参数，getSearchQueryParam 的别名。
 * */

function getQueryParam(name) {
  return getSearchQueryParam(name);
}
/**
 * @method doFn
 * @description 执行有效函数
 * @param {Function} fn 等待被执行的未知是否有效的函数
 * */

function doFn(fn) {
  var ret = null;

  if (fn && typeof fn === 'function') {
    ret = fn();
  }

  return ret;
}
/**
 * @method setSessionStorage
 * @description 存储数据到 sessionStorage
 * @param {String} key 键
 * @param {String} value 值
 * */

function setSessionStorage(key) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

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

function getSessionStorage(key) {
  var ret = null;

  if (key) {
    var value = sessionStorage.getItem(key);

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

function setLocalStorage(key) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

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

function getLocalStorage(key) {
  var ret = null;

  if (key) {
    var value = localStorage.getItem(key);

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

function loadCSS(_ref7) {
  var url = _ref7.url,
      callback = _ref7.callback,
      id = _ref7.id;
  callback = typeof callback === 'function' ? callback : function () {};
  var node = document.createElement('link');
  var supportOnload = 'onload' in node;
  var isOldWebKit = +navigator.userAgent.replace(/.*(?:AppleWebKit|AndroidWebKit)\/?(\d+).*/i, '$1') < 536; // webkit旧内核做特殊处理

  var protectNum = 300000; // 阈值10分钟，一秒钟执行pollCss 500次

  node.rel = 'stylesheet';
  node.type = 'text/css';
  node.href = url;

  if (typeof id !== 'undefined') {
    node.id = id;
  }

  document.getElementsByTagName('head')[0].appendChild(node); // for Old WebKit and Old Firefox

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
    node.onload = node.onerror = node.onreadystatechange = null; // 清空node引用，在低版本IE，不清除会造成内存泄露

    node = null;
    callback();
  } // 循环判断css是否已加载成功

  /*
   * @param node -- link节点
   * @param callback -- 回调函数
   * @param step -- 计步器，避免无限循环
   */


  function pollCss(node, callback, step) {
    var sheet = node.sheet;
    var isLoaded;
    step += 1; // 保护，大于10分钟，则不再轮询

    if (step > protectNum) {
      isLoaded = true; // 清空node引用

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

function loadScript(_ref8) {
  var url = _ref8.url,
      callback = _ref8.callback;
  var script = document.createElement('script'); // 如果没有 script 标签，那么代码就不会运行。可以利用这一事实，在页面的第一个 script 标签上使用 insertBefore()。

  var firstScript = document.getElementsByTagName('script')[0];
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

var Deal = /*#__PURE__*/Object.freeze({
  __proto__: null,
  join: join,
  renderTable: renderTable,
  getHashQueryParam: getHashQueryParam,
  camelCaseToKebabCase: camelCaseToKebabCase,
  getDomain: getDomain,
  trim: trim,
  newLine: newLine,
  deepCopyObject: deepCopyObject,
  generateRndNum: generateRndNum,
  generateUniqueNum: generateUniqueNum,
  resetForm: resetForm,
  floatToPercent: floatToPercent,
  floatFixed: floatFixed,
  compatibleExist: compatibleExist,
  cancelBubble: cancelBubble,
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  throttle: throttle,
  debounce: debounce,
  friendlyInterval: friendlyInterval,
  updateQueryStringParameter: updateQueryStringParameter,
  isJsonString: isJsonString,
  getUrlParam: getUrlParam,
  getSearchQueryParam: getSearchQueryParam,
  getQueryParam: getQueryParam,
  doFn: doFn,
  setSessionStorage: setSessionStorage,
  getSessionStorage: getSessionStorage,
  setLocalStorage: setLocalStorage,
  getLocalStorage: getLocalStorage,
  loadCSS: loadCSS,
  loadScript: loadScript
});

// 集合
function MSet() {
  this.dataStore = [];
  this.add = add;
  this.remove = remove;
  this.size = size;
  this.show = show;
  this.contains = contains;
  this.union = union;
  this.intersect = intersect;
  this.subset = subset;
  this.difference = difference;
}

function add(data) {
  if (this.dataStore.indexOf(data) < 0) {
    this.dataStore.push(data);
    return true;
  } else {
    return false;
  }
}

function remove(data) {
  var pos = this.dataStore.indexOf(data);

  if (pos > -1) {
    this.dataStore.splice(pos, 1);
    return true;
  } else {
    return false;
  }
}

function size() {
  return this.dataStore.length;
}

function show() {
  return this.dataStore;
}

function contains(data) {
  if (this.dataStore.indexOf(data) > -1) {
    return true;
  } else {
    return false;
  }
} // 并集


function union(set) {
  var tempSet = new MSet();

  for (var i = 0; i < this.dataStore.length; ++i) {
    tempSet.add(this.dataStore[i]);
  }

  for (var _i = 0; _i < set.dataStore.length; ++_i) {
    if (!tempSet.contains(set.dataStore[_i])) {
      tempSet.dataStore.push(set.dataStore[_i]);
    }
  }

  return tempSet;
} // 交集


function intersect(set) {
  var tempSet = new MSet();

  for (var i = 0; i < this.dataStore.length; ++i) {
    if (set.contains(this.dataStore[i])) {
      tempSet.add(this.dataStore[i]);
    }
  }

  return tempSet;
} // 子集


function subset(set) {
  if (this.size() > set.size()) {
    return false;
  } else {
    for (var i = 0; i < this.dataStore.length; ++i) {
      if (!set.contains(this.dataStore[i])) {
        return false;
      }
    }
  }

  return true;
} // 差集


function difference(set) {
  var tempSet = new MSet();

  for (var i = 0; i < this.dataStore.length; ++i) {
    if (!set.contains(this.dataStore[i])) {
      tempSet.add(this.dataStore[i]);
    }
  }

  return tempSet;
}

var index = _objectSpread2({
  MSet: MSet
}, Deal);

module.exports = index;
