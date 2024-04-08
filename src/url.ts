import type { UrlParams } from "./typing";

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
  const reg = new RegExp("(^|&)" + param + "=([^&]*)(&|$)");
  const r = location.search.substring(1).match(reg);
  if (r !== null) {
    // return decodeURIComponent(unescape(r[2]));
    return decodeURIComponent(r[2]);
  }
  return "";
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
  if (url.includes("#")) {
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
      return "";
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

/**
 * Update the query param's value of the input URL.
 *
 * Usage:
 *
 * ```javascript
 * const ret1 = updateQueryParam('http://example.com/?t1=1&t2=2&t3=3&t4=4', 't3', 'three');
 * const ret2 = updateQueryParam('http://example.com/?t1=1&t2=2&t3=3&t4=4', 't4', 'four');
 * console.log(ret1);
 * console.log(ret2);
 * ```
 *
 * Output:
 *
 * ```text
 * http://example.com/?t1=1&t2=2&t3=three&t4=4
 * http://example.com/?t1=1&t2=2&t3=3&t4=four
 * ```
 *
 * @param {string} url URL string.
 * @param {string} param Query param.
 * @param {string} value Param's value.
 * @returns {string} URL.
 * @category URL
 */
export function updateQueryParam(url: string, param: string, value: string): string {
  if (url.includes("#")) {
    const urlObj = new URL(url);
    urlObj.searchParams.set(param, value);
    return urlObj.toString();
  } else {
    const re = new RegExp("([?&])" + param + "=.*?(&|$)", "i");
    const separator = url.indexOf("?") !== -1 ? "&" : "?";
    if (url.match(re)) {
      return url.replace(re, "$1" + param + "=" + value + "$2");
    } else {
      return url + separator + param + "=" + value;
    }
  }
}

/**
 * Get the hash query param's value of the current Web URL(`location.hash`).
 *
 * Usage:
 *
 * ```javascript
 * // http://example.com/?#2333?t1=1&t2=2&t3=3&t4=4
 * // #2333?t1=1&t2=2&t3=3&t4=4
 * const p1 = getHashQueryParam('t3');
 * const p2 = getHashQueryParam('t4');
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
export function getHashQueryParam(param: string): string {
  const hashs = location.hash.split("?");
  if (hashs.length === 1) {
    return "";
  }
  const reg = new RegExp(`(^|&)${param}=([^&]*)(&|$)`);
  const ret = hashs[1].match(reg);
  return ret ? ret[2] : "";
}

/**
 * Get the domain of URL, and other params.
 *
 * Usage:
 *
 * ```javascript
 * const ret1 = getDomain('http://example.com/?t1=1&t2=2&t3=3&t4=4');
 * const ret2 = getDomain('http://example.com/test/thanks?t1=1&t2=2&t3=3&t4=4', ['hostname', 'pathname']);
 * const ret3 = getDomain('http://example.com:7890/test/thanks', ['hostname']);
 * const ret4 = getDomain('http://example.com:7890/test/thanks', ['host']); // With Port
 * const ret5 = getDomain('http://example.com:7890/test/thanks', ['origin']);
 * const ret6 = getDomain('http://example.com:7890/test/thanks?id=1', ['origin', 'pathname', 'search']);
 * console.log(ret1);
 * console.log(ret2);
 * console.log(ret3);
 * console.log(ret4);
 * console.log(ret5);
 * console.log(ret6);
 * ```
 *
 * Output:
 *
 * ```text
 * example.com
 * example.com/test/thanks
 * example.com
 * example.com:7890
 * http://example.com:7890
 * http://example.com:7890/test/thanks?id=1
 * ```
 *
 * @param {string} url
 * @param {array} rules Object.keys(location), ['href', 'origin', 'protocol', 'host', 'hostname', 'port', 'pathname', 'search', 'hash'], ['hostname', 'pathname'] = 'km.mazey.net/plugins/servlet/mobile'
 * @category URL
 */
export function getDomain(url: string, rules = [ "hostname" ]): string {
  const aEl: HTMLAnchorElement = document.createElement("a");
  aEl.href = url;
  return rules.reduce((ret, v) => {
    ret += aEl[v as keyof HTMLAnchorElement];
    return ret;
  }, "");
}
