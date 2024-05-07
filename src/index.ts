/**
 * @author Cheng
 */
// eslint-disable-next-line spaced-comment
/// <reference path="../global.d.ts" />

import type {
  // RepeatUntilOptions,
  LoadScriptReturns,
  // UnknownFnParams,
  // UnknownFnReturn,
  UnknownWindow,
} from "./typing";
import { loadScript } from "./load";

export * from "./calc";
export * from "./util";
export * from "./url";
export * from "./dom";
export * from "./event";
export * from "./store";
export * from "./load";
export * from "./perf";
export * from "./browser";
export * from "./debug";

/**
 * Load a script from the given URL if it (`window['attribute']`) has not already been loaded.
 *
 * Usage:
 *
 * ```javascript
 * loadScriptIfUndefined('xyz', 'https://example.com/lib/jquery.min.js')
 *   .then(() => {
 *     console.log('xyz is loaded.');
 *   })
 *   .catch(err => {
 *     console.log('Failed to load xyz.', err);
 *   });
 * ```
 *
 * Output:
 *
 * ```text
 * xyz is loaded.
 * ```
 *
 * @param {string} windowAttribute - The name of the window attribute to check (e.g. `jQuery`, `axios`, etc.).
 * @param {string} url - The URL of the script to load.
 * @returns {Promise} A Promise that resolves when the script has been loaded.
 * @category Load
 */
export function loadScriptIfUndefined(windowAttribute: string, url: string): LoadScriptReturns {
  if ((window as UnknownWindow)[windowAttribute]) {
    return Promise.resolve("defined");
  }
  return loadScript(url);
}

/**
 * Retrieve a query parameter from a script URL in the browser.
 *
 * Usage:
 *
 * ```javascript
 * const ret = getScriptQueryParam('test', 'https://example.com/example.js');
 * console.log(ret);
 * ```
 *
 * Output:
 *
 * ```text
 * hello
 * ```
 *
 * @param param - The name of the query parameter to retrieve.
 * @param matchString - An optional substring to match in the script URL.
 *                      If not provided, defaults to matching the ".js" substring.
 * @returns The decoded value of the specified query parameter, or an empty string if no matching parameter is found.
 * @category URL
 */
export function getScriptQueryParam(param: string, matchString = ""): string {
  if (!matchString) {
    matchString = ".js";
  }
  const paramRegExp = new RegExp(`[?&]${param}=([^&]*)`);
  const scriptTags = document.querySelectorAll(`script[src*="${matchString}"]`);
  for (let i = 0; i < scriptTags.length; i++) {
    const src = scriptTags[i].getAttribute("src");
    if (src && src.indexOf(matchString) !== -1) {
      const match = src.match(paramRegExp);
      if (match) {
        return decodeURIComponent(match[1]);
      }
    }
  }
  return "";
}

/**
 * Wait for a specified amount of time.
 *
 * Usage:
 *
 * ```javascript
 * waitTime(1000).then((time) => {
 *  console.log('waitTime:', time);
 * });
 * ```
 *
 * Output:
 *
 * ```text
 * waitTime: 1000
 * ```
 *
 * @param time The amount of time to wait, in milliseconds.
 * @returns A Promise that resolves after the specified time has elapsed.
 * @category Util
 */
export async function waitTime(time: number): Promise<number> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(time);
    }, time);
  });
}

/**
 * Alias of `waitTime`.
 *
 * @hidden
 */
export async function sleep(time: number): Promise<number> {
  return waitTime(time);
}
