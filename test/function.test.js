/* eslint-disable no-undef */
// Function

import { isNumber, camelCaseToKebabCase, camelCase2Underscore, mTrim } from '../lib/index.esm';

test('isNumber: Is -1 Number?', () => {
  expect(isNumber(-1)).toBe(true);
});

test(`camelCaseToKebabCase: Transfer 'aBC' to 'a-b-c'.`, () => {
  expect(camelCaseToKebabCase('aBC')).toBe('a-b-c');
});

test(`camelCase2Underscore: Transfer 'ABC' to 'a_b_c'.`, () => {
  expect(camelCase2Underscore('ABC')).toBe('a_b_c');
});

test(`mTrim: Transfer ' 1 2 3 ' to '1 2 3'.`, () => {
  expect(mTrim(' 1 2 3 ')).toBe('1 2 3');
});

test(`mTrim: Transfer 'abc ' to 'abc'.`, () => {
  expect(mTrim('abc ')).toBe('abc');
});
