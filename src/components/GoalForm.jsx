import { useState } from "react";

export default function GoalForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [due, setDue] = useState("");
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!title.trim() || !due) {
      setError("Enter a goal title and a due date.");
      return;
    }
    onAdd({ title: title.trim(), due });
    setTitle("");
    setDue("");
    setError("");
  }

  return (
    <form className="goal-form" onSubmit={submit}>
      <label>Goal title
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>Due date
        <input type="date" value={due} onChange={(e) => setDue(e.target.value)} />
      </label>
      <button type="submit">Add goal</button>
      {error && <p role="alert" className="error">{error}</p>}
    </form>
  );
}
