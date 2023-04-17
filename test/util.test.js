/**
 * @jest-environment node
 */
/* eslint-disable no-undef */
/* eslint-disable quotes */
// Util

import { isNumber, camelCaseToKebabCase, camelCase2Underscore, mTrim, deepCopyObject, isJsonString, generateRndNum, formatDate, isValidData, isValidEmail, convert10To26 } from '../lib/index.esm';

test('isNumber: Is -1 Number?', () => {
  expect(isNumber(-1)).toBe(true);
});

test(`camelCaseToKebabCase: Transfer 'aBC' to 'a-b-c'?`, () => {
  expect(camelCaseToKebabCase('aBC')).toBe('a-b-c');
});

test(`camelCase2Underscore: Transfer 'ABC' to 'a_b_c'?`, () => {
  expect(camelCase2Underscore('ABC')).toBe('a_b_c');
});

test(`mTrim: Transfer ' 1 2 3 ' to '1 2 3'?`, () => {
  expect(mTrim(' 1 2 3 ')).toBe('1 2 3');
});

test(`mTrim: Transfer 'abc ' to 'abc'?`, () => {
  expect(mTrim('abc ')).toBe('abc');
});

test(`deepCopyObject: Transfer 'abc' to 'abc'?`, () => {
  expect(deepCopyObject('abc')).toBe('abc');
});

test(`isJsonString: Is '['a', 'b', 'c']' a valid JSON string?`, () => {
  expect(isJsonString(`['a', 'b', 'c']`)).toBe(false);
});

test(`isJsonString: Is '["a", "b", "c"]' a valid JSON string?`, () => {
  expect(isJsonString(`["a", "b", "c"]`)).toBe(true);
});

test(`generateRndNum: Can it produce an empty string?`, () => {
  expect(generateRndNum(0)).toBe('');
});

test(`formatDate: String formatDate value?`, () => {
  expect(formatDate('Tue Jan 11 2022 14:12:26 GMT+0800 (China Standard Time)', 'yyyy-MM-dd hh:mm:ss').length).toBe(19);
});

test(`formatDate: Number formatDate value?`, () => {
  expect(formatDate(1641881235000, 'yyyy-MM-dd hh:mm:ss').length).toBe(19);
});

test(`isValidData: Check the valid value?`, () => {
  expect(isValidData({
    a: {
      b: {
        c: 413
      }
    }
  }, ['a', 'b', 'c'], 413)).toBe(true);
});

test(`isValidEmail: Check the valid email?`, () => {
  expect(isValidEmail('mazeyqian@gmail.com')).toBe(true);
  expect(isValidEmail('test-1-2-3@example.com')).toBe(true);
});

// Use Jest to test convert10To26 in a `test`
// console.log(convert10To26(1)); // a
// console.log(convert10To26(26)); // z
// console.log(convert10To26(27)); // aa
// console.log(convert10To26(52)); // az
// console.log(convert10To26(53)); // ba
test('convert10To26: Convert 1 to "a"?', () => {
  expect(convert10To26(1)).toBe('a');
  expect(convert10To26(26)).toBe('z');
  expect(convert10To26(27)).toBe('aa');
  expect(convert10To26(52)).toBe('az');
  expect(convert10To26(53)).toBe('ba');
});
