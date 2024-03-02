import { SimpleObject } from './typing';

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
export function deepCopy<T>(obj: T): T {
  // Jugde whether it is a primitive type
  if (typeof obj !== 'object') {
    return obj;
  }
  // Judge whether its key-value is simple type, string | number | boolean | null | undefined
  // ...rest
  const simpleTypes = [ 'string', 'number', 'boolean', 'undefined' ];
  const values = Object.values(obj as SimpleObject);
  const isSimpleTypeObj = values.every(v => simpleTypes.includes(typeof v));
  if (isSimpleTypeObj) {
    // console.log('it is isSimpleTypeObj');
    return {
      ...obj,
    };
  }
  // console.log('it is not isSimpleTypeObj');
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Alias of `deepCopy`
 *
 * @hidden
 */
export function deepCopyObject<T>(obj: T): T {
  return deepCopy(obj);
}

/**
 * Transfer CamelCase to KebabCase.
 *
 * Usage:
 *
 * ```javascript
 * const ret1 = convertCamelToKebab('ABC');
 * const ret2 = convertCamelToKebab('aBC');
 * console.log(ret1);
 * console.log(ret2);
 * ```
 *
 * Output:
 *
 * ```text
 * a-b-c
 * a-b-c
 * ```
 *
 * @param {string} camelCase 'aBC' or 'ABC'
 * @returns {string} 'a-b-c'
 * @category Util
 */
export function convertCamelToKebab(camelCase: string): string {
  const kebabCase = camelCase.replace(/([A-Z])/g, '-$1').toLowerCase();
  return kebabCase[0] === '-' ? kebabCase.substring(1) : kebabCase;
}

/**
 * Alias of `convertCamelToKebab`
 *
 * @hidden
 */
export function camelCaseToKebabCase(camelCase: string): string {
  return convertCamelToKebab(camelCase);
}

/**
 * Transfer CamelCase to Underscore.
 *
 * Usage:
 *
 * ```javascript
 * const ret1 = convertCamelToUnder('ABC');
 * const ret2 = convertCamelToUnder('aBC');
 * console.log(ret1);
 * console.log(ret2);
 * ```
 *
 * Output:
 *
 * ```text
 * a_b_c
 * a_b_c
 * ```
 *
 * @param {string} camelCase 'aBC' or 'ABC'
 * @returns {string} 'a_b_c'
 * @category Util
 */
export function convertCamelToUnder(camelCase: string): string {
  const kebabCase = camelCase.replace(/([A-Z])/g, '_$1').toLowerCase();
  return kebabCase[0] === '_' ? kebabCase.substring(1) : kebabCase;
}

/**
 * Alias of `convertCamelToUnder`
 *
 * @hidden
 */
export function camelCase2Underscore(camelCase: string): string {
  return convertCamelToUnder(camelCase);
}
