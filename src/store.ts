/**
 * EN: Handle Storage (Keep fit for JSON, it can transfer format automatically).
 *
 * ZH: 存储/获取数据到 sessionStorage/localStorage
 *
 * Usage:
 *
 * ```javascript
 * setSessionStorage('test', '123');
 * const ret1 = getSessionStorage('test');
 * setLocalStorage('test', '123');
 * const ret2 = getLocalStorage('test');
 * console.log(ret1, ret2);
 *
 * // or package in usage
 * const projectName = 'mazey';
 * function mSetLocalStorage (key, value) {
 *   return setLocalStorage(`${projectName}_${key}`, value);
 * }
 *
 * function mGetLocalStorage (key) {
 *   return getLocalStorage(`${projectName}_${key}`);
 * }
 * ```
 *
 * Output:
 *
 * ```text
 * 123 123
 * ```
 *
 * @param {string} key 键
 * @returns {void} 返回值
 * @category Store
 */
export function setSessionStorage<T>(key: string, value: T | null = null): void {
  if (key) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
}

/**
 * EN: Handle Storage (Keep fit for JSON, it can transfer format automatically).
 *
 * ZH: 存储/获取数据到 sessionStorage/localStorage
 *
 * Usage:
 *
 * ```javascript
 * setSessionStorage('test', '123');
 * const ret1 = getSessionStorage('test');
 * setLocalStorage('test', '123');
 * const ret2 = getLocalStorage('test');
 * console.log(ret1, ret2);
 *
 * // or package in usage
 * const projectName = 'mazey';
 * function mSetLocalStorage (key, value) {
 *   return setLocalStorage(`${projectName}_${key}`, value);
 * }
 *
 * function mGetLocalStorage (key) {
 *   return getLocalStorage(`${projectName}_${key}`);
 * }
 * ```
 *
 * Output:
 *
 * ```text
 * 123 123
 * ```
 *
 * @param {string} key 键
 * @returns {any} 返回值
 * @category Store
 */
export function getSessionStorage<T>(key: string): T | null {
  let ret: T | null = null;
  if (key) {
    const value = sessionStorage.getItem(key);
    if (value) {
      ret = JSON.parse(value) as T;
    }
  }
  return ret;
}

/**
 * EN: Handle Storage (Keep fit for JSON, it can transfer format automatically).
 *
 * ZH: 存储/获取数据到 sessionStorage/localStorage
 *
 * Usage:
 *
 * ```javascript
 * setSessionStorage('test', '123');
 * const ret1 = getSessionStorage('test');
 * setLocalStorage('test', '123');
 * const ret2 = getLocalStorage('test');
 * console.log(ret1, ret2);
 *
 * // or package in usage
 * const projectName = 'mazey';
 * function mSetLocalStorage (key, value) {
 *   return setLocalStorage(`${projectName}_${key}`, value);
 * }
 *
 * function mGetLocalStorage (key) {
 *   return getLocalStorage(`${projectName}_${key}`);
 * }
 * ```
 *
 * Output:
 *
 * ```text
 * 123 123
 * ```
 *
 * @param {string} key 键
 * @returns {void} 返回值
 * @category Store
 */
export function setLocalStorage<T>(key: string, value: T | null = null): void {
  if (key) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

/**
 * EN: Handle Storage (Keep fit for JSON, it can transfer format automatically).
 *
 * ZH: 存储/获取数据到 sessionStorage/localStorage
 *
 * Usage:
 *
 * ```javascript
 * setSessionStorage('test', '123');
 * const ret1 = getSessionStorage('test');
 * setLocalStorage('test', '123');
 * const ret2 = getLocalStorage('test');
 * console.log(ret1, ret2);
 *
 * // or package in usage
 * const projectName = 'mazey';
 * function mSetLocalStorage (key, value) {
 *   return setLocalStorage(`${projectName}_${key}`, value);
 * }
 *
 * function mGetLocalStorage (key) {
 *   return getLocalStorage(`${projectName}_${key}`);
 * }
 * ```
 *
 * Output:
 *
 * ```text
 * 123 123
 * ```
 *
 * @param {string} key 键
 * @returns {void} 返回值
 * @category Store
 */
export function getLocalStorage<T>(key: string): T | null {
  let ret: T | null = null;
  if (key) {
    const value = localStorage.getItem(key);
    if (value) {
      ret = JSON.parse(value) as T;
    }
  }
  return ret;
}
