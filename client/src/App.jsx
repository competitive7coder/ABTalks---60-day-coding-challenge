import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { initialMockData, generateDays } from './mockData';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import ChallengeDay from './pages/ChallengeDay';
import './App.css';

function App() {
  const [mockUser, setMockUser] = useState(initialMockData.user);
  const [edgeCase, setEdgeCase] = useState('default');
  const [day12Completed, setDay12Completed] = useState(false);

  // Generate 60 days of task data based on current state
  const challengeDays = generateDays(
    mockUser.totalDaysCompleted,
    mockUser.missedDays,
    mockUser.currentStreak + 1,
    day12Completed
  );

  // Sync state modifications for edge cases
  useEffect(() => {
    if (edgeCase === 'newbie') {
      setDay12Completed(false);
    } else if (edgeCase === 'completed') {
      setDay12Completed(true);
    } else if (edgeCase === 'default') {
      setDay12Completed(false);
    } else if (edgeCase === 'missed') {
      setDay12Completed(false);
    }
  }, [edgeCase]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing setMockUser={setMockUser} />} />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              mockUser={mockUser}
              setMockUser={setMockUser}
              challengeDays={challengeDays}
              edgeCase={edgeCase}
              setEdgeCase={setEdgeCase}
            />
          }
        />
        <Route
          path="/day/:dayId"
          element={
            <ChallengeDay
              mockUser={mockUser}
              setMockUser={setMockUser}
              challengeDays={challengeDays}
              edgeCase={edgeCase}
              setEdgeCase={setEdgeCase}
              day12Completed={day12Completed}
              setDay12Completed={setDay12Completed}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
