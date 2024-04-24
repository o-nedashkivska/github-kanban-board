import { parseUrl } from "../parseUrl";

describe("parseUrl", () => {
  const url = "https://github.com/facebook/react";
  const owner = "facebook";
  const repo = "react";

  test("returns true correct owner and repo", () => {
    const result = parseUrl(url);

    expect(result.owner).toBe(owner);
    expect(result.repo).toBe(repo);
  });

  test("returns true correct owner and repo for  url with additional slash at the end", () => {
    const result = parseUrl(url + "/");

    expect(result.owner).toBe(owner);
    expect(result.repo).toBe(repo);
  });
});
