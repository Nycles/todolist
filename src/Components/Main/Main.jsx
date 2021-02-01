import React from 'react'
import './Main.css'
import Header from './Header/Header'
import TodoList from './TodoList/TodoList'

function Main(props) {
  return (
    <div className={'main'}>
      <Header
        isAuth={props.isAuth}
        logout={props.logout}
        deleteUser={props.deleteUser}
      />
      <TodoList
        tasks={props.tasks}
        tasksType={props.tasksType}
        switchTasksType={props.switchTasksType}
        addTask={props.addTask}
        updateTask={props.updateTask}
        deleteTask={props.deleteTask}
      />
    </div>
  )
}

export default Main
