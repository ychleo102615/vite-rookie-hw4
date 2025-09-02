import { useAuthStore } from '@/stores/auth'
import { axiosApi, routes } from '@/http/api'

const loginUser = async (userData) => {
  try {
    const response = await axiosApi().post(routes.auth.login(), userData)
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

    const auth = useAuthStore()
    auth.token = response.data.token
    auth.email = userData.email
    auth.nickname = userData.nickname
    console.log(auth, '寫入token')
    console.log('檢查', useAuthStore().token)

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
