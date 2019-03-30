/**
 * @module js/deal
 * @author 钱程 <mazey@mazey.net>
 * @description 数据处理 / 2019-03-28
 * */

class Deal {
  /**
   * @method mJoin
   * @description 将一系列值连接成固定字符分隔的字符串 123,456 => 123 - 456。
   * @param {String} joinStr 连接值的字符串。
   * @param {Rest} ...rest 需要连接的值 。
   * */
  static mJoin (joinStr, ...rest) {
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
}

export default Deal
