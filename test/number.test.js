/* eslint-disable no-undef */
// number

import { isNumber } from '../lib/index.esm';

test('Is -1 Number?', () => {
  expect(isNumber(-1)).toBe(true);
});
