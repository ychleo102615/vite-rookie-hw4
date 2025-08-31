<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { registerUser } from '@/useCase/registerUseCase'
import { loginUser } from '@/useCase/loginUseCase'

const router = useRouter()

const registerEmail = ref('')
const registerNickName = ref('')
const registerPassword = ref('')
const confirmPassword = ref('')

let isEmailCorrect = false
let hasEnteredNickName = false
let hasEnteredPassword = false
let isPasswordSame = false

const emailErrorMsg = ref('')
const nickNameErrorMsg = ref('')
const passwordErrorMsg = ref('')
const confirmPasswordErrorMsg = ref('')

const canOperate = ref(true)
const dialogMessage = ref('')

const dialogRef = ref(null)

const tick = 10
const threshold = 1000

let editEmailTimeHandle = null
let editEmailElapsed = 0
watch(registerEmail, () => {
  emailErrorMsg.value = ''

  editEmailElapsed = 0
  if (!editEmailTimeHandle) {
    editEmailTimeHandle = setInterval(() => {
      editEmailElapsed += tick
      if (editEmailElapsed >= threshold) {
        clearInterval(editEmailTimeHandle)
        editEmailTimeHandle = null
        if (validateEmail(registerEmail.value)) {
          isEmailCorrect = true
          emailErrorMsg.value = ''
        } else {
          isEmailCorrect = false
          emailErrorMsg.value = 'Email 格式不正確'
        }
      }
    }, tick)
  }
})

watch(registerNickName, () => {
  if (registerNickName.value === '') {
    hasEnteredNickName = false
    nickNameErrorMsg.value = '暱稱不可以為空'
  } else {
    hasEnteredNickName = true
    nickNameErrorMsg.value = ''
  }
})

watch(registerPassword, () => {
  if (registerPassword.value === '') {
    hasEnteredPassword = false
    passwordErrorMsg.value = '密碼不可以為空'
  } else {
    hasEnteredPassword = true
    passwordErrorMsg.value = ''
  }
})

let editPasswordTimeHandle = null
let editPasswordElapsed = 0
watch(confirmPassword, () => {
  isPasswordSame = true
  confirmPasswordErrorMsg.value = ''

  editPasswordElapsed = 0
  if (!editPasswordTimeHandle) {
    editPasswordTimeHandle = setInterval(() => {
      editPasswordElapsed += tick
      if (editPasswordElapsed >= threshold) {
        clearInterval(editPasswordTimeHandle)
        editPasswordTimeHandle = null
        isPasswordSame = confirmPassword.value === registerPassword.value
        confirmPasswordErrorMsg.value = isPasswordSame ? '' : '與密碼不符'
      }
    }, tick)
  }
})

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const tryRegister = () => {
  let isFormValid = true
  if (!isEmailCorrect) {
    isFormValid = false
  }
  if (!hasEnteredNickName) {
    isFormValid = false
  }
  if (!hasEnteredPassword) {
    isFormValid = false
  }
  if (!isPasswordSame) {
    isFormValid = false
  }
  if (isFormValid) {
    sendRegisterRequest()
  }
}

const sendRegisterRequest = async () => {
  canOperate.value = false

  await new Promise((resolve) => setTimeout(resolve, 1000))
  console.log('假等待完畢')

  const userData = {
    email: registerEmail.value,
    password: registerPassword.value,
    nickname: registerNickName.value,
  }
  const resp = await registerUser(userData)

  if (!resp.success) {
    if (resp.errorData.email) {
      emailErrorMsg.value = resp.errorData.email
    }
    if (resp.errorData.nickname) {
      nickNameErrorMsg.value = resp.errorData.nickname
    }
    if (resp.errorData.password) {
      passwordErrorMsg.value = resp.errorData.password
    }
    canOperate.value = true
    return
  }

  // showSuccessDialog.value = true
  dialogRef.value.showModal()
  dialogMessage.value = '註冊成功，將自動登入'

  await new Promise((resolve) => setTimeout(resolve, 1000))

  const response = await loginUser({
    email: registerEmail.value,
    password: registerPassword.value,
  })

  if (response.success) {
    console.log('自動登入成功', response)
    router.push({ name: 'todo' })
  } else {
    canOperate.value = true
    dialogMessage.value = '自動登入失敗，請重新登入'
    setTimeout(() => {
      dialogRef.value.close()
    }, 1000)
  }
}

const gotoLogin = () => {
  router.push({ name: 'login' })
}
</script>

<template>
  <dialog ref="dialogRef">{{ dialogMessage }}</dialog>
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
      :disabled="!canOperate"
    />
    <p class="formControls_invalid_prompt">
      {{ emailErrorMsg }}
    </p>
    <label class="formControls_label" for="name">您的暱稱</label>
    <input
      class="formControls_input"
      type="text"
      name="name"
      id="name"
      placeholder="請輸入您的暱稱"
      v-model="registerNickName"
      :disabled="!canOperate"
    />
    <p class="formControls_invalid_prompt">
      {{ nickNameErrorMsg }}
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
      :disabled="!canOperate"
    />
    <p class="formControls_invalid_prompt">
      {{ passwordErrorMsg }}
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
      :disabled="!canOperate"
    />
    <p class="formControls_invalid_prompt">
      {{ confirmPasswordErrorMsg }}
    </p>
    <input
      class="formControls_btnSubmit"
      type="button"
      @click="tryRegister"
      value="註冊帳號"
      :disabled="!canOperate"
    />
    <button class="formControls_btnLink" @click="gotoLogin" :disabled="!canOperate">登入</button>
  </div>
</template>

<style scoped></style>
