import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import CreatePoll from './CreatePoll';
import PollList from './PollList';
import PollDetail from './PollDetail';
import AuthPage from './AuthPage';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <nav>
        {token ? (
          <>
            <Link to="/">Polls</Link> | <Link to="/create">Create Poll</Link> |{' '}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <span>Poller App</span>
        )}
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            token ? <PollList token={token} /> : <AuthPage setToken={setToken} />
          }
        />
        <Route
          path="/create"
          element={
            token ? <CreatePoll token={token} /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/polls/:id"
          element={
            token ? <PollDetail token={token} /> : <Navigate to="/" replace />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
