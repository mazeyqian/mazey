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
