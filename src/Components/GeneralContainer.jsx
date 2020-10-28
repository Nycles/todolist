import React, { useState, useEffect } from 'react'
import api from '../Tools/api'
import General from './General'
import Preloader from './Utilites/Preloader/Preloader'

function GeneralContainer() {
  const [isAuth, setIsAuth] = useState(false)
  const [finalization, setFinalization] = useState(false)
  const [tasks, setTasks] = useState([])
  const [removed, setRemoved] = useState(false)
  const [updated, setUpdated] = useState(false)
  const [added, setAdded] = useState(false)
  const [switched, setSwitched] = useState(false)
  const [tasksType, setTasksType] = useState('active')

  function register(data) {
    api.user.register(data).then((response) => {
      localStorage.setItem('token', response.data.token)
      setIsAuth(true)
    })
  }

  function login(data) {
    api.user.login(data).then((response) => {
      localStorage.setItem('token', response.data.token)
      setIsAuth(true)
    })
  }

  function logout() {
    return api.user.logout().then(() => {
      localStorage.setItem('token', undefined)
      setIsAuth(false)
    })
  }

  function deleteUser() {
    return api.user.delete().then(() => {
      localStorage.setItem('token', undefined)
      setIsAuth(false)
    })
  }

  function addTask(data) {
    if (!added && data.description) {
      setAdded(true)
      return api.task
        .add(data)
        .then((response) => {
          if (tasksType !== 'completed') {
            setTasks([...tasks, response.data.data])
          }
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
            tasks.map((e) => (e._id === id ? { ...e, completed: true } : e))
          )
          setTimeout(() => {
            setTasks(tasks.filter((e) => e._id !== id))
          }, 1000)
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

  function getTasksByCompleted(completed) {
    return api.task.getByCompleted(completed)
  }

  function switchTasksType(type) {
    if (!switched && tasksType !== type) {
      setSwitched(true)
      switch (type) {
        case 'active':
          getTasksByCompleted(false)
            .then((response) => {
              setTasks(response.data.data)
              setTasksType(type)
              setSwitched(false)
            })
            .catch(() => setSwitched(false))
          break
        case 'completed':
          getTasksByCompleted(true)
            .then((response) => {
              setTasks(response.data.data)
              setTasksType(type)
              setSwitched(false)
            })
            .catch(() => setSwitched(false))
          break
        case 'all':
          getAllTasks()
            .then((response) => {
              setTasks(response.data.data)
              setTasksType(type)
              setSwitched(false)
            })
            .catch(() => setSwitched(false))
          break
        default:
          setSwitched(false)
      }
    }
  }

  useEffect(() => {
    setFinalization(true)
    api.user
      .me()
      .then(() => {
        setIsAuth(true)
        getTasksByCompleted(false).then((response) => {
          setTasks(response.data.data)
          setFinalization(false)
        })
      })
      .catch(() => {
        setFinalization(false)
      })
  }, [])

  return (
    <>
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
    </>
  )
}

export default GeneralContainer
