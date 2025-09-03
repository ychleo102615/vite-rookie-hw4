<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { authTokenCheck } from '@/useCase/auth/authTokenUseCase'

const router = useRouter()

onMounted(async () => {
  if (useAuthStore().token !== null) {
    await new Promise((resolve) => setTimeout(resolve, 600))
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
  <div class="bg-yellow">
    <div class="container vhContainer">
      <div class="homeContainer">
        <h1 class="homeTitle fade-in">歡迎使用待辦清單</h1>
      </div>
    </div>
  </div>
</template>
