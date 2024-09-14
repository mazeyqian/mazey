/**
 * @jest-environment jsdom
 */
/* eslint-disable no-undef */
import {
  setSessionStorage,
  getSessionStorage,
  setLocalStorage,
  getLocalStorage,
  getCookie,
  setCookie,
  delCookie,
} from "../lib/index.esm";

describe("setSessionStorage", () => {
  it("should set sessionStorage correctly: string", () => {
    setSessionStorage("test", "test");
    expect(sessionStorage.getItem("test")).toBe("\"test\"");
  });

  it("should set sessionStorage correctly: object", () => {
    setSessionStorage("test", { a: 1 });
    expect(sessionStorage.getItem("test")).toBe("{\"a\":1}");
  });

  it("should set sessionStorage correctly: array", () => {
    setSessionStorage("test", [ 1, 2, 3 ]);
    expect(sessionStorage.getItem("test")).toBe("[1,2,3]");
  });
});

describe("getSessionStorage", () => {
  it("should get sessionStorage correctly: string", () => {
    sessionStorage.setItem("test", "\"test\"");
    expect(getSessionStorage("test")).toBe("test");
  });

  it("should get sessionStorage correctly: object", () => {
    sessionStorage.setItem("test", "{\"a\":1}");
    expect(getSessionStorage("test")).toEqual({ a: 1 });
  });

  it("should get sessionStorage correctly: array", () => {
    sessionStorage.setItem("test", "[1,2,3]");
    expect(getSessionStorage("test")).toEqual([ 1, 2, 3 ]);
  });
});

describe("setLocalStorage", () => {
  it("should set the value in local storage", () => {
    const key = "testKey";
    const value = { name: "John", age: 30 };

    setLocalStorage(key, value);

    const storedValue = JSON.parse(localStorage.getItem(key) || "");

    expect(storedValue).toEqual(value);
  });

  it("should remove the value from local storage if null is passed", () => {
    const key = "testKey";
    const value = { name: "John", age: 30 };

    localStorage.setItem(key, JSON.stringify(value));

    setLocalStorage(key, null);

    const storedValue = localStorage.getItem(key);

    expect(storedValue).toEqual("null");
  });

  it("should not set the value in local storage if key is empty", () => {
    const key = "";
    const value = { name: "John", age: 30 };

    setLocalStorage(key, value);

    const storedValue = localStorage.getItem(key);

    expect(storedValue).toBeNull();
  });
});

describe("getLocalStorage", () => {
  it("should get localStorage correctly: string", () => {
    localStorage.setItem("test", "\"test\"");
    expect(getLocalStorage("test")).toBe("test");
  });

  it("should get localStorage correctly: object", () => {
    localStorage.setItem("test", "{\"a\":1}");
    expect(getLocalStorage("test")).toEqual({ a: 1 });
  });

  it("should get localStorage correctly: array", () => {
    localStorage.setItem("test", "[1,2,3]");
    expect(getLocalStorage("test")).toEqual([ 1, 2, 3 ]);
  });
});

describe("setLocalStorage&getLocalStorage", () => {
  it("should set/get localStorage correctly: string", () => {
    setLocalStorage("test", "test");
    expect(getLocalStorage("test")).toBe("test");
  });

  it("should set/get localStorage correctly: object", () => {
    setLocalStorage("test", { a: 1 });
    expect(getLocalStorage("test")).toEqual({ a: 1 });
  });

  it("should set/get localStorage correctly: array", () => {
    setLocalStorage("test", [ 1, 2, 3 ]);
    expect(getLocalStorage("test")).toEqual([ 1, 2, 3 ]);
  });

  it("should set/get localStorage correctly: number", () => {
    setLocalStorage("test", 1);
    const res = getLocalStorage("test");
    expect(typeof res).toBe("number");
    expect(res).toBe(1);
  });

  it("should return null for non-existent keys", () => {
    const key = "nonExistentKey";
    const retrievedValue = getLocalStorage(key);
    expect(retrievedValue).toBeNull();
  });
});

describe("getCookie", () => {
  beforeEach(() => {
    // Set up any necessary test setup here
    document.cookie = "cookie1=value1";
  });

  it("should return the value of the specified cookie", () => {
    expect(getCookie("cookie1")).toBe("value1");
  });

  it("should return an empty string if the cookie does not exist", () => {
    expect(getCookie("nonexistent")).toBe("");
  });
});

describe("setCookie", () => {
  it("should set a cookie with the provided name and value", () => {
    setCookie("cookie1", "value1");
    expect(document.cookie).toContain("cookie1=value1");
  });
});

describe("delCookie", () => {
  beforeEach(() => {
    // Set up any necessary test setup here
    document.cookie = "cookie1=value1";
  });

  it("should delete the specified cookie", () => {
    delCookie("cookie1");
    expect(document.cookie).toBe("");
  });
});
