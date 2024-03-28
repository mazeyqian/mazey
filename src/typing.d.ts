/**
 * @author Cheng
 */

export interface BrowserInfo {
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

export interface DefineListeners {
  [key: string]: any;
}

export type TestUa = (regexp: RegExp) => boolean;
export type TestVs = (regexp: RegExp) => string;

export interface UrlParams {
  [key: string]: string[];
}

export type ThrottleFunc<T extends (...args: any[]) => any> = (...args: Parameters<T>) => ReturnType<T> | null;

export type DebounceFunc<T extends (...args: any[]) => any> = (...args: Parameters<T>) => ReturnType<T>;

export interface IsNumberOptions {
  isNaNAsNumber?: boolean;
  isInfinityAsNumber?: boolean;
  isUnFiniteAsNumber?: boolean;
}

export type AnyFunction = (...args: any[]) => any;

export interface ZResResponse {
  status: number;
  data: {
    code: number;
  };
}

export interface ZResIsValidResOptions {
  validStatusRange?: [number, number];
  validCode?: number[];
}

export interface RepeatUntilOptions {
  interval?: number;
  times?: number;
  context?: any;
  args?: Array<any>;
}

export type LoadScriptReturns = Promise<boolean | string | Error | void>;

export type SimpleType = string | number | boolean | null | undefined;
export type SimpleObject = {
  [key: string]: SimpleType | SimpleType[] | SimpleObject | SimpleObject[];
};

export type UnknownObject = any; // Record<string, unknown>;
export type UnknownFnParams = any[]; // | Record<string, unknown> | string | number | boolean | null | undefined;
export type UnknownFnReturn = any;
export type UnknownFn = (...args: UnknownFnParams) => UnknownFnReturn;

export interface UnknownWindow {
  [key: string]: any;
}

export type MazeyFnParams = any[]; // | Record<string, unknown> | string | number | boolean | null | undefined;
export type MazeyFnReturn = any;
export type MazeyFunction = (...args: any[]) => any;

export interface WebPerformance {
  [key: string]: string | number;
}
