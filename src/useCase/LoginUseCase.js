import axios from 'axios'
import { API_CMD } from '@/constants/api'
import { authToken } from '@/constants/Cookie'
import { useAuthStore } from '@/stores/auth'

const loginUser = async (userData) => {
  try {
    console.log('userData', userData)
    const response = await axios.post(API_CMD.POST.signIn, userData)
    if (!response.data.token) {
      return {
        success: false,
        error: '登入成功但是沒有取得 token',
      }
    }
    if (!response.data.status) {
      return {
        success: false,
        error: '登入失敗',
      }
    }
    console.log('登入成功', response)

    document.cookie = `${authToken}=${response.data.token}; path=/`
    const auth = useAuthStore()
    auth.setToken(response.data.token)
    return {
      success: true,
    }
  } catch (error) {
    console.log(error)
    return {
      success: false,
      error: error.response?.data?.message || '登入發生未知錯誤',
    }
  }
}

export { loginUser }
