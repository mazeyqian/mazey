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

customScrollBarForTransformEle({
  containerClassName: 'container',
  imgBoxClassName: 'box',
  imgClassName: 'img',
  imgDom: null,
});

setTimeout(() => {
// 变量
const containerClassName = 'container';
const imgBoxClassName = 'box';
const imgClassName = 'img';
const imgDom = document.querySelectorAll('.img')[0];
// 样式初始化
addInlineStyle({
  inlineStyle: `
    .${containerClassName}::after {
      content: ' ';
      position: fixed;
      top: 0;
      right: 5px;
      min-height: 0vh;
      max-height: 100vh;
      width: 12px;
      border-radius: 10px;
      box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      background-color: #555;
    }
  `,
  id: 'bar-init'
});
// 获取图片距离顶部的距离
function getBox2To () {
  const translates = window.getComputedStyle(document.querySelector(`.${imgBoxClassName}`) as any, null).transform;
  const tanslateY = parseFloat(translates.substring(6).split(',')[5]);
  return tanslateY;
}
const Box2ToRes = getBox2To();
console.log('获取图片距离顶部的距离', Box2ToRes);
// 获取图片的高度
function getImgHeight () {
  return (imgDom || document.querySelector(`.${imgClassName}`))?.clientHeight;
}
const ImgHeightRes = getImgHeight();
console.log('获取图片的高度', ImgHeightRes);
// 获取窗口的高度
function getWindowHeight () {
  return (document.querySelector(`.${containerClassName}`) as any).clientHeight; // window.outerHeight;
}
const WindowHeightRes = getWindowHeight();
console.log('获取窗口的高度', WindowHeightRes);
// 获取顶部溢出的百分比
function getTopOverflowPercent () {
  let box2To = Box2ToRes;
  if (box2To >= 0) {
    box2To = 0;
  }
  box2To = Math.abs(box2To);
  // 图片高度
  const imgHeight = ImgHeightRes;
  const per = floatToPercent(box2To/(imgHeight as any), 2);
  return {
    box2To,
    per,
  };
}
const TopOverflowPercentRes = getTopOverflowPercent();
console.log('获取顶部溢出的百分比', TopOverflowPercentRes);
// 获取底部溢出的百分比
function getBottomOverflowPercent () {
  // 窗口高度
  const windowHeight = WindowHeightRes;
  // 图片高度
  const imgHeight = ImgHeightRes;
  // 上面溢出的高度
  const box2To = Box2ToRes;
  // 底部
  const remindImageHeight = windowHeight - box2To;
  let box2ToBottom = (imgHeight as any) - remindImageHeight;
  if (box2ToBottom <= 0) {
    box2ToBottom = 0;
  }
  const per = floatToPercent(box2ToBottom/(imgHeight as any), 2);
  return {
    box2ToBottom,
    per,
  };
}
const BottomOverflowPercentRes = getBottomOverflowPercent();
console.log('获取顶部溢出的百分比', BottomOverflowPercentRes);
// 如果都是 0 ，隐藏滚动条
function hideBar () {
  const { box2To } = TopOverflowPercentRes;
  const { box2ToBottom } = BottomOverflowPercentRes;
  if (!box2To && !box2ToBottom) {
    return addInlineStyle({
      inlineStyle: `
        .${containerClassName}::after {
          display: none;
        }
      `,
      id: 'bar-hide'
    });
  }
  return false;
}
const hideBarRes = hideBar();
console.log('如果都是 0 ，隐藏滚动条', hideBarRes);
// 设置顶部状态栏
function setBarTop () {
  const { box2To, per } = TopOverflowPercentRes;
  return addInlineStyle({
    inlineStyle: `
      .${containerClassName}::after {
        top: ${per};
      }
    `,
    id: 'bar-top'
  });
}
// 设置底部状态栏
function setBarBottom () {
  const { box2ToBottom, per } = BottomOverflowPercentRes;
  return addInlineStyle({
    inlineStyle: `
      .${containerClassName}::after {
        bottom: ${per};
      }
    `,
    id: 'bar-bottom'
  });
}
if (!hideBarRes) {
  const setBarTopRes = setBarTop();
  console.log('设置顶部状态栏', setBarTopRes);
  const setBarBottomRes = setBarBottom();
  console.log('设置底部状态栏', setBarBottomRes);
}
}, 10000000000000);