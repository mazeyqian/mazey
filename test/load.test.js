/**
 * @jest-environment jsdom
 */
/* eslint-disable no-undef */
import { windowLoaded } from "../lib/index.esm";

describe("windowLoaded", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("resolves with \"complete\" if document is already loaded", async () => {
    Object.defineProperty(document, "readyState", {
      get: () => "complete",
    });

    await expect(windowLoaded()).resolves.toBe("complete");
  });
});
