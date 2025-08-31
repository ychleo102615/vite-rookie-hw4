<script setup>
import { ref, computed, watch } from 'vue'
const datas = ref([
  {
    id: '1',
    createTime: 1620281234,
    content: '把冰箱發霉的檸檬拿去丟',
    status: false,
  },
  {
    id: '2',
    createTime: 1620281234,
    content: '打電話叫媽媽匯款給我',
    status: false,
  },
  {
    id: '3',
    createTime: 1620281234,
    content: '整理電腦資料夾',
    status: false,
  },
  {
    id: '4',
    createTime: 1620281234,
    content: '繳電費水費瓦斯費',
    status: false,
  },
  {
    id: '5',
    createTime: 1620281234,
    content: '約vicky禮拜三泡溫泉',
    status: false,
  },
  {
    id: '6',
    createTime: 1620281234,
    content: '約ada禮拜四吃晚餐',
    status: false,
  },
])

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
      return datas.value.filter((item) => !item.status)
    case STATUS.FINISHED:
      return datas.value.filter((item) => item.status)
    default:
      return datas.value
  }
})

const removeTask = (id) => {
  datas.value = datas.value.filter((item) => item.id !== id)
}
const onTaskStatusChange = (id) => {
  const task = datas.value.find((item) => item.id === id)
  // 時間點晚於v-model
}
const addTask = () => {
  if (newTask.value.trim()) {
    datas.value.push({
      id: Date.now().toString(),
      createTime: Date.now(),
      content: newTask.value,
      status: false,
    })
    newTask.value = ''
  }
}
</script>

<template>
  <div id="todoListPage" class="bg-half">
    <nav>
      <h1><a href="#">ONLINE TODO LIST</a></h1>
      <ul>
        <li class="todo_sm">
          <a href="#"><span>王小明的代辦</span></a>
        </li>
        <li><a href="#loginPage">登出</a></li>
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
        <div class="todoList_list" v-if="datas.length">
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
            <div class="todoList_statistics">
              <p>{{ datas.filter((item) => item.status).length }} 個已完成項目</p>
            </div>
          </div>
        </div>
        <div v-else class="todoList_empty">
          <div class="todoList_empty_content">
            <h2>目前沒有待辦事項</h2>
            <img src="@/assets/empty.png" alt="" />
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
