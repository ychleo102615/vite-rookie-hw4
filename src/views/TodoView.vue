<script setup>
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { loadTodos, addTodo, updateTodo, toggleTodoStatus, removeTodo } from '@/useCase/todoService'
import { logOut } from '@/useCase/auth/logOutUseCase'
import { useAuthStore } from '@/stores/auth'
import { useTodoStore } from '@/stores/todos'
import { useRouter } from 'vue-router'

const router = useRouter()

const todoStore = useTodoStore()
const { todos } = storeToRefs(todoStore)

onMounted(async () => {
  if (!useAuthStore().token) {
    router.push({ name: 'home' })
  }
  await loadTodos()
})

const listName = computed(() => {
  const auth = useAuthStore()
  return (auth.nickname || auth.email) + '的代辦'
})

const STATUS = {
  ALL: 'all',
  UNFINISHED: 'unfinished',
  FINISHED: 'finished',
}
const curStatus = ref(STATUS.ALL)

const newTask = ref('')

const visibleTasks = computed(() => {
  switch (curStatus.value) {
    case STATUS.UNFINISHED:
      return todos.value.filter((item) => !item.status)
    case STATUS.FINISHED:
      return todos.value.filter((item) => item.status)
    default:
      return todos.value
  }
})

const removeTask = (id) => {
  todos.value = todos.value.filter((item) => item.id !== id)
  removeTodo(id)
}
const onTaskStatusChange = (id) => {
  // const task = datas.value.find((item) => item.id === id)
  // 時間點晚於v-model
  toggleTodoStatus(id)
}
const addTask = async () => {
  if (newTask.value.trim()) {
    const newTodo = {
      id: Date.now().toString(),
      content: newTask.value,
      status: false,
    }
    todos.value.push(newTodo)
    newTask.value = ''
    const validateTodo = await addTodo(newTodo.content)
    if (!validateTodo) {
      // todo: show some error message to user
      return
    }
    const clientTodoIdx = todos.value.findIndex((item) => item.id === newTodo.id)
    todos.value.splice(clientTodoIdx, 1, validateTodo)
    // todo: 檢查為什麼手動新增和獲取todos時的格式不一樣（proxy）
  }
}

const tryLogOut = () => {
  logOut()
  router.push({ name: 'home' })
}
</script>

<template>
  <div id="todoListPage" class="bg-half">
    <nav>
      <h1><a href="#">ONLINE TODO LIST</a></h1>
      <ul>
        <li class="todo_sm">
          <span>{{ listName }}</span>
        </li>
        <li><a href="#" @click.prevent="tryLogOut">登出</a></li>
      </ul>
    </nav>
    <div class="conatiner todoListPage vhContainer">
      <div class="todoList_Content">
        <div class="inputBox">
          <input
            type="text"
            placeholder="請輸入待辦事項"
            v-model="newTask"
            @keyup.enter="addTask"
          />
          <button @click.prevent="addTask">
            <i class="fa fa-plus"></i>
          </button>
        </div>
        <div class="todoList_list" v-if="todos.length">
          <ul class="todoList_tab">
            <li>
              <a @click="curStatus = STATUS.ALL" :class="{ active: curStatus === STATUS.ALL }"
                >全部</a
              >
            </li>
            <li>
              <a
                @click="curStatus = STATUS.UNFINISHED"
                :class="{ active: curStatus === STATUS.UNFINISHED }"
                >待完成</a
              >
            </li>
            <li>
              <a
                @click="curStatus = STATUS.FINISHED"
                :class="{ active: curStatus === STATUS.FINISHED }"
                >已完成</a
              >
            </li>
          </ul>
          <div class="todoList_items">
            <ul class="todoList_item">
              <li v-for="item in visibleTasks" :key="item.id">
                <label class="todoList_label">
                  <input
                    class="todoList_input"
                    type="checkbox"
                    v-model="item.status"
                    @change="onTaskStatusChange(item.id)"
                  />
                  <span>{{ item.content }}</span>
                  <button @click="removeTask(item.id)" class="todoList_close">
                    <i class="fa fa-times"></i>
                  </button>
                </label>
              </li>
            </ul>
            <div class="todoList_statistics" v-if="curStatus === STATUS.ALL">
              <p>{{ todos.filter((item) => !item.status).length }} 個待完成項目</p>
            </div>
          </div>
        </div>
        <div v-else class="todoList_empty">
          <div class="todoList_empty_content">
            <h2>目前沒有待辦事項</h2>
            <img src="@/assets/empty.png" alt="edit_empty_bg" draggable="false" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.todo-view {
  padding: 20px;
}
</style>
