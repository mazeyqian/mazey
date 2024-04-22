import type { DefineListeners } from "./typing";

/**
 * 阻止冒泡
 *
 * Usage:
 *
 * ```javascript
 * const ret1 = cancelBubble(e);
 * ```
 *
 * @category Event
 */
export function cancelBubble(e: Event): void {
  const ev = e || window.event;
  if (ev.stopPropagation) {
    // W3C
    ev.stopPropagation();
  } else {
    // IE
    ev.cancelBubble = true;
  }
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
