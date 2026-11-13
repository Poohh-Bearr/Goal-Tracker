# Goal Tracker

A small React app for setting goals, updating progress, and filtering by status (on track, overdue, completed). Built with React, Vite, and Vitest + React Testing Library. GitHub Actions runs the tests and build on every push.

```bash
npm install
npm run dev     # start the app
npm test        # unit + component tests
npm run build   # production build
```

Structure: `src/goals.js` holds pure logic (unit tested). `src/components/` holds `GoalForm`, `GoalCard`, and `Summary`. `src/App.jsx` composes them and owns the state.
