import React from 'react'
import Main from './Main'

function MainContainer(props) {
  return (
    <>
      <Main
        isAuth={props.isAuth}
        logout={props.logout}
        deleteUser={props.deleteUser}
        tasks={props.tasks}
        tasksType={props.tasksType}
        switchTasksType={props.switchTasksType}
        addTask={props.addTask}
        updateTask={props.updateTask}
        deleteTask={props.deleteTask}
      />
    </>
  )
}

export default MainContainer
