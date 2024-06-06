import React from 'react';
import { useState } from 'react';
import { supabase } from '../client';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import image1 from '../assets/image1_.png';

const Login = ({ setToken }) => {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    role: '',
    email: '',
    password: ''
  });

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });
      if (error) throw error;
      setToken(data);
      if (formData.role == 'Admin') 
      {
        navigate('/homepage');
      }
      if (formData.role == 'Teacher') 
      {
        navigate('/home_teacher');
      }
      if (formData.role == 'Student') 
      {
        navigate('/home_student');
      }
      
    } catch (error) {
      alert(error);
    }
  }

  
  function handleForgotPassword() {
    // alert('Forgot Password clicked!');
    navigate('/forgot_password');
  }

  return (
    <div className='bg'>
      <img src={image1} alt="" className='bg-img' />
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="role">Role</label>
          <input id="role" placeholder="Role" name="role" onChange={handleChange} />
          <label htmlFor="email">Email</label>
          <input id="email" placeholder="Email" name="email" onChange={handleChange} />
          <label htmlFor="password">Password</label>
          <input id="password" placeholder="Password" type="password" name="password" onChange={handleChange} />
          <button type="submit">Submit</button>
        </form>
        <div className="forgot-password-link">
          <button onClick={handleForgotPassword}>Forgot Password?</button>
        </div>
        <div className="signup-link">
          Don't have an account? <Link to="/signup">SignUp</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;




