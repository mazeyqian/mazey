/**
 * @jest-environment jsdom
 */
/* eslint-disable no-undef */
import { isSafePWAEnv, getBrowserInfo } from "../lib/index.esm";

describe("isSafePWAEnv", () => {
  it("should return true when all conditions are met", () => {
    // Mock the necessary browser features
    navigator.serviceWorker = {};
    window.fetch = jest.fn();
    window.indexedDB = {};
    window.caches = {};

    expect(isSafePWAEnv()).toBe(true);
  });
});

describe("getBrowserInfo", () => {
  it("should return the correct browser information", () => {
    const browserInfo = getBrowserInfo();

    // Test the system information
    expect(browserInfo.system).toBeDefined();
    expect(browserInfo.systemVs).toBeDefined();

    // Test the platform information
    expect(browserInfo.platform).toBeDefined();

    // Test the engine and supporter information
    expect(browserInfo.engine).toBeDefined();
    expect(browserInfo.engineVs).toBeDefined();
    expect(browserInfo.supporter).toBeDefined();
    expect(browserInfo.supporterVs).toBeDefined();

    // Test the shell information
    expect(browserInfo.shell).toBeDefined();
    expect(browserInfo.shellVs).toBeDefined();
  });
});
