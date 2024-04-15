/**
 * @jest-environment node
 */
/* eslint-disable no-undef */
import { genCustomConsole } from "../lib/index.esm";

describe("genCustomConsole", () => {
  let originalConsole;

  beforeEach(() => {
    originalConsole = { ...console };
  });

  afterEach(() => {
    global.console = { ...originalConsole };
  });

  it("creates a console that prefixes messages", () => {
    const mockLog = jest.spyOn(console, "log").mockImplementation(() => {});
    const myConsole = genCustomConsole("TestPrefix:");
    myConsole.log("Hello, world!");

    expect(mockLog).toHaveBeenCalledWith("TestPrefix:", "Hello, world!");
  });

  it("calls custom log function on log", () => {
    const customLogFn = jest.fn();
    const myConsole = genCustomConsole("TestPrefix:", { logFn: customLogFn });
    myConsole.log("Testing custom log function");

    expect(customLogFn).toHaveBeenCalled();
  });

  it("includes date in log when showDate is true", () => {
    const mockLog = jest.spyOn(console, "log").mockImplementation(() => {});
    const myConsole = genCustomConsole("TestPrefix:", { showDate: true });
    myConsole.log("Date test");

    expect(mockLog).toHaveBeenCalledWith(expect.stringContaining("TestPrefix:"), "Date test");
  });
});
