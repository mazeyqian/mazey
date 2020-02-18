'use strict';

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

var DataStructure = {
  MSet: MSet
};

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

// 时间戳
var mNow = Date.now || function () {
  return new Date().getTime();
};

/**
 * @method mJoin
 * @description 将一系列值连接成固定字符分隔的字符串 123,456 => 123 - 456。
 * @param {String} joinStr 连接值的字符串。
 * @param {Rest} ...rest 需要连接的值 。
 * */

function mJoin(joinStr) {
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
 * @method mRenderTable
 * @description 渲染表格
 * @param {DOM Object} tbID
 * @param {Array} data
 * @param {Array} property
 */


var mRenderTable = function mRenderTable() {
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
      content += "<tr>";

      for (var _ref3 = [0, property.length], _i2 = _ref3[0], _max = _ref3[1]; _i2 < _max; ++_i2) {
        content += "<td>".concat(mNullToNA(item[property[_i2]]), "</td>");
      }

      content += "</tr>";
    }
  }

  TBODY.innerHTML = content;
};
/**
 * @method mGetHashQueryParam
 * @description 获取地址栏 hash 后面的参数。
 * @param {String} param 获取参数的名字。
 */

var mGetHashQueryParam = function mGetHashQueryParam(param) {
  var hashs = window.location.hash.split('?');

  if (hashs.length === 1) {
    return null;
  }

  var reg = new RegExp("(^|&)".concat(param, "=([^&]*)(&|$)"));
  var ret = hashs[1].match(reg);
  return ret ? ret[2] : null;
};
/**
 * @method mCamelCaseToKebabCase
 * @description 驼峰转连接线。
 * @param {String} camelCase
 * */

var mCamelCaseToKebabCase = function mCamelCaseToKebabCase(camelCase) {
  var kebabCase = camelCase.replace(/([A-Z])/g, '-$1').toLowerCase();
  return kebabCase[0] === '-' ? kebabCase.substr(1) : kebabCase;
};
/**
 * @method mGetDomain
 * @description 获取地址中的域名（及其他参数）。
 * @param {String} url
 * @param {Array} rules ['hostname', 'pathname'] = 'km.mazey.net/plugins/servlet/mobile'
 * */

var mGetDomain = function mGetDomain() {
  var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      url = _ref4.url,
      _ref4$rules = _ref4.rules,
      rules = _ref4$rules === void 0 ? ['hostname'] : _ref4$rules;

  var _ref5 = [document.createElement('a'), ''],
      aEl = _ref5[0];
  aEl.href = url;
  return rules.reduce(function (ret, v, index) {
    ret += aEl[v];
    return ret;
  }, '');
};
/**
 * @method mGetTrim
 * @description 去除左右空格 To Remove!。
 * @param {String} str
 * */

var mGetTrim = function mGetTrim(str) {
  return str.replace(/^\s+|\s+$/gm, '');
};
/**
 * @method mTrim
 * @description 去除左右空格。
 * @param {String} str 需要去除两边空格的字符串。
 * */

var mTrim = function mTrim(str) {
  str = str.replace(/^\s+/, ''); // 去除头部空格

  var end = str.length - 1,
      ws = /\s/;

  while (ws.test(str.charAt(end))) {
    end--; // 最后一个非空格字符的索引
  }

  return str.slice(0, end + 1);
};
/**
 * @method mNewLine
 * @description html换行。
 * @param {String} str
 * */

var mNewLine = function mNewLine(str) {
  if (!str) {
    return '';
  }

  var reg = new RegExp('\\n', 'g');
  return str.replace(reg, '<br />');
};
/**
 * @method mDeepCopyObject
 * @description 对象深拷贝。
 * @param {Object} obj 被拷贝的对象。
 * @return {Object}
 * */

function mDeepCopyObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}
/**
 * @method mGenerateRndNum
 * @description 生成随机数 mGenerateRndNum(7) => 7658495。
 * @param {Number} n 随机数的长度
 * @return {String}
 * */

var mGenerateRndNum = function mGenerateRndNum(n) {
  var ret = '';

  while (n--) {
    ret += Math.floor(Math.random() * 10);
  }

  return ret;
};
/**
 * @method mGenerateUniqueNum
 * @description 根据时间生成唯一标志的数字 mGenerateUniqueNum() => 1538324722364123。
 * @param {Number} n 随机数的长度
 * */

var mGenerateUniqueNum = function mGenerateUniqueNum(n) {
  var _ref6 = [mNow(), mGenerateRndNum(n || 3)],
      now = _ref6[0],
      rnd = _ref6[1];
  return now + rnd;
};
/**
 * @method mResetForm
 * @description 重置表单输入值为原始（空）状态。
 * @param {String} rest name1,name2,name3...NAME属性，可以多个。
 * */

var mResetForm = function mResetForm() {
  for (var i = 0; i < arguments.length; i++) {
    var tagMz = document.getElementsByName(i < 0 || arguments.length <= i ? undefined : arguments[i])[0]; // tag object

    var tagNameMz = tagMz.tagName.toLowerCase(); // tag name

    if (tagNameMz === 'input') {
      tagMz.value = '';
    } else if (tagNameMz === 'select') {
      tagMz.options[0].selected = true;
    }
  }
};
/**
 * @method mFloatToPercent
 * @description 浮点数转为百分比 0.2 => 20%。
 * @param {Number} 浮点数。
 * */

var mFloatToPercent = function mFloatToPercent(num, isFix) {
  if (isFix) {
    num = (num * 100).toFixed(isFix);
  } else {
    num = Math.floor(num * 100);
  }

  return "".concat(num, "%");
};
/**
 * @method mFloatFixed
 * @description 浮点数保留指定位。
 * */

var mFloatFixed = function mFloatFixed(num, size) {
  return parseFloat(num).toFixed(size);
};
/**
 * @method mCompatibleExist
 * @description 不存在返回 ——。
 * */

var mCompatibleExist = function mCompatibleExist(instance, replaceStr) {
  var ret = '';

  try {
    ret = instance ? instance : replaceStr || '——';
  } catch (e) {
    ret = '——';
  }

  return ret;
};
/**
 * @method mCancelBubble
 * @description 阻止冒泡。
 * */

function mCancelBubble(e) {
  var ev = e ? e : window.event;

  if (ev.stopPropagation) {
    // W3C
    ev.stopPropagation();
  } else {
    // IE
    ev.cancelBubble = true;
  }
}
/**
 * @method mHasClass
 * */

function mHasClass(obj, cls) {
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
 * @method mAddClass
 * */

function mAddClass(obj, cls) {
  var oriCls = obj.className;
  var space = '';
  var newCls; // 获取对象的class值

  if (oriCls !== '') {
    space = ' '; // 若原来的class不为空，跟一个空格
  }

  newCls = oriCls + space + cls; // 将新的class加进去

  obj.className = newCls; // 替换新class
}
/**
 * @method mRemoveClass
 * */

function mRemoveClass(obj, cls) {
  var oriCls = obj.className;
  var newCls; // 获取对象的class值

  newCls = ' ' + oriCls + ' '; // 前后加空格

  newCls = newCls.replace(/(\s+)/gi, ' '); // 将多余的空格替换成一个空格

  newCls = newCls.replace(' ' + cls + ' ', ' '); // 将加了前后空格的cls替换成空格' '

  newCls = newCls.replace(/(^\s+)|(\s+$)/g, ''); // 去掉前后空格

  obj.className = newCls;
}
/**
 * @method mThrottle
 * @description 节流。
 * */

var mThrottle = function mThrottle(func, wait, options) {
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
};
/**
 * @method mDebounce
 * @description 去抖。
 * */

var mDebounce = function mDebounce(func, wait, immediate) {
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
};
/**
 * @method mFriendlyInterval
 * @description 获取间隔时间。
 * */

var mFriendlyInterval = function mFriendlyInterval(start, end) {
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
};
/**
 * @method mUpdateQueryStringParameter
 * @description 替换或添加地址栏参数。
 * */

function mUpdateQueryStringParameter(uri, key, value) {
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf('?') !== -1 ? "&" : "?";

  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + "=" + value + '$2');
  } else {
    return uri + separator + key + "=" + value;
  }
}
/**
 * @method mIsJsonString
 * @description 判断是否合法 JSON 字符串。
 * */

function mIsJsonString(str) {
  try {
    if (_typeof(JSON.parse(str)) === "object") {
      return true;
    }
  } catch (e) {}

  return false;
}
/**
 * @method mGetUrlParam
 * @description 链接参数。
 * */

function mGetUrlParam(sUrl, sKey) {
  var result = {};
  sUrl.replace(/\??(\w+)=(\w+)&?/g, function (a, k, v) {
    if (result[k] !== void 0) {
      var t = result[k];
      result[k] = [].concat(t, v);
    } else {
      result[k] = v;
    }
  });

  if (sKey === void 0) {
    return result;
  } else {
    return result[sKey] || '';
  }
}
/**
 * @method mGetSearchQueryParam
 * @description 地址栏参数。
 * */

function mGetSearchQueryParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);

  if (r != null) {
    return decodeURIComponent(unescape(r[2]));
  }

  return null;
}
var Deal = {
  mJoin: mJoin,
  mRenderTable: mRenderTable,
  mGetHashQueryParam: mGetHashQueryParam,
  mCamelCaseToKebabCase: mCamelCaseToKebabCase,
  mGetDomain: mGetDomain,
  mGetTrim: mGetTrim,
  mTrim: mTrim,
  mNewLine: mNewLine,
  mDeepCopyObject: mDeepCopyObject,
  mGenerateRndNum: mGenerateRndNum,
  mGenerateUniqueNum: mGenerateUniqueNum,
  mResetForm: mResetForm,
  mFloatToPercent: mFloatToPercent,
  mFloatFixed: mFloatFixed,
  mCompatibleExist: mCompatibleExist,
  mCancelBubble: mCancelBubble,
  mHasClass: mHasClass,
  mAddClass: mAddClass,
  mRemoveClass: mRemoveClass,
  mThrottle: mThrottle,
  mDebounce: mDebounce,
  mFriendlyInterval: mFriendlyInterval,
  mUpdateQueryStringParameter: mUpdateQueryStringParameter,
  mIsJsonString: mIsJsonString,
  mGetUrlParam: mGetUrlParam,
  mGetSearchQueryParam: mGetSearchQueryParam
};

/**
 * @module mazey-ui/js
 * @author 钱程 <mazey@mazey.net>
 * @description 常用的数据结构, 方法
 * */

var index = {
  // Data structure
  Set: DataStructure.MSet,
  // Deal
  join: Deal.mJoin,
  renderTable: Deal.mRenderTable,
  getHashQueryParam: Deal.mGetHashQueryParam,
  camelCaseToKebabCase: Deal.mCamelCaseToKebabCase,
  getDomain: Deal.mGetDomain,
  getTrim: Deal.mGetTrim,
  trim: Deal.mTrim,
  newLine: Deal.mNewLine,
  deepCopyObject: Deal.mDeepCopyObject,
  generateRndNum: Deal.mGenerateRndNum,
  generateUniqueNum: Deal.mGenerateUniqueNum,
  resetForm: Deal.mResetForm,
  floatToPercent: Deal.mFloatToPercent,
  floatFixed: Deal.mFloatFixed,
  compatibleExist: Deal.mCompatibleExist,
  cancelBubble: Deal.mCancelBubble,
  hasClass: Deal.mHasClass,
  addClass: Deal.mAddClass,
  removeClass: Deal.mRemoveClass,
  throttle: Deal.mThrottle,
  debounce: Deal.mDebounce,
  friendlyInterval: Deal.mFriendlyInterval,
  updateQueryStringParameter: Deal.mUpdateQueryStringParameter,
  isJsonString: Deal.mIsJsonString,
  getUrlParam: Deal.mGetUrlParam,
  getSearchQueryParam: Deal.mGetSearchQueryParam
};

module.exports = index;
