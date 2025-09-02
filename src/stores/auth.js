import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    email: null,
    nickname: null,
  }),
  actions: {
    clear() {
      this.token = null
      this.email = null
      this.nickname = null
      console.log('清除 auth store')
    },
  },
  persist: {
    key: 'my-auth',
    paths: ['token', 'email', 'nickname'],
  },
})
