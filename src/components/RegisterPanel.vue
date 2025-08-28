<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const registerEmail = ref('')
const nickName = ref('')
const registerPassword = ref('')
const confirmPassword = ref('')

// 預設狀態不顯示錯誤
const isEmailCorrect = ref(true)
const hasEnteredNickName = ref(true)
const hasEnteredPassword = ref(true)
const isPasswordSame = ref(true)

const canLogin = ref(false)

const tick = 10
const threshold = 1000

let editEmailTimeHandle = null
let editEmailElapsed = 0
watch(registerEmail, () => {
  isEmailCorrect.value = true
  editEmailElapsed = 0
  if (!editEmailTimeHandle) {
    editEmailTimeHandle = setInterval(() => {
      editEmailElapsed += tick
      if (editEmailElapsed >= threshold) {
        clearInterval(editEmailTimeHandle)
        editEmailTimeHandle = null
        isEmailCorrect.value = validateEmail(registerEmail.value)
      }
    }, tick)
  }
})

watch(nickName, () => {
  hasEnteredNickName.value = nickName.value !== ''
})

watch(registerPassword, () => {
  hasEnteredPassword.value = registerPassword.value !== ''
})

let editPasswordTimeHandle = null
let editPasswordElapsed = 0
watch(confirmPassword, () => {
  isPasswordSame.value = true
  editPasswordElapsed = 0
  if (!editPasswordTimeHandle) {
    editPasswordTimeHandle = setInterval(() => {
      editPasswordElapsed += tick
      if (editPasswordElapsed >= threshold) {
        clearInterval(editPasswordTimeHandle)
        editPasswordTimeHandle = null
        isPasswordSame.value = confirmPassword.value === registerPassword.value
      }
    }, tick)
  }
})

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const sendRegisterRequest = () => {
  let isFormValid = true
  if (registerEmail.value === '' || !isEmailCorrect.value) {
    isEmailCorrect.value = false
    isFormValid = false
  }
  if (nickName.value === '') {
    hasEnteredNickName.value = false
    isFormValid = false
  }
  if (registerPassword.value === '' || !hasEnteredPassword.value) {
    hasEnteredPassword.value = false
    isFormValid = false
  }
  if (confirmPassword.value === '' || !isPasswordSame.value) {
    isPasswordSame.value = false
    isFormValid = false
  }
  if (isFormValid) {
    console.log('TODO: Send registration request')
    canLogin.value = true
  }
}

const sendLoginRequest = () => {
  if (canLogin.value) {
    // Send login request
  }
}
</script>

<template>
  <div class="formControls">
    <h2 class="formControls_txt">註冊帳號</h2>
    <label class="formControls_label" for="email">Email</label>
    <input
      class="formControls_input"
      type="text"
      id="email"
      name="email"
      placeholder="請輸入 email"
      required
      v-model="registerEmail"
    />
    <p class="formControls_invalid_prompt">
      {{ isEmailCorrect ? '' : 'Email 格式不正確' }}
    </p>
    <label class="formControls_label" for="name">您的暱稱</label>
    <input
      class="formControls_input"
      type="text"
      name="name"
      id="name"
      placeholder="請輸入您的暱稱"
      v-model="nickName"
    />
    <p class="formControls_invalid_prompt">
      {{ hasEnteredNickName ? '' : '暱稱不可以為空' }}
    </p>
    <label class="formControls_label" for="pwd">密碼</label>
    <input
      class="formControls_input"
      type="password"
      name="pwd"
      id="pwd"
      placeholder="請輸入密碼"
      required
      v-model="registerPassword"
    />
    <p class="formControls_invalid_prompt">
      {{ hasEnteredPassword ? '' : '密碼不可以為空' }}
    </p>
    <label class="formControls_label" for="pwd2">再次輸入密碼</label>
    <input
      class="formControls_input"
      type="password"
      name="pwd2"
      id="pwd2"
      placeholder="請再次輸入密碼"
      required
      v-model="confirmPassword"
    />
    <p class="formControls_invalid_prompt">
      {{ isPasswordSame ? '' : '與密碼不符' }}
    </p>
    <input
      class="formControls_btnSubmit"
      type="button"
      @click="sendRegisterRequest"
      value="註冊帳號"
    />
    <!-- <a class="formControls_btnLink" href="#loginPage">登入</a> -->
    <button class="formControls_btnLink" :disabled="!canLogin" @click="sendLoginRequest">
      登入
    </button>
  </div>
</template>

<style scoped></style>
