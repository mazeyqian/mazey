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
  // getPerformance,
 } from './index';

// 数字测试
console.log('数字测试：', isNumber(Infinity, { isUnFiniteAsNumber: true }));

// 添加有 id 的内联样式，重复添加会更新内联样式而不是新增
addInlineStyle({
  inlineStyle: `
    body {
      background-color: #333;
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
addInlineStyle({
  inlineStyle: `
    body {
      background-color: #444;
    }
  `,
});

// <style>
//   body {
//     background-color: #444;
//   }
// </style>

(window as any).addInlineStyle = addInlineStyle;
