import { Button, Grid, TextField } from '@material-ui/core'
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
                <form onSubmit={handleSubmit} autoComplete="off">
                  <Field
                    name="description"
                    maxLength={5}
                    render={({ input, meta }) => (
                      <TextField
                        {...input}
                        onKeyPress={(e) => {
                          if (e.key === 13) {
                            e.preventDefault()
                          }
                        }}
                        variant="standard"
                        label="Todo"
                        autoFocus={true}
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
                props.tasksType === 'active'
                  ? { borderRadius: 0, background: '#2e2e2e', color: '#fff' }
                  : { borderRadius: 0 }
              }
              onClick={() => props.switchTasksType('active')}
              variant="contained"
              size="small"
            >
              active
            </Button>
            <Button
              style={
                props.tasksType === 'completed'
                  ? { borderRadius: 0, background: '#2e2e2e', color: '#fff' }
                  : { borderRadius: 0 }
              }
              onClick={() => props.switchTasksType('completed')}
              variant="contained"
              size="small"
            >
              completed
            </Button>
            <Button
              style={
                props.tasksType === 'all'
                  ? { borderRadius: 0, background: '#2e2e2e', color: '#fff' }
                  : { borderRadius: 0 }
              }
              onClick={() => props.switchTasksType('all')}
              variant="contained"
              size="small"
            >
              all
            </Button>
          </div>
          <div className="todo-wrapper">
            <Grid container direction="row" spacing={3}>
              {props.tasks.map((task) => {
                switch (props.tasksType) {
                  case 'active':
                    if (!task.completed) {
                      return (
                        <Grid key={task._id} item xs={12}>
                          <Todo
                            id={task._id}
                            completed={task.completed}
                            description={task.description}
                            updateTask={props.updateTask}
                            deleteTask={props.deleteTask}
                          />
                        </Grid>
                      )
                    } else return null

                  case 'completed':
                    if (task.completed) {
                      return (
                        <Grid key={task._id} item xs={12}>
                          <Todo
                            id={task._id}
                            completed={task.completed}
                            description={task.description}
                            updateTask={props.updateTask}
                            deleteTask={props.deleteTask}
                          />
                        </Grid>
                      )
                    } else return null

                  default:
                    return (
                      <Grid key={task._id} item xs={12}>
                        <Todo
                          id={task._id}
                          completed={task.completed}
                          description={task.description}
                          updateTask={props.updateTask}
                          deleteTask={props.deleteTask}
                        />
                      </Grid>
                    )
                }
              })}
            </Grid>
          </div>
        </div>
      </div>
    </>
  )
}

export default TodoList
