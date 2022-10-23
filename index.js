/**
 * @author: Mazey Chu
 */

// Define event.
let defineListeners = {};

// Add event.
function addEvent(type, fn) {
  if (typeof defineListeners[type] === "undefined") {
      defineListeners[type] = [];
  }
  if (typeof fn === "function") {
      defineListeners[type].push(fn);
  }
}

// Invoke event.
function fireEvent(type) {
  let arrayEvent = defineListeners[type];
  if (arrayEvent instanceof Array) {
      for (let i = 0, length = arrayEvent.length; i < length; i++) {
          if (typeof arrayEvent[i] === "function") {
              arrayEvent[i]({
                  type: type
              });
          }
      }
  }
}

// Remove event.
function removeEvent(type, fn) {
  let arrayEvent = defineListeners[type];
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
