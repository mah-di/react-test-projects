import React from 'react'
import { v4 as uuidv4 } from 'uuid'

import style from '../css/NewTodo.module.css'

const NewTodo = (props) => {
    const postTodo = props.postTodo
    const setPostTodo = props.setPostTodo
    const { id, title, description } = props.postTodo

    const handleSubmit = (e) => {
        e.preventDefault()
        if (postTodo.title === '') {
            alert('Please enter a title.')
        } else {
            id === null ? props.onNewTodo({...postTodo, id: uuidv4()}, true) : props.onNewTodo({...postTodo}, false)
            setPostTodo({id: null, title: '', description: ''})
        }
    }

    const handleChange = (e) => {
        setPostTodo((prev) => {
            const name = e.target.name
            return {...prev, [name]: e.target.value}
        })
    }

    return (
        <div>
            <form className={style.form} onSubmit={handleSubmit}>
                <div>
                    <label >Title:</label>
                    <input type="text" name="title" value={title} onChange={handleChange} />
                </div>
                <div>
                    <label >Description: </label>
                    <textarea type="text" name="description" value={description} onChange={handleChange} />
                </div>
                <div>
                    <button type='submit'>{ id === null ? "Add New" : "Update" }</button>
                </div>
            </form>
        </div>
    )
}

export default NewTodo
