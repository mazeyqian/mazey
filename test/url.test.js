/**
 * @jest-environment node
 */
/* eslint-disable no-undef */
/* eslint-disable quotes */
// URL

import { isValidUrl } from '../lib/index.esm';

test('isValidUrl', () => {
  expect(isValidUrl('https://www.baidu.com')).toBe(true);
  expect(isValidUrl('https://baidu.com')).toBe(true);
});
