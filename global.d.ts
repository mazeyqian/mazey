/**
 * @author: Mazey Chu
 */
import $ from 'jquery';

declare global {
  interface PerformanceEntry {
    readonly processingStart?: DOMHighResTimeStamp;
    readonly processingEnd?: DOMHighResTimeStamp;
    readonly value?: number;
  }

  interface NetworkInformation {
    readonly rtt?: number;
    readonly downlink?: number;
    readonly effectiveType?: string;
    readonly saveData?: boolean;
  }

  interface Navigator {
    readonly connection?: NetworkInformation;
  }

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
