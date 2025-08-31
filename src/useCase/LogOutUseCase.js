import axios from 'axios'
import { API_CMD } from '@/constants/api'
import { useAuthStore } from '@/stores/auth'
import { API_URL } from '@/constants/api'

const getApi = () => {
  const api = axios.create({
    baseURL: API_URL, // 你的 API 基底路徑
  })
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

const logOut = async () => {
  const api = getApi()
  try {
    await api.post(API_CMD.POST.signOut)
    useAuthStore().clearToken()
  } catch (error) {
    console.error('Logout failed:', error)
  }
}

export { logOut }
