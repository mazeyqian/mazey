import { isNonEmptyArray, isNumber } from './util';

/**
 * @hidden
 */
export function isSupportedEntryType(name: string) {
  let supportedEntryTypes: readonly string[] = [];
  const perfObs = window.PerformanceObserver;
  if (!perfObs) {
    return false;
  }
  if (isNonEmptyArray(perfObs.supportedEntryTypes as unknown[])) {
    supportedEntryTypes = perfObs.supportedEntryTypes;
  }
  return supportedEntryTypes.includes(name);
}

/**
 * Gets the first contentful paint (FCP) time of a web page using the Performance API.
 * The FCP time is the time it takes for the first piece of content to be painted on the screen.
 *
 * Usage:
 *
 * ```javascript
 * getFCP().then(
 *  res => {
 *   console.log(`FCP: ${res}`);
 *  }
 * );
 * ```
 *
 * Output:
 *
 * ```text
 * FCP: 123
 * ```
 *
 * @returns A promise that resolves with the FCP time in milliseconds, or 0 if the 'paint' entry type is not supported.
 * @category Perf
 */
export async function getFCP(): Promise<number> {
  if (!isSupportedEntryType('paint')) {
    return 0;
  }
  return new Promise(resolve => {
    const observer = new PerformanceObserver(list => {
      const entries = list.getEntries();
      const fcpIns = entries.find(entry => entry.name === 'first-contentful-paint');
      if (fcpIns) {
        observer.disconnect();
        resolve(Math.round(fcpIns.startTime));
      }
    });
    observer.observe({ type: 'paint', buffered: true });
  });
}

/**
 * Gets the first paint (FP) time of a web page using the Performance API.
 * The FP time is the time it takes for the first pixel to be painted on the screen.
 *
 * Usage:
 *
 * ```javascript
 * getFP().then(
 *  res => {
 *    console.log(`FP: ${res}`);
 *  }
 * );
 * ```
 *
 * Output:
 *
 * ```text
 * FP: 123
 * ```
 *
 * @returns A promise that resolves with the FP time in milliseconds, or 0 if the 'paint' entry type is not supported.
 * @category Perf
 */
export async function getFP(): Promise<number> {
  if (!isSupportedEntryType('paint')) {
    return 0;
  }
  return new Promise(resolve => {
    const observer = new PerformanceObserver(list => {
      const entries = list.getEntries();
      const fpIns = entries.find(entry => entry.name === 'first-paint');
      if (fpIns) {
        observer.disconnect();
        resolve(Math.round(fpIns.startTime));
      }
    });
    observer.observe({ type: 'paint', buffered: true });
  });
}

/**
 * Gets the largest contentful paint (LCP) time of a web page using the Performance API.
 * The LCP time is the time it takes for the largest piece of content to be painted on the screen.
 *
 * Usage:
 *
 * ```javascript
 * getLCP().then(
 *  res => {
 *    console.log(`LCP: ${res}`);
 *  }
 * );
 * ```
 *
 * Output:
 *
 * ```text
 * LCP: 123
 * ```
 *
 * @returns A promise that resolves with the LCP time in milliseconds, or 0 if the 'largest-contentful-paint' entry type is not supported.
 * @category Perf
 */
export async function getLCP(): Promise<number> {
  if (!isSupportedEntryType('largest-contentful-paint')) {
    return 0;
  }
  return new Promise(resolve => {
    const observer = new PerformanceObserver(list => {
      const entries = list.getEntries();
      const lcpIns = entries.find(entry => entry.entryType === 'largest-contentful-paint');
      if (lcpIns) {
        observer.disconnect();
        resolve(Math.round(lcpIns.startTime));
      }
    });
    observer.observe({ type: 'largest-contentful-paint', buffered: true });
  });
}

/**
 * Gets the first input delay (FID) of a web page using the Performance API.
 * The FID is the time it takes for the first user input to be processed by the browser.
 *
 * Usage:
 *
 * ```javascript
 * getFID().then(
 *  res => {
 *    console.log(`FID: ${res}`);
 *  }
 * );
 * ```
 *
 * Output:
 *
 * ```text
 * FID: 123
 * ```
 *
 * @returns A promise that resolves with the FID in milliseconds, or 0 if the 'first-input' entry type is not supported.
 * @category Perf
 */
export async function getFID(): Promise<number> {
  if (!isSupportedEntryType('first-input')) {
    return 0;
  }
  return new Promise(resolve => {
    const observer = new PerformanceObserver(list => {
      const entries = list.getEntries();
      const fidIns = entries.find(entry => entry.entryType === 'first-input');
      if (fidIns) {
        observer.disconnect();
        const ps = fidIns.processingStart;
        if (ps) {
          resolve(Math.round(fidIns.processingStart - fidIns.startTime));
        } else {
          resolve(0);
        }
      }
    });
    observer.observe({ type: 'first-input', buffered: true });
  });
}

/**
 * Gets the Cumulative Layout Shift (CLS) score of a web page using the Performance API.
 * The CLS score is a measure of how much the page layout shifts during loading.
 *
 * Usage:
 *
 * ```javascript
 * getCLS().then(
 *  res => {
 *    console.log(`CLS: ${res}`);
 *  }
 * );
 * ```
 *
 * Output:
 *
 * ```text
 * CLS: 123
 * ```
 *
 * @returns A promise that resolves with the CLS score, or 0 if the 'layout-shift' entry type is not supported.
 * @category Perf
 */
export async function getCLS(): Promise<number> {
  if (!isSupportedEntryType('layout-shift')) {
    return 0;
  }
  return new Promise(resolve => {
    const observer = new PerformanceObserver(list => {
      const entries = list.getEntries();
      const clsScore = entries.reduce((score, entry) => {
        let ev = 0;
        if (isNumber(entry.value)) {
          ev = entry.value as number;
        }
        return score + ev;
      }, 0);
      observer.disconnect();
      resolve(clsScore);
    });
    observer.observe({ type: 'layout-shift', buffered: true });
  });
}
