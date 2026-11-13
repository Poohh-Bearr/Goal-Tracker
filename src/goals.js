// Pure helpers, kept free of React so they are easy to unit test.
export const today = () => new Date().toISOString().slice(0, 10);

export function addDays(n, from = new Date()) {
  const d = new Date(from);
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

export function statusOf(goal, now = today()) {
  if (goal.progress >= 100) return "done";
  if (goal.due < now) return "overdue";
  return "active";
}

export function summarize(goals, now = today()) {
  const count = (s) => goals.filter((g) => statusOf(g, now) === s).length;
  const average = goals.length
    ? Math.round(goals.reduce((sum, g) => sum + g.progress, 0) / goals.length)
    : 0;
  return { total: goals.length, done: count("done"), overdue: count("overdue"), average };
}
