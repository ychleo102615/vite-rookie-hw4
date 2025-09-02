import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todos', {
  state: () => ({
    todos: [],
  }),
  actions: {},
  persist: {
    key: 'todos',
  },
})
