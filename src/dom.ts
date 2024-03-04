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
