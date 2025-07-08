import React, { useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import './App.css';

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState('');
  const token = searchParams.get('token');

  const handleReset = async () => {
    try {
      const res = await axios.post('http://localhost:5000/reset-password', {
        token,
        newPassword,
      });
      alert(res.data);
    } catch (err) {
      alert(err?.response?.data || 'Failed to reset password');
    }
  };

  return (
    <div className="container">
      <h2>Reset Your Password</h2>
      <input
        type="password"
        placeholder="Enter new password"
        value={newPassword}
        onChange={e => setNewPassword(e.target.value)}
      />
      <button onClick={handleReset}>Update Password</button>
    </div>
  );
}

export default ResetPassword;
