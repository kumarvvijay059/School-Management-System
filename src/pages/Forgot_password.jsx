import React, { useState } from 'react';
import { supabase } from '../client';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    let navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async () => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) {
        throw error;
      } else {
        setMessage('Password reset email has been sent. Please check your inbox.');
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>
      <button onClick={handleResetPassword}>Reset Password</button>
      <div>{message}</div>
    </div>
  );
};

export default ForgotPassword;
