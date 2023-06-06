/**
 * @jest-environment node
 */
/* eslint-disable no-undef */
/* eslint-disable quotes */
// URL

import { isValidUrl, getUrlFileType } from '../lib/index.esm';

const validUrls = [
  'https://www.example.com/events/#&product=browser',
  'https://example.com/?q=Test%20URL-encoded%20stuff',
  'http://example.com?foo=bar#baz=qux&ssq?id=sdf',
  'http://www.example.com',
  'https://www.example.com/blah_blah/',
  'https://example.com/qwe/e?bar=baz&inss=33&qa',
  'http://example.com#home?id=1&name=33',
  'http://example.com?foo=bar&name=名字&age=24',
  'http://.example.com',
  'http://example?foo=bar',
  'http://example.',
  'http://223.255.255.66',
  'http://223.255.255.66:23/page?id=33',
  'http://142.2.2.2:8080/',
  'ftp://example.com',
  'ssssss://app_test/deploy?id=99',
];

const invalidUrls = [
  'example.com',
  'www.example.com',
  'http://例子.测试',
  '____sssss://ssssss',
  '" https://example.com/t/jae"',
  '    https://example.com/t/eee',
  'hahha',
  '哈哈哈哈',
];

test('isValidUrl', () => {
  validUrls.forEach(url => {
    expect(isValidUrl(url)).toBe(true);
  });

  invalidUrls.forEach(url => {
    // console.log('invalidUrls', url);
    let ret = isValidUrl(url);
    if (ret) {
      console.log('invalidUrls', url, ret);
    }
    expect(ret).toBe(false);
    // expect(isValidUrl(url)).toBe(false);
  });
});

// Use Jest to test getUrlFileType in a `test`
// console.log(getUrlFileType('https://example.com/a/b/c.png')); // png
// console.log(getUrlFileType('https://example.com/a/b/c.jpg')); // jpg
// console.log(getUrlFileType('https://example.com/a/b/c.jpeg')); // jpeg
// console.log(getUrlFileType('https://example.com/a/b/c.v/a')); // ''
test('getUrlFileType', () => {
  expect(getUrlFileType('https://example.com/a/b/c.png')).toBe('png');
  expect(getUrlFileType('https://example.com/a/b/c.jpg')).toBe('jpg');
  expect(getUrlFileType('https://example.com/a/b/c.jpeg')).toBe('jpeg');
  expect(getUrlFileType('/a/b/c.jpeg')).toBe('jpeg');
  expect(getUrlFileType('https://example.com/a/b/c.v/a')).toBe('');
});
