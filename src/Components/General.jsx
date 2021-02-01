import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import SignInContainer from './SignIn/SignInContainer'
import SignUpContainer from './SignUp/SignUpContainer'
import MainContainer from './Main/MainContainer'

function General(props) {
  return (
    <>
      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            props.isAuth ? (
              <MainContainer
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
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          path={'/login'}
          render={() =>
            props.isAuth ? (
              <Redirect to={'/'} />
            ) : (
              <SignInContainer login={props.login} />
            )
          }
        />
        <Route
          path={'/register'}
          render={() =>
            props.isAuth ? (
              <Redirect to={'/'} />
            ) : (
              <SignUpContainer register={props.register} />
            )
          }
        />
      </Switch>
    </>
  )
}

export default General
