import { formatCreatedAt } from "../formatCreatedAt";

describe("formatCreatedAt", () => {
  const today = Date.now();
  const msInDay = 1000 * 60 * 60 * 24;

  test("returns correct result for today", () => {
    expect(formatCreatedAt(today)).toBe("opened today");
  });

  test("returns correct result for one day ago", () => {
    const oneDayAgo = today - msInDay;

    expect(formatCreatedAt(oneDayAgo)).toBe("opened 1 day ago");
  });

  test("returns correct result for two days ago", () => {
    const oneDayAgo = today - 2 * msInDay;

    expect(formatCreatedAt(oneDayAgo)).toBe("opened 2 days ago");
  });

  test("returns correct result for ten days ago", () => {
    const oneDayAgo = today - 10 * msInDay;

    expect(formatCreatedAt(oneDayAgo)).toBe("opened 10 days ago");
  });
});
