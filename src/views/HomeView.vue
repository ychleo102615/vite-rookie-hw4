<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  // 這裡可以放置需要在組件掛載時執行的邏輯
  if (useAuthStore().token !== null) {
    router.push({ name: 'todo' })
  } else {
    router.push({ name: 'auth' })
  }
})
</script>

<template>
  <main>
    <h1 style="font-size: larger">歡迎使用待辦清單</h1>
  </main>
</template>
