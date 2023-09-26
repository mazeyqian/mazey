/**
 * Copy/Clone Object deeply.
 *
 * Usage:
 *
 * ```javascript
 * const ret1 = deepCopy(['a', 'b', 'c']);
 * const ret2 = deepCopy('abc');
 * console.log(ret1);
 * console.log(ret2);
 * ```
 *
 * Output:
 *
 * ```text
 * ['a', 'b', 'c']
 * abc
 * ```
 *
 * @param {object} obj The value to clone.
 * @returns {object} Returns the deep cloned value.
 * @category Util
 */