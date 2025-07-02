import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/login', { username, password });
      alert(res?.data || 'Login successful');
    } catch (err) {
      alert(err?.response?.data || 'Login failed');
    }
  };

  const handleResetPassword = async () => {
    const email = prompt('Enter your email to reset password:');
    if (!email) return;

    try {
      const res = await axios.post('http://localhost:5000/reset-password-request', { email });
      alert(res?.data || 'Reset link sent to your email');
    } catch (err) {
      alert(err?.response?.data || 'Failed to send reset link');
    }
  };

  return (
    <div className="container">
      <h2>AssetTracker</h2>
      <p>Login with your username and password</p>

      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Sign in</button>

      <button onClick={handleResetPassword} style={{ marginTop: '15px', background: '#f59e0b' }}>
        Reset Password
      </button>
    </div>
  );
}

export default App;
