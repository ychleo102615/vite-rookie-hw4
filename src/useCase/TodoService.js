import { useAuthStore } from '@/stores/auth'
import { useTodoStore } from '@/stores/todos'
import { axiosApi, routes } from '@/http/api'

const handleApiError = (error) => {
  console.error('API 錯誤:', error)
}

const loadTodos = async () => {
  try {
    const resp = await axiosApi(useAuthStore().token).get(routes.todos.fetchTodos())
    if (resp.data.status) {
      // return resp.data.data
      useTodoStore().todos = resp.data.data
    } else {
      // todo: 處理server回覆錯誤
    }
  } catch (error) {
    handleApiError(error)
  }
}
const addTodo = async (content) => {
  try {
    const resp = await axiosApi(useAuthStore().token).post(routes.todos.createTodo(), {
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
const toggleTodoStatus = async (id) => {
  try {
    const resp = await axiosApi(useAuthStore().token).patch(routes.todos.toggle(id))
    if (!resp.data.status) {
      // todo: 處理server回覆錯誤
    }
  } catch (error) {
    handleApiError(error)
  }
}
const removeTodo = async (id) => {
  try {
    const resp = await axiosApi(useAuthStore().token).delete(routes.todos.deleteTodo(id))
    if (!resp.data.status) {
      console.error('刪除失敗', resp.data)
    }
  } catch (error) {
    handleApiError(error)
  }
}

export { loadTodos, addTodo, updateTodo, toggleTodoStatus, removeTodo }
