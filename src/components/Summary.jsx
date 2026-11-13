export default function Summary({ stats }) {
  return (
    <dl className="summary">
      <div><dt>Average progress</dt><dd data-testid="average">{stats.average}%</dd></div>
      <div><dt>Completed</dt><dd data-testid="completed">{stats.done}</dd></div>
      <div><dt>Overdue</dt><dd data-testid="overdue">{stats.overdue}</dd></div>
    </dl>
  );
}
