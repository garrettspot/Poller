import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setErr('');
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        setErr(data.message || 'Login failed');
      }
    } catch {
      setErr('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {err && <div style={{ color: 'red' }}>{err}</div>}
      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
