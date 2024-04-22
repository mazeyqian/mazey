/**
 * @jest-environment jsdom
 */
/* eslint-disable no-undef */
import { cancelBubble, getDefineListeners } from "../lib/index.esm";

describe("cancelBubble", () => {
  it("should call stopPropagation if available", () => {
    const eventMock = {
      stopPropagation: jest.fn(),
      cancelBubble: false,
    };

    cancelBubble(eventMock);

    expect(eventMock.stopPropagation).toHaveBeenCalled();
    expect(eventMock.cancelBubble).toBe(false);
  });

  it("should set cancelBubble to true if stopPropagation is not available", () => {
    const eventMock = {
      stopPropagation: undefined,
      cancelBubble: false,
    };

    cancelBubble(eventMock);

    expect(eventMock.cancelBubble).toBe(true);
  });
});

describe("getDefineListeners", () => {
  beforeEach(() => {
    // Reset the global variable before each test
    window.MAZEY_DEFINE_LISTENERS = undefined;
  });

  it("should return an empty object if defineListeners is not defined", () => {
    const defineListeners = getDefineListeners();
    expect(defineListeners).toEqual({});
  });

  it("should return the existing defineListeners object if it is defined", () => {
    const existingListeners = { event1: () => {}, event2: () => {} };
    window.MAZEY_DEFINE_LISTENERS = existingListeners;

    const defineListeners = getDefineListeners();
    expect(defineListeners).toBe(existingListeners);
  });

  it("should create a new defineListeners object if it is not an object", () => {
    window.MAZEY_DEFINE_LISTENERS = "not an object";

    const defineListeners = getDefineListeners();
    expect(defineListeners).toEqual({});
  });
});
