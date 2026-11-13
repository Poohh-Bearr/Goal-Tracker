import { useState } from "react";
import GoalForm from "./components/GoalForm.jsx";
import GoalCard from "./components/GoalCard.jsx";
import Summary from "./components/Summary.jsx";
import { addDays, statusOf, summarize } from "./goals.js";
import "./App.css";

const seed = [
  { id: 1, title: "Ship the reports page", due: addDays(10), progress: 40 },
  { id: 2, title: "Review Q3 feedback with the team", due: addDays(-3), progress: 10 },
  { id: 3, title: "Complete accessibility training", due: addDays(20), progress: 70 },
];
const FILTERS = [["all", "All"], ["active", "On track"], ["overdue", "Overdue"], ["done", "Completed"]];

export default function App() {
  const [goals, setGoals] = useState(seed);
  const [filter, setFilter] = useState("all");

  const visible = goals.filter((g) => filter === "all" || statusOf(g) === filter);
  const add = ({ title, due }) =>
    setGoals((gs) => [...gs, { id: Date.now(), title, due, progress: 0 }]);
  const setProgress = (id, progress) =>
    setGoals((gs) => gs.map((g) => (g.id === id ? { ...g, progress } : g)));
  const remove = (id) => setGoals((gs) => gs.filter((g) => g.id !== id));

  return (
    <main className="app">
      <h1>Team goals</h1>
      <Summary stats={summarize(goals)} />
      <GoalForm onAdd={add} />
      <div className="filters" role="group" aria-label="Filter goals">
        {FILTERS.map(([key, label]) => (
          <button key={key} type="button" aria-pressed={filter === key} onClick={() => setFilter(key)}>
            {label}
          </button>
        ))}
      </div>
      {visible.length ? (
        <ul className="goal-list">
          {visible.map((g) => (
            <GoalCard key={g.id} goal={g} onProgress={setProgress} onDelete={remove} />
          ))}
        </ul>
      ) : (
        <p className="empty">No goals here yet. Add one above.</p>
      )}
    </main>
  );
}
