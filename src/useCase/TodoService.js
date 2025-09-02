import { useAuthStore } from '@/stores/auth'
import { axiosApi, routes } from '@/http/api'

const handleApiError = (error) => {
  console.log('API 錯誤:', error)
  // todo: 顯示錯誤訊息給使用者
}

const getTodos = async () => {
  try {
    const resp = await axiosApi(useAuthStore().token).get(routes.todos.todoList())
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
    const resp = await axiosApi(useAuthStore().token).post(routes.todos.newTodo(), {
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
    const resp = await axiosApi(useAuthStore().token).put(routes.todos.editContent(id), {
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
    const resp = await axiosApi(useAuthStore().token).patch(routes.todos.toggle(id))
    if (!resp.data.status) {
      // todo: 處理server回覆錯誤
    }
  } catch (error) {
    handleApiError(error)
  }
}
const deleteTodo = async (id) => {
  try {
    const resp = await axiosApi(useAuthStore().token).delete(routes.todos.removeTodo(id))
    if (!resp.data.status) {
      console.log('刪除失敗', resp.data)
      // todo: 處理server回覆錯誤
    }
  } catch (error) {
    handleApiError(error)
  }
}

export { getTodos, addTodo, updateTodo, toggleTodo, deleteTodo }
