/**
 * @author Cheng
 */
// eslint-disable-next-line spaced-comment
/// <reference path="../global.d.ts" />

import type {
  RepeatUntilOptions,
  LoadScriptReturns,
  UnknownFnParams,
  UnknownFnReturn,
  UnknownWindow,
} from "./typing";
// import { isNonEmptyArray } from "./util";
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
 * Get the current version.
 *
 * @hidden
 */
export function getCurrentVersion(): string {
  return "v4";
}

/**
 * Repeatedly fires a callback function with a certain interval until a specified condition is met.
 *
 * Usage:
 *
 * ```javascript
 * repeatUntilConditionMet(
 *   () => {
 *     console.log('repeatUntilConditionMet');
 *     return true;
 *   }, {
 *     interval: 1000,
 *     times: 10,
 *     context: null,
 *     args: [],
 *   }, (result) => {
 *     return result === true;
 *   }
 * );
 * ```
 *
 * @param callback The callback function to fire.
 * @param options An object containing the options for the function.
 * @param options.interval The interval between each firing of the callback function, in milliseconds. Defaults to 1000.
 * @param options.times The maximum number of times to fire the callback function. Defaults to 10.
 * @param options.context The context to use when calling the callback function. Defaults to null.
 * @param options.args An array of arguments to pass to the callback function.
 * @param condition A function that takes the result of the callback function as its argument and returns a boolean value indicating whether the condition has been met. Defaults to a function that always returns true.
 * @category Util
 */
export function repeatUntilConditionMet<T extends (...args: UnknownFnParams) => UnknownFnReturn>(
  callback: T,
  options: RepeatUntilOptions = {},
  condition: (result: ReturnType<T>) => boolean = res => {
    return res === true;
  }
): void {
  const { interval = 1000, times = 10, context, args } = options;
  let count = 0;

  const clearAndInvokeNext = () => {
    setTimeout(async () => {
      const result = await callback.apply(context, args as UnknownFnParams);
      if (condition(result) || ++count >= times) {
        return;
      }
      clearAndInvokeNext();
    }, interval);
  };

  if (typeof callback !== "function") {
    console.error("Expected a function.");
  }

  if (typeof interval !== "number" || interval < 0) {
    console.error("Expected a non-negative number for interval.");
  }

  if (typeof times !== "number" || times < 0) {
    console.error("Expected a non-negative number for times.");
  }

  clearAndInvokeNext();
}

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
