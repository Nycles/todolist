import React from 'react'
import './Todo.css'
import { IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'

function Todo(props) {
  return (
    <>
      <div className="todo-item-wrapper">
        <IconButton
          className="todo-item-update"
          onClick={() => props.updateTask(props.id)}
        >
          <CheckCircleIcon />
        </IconButton>

        <div className="todo-item-description-wrapper">
          <span
            className={`todo-item-description ${
              props.completed ? 'completed' : null
            } `}
          >
            {props.description}
          </span>
        </div>
        <IconButton
          className="todo-item-delete"
          onClick={() => props.deleteTask(props.id)}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </>
  )
}

export default Todo
