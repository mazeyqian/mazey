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
 * Modify `class`: determine `class`.
 *
 * Usage:
 *
 * ```javascript
 * const dom = document.querySelector('#box');
 *
 * // Determine `class`
 * hasClass(dom, 'test');
 * // Add `class`
 * setClass(dom, 'test');
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

/**
 * Modify `class`: add `class`.
 *
 * Usage:
 *
 * ```javascript
 * const dom = document.querySelector('#box');
 *
 * // Determine `class`
 * hasClass(dom, 'test');
 * // Add `class`
 * setClass(dom, 'test');
 * // Remove `class`
 * removeClass(dom, 'test');
 * ```
 *
 * @category DOM
 */
export function setClass(obj: HTMLElement, cls: string): void {
  const oriCls = obj.className;
  // should not add duplicate classes
  const oriClsArr = oriCls.split(/\s+/);
  for (let i = 0; i < oriClsArr.length; i++) {
    if (oriClsArr[i] === cls) {
      return;
    }
  }
  // Origin logic
  let space = '';
  let newCls = ''; // 获取对象的class值
  if (oriCls !== '') {
    space = ' '; // 若原来的class不为空，跟一个空格
  }
  newCls = oriCls + space + cls; // 将新的class加进去
  obj.className = newCls; // 替换新class
}

/**
 * Alias of `setClass`
 *
 * @hidden
 */
export function addClass(obj: HTMLElement, cls: string): void {
  setClass(obj, cls);
}

/**
 * Modify `class`: remove `class`.
 *
 * Usage:
 *
 * ```javascript
 * const dom = document.querySelector('#box');
 *
 * // Determine `class`
 * hasClass(dom, 'test');
 * // Add `class`
 * setClass(dom, 'test');
 * // Remove `class`
 * removeClass(dom, 'test');
 * ```
 *
 * @category DOM
 */
export function removeClass(obj: HTMLElement, cls: string): void {
  const oriCls = obj.className;
  let newCls; // 获取对象的class值
  newCls = ' ' + oriCls + ' '; // 前后加空格
  newCls = newCls.replace(/(\s+)/gi, ' '); // 将多余的空格替换成一个空格
  newCls = newCls.replace(' ' + cls + ' ', ' '); // 将加了前后空格的cls替换成空格' '
  newCls = newCls.replace(/(^\s+)|(\s+$)/g, ''); // 去掉前后空格
  obj.className = newCls;
}
