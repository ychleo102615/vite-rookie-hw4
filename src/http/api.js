import { API_URL } from '@/constants/url'
import axios from 'axios'

const axiosApi = (token) => {
  const api = axios.create({
    baseURL: API_URL, // 你的 API 基底路徑
  })
  api.interceptors.request.use((config) => {
    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `${token}`
    }
    return config
  })
  return api
}

const routes = {
  todos: {
    fetchTodos: () => `/todos/`,
    createTodo: () => `/todos`,
    editContent: (id) => `/todos/${id}`,
    deleteTodo: (id) => `/todos/${id}`,
    toggle: (id) => `/todos/${id}/toggle`,
  },
  auth: {
    login: () => `users/sign_in`,
    logout: () => `users/sign_out`,
    register: () => `/users/sign_up`,
    authToken: () => `users/checkout`,
  },
}

export { axiosApi, routes }
