import React, { useContext } from 'react'
import { TodoContext } from '../contexts/TodoContext'

import style from '../css/Todo.module.css'

const Todo = (props) => {
    const { onEditTodo, onDeleteTodo, editing } = useContext(TodoContext)
    const { id, title, description } = props.todo

    return (
        <div className={style.item_wrapper}>
            <div className={style['content-wrapper']}>
                <h4>{title}</h4>
                <p>{description}</p>
            </div>
            <div className={style['btn-wrapper']}>
                <button onClick={() => onEditTodo(props.todo)} disabled={editing === null ? false : true}><i className="fa fa-pencil-square fa-2x" aria-hidden="true"></i></button>
                <button onClick={() => onDeleteTodo(id)} disabled={editing === null ? false : true}><i className='fa fa-trash fa-2x'></i></button>
            </div>
        </div>
    )
}

export default Todo
