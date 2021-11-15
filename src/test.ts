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
  // getPerformance,
 } from './index';

// 数字测试
console.log('数字测试：', isNumber(Infinity, { isUnFiniteAsNumber: true }));

// 添加有 id 的内联样式，重复添加会更新内联样式而不是新增
addInlineStyle({
  inlineStyle: `
    body {
      background-color: #;
    }
  `,
  id: 'test',
});

// <style id="test">
//   body {
//     background-color: #333;
//   }
// </style>

// 添加无 id 的内联样式，重复添加会新增内联样式
// addInlineStyle({
//   inlineStyle: `
//     body {
//       background-color: #444;
//     }
//   `,
// });

// <style>
//   body {
//     background-color: #444;
//   }
// </style>

(window as any).addInlineStyle = addInlineStyle;

// 获取图片距离顶部的距离
function getBox2To () {
  const translates = window.getComputedStyle(document.querySelector('.i') as any, null).transform;
  const tanslateY = parseFloat(translates.substring(6).split(',')[5]);
  return tanslateY;
}
console.log('获取图片距离顶部的距离', getBox2To());
// 获取图片的高度
function getImgHeight () {
  return document.querySelector('.img')?.clientHeight;
}
console.log('获取图片的高度', getImgHeight());
// 获取窗口的高度
function getWindowHeight () {
  return window.outerHeight;
}
console.log('获取窗口的高度', getWindowHeight());
// 获取顶部溢出的百分比
function getTopOverflowPercent () {
  let box2To = getBox2To();
  if (box2To >= 0) {
    box2To = 0;
  }
  box2To = Math.abs(box2To);
  const windowHeight = getWindowHeight();
  const per = floatToPercent(box2To/windowHeight, 2);
  return {
    box2To,
    per,
  };
}
console.log('获取顶部溢出的百分比', getTopOverflowPercent());
// 获取底部溢出的百分比
function getBottomOverflowPercent () {
  // 窗口高度
  const windowHeight = getWindowHeight();
  // 图片高度
  const imgHeight = getImgHeight();
  // 上面溢出的高度
  const box2To = getBox2To();
}
