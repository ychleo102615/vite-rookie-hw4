const API_URL = 'https://todolist-api.hexschool.io'
const API_CMD = {
  POST: {
    signUp: `${API_URL}/users/sign_up`,
    /*
    data: {
      email: string,
      password: string,
      nickname: string
    }
     */
    signIn: `${API_URL}/users/sign_in`,
    /*
    data: {
      email: string,
      password: string,
    }
     */
    signOut: `${API_URL}/users/sign_out`,
  },
  GET: {
    checkOut: `${API_URL}/users/checkout`,
  },
}
export { API_CMD }
