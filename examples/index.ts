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
  debounce,
  genCustomConsole,
  formatDate,
  isValidData,
  getFriendlyInterval
} from '../src/index';

// Sync
console.log(
  'Is Infinity number?',
  isNumber(Infinity, { isUnFiniteAsNumber: true })
);
console.log(
  'Is NaN number?',
  isNumber(NaN, { isNaNAsNumber: true, isUnFiniteAsNumber: true })
);
console.log('Did ttt exist?', getHashQueryParam('ttt'));
console.log(
  'What is t3?',
  getUrlParam('http://example.com/?t1=1&t2=2&t3=3&t4=4', 't3')
);
console.log(
  'Can query param update successfully?',
  updateQueryParam('http://example.com/?t1=1&t2=2&t3=3&t4=4', 't3', 'three')
);
console.log(
  'What is domain?',
  getDomain('http://example.com/?t1=1&t2=2&t3=3&t4=4')
);
console.log('Get KebabCase:', camelCaseToKebabCase('aBC'));
console.log('Get Underscore:', camelCase2Underscore('bBC'));
console.log('Get a string with random number:', generateRndNum(7));
console.log('Is non-empty array?', isNonEmptyArray(['a', 123]));
console.log('Get file size:', getFileSize(2000));
console.log('Generate a Hash from a string:', genHashCode('123'));
const genLog = genCustomConsole('GenLog:', {
  isClosed: false,
  showWrap: false,
  showDate: true,
  locales: 'zh-CN'
});
genLog.log('test?');
// const s011101 = ;
console.log('Default formatDate value:', formatDate());
// 2022-01-11
console.log(
  'String formatDate value:',
  formatDate(
    'Tue Jan 11 2022 14:12:26 GMT+0800 (China Standard Time)',
    'yyyy-MM-dd hh:mm:ss'
  )
);
// 2022-01-11 14:12:26
console.log(
  'Number formatDate value:',
  formatDate(1641881235000, 'yyyy-MM-dd hh:mm:ss')
);
// 2022-01-11 14:07:15
// (new Date(2014, 1, 11), 'MM/dd/yyyy')
console.log(
  'Date formatDate value:',
  formatDate(new Date(2014, 1, 11), 'MM/dd/yyyy')
);
// Date formatDate value: 02/11/2014
const validData = {
  a: {
    b: {
      c: 413
    }
  }
};

const isValidDataResA = isValidData(validData, ['a', 'b', 'c'], 2333);
const isValidDataResB = isValidData(validData, ['a', 'b', 'c'], 413);
const isValidDataResC = isValidData(validData, ['d', 'd'], 413);

console.log('isValidDataResA:', isValidDataResA);
console.log('isValidDataResB:', isValidDataResB);
console.log('isValidDataResC:', isValidDataResC);

// isValidDataResA: false
// isValidDataResB: true
// isValidDataResC: false

console.log(
  'getFriendlyInterval:',
  getFriendlyInterval(
    new Date('2020-03-28 00:09:27'),
    new Date('2023-04-18 10:54:00'),
    { type: 'd' }
  )
); // 1116
console.log(
  'getFriendlyInterval:',
  getFriendlyInterval(1585325367000, 1681786440000, { type: 'text' })
); // 1116 天 10 时 44 分 33 秒
console.log(
  'getFriendlyInterval:',
  getFriendlyInterval('2020-03-28 00:09:27', '2023-04-18 10:54:00', {
    type: 'text'
  })
); // 1116 天 10 时 44 分 33 秒

// Async
(async () => {
  console.log('Detect webp support:', await isSupportWebp());

  // debounce
  console.log('Test debounce - begin');
  const c = debounce(
    () => {
      console.log('Test debounce - fun myself');
    },
    3000,
    true
  );
  console.log('Test debounce - invoke first');
  c();
  setTimeout(() => {
    c();
    console.log('Test debounce - 2000ms second');
  }, 2000);
  setTimeout(() => {
    c();
    console.log('Test debounce - 10000ms third');
  }, 10000);
  console.log('Test debounce - end');
})();
