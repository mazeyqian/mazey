/**
 * @author: Mazey Chu
 */
import $ from 'jquery';

declare global {
  interface BrowserInfo {
    engine: string; // webkit gecko presto trident
    engineVs: string;
    platform: string; // desktop mobile
    supporter: string; // chrome safari firefox opera iexplore edge
    supporterVs: string;
    system: string; // windows macos linux android ios
    systemVs: string;
    shell?: string; // wechat qq uc 360 2345 sougou liebao maxthon
    shellVs?: string;
    appleType?: string;
  }

  interface DefineListeners {
    [key: string]: any;
  }

  type TestUa = (regexp: RegExp) => boolean;
  type TestVs = (regexp: RegExp) => string;

  interface Window {
    // VAR
    MAZEY_DEFINE_LISTENERS: {
      [key: string]: DefineListeners;
    };
    MAZEY_BROWSER_INFO: BrowserInfo;
    // LIB
    $: typeof $;
    jQuery: typeof $;
  }

  interface UrlParams {
    [key: string]: string | string[];
  }

  type ThrottleFunc<T extends (...args: any[]) => any> = (
    ...args: Parameters<T>
  ) => ReturnType<T> | null;

  type DebounceFunc<T extends (...args: any[]) => any> = (
    ...args: Parameters<T>
  ) => ReturnType<T>;

  interface IsNumberOptions {
    isNaNAsNumber?: boolean;
    isInfinityAsNumber?: boolean;
    isUnFiniteAsNumber?: boolean;
  }

  type AnyFunction = (...args: any[]) => any;

  interface ZResResponse {
    status: number;
    data: {
      code: number;
    };
  }

  interface ZResIsValidResOptions {
    validStatusRange?: [number, number];
    validCode?: number[];
  }

  interface RepeatUntilOptions {
    interval?: number;
    times?: number;
    context?: any;
    args?: Array<any>;
  }

  type LoadScriptReturns = Promise<boolean | string | Error | void>;
}
