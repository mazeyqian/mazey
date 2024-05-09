/**
 * @author Cheng
 */
// eslint-disable-next-line spaced-comment
/// <reference path="../global.d.ts" />

// import type {
//   LoadScriptReturns,
//   UnknownWindow,
// } from "./typing";
// import { loadScript } from "./load";

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
