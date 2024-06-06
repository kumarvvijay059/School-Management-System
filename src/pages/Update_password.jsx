import React, { useState } from 'react';
import { supabase } from '../client';

const UpdatePassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleUpdatePassword = async () => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        email: email,
        password: password
      });
      if (error) {
        throw error;
      } else {
        setMessage('Password updated successfully.');
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <h2>Update Password</h2>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label>New Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter new password"
        />
      </div>
      <button onClick={handleUpdatePassword}>Update Password</button>
      <div>{message}</div>
    </div>
  );
};

export default UpdatePassword;
