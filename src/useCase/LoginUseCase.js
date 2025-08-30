import axios from 'axios'
import { API_CMD } from '@/constants/api'
import { authToken } from '@/constants/Cookie'

const loginUser = async (userData) => {
  try {
    console.log('userData', userData)
    const response = await axios.post(API_CMD.POST.signIn, userData)
    if (!response.data.token) {
      throw new Error('登入成功但是沒有取得 token')
    }
    document.cookie = `${authToken}=${response.data.token}; path=/`
    console.log('登入成功', response)
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
