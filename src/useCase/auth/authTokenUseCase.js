import { getApi, routes } from '@/http/api'
import { useAuthStore } from '@/stores/auth'

const authTokenCheck = async () => {
  const authStore = useAuthStore()
  const token = authStore.token
  if (!token) {
    return false
  }
  try {
    const response = await getApi(token).get(routes.auth.authToken())
    return response.data.success
  } catch (error) {
    console.error('Auth token check failed:', error)
    return false
  }
}

export { authTokenCheck }
