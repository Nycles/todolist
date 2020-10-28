import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api-nodejs-todolist.herokuapp.com/',
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
})

const api = {
  user: {
    register(data) {
      return instance.post('user/register', data)
    },
    login(data) {
      return instance.post('user/login', data)
    },
    logout() {
      return instance.post(
        'user/logout',
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      )
    },
    delete() {
      return instance.delete(
        'user/me',
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      )
    },
    me() {
      return instance.get(
        'user/me',
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      )
    },
  },

  task: {
    add(data) {
      return instance.post('task', data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
    },
    getAll() {
      return instance.get(
        'task',
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      )
    },
    getByCompleted(completed) {
      return instance.get(`task?completed=${completed}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
    },
    updateTask(id) {
      return instance.put(
        `task/${id}`,
        { completed: true },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      )
    },
    deleteTask(id) {
      return instance.delete(`task/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
    },
  },
}

export default api
