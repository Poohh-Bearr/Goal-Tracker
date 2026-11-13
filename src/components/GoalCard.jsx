import { statusOf } from "../goals.js";

const LABEL = { active: "On track", overdue: "Overdue", done: "Completed" };

export default function GoalCard({ goal, onProgress, onDelete }) {
  const status = statusOf(goal);
  return (
    <li className={`goal ${status}`}>
      <div className="goal-head">
        <h3>{goal.title}</h3>
        <span className="badge">{LABEL[status]}</span>
      </div>
      <p className="due">Due {goal.due}</p>
      <div className="goal-controls">
        <input
          type="range" min="0" max="100" step="5"
          value={goal.progress}
          aria-label={`Progress for ${goal.title}`}
          onChange={(e) => onProgress(goal.id, Number(e.target.value))}
        />
        <output>{goal.progress}%</output>
        <button type="button" className="link" onClick={() => onDelete(goal.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}
