import React from 'react'
import useUsersContext from '../hooks/useUsersContext'

const User = ({ user }) => {
  const { deleteUser } = useUsersContext()

  return (
    <div>
      <h3>{user.id}</h3>
      <p>{user.username}</p>
      <button onClick={ () => {deleteUser(user.id)} }>Delete User</button>
    </div>
  )
}

export default User