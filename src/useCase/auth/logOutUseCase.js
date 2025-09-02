import { useAuthStore } from '@/stores/auth'
import { axiosApi, routes } from '@/http/api'

const logOut = async () => {
  try {
    await axiosApi(useAuthStore().token).post(routes.auth.logout())
    useAuthStore().clear()
  } catch (error) {
    console.error('Logout failed:', error)
  }
}

export { logOut }
