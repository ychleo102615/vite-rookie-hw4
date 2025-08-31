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
    },
  },
  persist: {
    key: 'my-auth',
    paths: ['token', 'email', 'nickname'],
  },
})
