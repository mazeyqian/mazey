/**
 * @jest-environment node
 */
/* eslint-disable no-undef */
import {
  longestComSubstring,
  longestComSubsequence,
  inRate,
} from "../lib/index.esm";

describe("longestComSubstring", () => {
  it("should return 3 for \"fish\" and \"finish\"", () => {
    expect(longestComSubstring("fish", "finish")).toEqual(3);
  });

  it("should return 0 for \"abc\" and \"def\"", () => {
    expect(longestComSubstring("abc", "def")).toEqual(0);
  });

  it("should return 1 for \"abc\" and \"bcd\"", () => {
    expect(longestComSubstring("abc", "bcd")).toEqual(2);
  });

  it("should return 2 for \"abc\" and \"ab\"", () => {
    expect(longestComSubstring("abc", "ab")).toEqual(2);
  });

  it("should return 1 for \"abc\" and \"bc\"", () => {
    expect(longestComSubstring("abc", "bc")).toEqual(2);
  });
});

describe("longestComSubsequence", () => {
  it("should return 4 for \"fish\" and \"finish\"", () => {
    expect(longestComSubsequence("fish", "finish")).toEqual(4);
  });

  it("should return 0 for \"abc\" and \"def\"", () => {
    expect(longestComSubsequence("abc", "def")).toEqual(0);
  });

  it("should return 2 for \"abc\" and \"bcd\"", () => {
    expect(longestComSubsequence("abc", "bcd")).toEqual(2);
  });

  it("should return 2 for \"abc\" and \"ab\"", () => {
    expect(longestComSubsequence("abc", "ab")).toEqual(2);
  });

  it("should return 2 for \"abc\" and \"bc\"", () => {
    expect(longestComSubsequence("abc", "bc")).toEqual(2);
  });
});

describe("inRate", () => {
  it("should hit at least 400 times out of 1000 tests with a probability of 0.5", () => {
    let trueCount = 0;
    for (let i = 0; i < 1000; i++) {
      if (inRate(0.5)) {
        trueCount++;
      }
    }
    expect(trueCount).toBeGreaterThan(400);
  });
});
