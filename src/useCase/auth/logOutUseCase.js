import { useAuthStore } from '@/stores/auth'
import { useTodoStore } from '@/stores/todos'
import { axiosApi, routes } from '@/http/api'

const logOut = async () => {
  try {
    await axiosApi(useAuthStore().token).post(routes.auth.logout())
    useAuthStore().$reset()
    useTodoStore().$reset()
  } catch (error) {
    console.error('Logout failed:', error)
  }
}

export { logOut }
