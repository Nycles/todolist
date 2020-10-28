import { AppBar, Button, Grid, Tab, Tabs, TextField } from '@material-ui/core'
import React from 'react'
import { Field, Form } from 'react-final-form'
import Todo from './Todo/Todo'
import './TodoList.css'

function TodoList(props) {
  function onSubmit(data) {
    return props.addTask(data).then(() => {
      data.description = ''
    })
  }

  return (
    <>
      <div className="main-wrapper">
        <div className="todo-list-wrapper">
          <div className="todo-list-input-wrapper">
            <Form
              onSubmit={onSubmit}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <Field
                    name="description"
                    render={({ input, meta }) => (
                      <TextField
                        {...input}
                        onKeyPress={(e) => {
                          if (e.key === 13) {
                            e.preventDefault()
                          }
                        }}
                        label="Todo"
                        fullWidth
                        inputProps={{ 'aria-label': 'Hello world' }}
                      />
                    )}
                  />
                </form>
              )}
            />
          </div>
          <div className="todo-list-switch-wrapper">
            <Button
              style={
                props.tasksType === 'active' ? { background: 'gray' } : null
              }
              onClick={() => props.switchTasksType('active')}
              variant={'contained'}
              color={'default'}
              size={'small'}
            >
              active
            </Button>
            <Button
              style={
                props.tasksType === 'completed' ? { background: 'gray' } : null
              }
              onClick={() => props.switchTasksType('completed')}
              variant={'contained'}
              color={'default'}
              size={'small'}
            >
              completed
            </Button>
            <Button
              style={props.tasksType === 'all' ? { background: 'gray' } : null}
              onClick={() => props.switchTasksType('all')}
              variant={'contained'}
              color={'default'}
              size={'small'}
            >
              all
            </Button>
          </div>
          <div className="todo-wrapper">
            <Grid container direction="row" spacing={3}>
              {props.tasks.map((task) => (
                <Grid key={task._id} item xs={12}>
                  <Todo
                    id={task._id}
                    completed={task.completed}
                    description={task.description}
                    updateTask={props.updateTask}
                    deleteTask={props.deleteTask}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </div>
    </>
  )
}

export default TodoList
