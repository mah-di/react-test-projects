import React, { useState } from 'react'

import NewTodo from './NewTodo'
import Todos from './Todos'
import useFetch from '../HOOKS/useFetch'
import style from '../css/Home.module.css'
import { TodoContext } from '../contexts/TodoContext'

const Home = () => {
    const [ updateIndex, setUpdateIndex ] = useState(null)
    const [ postTodo, setPostTodo ] = useState({id: null, title: '', description: ''})
    const { todos, isLoading, error, setTodos } = useFetch('http://localhost:3000/todos')

    const handlePostTodo = (todo, newTodo) => {
        newTodo ? handleNewTodo(todo) : handleUpdateTodo(todo)
    }

    const handleNewTodo = (todo) => {
        console.log(todo)
        const packet = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(todo)
        }

        fetch("http://localhost:3000/todos", {...packet})
            .then((res) => res.json())
            .then((data) => setTodos((prev) => [...prev, data]))
    }
        
    const handleUpdateTodo = (updatedTodo) => {
        const { id, ...todo } = updatedTodo
        const packet = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...todo})
        }

        fetch(`http://localhost:3000/todos/${id}`, {...packet})
            .then((res) => res.json())
            .then((data) => {
                setTodos((prev) => {
                    prev.splice(updateIndex, 0, data)
                    return [...prev]
                })
                setUpdateIndex(null)
            })
    }

    const handleDeleteTodo = (id) => {
        const packet = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }

        fetch(`http://localhost:3000/todos/${id}`, {...packet})
            .then((res) => res.json())
            .then(() => setTodos((prev) => prev.filter(todos => todos.id !== id)))
    }

    const handleEditTodo = (todo) => {
        const index = todos.indexOf(todo)
        setTodos((prev) => {
            prev.splice(index, 1)
            return prev
        })
        setUpdateIndex(index)
        setPostTodo(todo)
    }

    return (
        <div>
            <div>
                <NewTodo onNewTodo={handlePostTodo} postTodo={postTodo} setPostTodo={setPostTodo} />
            </div>
            <div>
                {isLoading && <p className={style['loading-message']}>Loading, please wait...</p>}
                {error && <p className={style['error-message']}>{error}</p>}
                {todos && 
                    <TodoContext.Provider value={{todos, onDeleteTodo: handleDeleteTodo, onEditTodo: handleEditTodo, editing: updateIndex}} >
                        <Todos />
                    </TodoContext.Provider>
                }
            </div>
        </div>
    )
}

export default Home
