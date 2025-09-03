import { axiosApi, routes } from '@/http/api'
import { useAuthStore } from '@/stores/auth'

const authTokenCheck = async () => {
  const authStore = useAuthStore()
  const token = authStore.token
  if (!token) {
    return false
  }
  try {
    const response = await axiosApi(token).get(routes.auth.authToken())
    authStore.nickname = response.data.nickname
    return response.data.status
  } catch (error) {
    console.error('Auth token check failed:', error)
    return false
  }
}

export { authTokenCheck }
