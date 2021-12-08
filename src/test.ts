import {
  calLongestCommonSubstring,
  calLongestCommonSubsequence,
  getPerformance,
  camelCaseToKebabCase,
  camelCase2Underscore,
  deepCopyObject,
  inRate,
  getUrlParam,
  loadScript,
  isSafePWAEnv,
  getBrowserType,
  debounce,
  windowLoaded,
  isNumber,
  addInlineStyle,
  floatToPercent,
  customScrollBarForTransformEle,
  // getPerformance,
  calcContainImageSizeAndPosition,
 } from './index';

// 数字测试
console.log('数字测试：', isNumber(Infinity, { isUnFiniteAsNumber: true }));

console.log('计算适配屏幕宽度的图片尺寸和位置：', JSON.stringify(calcContainImageSizeAndPosition({ oriImageWidth: 300, oriImageHeight: 300, viewportWidth: 375, viewportHeight: 812 })));

const methods = ['warn', 'error', 'info'];

window.$QttGame = {};
window.$QttGame.console = {};

methods.forEach(method => {
  window.$QttGame.console[method] = function (...argu) {
    console[method](...argu)
  }
});
