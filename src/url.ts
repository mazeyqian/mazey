/**
 * Get the query param's value of the current Web URL(`location.search`).
 *
 * Usage:
 *
 * ```javascript
 * // http://example.com/?t1=1&t2=2&t3=3&t4=4#2333
 * // ?t1=1&t2=2&t3=3&t4=4
 * const p1 = getQueryParam('t3');
 * const p2 = getQueryParam('t4');
 * console.log(p1, p2);
 * ```
 *
 * Output:
 *
 * ```text
 * 3 4
 * ```
 *
 * @param {string} param Query param.
 * @returns {string} value
 * @category URL
 */
export function getQueryParam(param: string): string {
  const reg = new RegExp('(^|&)' + param + '=([^&]*)(&|$)');
  const r = location.search.substring(1).match(reg);
  if (r !== null) {
    // return decodeURIComponent(unescape(r[2]));
    return decodeURIComponent(r[2]);
  }
  return '';
}
