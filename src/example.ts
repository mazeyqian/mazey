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
  genCustomConsole,
 } from './index';

// 数字测试
console.log('数字测试：', isNumber(Infinity, { isUnFiniteAsNumber: true }));

console.log('计算适配屏幕宽度的图片尺寸和位置：', JSON.stringify(calcContainImageSizeAndPosition({ oriImageWidth: 300, oriImageHeight: 300, viewportWidth: 375, viewportHeight: 812 })));

const aaa = genCustomConsole({ prefix: 'aaa' });
const bbb = genCustomConsole({ prefix: 'bbb:' });
const ccc = genCustomConsole({ prefix: '' });
const myConsole = genCustomConsole({ prefix: 'MazeyLog:' });

aaa.log(123);
aaa.info(123, 456);
aaa.warn(123, 456, 789);
aaa.error(123, 456, 789, 0);

bbb.log(123);
bbb.info(123, 456);
bbb.warn(123, 456, 789);
bbb.error(123, 456, 789, 0);

ccc.log(123);
ccc.info(123, 456);
ccc.warn(123, 456, 789);
ccc.error(123, 456, 789, 0);

myConsole.log('I am string.'); // MazeyLog: I am string.
myConsole.info('I am boolean.', true); // MazeyLog: I am boolean. true
myConsole.info('I am number.', 123, 456); // MazeyLog: I am number. 123 456
myConsole.info('I am object.', { a: 123, b: 456}); // MazeyLog: I am object. {a: 123, b: 456}
