/**
 * @jest-environment jsdom
 */
/* eslint-disable no-undef */
import {
  setSessionStorage,
  getSessionStorage,
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

describe('getSessionStorage', () => {
  it('should get sessionStorage correctly: string', () => {
    sessionStorage.setItem('test', '"test"');
    expect(getSessionStorage('test')).toBe('test');
  });

  it('should get sessionStorage correctly: object', () => {
    sessionStorage.setItem('test', '{"a":1}');
    expect(getSessionStorage('test')).toEqual({ a: 1 });
  });

  it('should get sessionStorage correctly: array', () => {
    sessionStorage.setItem('test', '[1,2,3]');
    expect(getSessionStorage('test')).toEqual([ 1, 2, 3 ]);
  });
});
