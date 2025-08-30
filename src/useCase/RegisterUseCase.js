import axios from 'axios'
import { API_CMD } from '@/constants/api'

const registerUser = async (userData) => {
  try {
    const response = await axios.post(API_CMD.POST.signUp, userData)
    return response.data
  } catch (error) {
    const errorData = {}
    if (error.response) {
      for (const msg of error.response.data.message) {
        // errorData[key] = error.response.data.message[key].join(', ')
        // msg starts with "password"
        const msgString = String(msg)
        if (msgString.startsWith('password')) {
          errorData.password = msgString
        } else if (msgString.startsWith('email')) {
          errorData.email = msgString
        } else if (msgString.startsWith('nickname')) {
          errorData.nickname = msgString
        } else {
          errorData.unknown = msgString
        }
      }
    } else {
      errorData.unknown = '未知錯誤'
    }
    throw errorData
  }
}

export { registerUser }
