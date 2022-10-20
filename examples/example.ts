import {
  isNumber,
  getQueryParam,
  getUrlParam,
  updateQueryParam,
  getHashQueryParam,
  getDomain,
  camelCaseToKebabCase,
  camelCase2Underscore,
  mTrim,
  newLine,
  deepCopyObject,
  isJsonString,
  generateRndNum,
 } from '../src/index';

// 数字测试
console.log('数字测试：', isNumber(Infinity, { isUnFiniteAsNumber: true }));

const hashParam = getHashQueryParam('ttt');

console.log('hashParam', hashParam);

// const t3 = getQueryParam('t3');
// const t4 = getQueryParam('t4');

// console.log('t3', t3);
// console.log('t4', t4);

// const t3 = getUrlParam('http://example.com/?t1=1&t2=2&t3=3&t4=4', 't3');
// const t4 = getUrlParam('http://example.com/?t1=1&t2=2&t3=3&t4=4', 't4');

// const t3 = updateQueryParam('http://example.com/?t1=1&t2=2&t3=3&t4=4', 't3', 'three');
// const t4 = updateQueryParam('http://example.com/?t1=1&t2=2&t3=3&t4=4', 't4', 'four');

// const t3 = getHashQueryParam('t3'); // 3
// const t4 = getHashQueryParam('t4'); // 4

// const t3 = getDomain('http://example.com/?t1=1&t2=2&t3=3&t4=4'); // example.com
// const t4 = getDomain('http://example.com/test/thanks?t1=1&t2=2&t3=3&t4=4', ['hostname', 'pathname']); // example.com/test/thanks

// const m1 = camelCaseToKebabCase('aBC'); // a-b-c
// const m2 = camelCase2Underscore('bBC'); // a_b_c

const m1 = generateRndNum(4); // '9730'
const m2 = generateRndNum(7); // '2262490'

console.log('m1', m1);
console.log('m2', m2);
