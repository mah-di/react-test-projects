import React from 'react'

import Users from './components/Users'
import NewUser from './components/NewUser'
import { UsersProvider } from './contexts/UsersContext'

const App = () => {
  return (
    <UsersProvider>
      <NewUser />
      <Users />
    </UsersProvider>
  )
}

export default App