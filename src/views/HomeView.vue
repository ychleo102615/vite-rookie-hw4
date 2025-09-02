<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { authTokenCheck } from '@/useCase/auth/authTokenUseCase'

const router = useRouter()

onMounted(async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  if (useAuthStore().token !== null) {
    const isValid = await authTokenCheck()
    if (isValid) {
      router.push({ name: 'todo' })
    } else {
      useAuthStore().$reset()
      router.push({ name: 'auth' })
    }
  } else {
    useAuthStore().$reset()
    router.push({ name: 'auth' })
  }
})
</script>

<template>
  <main>
    <h1 style="font-size: larger">歡迎使用待辦清單</h1>
  </main>
</template>
