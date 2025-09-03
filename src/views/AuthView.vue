<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useRouter } from 'vue-router'
const router = useRouter()

onMounted(() => {
  router.push({ name: 'login' })
})
</script>

<template>
  <div class="bg-yellow">
    <div class="conatiner loginPage vhContainer">
      <div class="side">
        <img class="logoImg" src="@/assets/logo.png" alt="logo" draggable="false" />
        <img class="d-m-n" src="@/assets/main_visual.png" alt="mainVisual" draggable="false" />
      </div>
      <div>
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
