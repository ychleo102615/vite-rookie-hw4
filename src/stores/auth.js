import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    email: null,
    nickname: null,
  }),
  actions: {},
  persist: {
    key: 'my-auth',
    paths: ['token', 'email', 'nickname'],
  },
})
