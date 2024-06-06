import React from 'react'
import './Navbar1.css'

const Navbar1 = () => {
  return (
    <div className='nav'>
      <div className='nav-logo'>
        BRO-thers
      </div>
      <ul className='nav-menu'>
        <li>Home</li>
        <li>Add Admin</li>
        <li>Add Student</li>
        <li>Add Teacher</li>
        <li>Add Courses</li>
      </ul>
    </div>
  )
}

export default Navbar1