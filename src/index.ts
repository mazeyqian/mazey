/**
 * @author Cheng
 */
// eslint-disable-next-line spaced-comment
/// <reference path="../global.d.ts" />

import type {
  // WebPerformance,
  // BrowserInfo,
  DefineListeners,
  // TestUa,
  // TestVs,
  // UrlParams,
  // ThrottleFunc,
  // DebounceFunc,
  // IsNumberOptions,
  // AnyFunction,
  RepeatUntilOptions,
  LoadScriptReturns,
  // SimpleType,
  // SimpleObject,
  UnknownFnParams,
  UnknownFnReturn,
  // UnknownObject,
  UnknownFn,
  UnknownWindow,
} from "./typing";
import {
  isNonEmptyArray,
  // camelCase2Underscore,
  // isNumber,
  // doFn,
  // mNow,
} from "./util";
import { loadScript } from "./load";
// import { isSupportedEntryType, getFCP, getFP } from './perf';

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
 * Detect webp support.
 *
 * Usage:
 *
 * ```javascript
 * isSupportWebp().then(res => {
 *  console.log('isSupportWebp:', res);
 * });
 * ```
 *
 * Output:
 *
 * ```text
 * isSupportWebp: true
 * ```
 *
 * Reference: [Detect WEBP Support with JavaScript](https://davidwalsh.name/detect-webp)
 *
 * @category Browser Information
 */
export function isSupportWebp(): Promise<boolean> {
  const fn = (resolve: (v: boolean) => void) => {
    const img = new Image();
    img.onload = () => {
      resolve(img.width > 0 && img.height > 0);
    };
    img.onerror = () => {
      resolve(false);
    };
    img.src = "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=";
  };
  return new Promise(fn);
}

/**
 * Generate a Hash Code from a string.
 *
 * Usage:
 *
 * ```javascript
 * const ret = genHashCode('hello world');
 * console.log(ret);
 * ```
 *
 * Output:
 *
 * ```text
 * 1794106052
 * ```
 *
 * Reference: [Generate a Hash from string in Javascript](https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript-jquery)
 *
 * @category Util
 */
export function genHashCode(str: string): number {
  let hash = 0,
    i,
    chr;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
}

/**
 * Return the formatted date string in the given format.
 *
 * Usage:
 *
 * ```javascript
 * const ret1 = formatDate();
 * const ret2 = formatDate('Tue Jan 11 2022 14:12:26 GMT+0800 (China Standard Time)', 'yyyy-MM-dd hh:mm:ss');
 * const ret3 = formatDate(1641881235000, 'yyyy-MM-dd hh:mm:ss');
 * const ret4 = formatDate(new Date(2014, 1, 11), 'MM/dd/yyyy');
 * console.log('Default formatDate value:', ret1);
 * console.log('String formatDate value:', ret2);
 * console.log('Number formatDate value:', ret3);
 * console.log('Date formatDate value:', ret4);
 * ```
 *
 * Output:
 *
 * ```text
 * Default formatDate value: 2023-01-11
 * String formatDate value: 2022-01-11 14:12:26
 * Number formatDate value: 2022-01-11 14:07:15
 * Date formatDate value: 02/11/2014
 * ```
 *
 * @param {Date|number|string} dateIns Original Date
 * @param {string} format Format String
 * @returns {string} Return the formatted date string.
 * @category Util
 */
export function formatDate(dateIns?: Date | number | string, format = "yyyy-MM-dd"): string {
  if (!dateIns) {
    dateIns = new Date();
  }
  const tempDate = new Date(dateIns);
  const o: {
    [key: string]: string | number;
  } = {
    yyyy: tempDate.getFullYear(),
    MM: tempDate.getMonth() + 1,
    dd: tempDate.getDate() < 10 ? "0" + tempDate.getDate() : tempDate.getDate(),
    hh: tempDate.getHours() < 10 ? "0" + tempDate.getHours() : tempDate.getHours(),
    mm: tempDate.getMinutes() < 10 ? "0" + tempDate.getMinutes() : tempDate.getMinutes(),
    ss: tempDate.getSeconds() < 10 ? "0" + tempDate.getSeconds() : tempDate.getSeconds(),
  };
  let tempFormat = format || "yyyy-MM-dd";
  Object.keys(o).forEach(key => {
    let value = o[key];
    if (key === "MM" && Number(value) <= 9) {
      value = `0${value}`;
    }
    tempFormat = tempFormat.replace(key, String(value));
  });
  return tempFormat;
}

/**
 * Get event container.
 *
 * Usage:
 *
 * ```javascript
 * const ret = getEventContainer();
 * ```
 *
 * @category Event
 * @hidden
 */
export function getDefineListeners(): DefineListeners {
  let defineListeners = window.MAZEY_DEFINE_LISTENERS;
  if (typeof defineListeners !== "object") {
    defineListeners = {};
    window.MAZEY_DEFINE_LISTENERS = defineListeners;
  }
  return defineListeners;
}

/**
 * Add event.
 *
 * Usage:
 *
 * ```javascript
 * addEvent('test', (e) => {
 *  console.log('test event:', e);
 * });
 * ```
 *
 * @param type
 * @param fn
 * @category Event
 */
export function addEvent(type: string, fn: UnknownFn): void {
  const defineListeners = getDefineListeners();
  if (typeof defineListeners[type] === "undefined") {
    defineListeners[type] = [];
  }
  if (typeof fn === "function") {
    defineListeners[type].push(fn);
  }
}

/**
 * Invoke event.
 *
 * Usage:
 *
 * ```javascript
 * fireEvent('test');
 * ```
 *
 * @param type
 * @category Event
 */
export function fireEvent(type: string): void {
  const defineListeners = getDefineListeners();
  const arrayEvent = defineListeners[type];
  if (arrayEvent instanceof Array) {
    for (let i = 0, length = arrayEvent.length; i < length; i++) {
      if (typeof arrayEvent[i] === "function") {
        arrayEvent[i]({
          type: type,
        });
      }
    }
  }
}

/**
 * Alias of `fireEvent`.
 * 
 * @hidden
 */
export function invokeEvent(type: string): void {
  fireEvent(type);
}

/**
 * Remove event.
 *
 * Usage:
 *
 * ```javascript
 * removeEvent('test');
 * ```
 *
 * @param type
 * @param fn
 * @category Event
 */
export function removeEvent(type: string, fn: UnknownFn): void {
  const defineListeners = getDefineListeners();
  const arrayEvent = defineListeners[type];
  if (typeof type === "string" && arrayEvent instanceof Array) {
    if (typeof fn === "function") {
      for (let i = 0, length = arrayEvent.length; i < length; i++) {
        if (arrayEvent[i] === fn) {
          defineListeners[type].splice(i, 1);
          break;
        }
      }
    } else {
      delete defineListeners[type];
    }
  }
}

/**
 * Checks if the given string is a valid URL, including **scheme URLs**.
 *
 * Usage:
 *
 * ```javascript
 * const ret1 = isValidUrl('https://www.example.com');
 * const ret2 = isValidUrl('http://example.com/path/exx/ss');
 * const ret3 = isValidUrl('https://www.example.com/?q=hello&age=24#world');
 * const ret4 = isValidUrl('http://www.example.com/#world?id=9');
 * const ret5 = isValidUrl('ftp://example.com');
 * console.log(ret1, ret2, ret3, ret4, ret5);
 * ```
 *
 * Output:
 *
 * ```text
 * true true true true true
 * ```
 *
 * @remarks
 * If you are specifically checking for HTTP/HTTPS URLs, it is recommended to use the `isValidHttpUrl` function instead.
 * The `isValidUrl` function matches all scheme URLs, including FTP and other non-HTTP schemes.
 *
 * @param url - The URL to check.
 * @returns Returns `true` if the given string is a valid URL, else `false`.
 * @category URL
 */
export function isValidUrl(url: string): boolean {
  const reg = /^[a-zA-Z0-9]+:\/\/[-a-zA-Z0-9@:%._+~#=]{1,256}\b([-a-zA-Z0-9\u4E00-\u9FA5()!@:%_+.~#?&//=]*)$/;
  return reg.test(url);
}

/**
 * Check if the given string is a valid HTTP/HTTPS URL.
 *
 * Usage:
 *
 * ```javascript
 * const ret1 = isValidHttpUrl('https://www.example.com');
 * const ret2 = isValidHttpUrl('http://example.com/path/exx/ss');
 * const ret3 = isValidHttpUrl('https://www.example.com/?q=hello&age=24#world');
 * const ret4 = isValidHttpUrl('http://www.example.com/#world?id=9');
 * const ret5 = isValidHttpUrl('//example.com/a/b/c?q=1', { strict: false });
 * const ret6 = isValidHttpUrl('ftp://example.com');
 * console.log(ret1, ret2, ret3, ret4, ret5, ret6);
 * ```
 *
 * Output:
 *
 * ```text
 * true true true true true false
 * ```
 *
 * @param url
 * @param options.strict - If `true`, the function only matches standard HTTP/HTTPS URLs. Default is `true`. If `false`, the function also matches protocol-relative URLs, such as `//example.com`.
 * @returns {boolean} Return true if the given string is a valid HTTP/HTTPS URL.
 * @category URL
 */
export function isValidHttpUrl(url: string, options: { strict: boolean } = { strict: true }): boolean {
  let reg = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9\u4E00-\u9FA5()!@:%_+.~#?&//=]*)/;
  if (!options.strict) {
    reg = /^(https?:)?\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9\u4E00-\u9FA5()!@:%_+.~#?&//=]*)/;
  }
  return reg.test(url);
}

/**
 * Check if the given string is a mobile phone number.
 *
 * Usage:
 *
 * ```javascript
 * const ret1 = isMobile('13800138000');
 * const ret2 = isMobile('1380013800');
 * const ret3 = isMobile('138001380000');
 * const ret4 = isMobile('1380013800a');
 * console.log(ret1, ret2, ret3, ret4);
 * ```
 *
 * Output:
 *
 * ```text
 * true false false false
 * ```
 *
 * @param mobile
 * @returns {boolean} Return true if the given string is a mobile phone number.
 * @category Util
 */
export function isValidPhoneNumber(mobile: string): boolean {
  const reg = /^1\d{10}$/;
  return reg.test(mobile);
}

/**
 * Check if the given string is a valid email.
 *
 * Usage:
 *
 * ```javascript
 * const ret = isValidEmail('mazeyqian@gmail.com');
 * console.log(ret);
 * ```
 *
 * Output:
 *
 * ```text
 * true
 * ```
 *
 * @param email
 * @returns {boolean} Return true if the given string is a valid email.
 * @category Util
 */
export function isValidEmail(email: string): boolean {
  const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
}

/**
 * Convert a given 10-hex number to a lowercase 26-hex string.
 *
 * Usage:
 *
 * ```javascript
 * const ret1 = convert10To26(1);
 * const ret2 = convert10To26(26);
 * const ret3 = convert10To26(27);
 * const ret4 = convert10To26(52);
 * const ret5 = convert10To26(53);
 * console.log(ret1, ret2, ret3, ret4, ret5);
 * ```
 *
 * Output:
 *
 * ```text
 * a z aa az ba
 * ```
 *
 * @param {number} num
 * @returns {string} Return a lowercase 26-hex string.
 * @category Util
 */
export function convert10To26(num: number): string {
  let result = "";
  while (num > 0) {
    let remainder = num % 26;
    if (remainder === 0) {
      remainder = 26;
    }
    result = String.fromCharCode(remainder + 96) + result;
    num = (num - remainder) / 26;
  }
  return result;
}

/**
 * EN: Get the file type of the url.
 *
 * ZH: 获取文件后缀名
 *
 * Usage:
 *
 * ```javascript
 * const ret1 = getUrlFileType('https://example.com/a/b/c.png');
 * const ret2 = getUrlFileType('https://example.com/a/b/c.jpg');
 * const ret3 = getUrlFileType('https://example.com/a/b/c.jpeg');
 * const ret4 = getUrlFileType('/a/b/c.jpeg');
 * const ret5 = getUrlFileType('https://example.com/a/b/c.v/a');
 * console.log(ret1, ret2, ret3, ret4, ret5);
 * ```
 *
 * Output:
 *
 * ```text
 * png jpg jpeg jpeg ''
 * ```
 *
 * @param url
 * @returns
 * @category URL
 */
export function getUrlFileType(url: string): boolean | string {
  let ret = "";
  if (typeof url != "string" || url == "") {
    return ret;
  }
  const type = /\.[^/?#]+$/.exec(url);
  if (!type) {
    return ret;
  }
  if (type[0].length > 1) {
    ret = type[0].substring(1);
  }
  return ret;
}

/**
 * Sets the width and height of all images on the page based on their `src` attribute.
 * The `src` attribute should contain `width` and/or `height` values in the format "width=100" or "height=100".
 * If jQuery is available, this function uses jQuery to select the images. Otherwise, it uses pure JavaScript.
 *
 * Usage:
 *
 * ```javascript
 * // Example images with `src` attributes containing `width` and/or `height` values
 * const img1 = document.createElement('img');
 * img1.setAttribute('src', 'https://example.com/example.png?width=2233&height=111');
 * document.body.appendChild(img1);
 *
 * const img2 = document.createElement('img');
 * img2.setAttribute('src', 'https://example.com/example.png?width=100%&height=auto');
 * document.body.appendChild(img2);
 * ```
 *
 * @returns {boolean} - Returns `true` if images were found and their dimensions were set, otherwise `false`.
 * @category DOM
 */
export function setImgSizeBySrc(): boolean {
  // Use jQuery if available, otherwise fall back to pure JavaScript
  const $ = window.jQuery || window.$;
  if ($) {
    // Use jQuery to select all images on the page
    const images = $("img");
    if (!(images && images.length)) return false;
    images.each(function() {
      const $this = $(this);
      if (!$this) return;
      // Get the `src` attribute of the image
      const src = $this.attr("src");
      const canMatch = src && typeof src === "string" && src.length;
      if (!canMatch) return;
      // Use regular expressions to extract the `width` and `height` values from the `src` attribute
      const width = src.match(/width=([0-9]+[a-z%]*)/);
      const height = src.match(/height=([0-9]+[a-z%]*)/);
      // Set the width and height of the image using jQuery's `width()` and `height()` methods
      if (width && isNonEmptyArray(width) && width[1]) $this.width(width[1]);
      if (height && isNonEmptyArray(height) && height[1]) $this.height(height[1]);
    });
    return true;
  } else {
    // Use pure JavaScript to select all images on the page
    const images = document.getElementsByTagName("img");
    if (images.length > 0) {
      // Loop through each image and set its width and height based on the `src` attribute
      Array.from(images).forEach(function(img) {
        const $this = img;
        if (!$this) return;
        // Get the `src` attribute of the image
        const src = $this.getAttribute("src");
        const canMatch = src && typeof src === "string" && src.length;
        if (!canMatch) return;
        // Use regular expressions to extract the `width` and `height` values from the `src` attribute
        const width = src.match(/width=([0-9]+[a-z%]*)/);
        const height = src.match(/height=([0-9]+[a-z%]*)/);
        // Set the width and height of the image using the `style.width` and `style.height` properties
        if (width && isNonEmptyArray(width) && width[1]) $this.style.width = width[1];
        if (height && isNonEmptyArray(height) && height[1]) $this.style.height = height[1];
      });
      return true;
    }
  }
  return false;
}
/**
 * Alias of `setImgSizeBySrc`.
 * 
 * @hidden
 */
export function setImgWidHeiBySrc(): boolean {
  return setImgSizeBySrc();
}

/**
 * Generate the inline style string from the given parameters. The first parameter is the query selector, and the second parameter is the style array.
 *
 * Usage:
 *
 * ```javascript
 * const ret1 = genStyleString('.a', [ 'color:red' ]);
 * const ret2 = genStyleString('#b', [ 'color:red', 'font-size:12px' ]);
 * console.log(ret1);
 * console.log(ret2);
 * ```
 *
 * Output:
 *
 * ```text
 * .a{color:red;}
 * #b{color:red;font-size:12px;}
 * ```
 *
 * @param {string} selector
 * @param {array} styleArray
 * @returns {string} The inline style string.
 * @category DOM
 */
export function genStyleString(selector: string, styleArray: Array<string>): string {
  let style = "";
  if (styleArray && styleArray.length > 0) {
    style = styleArray.join(";") + ";";
  }
  return `${selector}{${style}}`;
}

/**
 * Load an image from the given URL.
 *
 * The target image will be loaded in the background, and the Promise status will change after the image is loaded. If the image fails to load, the Promise status will change to `reject` with the error object. If the image is loaded successfully, the Promise status will change to `resolve` with the image object. This method can be used to preload images and cache them in the browser. It can also be used to implement lazy loading of images.
 *
 * Note that this method will not add the image to the DOM.
 *
 * Usage:
 *
 * ```javascript
 * loadImage('https://example.com/example.png')
 *   .then((img) => {
 *     console.log(img);
 *   })
 *   .catch((err) => {
 *     console.log(err);
 *   });
 * ```
 *
 * @param {string} url - The URL of the image to load.
 * @returns {Promise} A Promise that resolves with the loaded image or rejects with an error.
 * @category Load
 */
export function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve(img);
    };
    img.onerror = err => {
      reject(err);
    };
    img.src = url;
  });
}

/**
 * Get the current version.
 *
 * @hidden
 */
export function getCurrentVersion(): string {
  return "v3";
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
