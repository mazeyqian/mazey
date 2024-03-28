/**
 * @jest-environment node
 */
/* eslint-disable no-undef */
import {
  isValidUrl, getUrlFileType, isValidHttpUrl, updateQueryParam, getUrlParam, 
} from '../lib/index.esm';

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
    expect(isValidUrl(url)).toBe(true);
  });

  invalidUrls.forEach(url => {
    let ret = isValidUrl(url);
    expect(ret).toBe(false);
  });
});

// Use Jest to test getUrlFileType in a `test`
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
    expect(isValidHttpUrl('https://this-shouldn\'t.match@example.com')).toBe(false);
    expect(isValidHttpUrl('abcdef')).toBe(false);
  });

  it('should return true for valid URLs when strict is false', () => {
    expect(isValidHttpUrl('//www.example.com', { strict: false })).toBe(true);
    expect(isValidHttpUrl('http://example.com/path/exx/ss', { strict: false })).toBe(true);
    expect(isValidHttpUrl('//www.example.com/?q=hello&age=24#world', { strict: false })).toBe(true);
    expect(isValidHttpUrl('https://www.example.com/#world?id=9', { strict: false })).toBe(true);
    expect(isValidHttpUrl('//example.com:8080', { strict: false })).toBe(true);
    expect(isValidHttpUrl('//www.example.com/哈哈哈哈哈', { strict: false })).toBe(true);
  });

  it('should return false for invalid URLs when strict is false', () => {
    expect(isValidHttpUrl('ftp://example.com', { strict: false })).toBe(false);
    expect(isValidHttpUrl('example.com', { strict: false })).toBe(false);
    expect(isValidHttpUrl('www.example.com', { strict: false })).toBe(false);
    expect(isValidHttpUrl('v=0618', { strict: false })).toBe(false);
    expect(isValidHttpUrl('http://ssssssssssss', { strict: false })).toBe(false);
    expect(isValidHttpUrl('https://this-shouldn\'t.match@example.com', { strict: false })).toBe(false);
    expect(isValidHttpUrl('abcdef', { strict: false })).toBe(false);
  });
});

// Test case 1: URL with existing query parameter
test('Update existing query parameter in URL', () => {
  const url = 'https://example.com/page?param1=value1&param2=value2';
  const param = 'param1';
  const value = 'updatedValue';
  const updatedUrl = updateQueryParam(url, param, value);
  expect(updatedUrl).toBe('https://example.com/page?param1=updatedValue&param2=value2');
});

// Test case 2: URL without existing query parameter
test('Add new query parameter to URL', () => {
  const url = 'https://example.com/page';
  const param = 'param1';
  const value = 'newValue';
  const updatedUrl = updateQueryParam(url, param, value);
  expect(updatedUrl).toBe('https://example.com/page?param1=newValue');
});

// Test case 3: URL with hash fragment
test('Update query parameter in URL with hash fragment', () => {
  const url = 'https://example.com/page#section1';
  const param = 'param1';
  const value = 'updatedValue';
  const updatedUrl = updateQueryParam(url, param, value);
  expect(updatedUrl).toBe('https://example.com/page?param1=updatedValue#section1');
});


describe('getUrlParam', () => {
  // Test case 1: Single value parameter
  test('Single value parameter', () => {
    const url = 'https://example.com/?param1=value1&param2=value2';
    const param = 'param1';
    const result = getUrlParam(url, param);
    expect(result).toBe('value1');
  });

  // Test case 2: Single value parameter
  test('Multiple value parameter', () => {
    const url = 'https://example.com/?param1=value1&param2=value2#path?param1=value1&param2=val2val';
    const param = 'param1';
    const result = getUrlParam(url, param);
    expect(result).toEqual('value1');
  });

  // Test case 3: Return array option
  test('Return array option', () => {
    const url = 'https://example.com/?param1=value1&param1=value2';
    const param = 'param1';
    const options = { returnArray: true };
    const result = getUrlParam(url, param, options);
    expect(result).toEqual([ 'value1', 'value2' ]);
  });
  // Empty
  test('Return array option: Empty', () => {
    const url = 'https://example.com/?param1=value1&param2=value2';
    const param = 'value3';
    const options = { returnArray: true };
    const result = getUrlParam(url, param, options);
    expect(result).toEqual([]);
  });

  // Test case 4: Non-existing parameter
  test('Non-existing parameter', () => {
    const url = 'https://example.com/?param1=value1&param2=value2';
    const param = 'param3';
    const result = getUrlParam(url, param);
    expect(result).toBe(null);
  });

  // Get value when hash fragment is present
  test('Get value when hash fragment is present', () => {
    const url = 'https://example.com/?param1=value1&param2=value2#section1';
    const param = 'param2';
    const result = getUrlParam(url, param);
    expect(result).toBe('value2');
  });
});
