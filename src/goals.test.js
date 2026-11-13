import { statusOf, summarize, addDays } from "./goals.js";

const goal = (progress, due) => ({ id: 1, title: "g", progress, due });

describe("statusOf", () => {
  it("is done at 100% even when past due", () => {
    expect(statusOf(goal(100, addDays(-5)))).toBe("done");
  });
  it("is overdue when past due and incomplete", () => {
    expect(statusOf(goal(50, addDays(-1)))).toBe("overdue");
  });
  it("is active when due in the future", () => {
    expect(statusOf(goal(0, addDays(7)))).toBe("active");
  });
});

describe("summarize", () => {
  it("returns zeros for an empty list", () => {
    expect(summarize([])).toEqual({ total: 0, done: 0, overdue: 0, average: 0 });
  });
  it("counts statuses and averages progress", () => {
    const stats = summarize([goal(100, addDays(1)), goal(20, addDays(-2)), goal(30, addDays(4))]);
    expect(stats).toEqual({ total: 3, done: 1, overdue: 1, average: 50 });
  });
});
