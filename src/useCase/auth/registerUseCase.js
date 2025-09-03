import { axiosApi, routes } from '@/http/api'

const registerUser = async (userData) => {
  try {
    await axiosApi().post(routes.auth.register(), userData)
    return {
      success: true,
    }
  } catch (error) {
    const message = error.response?.data?.message || '註冊發生未知錯誤'
    const errorData = {}
    if (Array.isArray(message)) {
      for (const msg of message) {
        const msgString = String(msg)
        if (msgString.startsWith('password')) {
          errorData.password = msgString
        } else if (msgString.startsWith('nickname')) {
          errorData.nickname = msgString
        } else {
          errorData.email = msgString
        }
      }
    } else {
      errorData.email = message
    }
    return {
      success: false,
      errorData: errorData,
    }
  }
}

export { registerUser }
