import {
  isNumber,
  getHashQueryParam,
  getQueryParam,
 } from './index';

// 数字测试
console.log('数字测试：', isNumber(Infinity, { isUnFiniteAsNumber: true }));

const hashParam = getHashQueryParam('ttt');

console.log('hashParam', hashParam);

const queryParam = getQueryParam('tttt');

console.log('queryParam', queryParam);
