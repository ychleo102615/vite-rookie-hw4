<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import LoginPanel from '@/components/LoginPanel.vue'
</script>

<template>
  <div id="loginPage" class="bg-yellow">
    <div class="conatiner loginPage vhContainer">
      <div class="side">
        <a href="#"
          ><img
            class="logoImg"
            src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png"
            alt=""
        /></a>
        <img
          class="d-m-n"
          src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png"
          alt="workImg"
        />
      </div>
      <div>
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
