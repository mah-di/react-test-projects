import React, { useState } from 'react'
import useUsersContext from '../hooks/useUsersContext'

const NewUser = () => {
  const { addUser } = useUsersContext()
  const [ username, setUsername ] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {id: new Date().getTime().toString(), username: username}
    addUser(newUser)
    setUsername('')
  }
  
  const handleChange = (e) => {
    const username = e.target.value;
    setUsername(username)
  }

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <input value={username} onChange={ handleChange } />
        <button type='submit'>Add User</button>
      </form>
    </div>
  )
}

export default NewUser