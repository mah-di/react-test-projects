import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav>
        <NavLink className='nav-link' to='/' >Home</NavLink>
        <NavLink className='nav-link' to='/store-app' >Store App</NavLink>
        <NavLink className='nav-link' to='/todo-app' >Todo App</NavLink>
        <NavLink className='nav-link' to='/faq-app' >Faq App</NavLink>
        <NavLink className='nav-link' to='/users-app' >Users App</NavLink>
        <NavLink className='nav-link' to='/country-app' >Country App</NavLink>
    </nav>
  )
}

export default NavBar
