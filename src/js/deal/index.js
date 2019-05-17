/*Deal*/

import {mNow} from "../service/common";

/**
 * @method mJoin
 * @description 将一系列值连接成固定字符分隔的字符串 123,456 => 123 - 456。
 * @param {String} joinStr 连接值的字符串。
 * @param {Rest} ...rest 需要连接的值 。
 * */

function mJoin (joinStr, ...rest) {
  let [ret, len] = ['', joinStr.length]
  for (let v of rest) {
    if (v) {
      ret += `${joinStr}${v}`
    }
  }
  if (ret) {
    ret = ret.substring(len)
  }
  return ret
}

/**
 * @method mRenderTable
 * @description 渲染表格
 * @param {DOM Object} tbID
 * @param {Array} data
 * @param {Array} property
 */
export const mRenderTable = (tbID = null, data = [], property = []) => {
  const TBODY = document.querySelector(`#${tbID} tbody`)
  const mNullToNA = str => {
    return str === null ? 'N.A.' : str
  }
  let content = ''
  TBODY.innerHTML = ''
  // 无数据
  if (!data.length) {
    content = `<tr><td colspan="${property.length}">无数据</td></tr>`
  } else {
    for (let [i, max] = [0, data.length]; i < max; ++i) {
      let item = data[i]
      content += `<tr>`
      for (let [i, max] = [0, property.length]; i < max; ++i) {
        content += `<td>${mNullToNA(item[property[i]])}</td>`
      }
      content += `</tr>`
    }
  }
  TBODY.innerHTML = content
}

/**
 * @method mGetHashQueryParam
 * @description 获取地址栏 hash 后面的参数。
 * @param {String} param 获取参数的名字。
 */
export const mGetHashQueryParam = param => {
  let hashs = window.location.hash.split('?')
  if (hashs.length === 1) {
    return null
  }
  let reg = new RegExp(`(^|&)${param}=([^&]*)(&|$)`)
  let ret = hashs[1].match(reg)
  return ret ? ret[2] : null
}

/**
 * @method mCamelCaseToKebabCase
 * @description 驼峰转连接线。
 * @param {String} camelCase
 * */
export const mCamelCaseToKebabCase = camelCase => {
  let kebabCase = camelCase.replace(/([A-Z])/g, '-$1').toLowerCase()
  return kebabCase[0] === '-' ? kebabCase.substr(1) : kebabCase
}

/**
 * @method mGetDomain
 * @description 获取地址中的域名。
 * @param {String} url
 * */
export const mGetDomain = url => {
  let aEl = document.createElement('a')
  aEl.href = url
  return aEl.hostname
}

/**
 * @method mGetTrim
 * @description 去除左右空格 To Remove!。
 * @param {String} str
 * */
export const mGetTrim = str => {
  return str.replace(/^\s+|\s+$/gm, '')
}

/**
 * @method mTrim
 * @description 去除左右空格。
 * @param {String} str 需要去除两边空格的字符串。
 * */
export const mTrim = str => {
  str = str.replace(/^\s+/, '') // 去除头部空格
  let [end, ws] = [str.length - 1, /\s/]
  while (ws.test(str.charAt(end))) {
    end-- // 最后一个非空格字符的索引
  }
  return str.slice(0, end + 1)
}

/**
 * @method mNewLine
 * @description html换行。
 * @param {String} str
 * */
export const mNewLine = str => {
  if (!str) {
    return ''
  }
  let reg = new RegExp('\\n', 'g')
  return str.replace(reg, '<br />')
}

/**
 * @method mDeepCopyObject
 * @description 对象深拷贝。
 * @param {Object} obj 被拷贝的对象。
 * @return {Object}
 * */
export function mDeepCopyObject (obj) {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * @method mGenerateRndNum
 * @description 生成随机数 mGenerateRndNum(7) => 7658495。
 * @param {Number} n 随机数的长度
 * @return {String}
 * */
export const mGenerateRndNum = n => {
  let ret = ''
  while (n--) {
    ret += Math.floor(Math.random() * 10)
  }
  return ret
}

/**
 * @method mGenerateUniqueNum
 * @description 根据时间生成唯一标志的数字 mGenerateUniqueNum() => 1538324722364123。
 * @param {Number} n 随机数的长度
 * */
export const mGenerateUniqueNum = n => {
  let [now, rnd] = [mNow(), mGenerateRndNum(n || 3)]
  return now + rnd
}

/**
 * @method mResetForm
 * @description 重置表单输入值为原始（空）状态。
 * @param {String} rest name1,name2,name3...NAME属性，可以多个。
 * */
export const mResetForm = (...rest) => {
  for (let i = 0; i < rest.length; i++) {
    let tagMz = document.getElementsByName(rest[i])[0] // tag object
    let tagNameMz = tagMz.tagName.toLowerCase() // tag name
    if (tagNameMz === 'input') {
      tagMz.value = ''
    } else if (tagNameMz === 'select') {
      tagMz.options[0].selected = true
    }
  }
}

/**
 * @method mFloatToPercent
 * @description 浮点数转为百分比 0.2 => 20%。
 * @param {Number} 浮点数。
 * */
export const mFloatToPercent = (num, isFix) => {
  if (isFix) {
    num = (num * 100).toFixed(isFix)
  } else {
    num = Math.floor(num * 100)
  }
  return `${num}%`
}

/**
 * @method mFloatFixed
 * @description 浮点数保留指定位。
 * */
export const mFloatFixed = (num, size) => parseFloat(num).toFixed(size)

/**
 * @method mCompatibleExist
 * @description 不存在返回 ——。
 * */
export const mCompatibleExist = (instance, replaceStr) => {
  let ret = ''
  try {
    ret = instance ? instance : replaceStr || '——'
  } catch (e) {
    ret = '——'
  }
  return ret
}

/**
 * @method mCancelBubble
 * @description 阻止冒泡。
 * */
export function mCancelBubble (e) {
  const ev = e ? e : window.event
  if (ev.stopPropagation) { // W3C
    ev.stopPropagation()
  } else { // IE
    ev.cancelBubble = true
  }
}

/**
 * @method mHasClass
 * */
export function mHasClass (obj, cls) {
  let oriCls = obj.className // 获取对象的class值
  let oriClsArr = oriCls.split(/\s+/) // 分隔空格转换成数组
  for (let i = 0; i < oriClsArr.length; i++) {
    if (oriClsArr[i] === cls) {
      return true // 若匹配到class则返回True
    }
  }
  return false // 否则返回False
}

/**
 * @method mAddClass
 * */
export function mAddClass (obj, cls) {
  let oriCls = obj.className
  let space = ''
  let newCls // 获取对象的class值
  if (oriCls !== '') {
    space = ' ' // 若原来的class不为空，跟一个空格
  }
  newCls = oriCls + space + cls // 将新的class加进去
  obj.className = newCls // 替换新class
}

/**
 * @method mRemoveClass
 * */
export function mRemoveClass (obj, cls) {
  let oriCls = obj.className
  let newCls // 获取对象的class值
  newCls = ' ' + oriCls + ' ' // 前后加空格
  newCls = newCls.replace(/(\s+)/gi, ' ') // 将多余的空格替换成一个空格
  newCls = newCls.replace(' ' + cls + ' ', ' ') // 将加了前后空格的cls替换成空格' '
  newCls = newCls.replace(/(^\s+)|(\s+$)/g, '') // 去掉前后空格
  obj.className = newCls
}

/**
 * @method mThrottle
 * @description 节流。
 * */
export const mThrottle = function (func, wait, options) {
  // timeout: setTimeout Handle
  // previous: 上次时间戳
  let [context, args, result, timeout, previous] = [null, null, null, null, 0]
  if (!options) {
    options = {}
  }
  let later = function () {
    previous = options.leading === false ? 0 : mNow()
    timeout = null
    result = func.apply(context, args)
    if (!timeout) {
      context = args = null
    }
  }
  return function () {
    let now = mNow()
    if (!previous && options.leading === false) {
      previous = now
    }
    let remaining = wait - (now - previous)
    context = this
    args = arguments
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      result = func.apply(context, args)
      if (!timeout) {
        context = args = null
      }
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
    return result
  }
}

/**
 * @method mDebounce
 * @description 去抖。
 * */
export const mDebounce = function (func, wait, immediate) {
  let [timeout, args, context, timestamp, result] = [null, null, null, null, null]
  let later = function () {
    let last = mNow() - timestamp
    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) {
          context = args = null
        }
      }
    }
  }
  return function () {
    context = this
    args = arguments
    timestamp = mNow()
    let callNow = immediate && !timeout
    if (!timeout) {
      timeout = setTimeout(later, wait)
    }
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }
    return result
  }
}

/**
 * @method mFriendlyInterval
 * @description 获取间隔时间。
 * */
export const mFriendlyInterval = (start, end) => {
  const t = end.getTime() - start.getTime()
  let ret = '未来不可期'
  if (t >= 0) {
    const d = Math.floor(t / 1000 / 60 / 60 / 24)
    const h = Math.floor(t / 1000 / 60 / 60 % 24)
    const m = Math.floor(t / 1000 / 60 % 60)
    const s = Math.floor(t / 1000 % 60)
    ret = d + ' 天 ' + h + ' 时 ' + m + ' 分 ' + s + ' 秒'
  }
  return ret
}

/**
 * @method mUpdateQueryStringParameter
 * @description 替换或添加地址栏参数。
 * */
export function mUpdateQueryStringParameter (uri, key, value) {
  let re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  let separator = uri.indexOf('?') !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + "=" + value + '$2');
  }
  else {
    return uri + separator + key + "=" + value;
  }
}

/**
 * @method mIsJsonString
 * @description 判断是否合法 JSON 字符串。
 * */
export function mIsJsonString(str) {
  try {
    if (typeof JSON.parse(str) === "object") {
      return true;
    }
  } catch(e) {}
  return false;
}

/**
 * @method mGetUrlParam
 * @description 链接参数。
 * */
export function mGetUrlParam(sUrl,sKey){
  let result = {};
  sUrl.replace(/\??(\w+)=(\w+)&?/g,function(a,k,v){
    if(result[k] !== void 0){
      let t = result[k];
      result[k] = [].concat(t,v);
    }else{
      result[k] = v;
    }
  });
  if(sKey === void 0){
    return result;
  }else{
    return result[sKey] || '';
  }
}

/**
 * @method mGetSearchQueryParam
 * @description 地址栏参数。
 * */
export function mGetSearchQueryParam(name) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  let r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return decodeURIComponent(unescape(r[2]));
  }
  return null;
}

export default {
  mJoin,
  mRenderTable,
  mGetHashQueryParam,
  mCamelCaseToKebabCase,
  mGetDomain,
  mGetTrim,
  mTrim,
  mNewLine,
  mDeepCopyObject,
  mGenerateRndNum,
  mGenerateUniqueNum,
  mResetForm,
  mFloatToPercent,
  mFloatFixed,
  mCompatibleExist,
  mCancelBubble,
  mHasClass,
  mAddClass,
  mRemoveClass,
  mThrottle,
  mDebounce,
  mFriendlyInterval,
  mUpdateQueryStringParameter,
  mIsJsonString,
  mGetUrlParam,
  mGetSearchQueryParam
}
