import axios from 'axios'
import { API_CMD } from '@/constants/url'
import { useAuthStore } from '@/stores/auth'
import { API_URL } from '@/constants/url'

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

const handleApiError = (error) => {
  console.log('API 錯誤:', error)
  // todo: 顯示錯誤訊息給使用者
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
    handleApiError(error)
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
    handleApiError(error)
  }
}
const updateTodo = async (id, content) => {
  try {
    const resp = await getApi().put(`/todos/${id}`, {
      content: content,
    })
    if (!resp.data.status) {
      // todo: 處理server回覆錯誤
    }
  } catch (error) {
    handleApiError(error)
  }
}
const toggleTodo = async (id) => {
  try {
    const resp = await getApi().patch(`/todos/${id}/toggle`)
    if (!resp.data.status) {
      // todo: 處理server回覆錯誤
    }
  } catch (error) {
    handleApiError(error)
  }
}
const deleteTodo = async (id) => {
  try {
    const resp = await getApi().delete(`/todos/${id}`)
    if (!resp.data.status) {
      console.log('刪除失敗', resp.data)
      // todo: 處理server回覆錯誤
    }
  } catch (error) {
    handleApiError(error)
  }
}

export { getTodos, addTodo, updateTodo, toggleTodo, deleteTodo }
