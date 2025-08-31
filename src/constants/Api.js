import { getTodos, updateTodo } from '@/useCase/TodoService'

const API_URL = 'https://todolist-api.hexschool.io'
const API_CMD = {
  POST: {
    signUp: `${API_URL}/users/sign_up`,
    /*
    data: {
      email: string,
      password: string,
      nickname: string
    }
     */
    signIn: `${API_URL}/users/sign_in`,
    /*
    data: {
      email: string,
      password: string,
    }
     */
    signOut: `/users/sign_out`,
    addTodo: `${API_URL}/todos`,
  },
  GET: {
    checkOut: `${API_URL}/users/checkout`,
    getTodos: `${API_URL}/todos`,
  },
  PUT: {
    updateTodo: (id) => `${API_URL}/todos/${id}`,
  },
  PATCH: {
    toggleTodo: (id) => `${API_URL}/todos/${id}/toggle`,
  },
  DELETE: {
    delete: (id) => `${API_URL}/todos/${id}`,
  },
}
export { API_CMD, API_URL }
