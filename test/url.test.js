/**
 * @jest-environment node
 */
/* eslint-disable no-undef */
/* eslint-disable quotes */
// URL

import { isValidUrl, getUrlFileType } from '../lib/index.esm';

test('isValidUrl', () => {
  expect(isValidUrl('https://www.baidu.com')).toBe(true);
  expect(isValidUrl('https://baidu.com')).toBe(true);
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
  expect(getUrlFileType('https://example.com/a/b/c.v/a')).toBe('');
});

// The test results are as follows:
// PASS  test/url.test.js
//   ✓ isValidUrl (3 ms)
//   ✓ getUrlFileType (1 ms)

// Test Suites: 1 passed, 1 total
// Tests:       2 passed, 2 total
// Snapshots:   0 total
// Time:        1.647 s
// Ran all test suites.
