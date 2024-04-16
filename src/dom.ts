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
 * addClass(dom, 'test');
 * // Remove `class`
 * removeClass(dom, 'test');
 * ```
 *
 * @category DOM
 */
export function addClass(obj: HTMLElement, cls: string): void {
  const oriCls = obj.className;
  // should not add duplicate classes
  const oriClsArr = oriCls.split(/\s+/);
  for (let i = 0; i < oriClsArr.length; i++) {
    if (oriClsArr[i] === cls) {
      return;
    }
  }
  // Origin logic
  let space = "";
  let newCls = ""; // 获取对象的class值
  if (oriCls !== "") {
    space = " "; // 若原来的class不为空，跟一个空格
  }
  newCls = oriCls + space + cls; // 将新的class加进去
  obj.className = newCls; // 替换新class
}

/**
 * Alias of `addClass`.
 *
 * @hidden
 */
export function setClass(obj: HTMLElement, cls: string): void {
  addClass(obj, cls);
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
 * addClass(dom, 'test');
 * // Remove `class`
 * removeClass(dom, 'test');
 * ```
 *
 * @category DOM
 */
export function removeClass(obj: HTMLElement, cls: string): void {
  const oriCls = obj.className;
  let newCls; // 获取对象的class值
  newCls = " " + oriCls + " "; // 前后加空格
  newCls = newCls.replace(/(\s+)/gi, " "); // 将多余的空格替换成一个空格
  newCls = newCls.replace(" " + cls + " ", " "); // 将加了前后空格的cls替换成空格' '
  newCls = newCls.replace(/(^\s+)|(\s+$)/g, ""); // 去掉前后空格
  obj.className = newCls;
}

/**
 * EN: Add `<style>` in `<head>`.
 *
 * ZH: 添加样式标签; style: 样式标签内的字符串; id: `<style>` 标签的 `id`; 返回: 添加成功/失败
 *
 * Example 1: Add the `<style>` with `id`, and repeated invoking will update the content instead of adding a new one.
 *
 * ```javascript
 * addStyle(
 *   `
 *     body {
 *       background-color: #333;
 *     }
 *   `,
 *   {
 *     id: 'test',
 *   }
 * );
 * // <style id="test">
 * //   body {
 * //     background-color: #333;
 * //   }
 * // </style>
 * ```
 *
 * Example 2: Add the `<style>` without `id`, and repeated invoking will add a new one.
 *
 * ```javascript
 * addStyle(
 *   `
 *     body {
 *       background-color: #444;
 *     }
 *   `
 * );
 * // <style>
 * //   body {
 * //     background-color: #444;
 * //   }
 * // </style>
 * ```
 *
 * @category DOM
 */
export function addStyle(style: string, options: { id?: string } = { id: "" }): boolean {
  // console.log('_ style', style);
  // console.log('_ options', options);
  if (!style) {
    return false;
  }
  // 创建 style 文档碎片
  const styleFrag = document.createDocumentFragment();
  let idDom: HTMLElement | null = null;
  let domId = "";
  // Custom Style
  const customStyle = document.createElement("style");
  // 如果需要 ID
  if (options.id) {
    domId = `${options.id}`;
    idDom = document.getElementById(domId);
    // 如果 Dom 不存在，插入 style
    if (!idDom) {
      customStyle.setAttribute("id", options.id);
      customStyle.innerHTML = style;
      styleFrag.appendChild(customStyle);
      document.head.appendChild(styleFrag);
    } else {
      // 如果 Dom 存在，直接更新
      idDom.innerHTML = style;
    }
  } else {
    // 不需要 ID，直接添加新标签
    customStyle.innerHTML = style;
    styleFrag.appendChild(customStyle);
    document.head.appendChild(styleFrag);
  }
  return true;
}
