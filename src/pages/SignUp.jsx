import React from 'react'
import { useState } from 'react'
import { supabase } from '../client';
import { Link } from 'react-router-dom';
import './SignUp.css';
import image1 from '../assets/image1.png';

const SignUp = () => {

  const [formData, setFormData] = useState({
    fullName: '', email: '', password: ''
  })

  console.log(formData)

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      }
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const { data, error } = await supabase.auth.signUp(
        {
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
            }
          }
        }
      )

      if (error) throw error
      alert('Check your email for verification link')
      // insertAdmin()

    } catch (error) {
      alert(error)
    }

  }

  return (
    <div className='bg'>
      <img src={image1} alt="" className='bg-img' />
      <div className="signup-container">
        <h2 className="signup-title">SignUp</h2>
        <form onSubmit={handleSubmit}>
        <label htmlFor="fullname">Role</label>
          <input
            className="input-field"
            placeholder="Role"
            name="fullName"
            onChange={handleChange}
          />
          <label htmlFor="email">Email</label>
          <input
            className="input-field"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            className="input-field"
            placeholder="Password"
            type="password"
            name="password"
            onChange={handleChange}
          />
          <button className="submit-btn" type="submit">
            Submit
          </button>
        </form>
        <div className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  )
}

export default SignUp