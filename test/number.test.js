/* eslint-disable no-undef */
// number

import { isNumber } from '../src/index';

test('Is -1 Number?', () => {
  expect(isNumber(-1)).toBe(true);
});
