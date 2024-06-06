import React from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  let navigate = useNavigate();

  function login() {
    navigate('/login')
  }

  return (
    <div className='nav'>
      <div className='nav-logo'>
        BRO-thers
      </div>
      <ul className='nav-menu'>
        <li>Home</li>
        <li>Explore</li>
        <li>About</li>
        <li onClick={login} className='nav-contact'>Login</li>
      </ul>
    </div>
  )
}

export default Navbar