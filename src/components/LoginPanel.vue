<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
const userEmail = ref('')
const userPassword = ref('')

const isEmailEmpty = ref(false)

const router = useRouter()

const tryLogin = () => {
  console.log('嘗試登入')
}

const gotoRegister = () => {
  router.push({ name: 'register' })
}

watch(userEmail, (newEmail) => {
  isEmailEmpty.value = newEmail === ''
})
</script>

<template>
  <div class="formControls">
    <h2 class="formControls_txt">最實用的線上代辦事項服務</h2>
    <label class="formControls_label" for="email">Email</label>
    <input
      class="formControls_input"
      type="text"
      id="email"
      name="email"
      placeholder="請輸入 email"
      required
      v-model="userEmail"
    />
    <span> {{ isEmailEmpty ? '此欄位不可留空' : '' }}</span>
    <label class="formControls_label" for="pwd">密碼</label>
    <input
      class="formControls_input"
      type="password"
      name="pwd"
      id="pwd"
      placeholder="請輸入密碼"
      required
      v-model="userPassword"
    />
    <button class="formControls_btnSubmit" @click="tryLogin">登入</button>
    <button class="formControls_btnLink" @click="gotoRegister">註冊帳號</button>
  </div>
</template>
