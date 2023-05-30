/**
 * Load a script from the given URL if it has not already been loaded.
 * 
 * @example
 * ```js
 * loadScriptIfUndefined('$', 'https://example.com/lib/jquery.min.js')
 *   .then(() => {
 *     console.log('jQuery is loaded.');
 *   })
 *   .catch(err => {
 *     console.log('Failed to load jQuery.', err);
 *   });
 * ```
 * 
 * @param {string} windowAttribute - The name of the window attribute to check.
 * @param {string} url - The URL of the script to load.
 * @returns {Promise} A Promise that resolves when the script has been loaded.
 * @category Load Resource
 */