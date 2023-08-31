/**
 * @jest-environment node
 */
/* eslint-disable no-undef */
/* eslint-disable quotes */
// URL

import { isValidUrl, getUrlFileType, isValidHttpUrl } from '../lib/index.esm';

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
  'http://example.com/a/index.html?msg=%3Ca%20href%3D%22https',
  'ftp://example.com',
  'ssssss://app_test/deploy?id=99',
  'http://v=0618',
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
  'file:///C:/Users/Username/Documents/Example.txt',
  '<a href="https://b.example.com/t/i/y" target="_blank">xxx</a><br/>',
  'http://example.com/a/index.html?msg=<a href="https://b.example.com/t/i/y" target="_blank">xxx</a><br/>',
  'v=0618',
];

test('isValidUrl', () => {
  validUrls.forEach(url => {
    // console.log('validUrls', url);
    expect(isValidUrl(url)).toBe(true);
  });

  invalidUrls.forEach(url => {
    // console.log('invalidUrls', url);
    let ret = isValidUrl(url);
    // if (ret) {
    //   console.log('invalidUrls', url, ret);
    // }
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

describe('isValidHttpUrl', () => {
  it('should return true for valid HTTP/HTTPS URLs', () => {
    expect(isValidHttpUrl('https://www.example.com')).toBe(true);
    expect(isValidHttpUrl('http://example.com/path/exx/ss')).toBe(true);
    expect(isValidHttpUrl('https://www.example.com/?q=hello&age=24#world')).toBe(true);
    expect(isValidHttpUrl('http://www.example.com/#world?id=9')).toBe(true);
    expect(isValidHttpUrl('http://example.com:8080')).toBe(true);
    expect(isValidHttpUrl('http://www.example.com/哈哈哈哈哈')).toBe(true);
  });

  it('should return false for invalid URLs', () => {
    expect(isValidHttpUrl('ftp://example.com')).toBe(false);
    expect(isValidHttpUrl('example.com')).toBe(false);
    expect(isValidHttpUrl('www.example.com')).toBe(false);
    expect(isValidHttpUrl('v=0618')).toBe(false);
    expect(isValidHttpUrl('http://ssssssssssss')).toBe(false);
    expect(isValidHttpUrl(`https://this-shouldn't.match@example.com`)).toBe(false);
    expect(isValidHttpUrl('abcdef')).toBe(false);
  });
});
