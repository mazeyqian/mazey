import MSet from './data-structure/set'
// 渲染表格
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

// 获取地址栏参数
export const mGetQueryParam = param => {
  let hashs = window.location.hash.split('?')
  if (hashs.length === 1) {
    return null
  }
  let reg = new RegExp(`(^|&)${param}=([^&]*)(&|$)`)
  let ret = hashs[1].match(reg)
  return ret ? ret[2] : null
}

// 驼峰转连接线
export const mCamelCaseToKebabCase = camelCase => {
  let kebabCase = camelCase.replace(/([A-Z])/g, '-$1').toLowerCase()
  return kebabCase[0] === '-' ? kebabCase.substr(1) : kebabCase
}

// 获取地址中的域名
export const mGetDomain = url => {
  let aEl = document.createElement('a')
  aEl.href = url
  return aEl.hostname
}

// 去除左右空格
export const mGetTrim = str => {
  return str.replace(/^\s+|\s+$/gm, '')
}

// html换行
export const newLine = str => {
    if (!str) {
        return ''
    }
    let reg = new RegExp('\n', 'g')
    return str.replace(reg, '<br />')
}

// 对象深拷贝
export const deepCopyObject = obj => JSON.parse(JSON.stringify(obj))

/**
 * @method mGenerateRndNum
 * @description 生成随机数。
 * @param {Number} n 随机数的长度
 * */
export const mGenerateRndNum = n => {
    let ret = ''
    while (n--) {
        ret += Math.floor(Math.random() * 10)
    }
    return ret
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

// hasClass
export function hasCls(obj, cls){
    var oriCls = obj.className, //获取对象的class值
        oriClsArr = oriCls.split(/\s+/); //分隔空格转换成数组
    for(var i = 0; i < oriClsArr.length; i++){
        if(oriClsArr[i] === cls){
            return true; //若匹配到class则返回True
        }
    }
    return false; //否则返回False
}

// addClass
export function addCls(obj, cls){
    var oriCls = obj.className, space = '', newCls; //获取对象的class值
    if(oriCls !== ''){
        space = ' '; //若原来的class不为空，跟一个空格
    }
    newCls = oriCls + space + cls; //将新的class加进去
    obj.className = newCls; //替换新class
}

// removeClass
export function removeCls(obj, cls){
    var oriCls = obj.className, newCls; //获取对象的class值
    newCls = ' ' + oriCls + ' '; //前后加空格
    newCls = newCls.replace(/(\s+)/gi, ' '); //将多余的空格替换成一个空格
    newCls = newCls.replace(' ' + cls + ' ', ' '); //将加了前后空格的cls替换成空格' '
    newCls = newCls.replace(/(^\s+)|(\s+$)/g, ''); //去掉前后空格
    obj.className = newCls;
}

// 时间戳
const mNow = Date.now || function() {
    return new Date().getTime()
}

// 节流
export const throttle = function (func, wait, options) {
    let [context, args, result, timeout, previous] = [null, null, null, null, 0]
    if (!options) {
        options = {}
    }
    let later = function() {
        previous = options.leading === false ? 0 : mNow()
        timeout = null
        result = func.apply(context, args)
        if (!timeout) {
            context = args = null
        }
    }
    return function() {
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

// 防抖
export const debounce = function(func, wait, immediate) {
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

    return function() {
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

// 数据结构
export const mDataStructure = {
  MSet: MSet
}
