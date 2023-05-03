export const initialState = {
    users: [
        {id: 1, username: 'Iqbal'},
        {id: 2, username: 'Laqbal'}
    ]
}

export const UsersReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_USER':
            return {...state, users: [...state.users, action.payload]}

        case 'DELETE_USER':
            const filteredUsers = state.users.filter(user => user.id !== action.payload)
            return {...state, users: filteredUsers}

        default:
            return state
    }
}