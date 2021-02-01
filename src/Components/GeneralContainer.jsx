import React, { useState, useEffect } from 'react'
import api, { instance } from '../Tools/api'
import General from './General'
import Preloader from './Utilites/Preloader/Preloader'
import { BrowserRouter as Router } from 'react-router-dom'

function GeneralContainer() {
  const [isAuth, setIsAuth] = useState(false)
  const [finalization, setFinalization] = useState(false)
  const [tasks, setTasks] = useState([])
  const [removed, setRemoved] = useState(false)
  const [updated, setUpdated] = useState(false)
  const [added, setAdded] = useState(false)
  const [tasksType, setTasksType] = useState('active')

  const updateInstanceToken = () => {
    instance.defaults.headers.common['Authorization'] = localStorage.getItem(
      'token',
    )
  }

  const updateToken = (token = localStorage.getItem('token')) => {
    token
      ? localStorage.setItem('token', token)
      : localStorage.removeItem('token')
    updateInstanceToken()
  }

  function register(data) {
    api.user.register(data).then((response) => {
      updateToken(response.data.token)
      setIsAuth(true)
    })
  }

  function login(data) {
    api.user.login(data).then((response) => {
      updateToken(response.data.token)
      getAllTasks().then((response) => {
        setTasks(response.data.data)
      })
      setIsAuth(true)
    })
  }

  function logout() {
    updateInstanceToken()
    return api.user.logout().then(() => {
      setTasks([])
      updateToken(null)
      setIsAuth(false)
    })
  }

  function deleteUser() {
    updateInstanceToken()
    return api.user.delete().then(() => {
      updateToken(null)
      setIsAuth(false)
    })
  }

  function addTask(data) {
    if (!added && data.description) {
      setAdded(true)
      return api.task
        .add(data)
        .then((response) => {
          setTasks([...tasks, response.data.data])
          setAdded(false)
        })
        .catch(() => {
          setAdded(false)
        })
    }
  }

  function updateTask(id) {
    if (!updated) {
      setUpdated(true)
      api.task
        .updateTask(id)
        .then(() => {
          setTasks(
            tasks.map((e) => (e._id === id ? { ...e, completed: true } : e)),
          )
          setUpdated(false)
        })
        .catch(() => {
          setUpdated(false)
        })
    }
  }

  function deleteTask(id) {
    if (!removed) {
      setRemoved(true)
      api.task
        .deleteTask(id)
        .then(() => {
          setTasks(tasks.filter((e) => e._id !== id))
          setRemoved(false)
        })
        .catch(() => setRemoved(false))
    }
  }

  function getAllTasks() {
    return api.task.getAll()
  }

  function switchTasksType(type) {
    if (tasksType !== type) {
      setTasksType(type)
    }
  }

  useEffect(() => {
    setFinalization(true)
    updateInstanceToken()
    api.user
      .me()
      .then(() => {
        setIsAuth(true)
        getAllTasks().then((response) => {
          setTasks(response.data.data)
          setFinalization(false)
        })
      })
      .catch(() => {
        setFinalization(false)
      })
  }, [])

  return (
    <Router>
      {finalization ? (
        <Preloader />
      ) : (
        <General
          login={login}
          register={register}
          logout={logout}
          deleteUser={deleteUser}
          isAuth={isAuth}
          tasks={tasks}
          tasksType={tasksType}
          switchTasksType={switchTasksType}
          addTask={addTask}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      )}
    </Router>
  )
}

export default GeneralContainer
