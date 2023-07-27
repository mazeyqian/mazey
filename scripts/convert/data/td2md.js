/**
 * Checks if the given string is a valid URL, including scheme URLs.
 *
 * @example
 * ```js
 * isValidUrl('https://www.example.com'); // true
 * isValidUrl('http://example.com/path/exx/ss'); // true
 * isValidUrl('https://www.example.com/?q=hello&age=24#world'); // true
 * isValidUrl('http://www.example.com/#world?id=9'); // true
 * isValidUrl('ftp://example.com'); // true
 * ```
 *
 * @param url - The URL to check.
 * @returns Returns `true` if the given string is a valid URL, else `false`.
 * @category URL
 */