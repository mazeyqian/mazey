/**
 * Check if the given string is a valid HTTP/HTTPS URL.
 *
 * @example
 * ```js
 * isValidHttpUrl('https://www.example.com'); // true
 * isValidHttpUrl('http://example.com/path/exx/ss'); // true
 * isValidHttpUrl('https://www.example.com/?q=hello&age=24#world'); // true
 * isValidHttpUrl('http://www.example.com/#world?id=9'); // true
 * isValidHttpUrl('ftp://example.com'); // false
 * ```
 *
 * @param url
 * @returns {boolean} Return true if the given string is a valid HTTP/HTTPS URL.
 * @category URL
 */