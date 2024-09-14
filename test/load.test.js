/**
 * @jest-environment jsdom
 */
/* eslint-disable no-undef */
import { windowLoaded, loadScriptIfUndefined } from "../lib/index.esm";

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

describe("loadScriptIfUndefined", () => {
  // Salva o estado original do objeto window para restaurá-lo depois
  // const originalWindow = { ...window };

  // Mocking a specific property on the window object before each test
  beforeEach(() => {
    Object.defineProperty(window, "testScript", {
      writable: true,
      value: {}, // Mocking the attribute as already defined
    });
  });

  // Cleaning up after each test
  afterEach(() => {
    delete window.testScript;
  });

  it("should resolve with \"defined\" if window attribute is already defined", async () => {
    // Configuração
    const attributeName = "testScript";
    window[attributeName] = {}; // Simula o atributo como já definido

    // Execução
    const resultPromise = loadScriptIfUndefined(attributeName, "http://example.com/script.js");
    
    // Assertiva
    await expect(resultPromise).resolves.toEqual("defined");
  });
});
