import React, { createContext, useReducer } from "react";
import { initialState, UsersReducer } from "../reducers/UsersReducer";

export const UsersContext = createContext({})

export const UsersProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(UsersReducer, initialState)

    const value = {
        users: state.users,
        addUser: (newUser) => {
            dispatch({type: 'ADD_USER', payload: newUser})
        },
        deleteUser: (id) => {
            dispatch({type: 'DELETE_USER', payload: id})
        }
    }

    return (
        <UsersContext.Provider value={ value } >
            { children }
        </UsersContext.Provider>
    )
}