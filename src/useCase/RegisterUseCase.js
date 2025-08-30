import axios from 'axios'
import { API_CMD } from '@/constants/api'

const registerUser = async (userData) => {
  try {
    await axios.post(API_CMD.POST.signUp, userData)
    return {
      success: true,
    }
  } catch (error) {
    console.log(error)
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
