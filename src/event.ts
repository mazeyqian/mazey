import type { DefineListeners, MazeyFn } from "./typing";

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
export function addEvent(type: string, fn: MazeyFn): void {
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
export function removeEvent(type: string, fn: MazeyFn): void {
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
