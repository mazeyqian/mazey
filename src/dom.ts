/**
 * Make a new line of HTML.
 *
 * Usage:
 *
 * ```javascript
 * const ret1 = newLine('a\nb\nc');
 * const ret2 = newLine('a\n\nbc');
 * console.log(ret1);
 * console.log(ret2);
 * ```
 *
 * Output:
 *
 * ```text
 * a<br />b<br />c
 * a<br /><br />bc
 * ```
 *
 * @param {string} str The string to make a new line.
 * @returns {string} A newline with `br`.
 * @category DOM
 */
export function newLine(str: string): string {
  if (!str) {
    return '';
  }
  const reg = new RegExp('\\n', 'g');
  return str.replace(reg, '<br />');
}

/**
 * Modify `class`.
 *
 * Usage:
 *
 * ```javascript
 * const dom = document.querySelector('#box');
 *
 * // Determine `class`
 * hasClass(dom, 'test');
 * // Add `class`
 * addClass(dom, 'test');
 * // Remove `class`
 * removeClass(dom, 'test');
 * ```
 *
 * @category DOM
 */
export function hasClass(obj: HTMLElement, cls: string): boolean {
  const oriCls = obj.className; // 获取对象的class值
  const oriClsArr = oriCls.split(/\s+/); // 分隔空格转换成数组
  for (let i = 0; i < oriClsArr.length; i++) {
    if (oriClsArr[i] === cls) {
      return true; // 若匹配到class则返回True
    }
  }
  return false; // 否则返回False
}
