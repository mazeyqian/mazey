/**
 * @jest-environment jsdom
 */
/* eslint-disable no-undef */
import {
  setSessionStorage,
  // getSessionStorage,
} from '../lib/index.esm';

describe('setSessionStorage', () => {
  it('should set sessionStorage correctly: string', () => {
    setSessionStorage('test', 'test');
    expect(sessionStorage.getItem('test')).toBe('"test"');
  });

  it('should set sessionStorage correctly: object', () => {
    setSessionStorage('test', { a: 1 });
    expect(sessionStorage.getItem('test')).toBe('{"a":1}');
  });

  it('should set sessionStorage correctly: array', () => {
    setSessionStorage('test', [ 1, 2, 3 ]);
    expect(sessionStorage.getItem('test')).toBe('[1,2,3]');
  });
});
