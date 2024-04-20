import { validateUrl } from "../validateUrl";

describe("validateUrl", () => {
  test("returns true for valid url", () => {
    const url = "https://github.com/facebook/react";
    expect(validateUrl(url)).toBeTruthy();
  });

  test("returns true for valid url with additional slash at the end", () => {
    const url = "https://github.com/facebook/react/";
    expect(validateUrl(url)).toBeTruthy();
  });

  test("returns false for valid url with two additional slashes at the end", () => {
    const url = "https://github.com/facebook/react//";
    expect(validateUrl(url)).toBeFalsy();
  });

  test("returns false for url with extra nesting level", () => {
    const url = "https://github.com/facebook/react/issues";
    expect(validateUrl(url)).toBeFalsy();
  });

  test("returns false for invalid github link", () => {
    const url = "https://githubbb.com/facebook/react/";
    expect(validateUrl(url)).toBeFalsy();
  });
});
