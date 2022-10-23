import {
  isNumber,
  getUrlParam,
  updateQueryParam,
  getHashQueryParam,
  getDomain,
  camelCaseToKebabCase,
  camelCase2Underscore,
  generateRndNum,
  isNonEmptyArray,
  getFileSize,
  isSupportWebp,
  genHashCode,
 } from '../src/index';

// Sync
console.log('Is Infinity number?', isNumber(Infinity, { isUnFiniteAsNumber: true }));
console.log('Did ttt exist?', getHashQueryParam('ttt'));
console.log('What is t3?', getUrlParam('http://example.com/?t1=1&t2=2&t3=3&t4=4', 't3'));
console.log('Can query param update successfully?', updateQueryParam('http://example.com/?t1=1&t2=2&t3=3&t4=4', 't3', 'three'));
console.log('What is domain?', getDomain('http://example.com/?t1=1&t2=2&t3=3&t4=4'));
console.log('Get KebabCase:', camelCaseToKebabCase('aBC'));
console.log('Get Underscore:', camelCase2Underscore('bBC'));
console.log('Get a string with random number:', generateRndNum(7));
console.log('Is non-empty array?', isNonEmptyArray(['a', 123]));
console.log('Get file size:', getFileSize(2000));
console.log('Generate a Hash from a string:', genHashCode('123'));

// Async
(async () => {
  console.log('Detect webp support:', await isSupportWebp());
})();
