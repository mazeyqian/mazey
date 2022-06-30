/* eslint-disable no-undef */
// number

import { isNumber, camelCaseToKebabCase, camelCase2Underscore } from '../lib/index.esm';

test('Is -1 Number?', () => {
  expect(isNumber(-1)).toBe(true);
});

test(`Transfer 'aBC' to 'a-b-c'.`, () => {
  expect(camelCaseToKebabCase('aBC')).toBe('a-b-c');
});

test(`Transfer 'ABC' to 'a_b_c'.`, () => {
  expect(camelCase2Underscore('ABC')).toBe('a_b_c');
});
