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
}
