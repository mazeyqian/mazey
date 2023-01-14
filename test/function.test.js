/* eslint-disable quotes */
/**
 * @jest-environment node
 */
/* eslint-disable no-undef */
// Function

import { isNumber, camelCaseToKebabCase, camelCase2Underscore, mTrim, deepCopyObject, isJsonString, generateRndNum, formatDate, isValidData } from '../lib/index.esm';

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
  expect(formatDate('Tue Jan 11 2022 14:12:26 GMT+0800 (China Standard Time)', 'yyyy-MM-dd hh:mm:ss')).toBe('2022-01-11 14:12:26');
});

test(`formatDate: Number formatDate value?`, () => {
  expect(formatDate(1641881235000, 'yyyy-MM-dd hh:mm:ss')).toBe('2022-01-11 14:07:15');
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
