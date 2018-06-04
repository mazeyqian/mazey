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
export const camelCaseToKebabCase = camelCase => {
  let kebabCase = camelCase.replace(/([A-Z])/g, '-$1').toLowerCase()
  return kebabCase[0] === '-' ? kebabCase.substr(1) : kebabCase
}

// 数据结构
import MSet from './data-structure/set'
export const mDataStructure = {
  MSet: MSet
}