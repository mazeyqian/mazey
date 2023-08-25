/**
 * @author: Mazey Chu
 */
import $ from 'jquery';

declare global {
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

  interface PerformanceEntry {
    readonly processingStart?: DOMHighResTimeStamp;
    readonly processingEnd?: DOMHighResTimeStamp;
    readonly value?: number;
  }
}
