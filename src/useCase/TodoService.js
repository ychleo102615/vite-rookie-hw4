import axios from 'axios'
import { API_CMD } from '@/constants/api'
import { useAuthStore } from '@/stores/auth'
import { API_URL } from '@/constants/api'

const getApi = () => {
  const api = axios.create({
    baseURL: API_URL, // 你的 API 基底路徑
  })
  return api
}

const getTodos = () => {
  return axios.get(API_CMD.GET.getTodos)
}
const addTodo = async (content) => {
  try {
    if (!useAuthStore().token) {
      throw new Error('未登入')
    }
    const resp = await getApi().post('/todos', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${useAuthStore().token}`,
      },
      data: {
        content,
      },
    })
    console.log('addTodo resp:', resp)
  } catch (error) {
    console.log('addTodo error:', error)
  }
}
const updateTodo = (id, content) => {
  return axios.put(API_CMD.PUT.updateTodo(id), { content })
}
const toggleTodo = (id) => {
  return axios.patch(API_CMD.PATCH.toggleTodo(id))
}
const deleteTodo = (id) => {
  return axios.delete(API_CMD.DELETE.delete(id))
}

export { getTodos, addTodo, updateTodo, toggleTodo, deleteTodo }
