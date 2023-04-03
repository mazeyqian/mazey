/**
 * @author: Mazey Chu
 */

interface DefineListeners {
  [key: string]: any;
}

interface Window {
  // VAR
  MAZEY_DEFINE_LISTENERS: {
    [key: string]: DefineListeners;
  };
}
