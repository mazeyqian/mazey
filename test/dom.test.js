/**
 * @jest-environment jsdom
 */
/* eslint-disable no-undef */
import { genStyleString, newLine, getDomain, getBrowserInfo, hasClass, addClass } from '../lib/index.esm';

test('newLine: Transfer \'a\nb\nc\' to \'a<br />b<br />c\'?', () => {
  expect(newLine('a\nb\nc')).toBe('a<br />b<br />c');
});

test('newLine: Transfer \'a\n\nbc\' to \'a<br /><br />bc\'?', () => {
  expect(newLine('a\n\nbc')).toBe('a<br /><br />bc');
});

test('Can get Domain\'s params correctly? \'https://i.mazey.net/mazey/lib/mazey.min.js\'?', async () => {
  const res = await getDomain('http://example.com/test/thanks?t1=1&t2=2&t3=3&t4=4', [ 'hostname', 'pathname' ]); // example.com/test/thanks
  expect(res).toBe('example.com/test/thanks');
});

// Simulate the async.
function wasteTime (ms) {
  return new Promise(resolve => setTimeout(() => {
    resolve(ms);
  }, ms));
}

test('Can run async test?', async () => {
  const res = await wasteTime(1000);
  expect(res).toBe(1000);
});

test('Can get browser info correctly?', () => {
  const res = getBrowserInfo();
  expect(res).toHaveProperty('engine');
  expect(res).toHaveProperty('engineVs');
  expect(res).toHaveProperty('platform');
  expect(res).toHaveProperty('supporter');
  expect(res).toHaveProperty('supporterVs');
  expect(res).toHaveProperty('system');
  expect(res).toHaveProperty('systemVs');
});

describe('genStyleString', () => {
  it('should generate the correct style string for a class selector and one style property', () => {
    const selector = '.a';
    const styleArray = [ 'color:red' ];
    const expected = '.a{color:red;}';
    const result = genStyleString(selector, styleArray);
    expect(result).toEqual(expected);
  });

  it('should generate the correct style string for an ID selector and multiple style properties', () => {
    const selector = '#b';
    const styleArray = [ 'color:red', 'font-size:12px' ];
    const expected = '#b{color:red;font-size:12px;}';
    const result = genStyleString(selector, styleArray);
    expect(result).toEqual(expected);
  });

  it('should return an empty string if no style properties are provided', () => {
    const selector = '.c';
    const styleArray = [];
    const expected = '.c{}';
    const result = genStyleString(selector, styleArray);
    expect(result).toEqual(expected);
  });

  it('should handle selectors with multiple classes', () => {
    const selector = '.d.e.f';
    const styleArray = [ 'color:blue', 'font-weight:bold' ];
    const expected = '.d.e.f{color:blue;font-weight:bold;}';
    const result = genStyleString(selector, styleArray);
    expect(result).toEqual(expected);
  });
});

// Test case 1: Object has the specified class
test('Object has the specified class', () => {
  const obj = document.createElement('div');
  obj.className = 'foo bar baz';
  const cls = 'bar';
  expect(hasClass(obj, cls)).toBe(true);
});

// Test case 2: Object does not have the specified class
test('Object does not have the specified class', () => {
  const obj = document.createElement('div');
  obj.className = 'foo baz';
  const cls = 'bar';
  expect(hasClass(obj, cls)).toBe(false);
});

// Test case 3: Object has multiple classes and one of them matches the specified class
test('Object has multiple classes and one of them matches the specified class', () => {
  const obj = document.createElement('div');
  obj.className = 'foo bar baz';
  const cls = 'baz';
  expect(hasClass(obj, cls)).toBe(true);
});

// Test case 4: Object has no classes
test('Object has no classes', () => {
  const obj = document.createElement('div');
  const cls = 'bar';
  expect(hasClass(obj, cls)).toBe(false);
});

describe('addClass', () => {
  it('should add a class to the element', () => {
    // Arrange
    const element = document.createElement('div');
    const className = 'test-class';

    // Act
    addClass(element, className);

    // Assert
    expect(element.className).toContain(className);
  });

  it('should not add duplicate classes', () => {
    // Arrange
    const element = document.createElement('div');
    const className = 'test-class';

    // Act
    addClass(element, className);
    addClass(element, className);

    // Assert
    expect(element.className.split(' ')).toEqual([className]);
  });

  it('should handle elements with existing classes', () => {
    // Arrange
    const element = document.createElement('div');
    element.className = 'existing-class';
    const className = 'test-class';

    // Act
    addClass(element, className);

    // Assert
    expect(element.className).toContain(className);
    expect(element.className).toContain('existing-class');
  });
});
