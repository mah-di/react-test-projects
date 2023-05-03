import { useContext } from 'react'
import { UsersContext } from '../contexts/UsersContext'

const useUsersContext = () => {
    return useContext(UsersContext)
}

export default useUsersContext