import { deepCopy } from './util';

/**
 * EN: Computes the longest common substring of two strings.
 *
 * ZH: 计算两个字符串的最长公共子串
 *
 * Usage:
 *
 * ```javascript
 * const ret = longestComSubstring('fish', 'finish');
 * console.log(ret);
 * ```
 *
 * Output:
 *
 * ```text
 * 3
 * ```
 *
 * @param {string} aStr String
 * @param {string} bStr String
 * @returns {number} Length
 * @category Calculate and Formula
 */
export function longestComSubstring(aStr: string, bStr: string): number {
  const aLen = aStr.length;
  const bLen = bStr.length;
  // Create a two-dimensional array and deep copy it
  const arr = deepCopy(new Array(aLen).fill(new Array(bLen).fill(0)));
  for (let i = 0; i < aLen; ++i) {
    for (let j = 0; j < bLen; ++j) {
      if (aStr[i] === bStr[j]) {
        let baseNum = 0;
        if (i > 0 && j > 0) {
          baseNum = arr[i - 1][j - 1];
        }
        arr[i][j] = baseNum + 1;
      }
    }
  }
  // Convert the two-dimensional array to a one-dimensional array
  const arr1 = Array.prototype.concat.apply([], arr);
  // Get the longest common substring
  const maxLong = Math.max(...arr1);
  return maxLong;
}

/**
 * Alias of `longestComSubstring`
 *
 * @hidden
 */
export function calLongestCommonSubstring(aStr: string, bStr: string): number {
  return longestComSubstring(aStr, bStr);
}

/**
 * EN: Computes the longest common subsequence of two strings.
 *
 * ZH: 计算两个字符串的最长公共子序列
 *
 * Usage:
 *
 * ```javascript
 * const ret = longestComSubsequence('fish', 'finish');
 * console.log(ret);
 * ```
 *
 * Output:
 *
 * ```text
 * 4
 * ```
 *
 * @param {string} aStr 字符串
 * @param {string} bStr 字符串
 * @returns {number} 长度
 * @category Calculate and Formula
 */
export function longestComSubsequence(aStr: string, bStr: string): number {
  const aLen = aStr.length;
  const bLen = bStr.length;
  // Create a two-dimensional array and deep copy it
  const arr = deepCopy(new Array(aLen).fill(new Array(bLen).fill(0)));
  for (let i = 0; i < aLen; ++i) {
    for (let j = 0; j < bLen; ++j) {
      if (aStr[i] === bStr[j]) {
        let baseNum = 0;
        if (i > 0 && j > 0) {
          baseNum = arr[i - 1][j - 1];
        }
        arr[i][j] = baseNum + 1;
      } else {
        let [ leftValue, topValue ] = [ 0, 0 ];
        if (j > 0) {
          leftValue = arr[i][j - 1];
        }
        if (i > 0) {
          topValue = arr[i - 1][j];
        }
        arr[i][j] = Math.max(leftValue, topValue);
      }
    }
  }
  // Convert the two-dimensional array to a one-dimensional array
  const arr1 = Array.prototype.concat.apply([], arr);
  // Get the longest common subsequence
  const maxLong = Math.max(...arr1);
  return maxLong;
}

/**
 * Alias of `longestComSubsequence`
 *
 * @hidden
 */
export function calLongestCommonSubsequence(aStr: string, bStr: string): number {
  return longestComSubsequence(aStr, bStr);
}
