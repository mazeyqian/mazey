import { UrlParams } from './typing';

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

/**
 * Returns the value of the specified query parameter in the input URL.
 *
 * Usage:
 *
 * ```javascript
 * const p1 = getUrlParam('http://example.com/?t1=1&t2=2&t3=3&t4=4', 't3');
 * const p2 = getUrlParam('http://example.com/?t1=1&t2=2&t3=3&t4=4', 't4');
 * console.log(p1, p2);
 * ```
 *
 * Output:
 *
 * ```text
 * 3 4
 * ```
 *
 * @param {string} url The URL string.
 * @param {string} param The query parameter to retrieve the value for.
 * @param {object} options The options object.
 * @param {boolean} options.returnArray Whether to return an array of values for the specified query parameter. Default is false.
 * @returns {string|string[]} The value of the specified query parameter, or an empty string if the parameter is not found.
 * @category URL
 */
export function getUrlParam(url: string, param: string, options: { returnArray?: boolean } = {}): string | string[] | null {
  let res: string | string[] | null = null;
  if (url.includes('#')) {
    const urlObj = new URL(url);
    res = urlObj.searchParams.getAll(param);
  } else {
    const result: UrlParams = {};
    url.replace(/\??(\w+)=([^&]*)&?/g, function(_: string, key: string, val: string): string {
      if (result[ key ] !== undefined) {
        result[ key ].push(val);
      } else {
        result[ key ] = [ val ];
      }
      return '';
    });
    res = result[ param ] || [];
  }
  if (options.returnArray) {
    return res;
  } else {
    if (res.length) {
      return res[ 0 ];
    } else {
      return null;      
    }
  }
}
