import React from 'react'
import useUsersContext from '../hooks/useUsersContext'

import User from './User'

const Users = () => {
  const { users } = useUsersContext()

  return (
    <div>
      {users.map((user) => <User key={ user.id } user={ user } />)}
    </div>
  )
}

export default Users