'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mFriendlyInterval = exports.mDebounce = exports.mThrottle = exports.mCompatibleExist = exports.mFloatFixed = exports.mFloatToPercent = exports.mResetForm = exports.mGenerateUniqueNum = exports.mGenerateRndNum = exports.deepCopyObject = exports.newLine = exports.mTrim = exports.mGetTrim = exports.mGetDomain = exports.mCamelCaseToKebabCase = exports.mGetQueryParam = exports.mRenderTable = exports.mJoin = undefined;
exports.mDeepCopyObject = mDeepCopyObject;
exports.mCancelBubble = mCancelBubble;
exports.hasCls = hasCls;
exports.addCls = addCls;
exports.removeCls = removeCls;

var _set = require('./data-structure/set');

var _set2 = _interopRequireDefault(_set);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @method mJoin
 * @description 将一系列值连接成固定字符分隔的字符串 123,456 => 123 - 456。
 * @param {String} joinStr 连接值的字符串。
 * @param {Rest} ...rest 需要连接的值 。
 * */
var mJoin = exports.mJoin = function mJoin(joinStr) {
  for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rest[_key - 1] = arguments[_key];
  }

  var _ref = ['', joinStr.length],
      ret = _ref[0],
      len = _ref[1];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = rest[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var v = _step.value;

      if (v) {
        ret += '' + joinStr + v;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (ret) {
    ret = ret.substring(len);
  }
  return ret;
};

/**
 * @method mRenderTable
 * @description 渲染表格
 * @param {DOM Object} tbID
 * @param {Array} data
 * @param {Array} property
 */
var mRenderTable = exports.mRenderTable = function mRenderTable() {
  var tbID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var property = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  var TBODY = document.querySelector('#' + tbID + ' tbody');
  var mNullToNA = function mNullToNA(str) {
    return str === null ? 'N.A.' : str;
  };
  var content = '';
  TBODY.innerHTML = '';
  // 无数据
  if (!data.length) {
    content = '<tr><td colspan="' + property.length + '">\u65E0\u6570\u636E</td></tr>';
  } else {
    for (function () {
      var _ref2 = [0, data.length];
      var i = _ref2[0],
          max = _ref2[1];
    }(); i < max; ++i) {
      var item = data[i];
      content += '<tr>';
      for (function () {
        var _ref3 = [0, property.length];
        var _i = _ref3[0],
            _max = _ref3[1];
      }(); _i < _max; ++_i) {
        content += '<td>' + mNullToNA(item[property[_i]]) + '</td>';
      }
      content += '</tr>';
    }
  }
  TBODY.innerHTML = content;
};

/**
 * @method mGetQueryParam
 * @description 获取地址栏 hash 后面的参数。
 * @param {String} param 获取参数的名字。
 */
var mGetQueryParam = exports.mGetQueryParam = function mGetQueryParam(param) {
  var hashs = window.location.hash.split('?');
  if (hashs.length === 1) {
    return null;
  }
  var reg = new RegExp('(^|&)' + param + '=([^&]*)(&|$)');
  var ret = hashs[1].match(reg);
  return ret ? ret[2] : null;
};

/**
 * @method mCamelCaseToKebabCase
 * @description 驼峰转连接线。
 * @param {String} camelCase
 * */
var mCamelCaseToKebabCase = exports.mCamelCaseToKebabCase = function mCamelCaseToKebabCase(camelCase) {
  var kebabCase = camelCase.replace(/([A-Z])/g, '-$1').toLowerCase();
  return kebabCase[0] === '-' ? kebabCase.substr(1) : kebabCase;
};

/**
 * @method mGetDomain
 * @description 获取地址中的域名。
 * @param {String} url
 * */
var mGetDomain = exports.mGetDomain = function mGetDomain(url) {
  var aEl = document.createElement('a');
  aEl.href = url;
  return aEl.hostname;
};

/**
 * @method mGetTrim
 * @description 去除左右空格 To Remove!。
 * @param {String} str
 * */
var mGetTrim = exports.mGetTrim = function mGetTrim(str) {
  return str.replace(/^\s+|\s+$/gm, '');
};

/**
 * @method mTrim
 * @description 去除左右空格。
 * @param {String} str 需要去除两边空格的字符串。
 * */
var mTrim = exports.mTrim = function mTrim(str) {
  str = str.replace(/^\s+/, ''); // 去除头部空格
  var end = str.length - 1,
      ws = /\s/;

  while (ws.test(str.charAt(end))) {
    end--; // 最后一个非空格字符的索引
  }
  return str.slice(0, end + 1);
};

/**
 * @method newLine
 * @description html换行。
 * @param {String} str
 * */
var newLine = exports.newLine = function newLine(str) {
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
var deepCopyObject = exports.deepCopyObject = mDeepCopyObject;

/**
 * @method mGenerateRndNum
 * @description 生成随机数 mGenerateRndNum(7) => 7658495。
 * @param {Number} n 随机数的长度
 * @return {String}
 * */
var mGenerateRndNum = exports.mGenerateRndNum = function mGenerateRndNum(n) {
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
var mGenerateUniqueNum = exports.mGenerateUniqueNum = function mGenerateUniqueNum(n) {
  var _ref4 = [mNow(), mGenerateRndNum(n || 3)],
      now = _ref4[0],
      rnd = _ref4[1];

  return now + rnd;
};

/**
 * @method mResetForm
 * @description 重置表单输入值为原始（空）状态。
 * @param {String} rest name1,name2,name3...NAME属性，可以多个。
 * */
var mResetForm = exports.mResetForm = function mResetForm() {
  for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    rest[_key2] = arguments[_key2];
  }

  for (var i = 0; i < rest.length; i++) {
    var tagMz = document.getElementsByName(rest[i])[0]; // tag object
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
var mFloatToPercent = exports.mFloatToPercent = function mFloatToPercent(num, isFix) {
  if (isFix) {
    num = (num * 100).toFixed(isFix);
  } else {
    num = Math.floor(num * 100);
  }
  return num + '%';
};

/**
 * @method mFloatFixed
 * @description 浮点数保留指定位。
 * */
var mFloatFixed = exports.mFloatFixed = function mFloatFixed(num, size) {
  return parseFloat(num, 10).toFixed(size);
};

/**
 * @method mCompatibleExist
 * @description 不存在返回 ——。
 * */
var mCompatibleExist = exports.mCompatibleExist = function mCompatibleExist(instance, replaceStr) {
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

// hasClass
function hasCls(obj, cls) {
  var oriCls = obj.className; // 获取对象的class值
  var oriClsArr = oriCls.split(/\s+/); // 分隔空格转换成数组
  for (var i = 0; i < oriClsArr.length; i++) {
    if (oriClsArr[i] === cls) {
      return true; // 若匹配到class则返回True
    }
  }
  return false; // 否则返回False
}

// addClass
function addCls(obj, cls) {
  var oriCls = obj.className;
  var space = '';
  var newCls = void 0; // 获取对象的class值
  if (oriCls !== '') {
    space = ' '; // 若原来的class不为空，跟一个空格
  }
  newCls = oriCls + space + cls; // 将新的class加进去
  obj.className = newCls; // 替换新class
}

// removeClass
function removeCls(obj, cls) {
  var oriCls = obj.className;
  var newCls = void 0; // 获取对象的class值
  newCls = ' ' + oriCls + ' '; // 前后加空格
  newCls = newCls.replace(/(\s+)/gi, ' '); // 将多余的空格替换成一个空格
  newCls = newCls.replace(' ' + cls + ' ', ' '); // 将加了前后空格的cls替换成空格' '
  newCls = newCls.replace(/(^\s+)|(\s+$)/g, ''); // 去掉前后空格
  obj.className = newCls;
}

// 时间戳
var mNow = Date.now || function () {
  return new Date().getTime();
};

/**
 * @method mThrottle
 * @description 节流。
 * */
var mThrottle = exports.mThrottle = function mThrottle(func, wait, options) {
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
var mDebounce = exports.mDebounce = function mDebounce(func, wait, immediate) {
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
var mFriendlyInterval = exports.mFriendlyInterval = function mFriendlyInterval(start, end) {
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
