/* eslint-disable no-undef */
// DOM

import { newLine } from '../lib/index.esm';

test(`newLine: Transfer 'a\nb\nc' to 'a<br />b<br />c'.`, () => {
  expect(newLine('a\nb\nc')).toBe('a<br />b<br />c');
});

test(`newLine: Transfer 'a\n\nbc' to 'a<br /><br />bc'.`, () => {
  expect(newLine('a\n\nbc')).toBe('a<br /><br />bc');
});
