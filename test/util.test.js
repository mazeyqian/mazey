/**
 * @jest-environment node
 */
/* eslint-disable no-undef */
/* eslint-disable quotes */
import {
  isNumber,
  camelCaseToKebabCase,
  camelCase2Underscore,
  mTrim,
  deepCopyObject,
  isJsonString,
  generateRndNum,
  formatDate,
  isValidData,
  isValidEmail,
  isValidPhoneNumber,
  convert10To26,
  getFriendlyInterval,
  unsanitize,
  waitTime,
} from '../lib/index.esm';

test('isNumber: Is -1/123/Infinity/NaN Number?', () => {
  expect(isNumber(-1)).toBe(true);
  expect(isNumber(123)).toBe(true);
  expect(isNumber('123')).toBe(false);
  expect(isNumber(Infinity)).toBe(false);
  expect(isNumber(Infinity, { isInfinityAsNumber: true })).toBe(true);
  expect(isNumber(NaN)).toBe(false);
  expect(isNumber(NaN, { isNaNAsNumber: true, isInfinityAsNumber: true })).toBe(true);
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
  expect(formatDate('Tue Jan 11 2022 14:12:26 GMT+0800 (China Standard Time)', 'yyyy-MM-dd hh:mm:ss').length).toBe(19);
});

test(`formatDate: Number formatDate value?`, () => {
  expect(formatDate(1641881235000, 'yyyy-MM-dd hh:mm:ss').length).toBe(19);
});

test(`isValidData: Check the valid value?`, () => {
  expect(isValidData({
    a: {
      b: {
        c: 413,
      },
    },
  }, [ 'a', 'b', 'c' ], 413)).toBe(true);
});

test(`isValidEmail: Check the valid email?`, () => {
  expect(isValidEmail('mazeyqian@gmail.com')).toBe(true);
  expect(isValidEmail('test-1-2-3@example.com')).toBe(true);
});

// Use Jest to test convert10To26 in a `test`
test('convert10To26: Convert 1 to "a"?', () => {
  expect(convert10To26(1)).toBe('a');
  expect(convert10To26(26)).toBe('z');
  expect(convert10To26(27)).toBe('aa');
  expect(convert10To26(52)).toBe('az');
  expect(convert10To26(53)).toBe('ba');
});

// Use Jest to test getFriendlyInterval in a `test`
test('getFriendlyInterval: Get 1116 days?', () => {
  expect(getFriendlyInterval(new Date('2020-03-28 00:09:27'), new Date('2023-04-18 10:54:00'), { type: 'd' })).toBe(1116);
  expect(getFriendlyInterval(1585325367000, 1681786440000, { type: 'text' })).toBe('1116 天 10 时 44 分 33 秒');
  expect(getFriendlyInterval('2020-03-28 00:09:27', '2023-04-18 10:54:00', { type: 'text' })).toBe('1116 天 10 时 44 分 33 秒');
});

describe('unsanitize', () => {
  it('should unsanitize HTML entities', () => {
    const input = '&lt;div&gt;Hello, &quot;world&quot;!&lt;/div&gt;';
    const expectedOutput = '<div>Hello, "world"!</div>';
    expect(unsanitize(input)).toEqual(expectedOutput);
  });

  it('should unsanitize special characters', () => {
    const input = '&#x27;Hello, &lt;world&gt;!&#x27;';
    const expectedOutput = '\'Hello, <world>!\'';
    expect(unsanitize(input)).toEqual(expectedOutput);
  });

  it('should return the input string if it does not contain any HTML entities or special characters', () => {
    const input = 'Hello, world!';
    expect(unsanitize(input)).toEqual(input);
  });

  it('should throw an error if the input is not a string', () => {
    const input = 123;
    expect(() => unsanitize(input)).toThrow('Input must be a string');
  });
});

describe('waitTime', () => {
  test('resolves after the specified time has elapsed', async () => {
    const start = Date.now();
    await waitTime(1000);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(1000);
  });
});

describe("isValidPhoneNumber", () => {
  it("should return true for valid phone numbers", () => {
    expect(isValidPhoneNumber("13800138000")).toBe(true);
    expect(isValidPhoneNumber("15012345678")).toBe(true);
    expect(isValidPhoneNumber("19912345678")).toBe(true);
    expect(isValidPhoneNumber("17612345678")).toBe(true);
    expect(isValidPhoneNumber("14712345678")).toBe(true);
    expect(isValidPhoneNumber("11012345678")).toBe(true);
    expect(isValidPhoneNumber("12012345678")).toBe(true);
    expect(isValidPhoneNumber("16912345678")).toBe(true);
    expect(isValidPhoneNumber("10912345678")).toBe(true);
    expect(isValidPhoneNumber("18012345678")).toBe(true);
  });

  it("should return false for invalid phone numbers", () => {
    expect(isValidPhoneNumber("1380013800")).toBe(false);
    expect(isValidPhoneNumber("138001380000")).toBe(false);
    expect(isValidPhoneNumber("1380013800a")).toBe(false);
    expect(isValidPhoneNumber("02345678901")).toBe(false);
    expect(isValidPhoneNumber("00000000000")).toBe(false);
  });
});
