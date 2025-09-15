import React, { useState } from 'react';

function AuthPage({ setToken }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setErr('');
    setSuccess('');
    const url = isLogin
      ? 'http://localhost:8000/api/users/login'
      : 'http://localhost:8000/api/users/register';
    const body = { username, password };
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (res.ok) {
        if (isLogin) {
          setToken(data.token);
          localStorage.setItem('token', data.token);
        } else {
          setSuccess('Registration successful! You can now log in.');
          setIsLogin(true);
        }
      } else {
        setErr(data.message || 'Error');
      }
    } catch {
      setErr('Network error');
    }
  };

  return (
    <div>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      {err && <div style={{ color: 'red' }}>{err}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
      <form onSubmit={handleSubmit}>
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
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <button onClick={() => { setIsLogin(!isLogin); setErr(''); setSuccess(''); }}>
        {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
      </button>
    </div>
  );
}

export default AuthPage;
