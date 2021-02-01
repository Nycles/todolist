import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://api-nodejs-todolist.herokuapp.com/',
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
      return instance.post('user/logout')
    },
    delete() {
      return instance.delete('user/me')
    },
    me() {
      return instance.get('user/me')
    },
  },

  task: {
    add(data) {
      return instance.post('task', data)
    },
    getAll() {
      return instance.get('task')
    },
    getByCompleted(completed) {
      return instance.get(`task?completed=${completed}`)
    },
    updateTask(id) {
      return instance.put(`task/${id}`, { completed: true })
    },
    deleteTask(id) {
      return instance.delete(`task/${id}`)
    },
  },
}

export default api
