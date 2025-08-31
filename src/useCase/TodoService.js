import axios from 'axios'
import { API_CMD } from '@/constants/api'
import { useAuthStore } from '@/stores/auth'
import { API_URL } from '@/constants/api'

const getApi = () => {
  const api = axios.create({
    baseURL: API_URL, // 你的 API 基底路徑
  })
  if (!useAuthStore().token) {
    throw new Error('未登入')
  }
  api.interceptors.request.use((config) => {
    const auth = useAuthStore()
    if (auth.token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `${auth.token}`
    }
    return config
  })
  return api
}

const getTodos = async () => {
  // return axios.get(API_CMD.GET.getTodos)
  try {
    const resp = await getApi().get('/todos')
    console.log(resp.data)
    if (resp.data.status) {
      return resp.data.data
    } else {
      console.log('getTodos: resp.status false')
      return []
    }
  } catch (error) {
    console.log('getTodos error:', error)
    return []
  }
}
const addTodo = async (content) => {
  try {
    const resp = await getApi().post('/todos', {
      content: content,
    })
    if (resp.data.status) {
      return resp.data.newTodo
    } else {
      // todo: 處理server回覆錯誤
    }
  } catch (error) {
    // todo: 處理api錯誤
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
