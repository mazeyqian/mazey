import type { MazeyFnParams } from "./typing";

/**
 * EN: Custom console printing (`console`).
 *
 * ZH: 生成自定义控制台打印。
 *
 * Usage:
 *
 * ```javascript
 * import { genCustomConsole } from "mazey";
 * 
 * const cusConsole = genCustomConsole("[MazeyLog]");
 * cusConsole.log("I am string.");
 * cusConsole.info("I am boolean.", true);
 * cusConsole.info("I am number.", 123, 456);
 * cusConsole.info("I am object.", { a: 123, b: 456});
 * ```
 *
 * Output:
 *
 * ```text
 * [MazeyLog] I am string.
 * [MazeyLog] I am boolean. true
 * [MazeyLog] I am number. 123 456
 * [MazeyLog] I am object. {a: 123, b: 456}
 * ```
 *
 * @param {string} prefix 前缀
 * @param {string} locales A locale string.
 * @param {function} logFn The function with Log.
 * @param {function} errorFn The function with Error.
 * @returns {object} 新实例
 * @category Debug
 */
export function genCustomConsole(
  prefix = "",
  options: {
    isClosed?: boolean;
    showWrap?: boolean;
    showDate?: boolean;
    locales?: string;
    logFn?: () => void;
    errorFn?: () => void;
  } = {
    isClosed: false,
    showWrap: false,
    showDate: false,
    locales: "en-US",
    logFn: () => undefined,
    errorFn: () => undefined,
  }
): Console {
  const { isClosed, showWrap, showDate, locales, logFn, errorFn } = Object.assign(
    {
      isClosed: false,
      showWrap: false,
      showDate: false,
      locales: "en-US",
      logFn: () => undefined,
      errorFn: () => undefined,
    },
    options
  );
  const methods = [ "log", "info", "warn", "error" ];
  const newConsole = Object.create(null);
  // https://stackoverflow.com/questions/3552461/how-do-i-format-a-date-in-javascript
  const formatDate = () => {
    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      // hourCycle: "h24",
      minute: "numeric",
      second: "numeric",
    };
    const todayDateIns = new Date();
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
    // https://datatracker.ietf.org/doc/html/rfc4647
    const dateStr = todayDateIns.toLocaleDateString(locales, dateOptions);
    return dateStr;
  };
  methods.forEach(method => {
    newConsole[method] = function(...argu: MazeyFnParams) {
      if (isClosed) {
        return false;
      }
      let elaboratePrefix = prefix;
      let datePrefix = prefix;
      if (typeof prefix === "string" && prefix.length >= 2) {
        const len = prefix.length;
        if (prefix[len - 1] === ":") {
          elaboratePrefix = prefix.substring(0, len - 1);
        } else {
          elaboratePrefix = prefix;
        }
      }
      if (showWrap) {
        console.log(`--- ${elaboratePrefix} - begin ---`);
      }
      if (showDate) {
        if (prefix) {
          datePrefix = `${formatDate()} ${prefix}`;
        } else {
          datePrefix = `${formatDate()}`;
        }
      }
      if (prefix || showDate) {
        console[method](datePrefix, ...argu);
      } else {
        console[method](...argu);
      }
      if (method === "log") {
        logFn();
      }
      if (method === "error") {
        errorFn();
      }
      if (showWrap) {
        console.log(`--- ${elaboratePrefix} - end ---`);
      }
    };
  });
  return newConsole;
}

/**
 * @hidden
 */
export const mazeyCon = genCustomConsole("[Mazey]");
