<script setup name="Login">
import { ref } from 'vue'
import { checkInstance, getInstanceFCC } from '../../use-fcc'
const token = ref('')
const userAccount = ref('')
// let fccInstance = getInstanceFCC()
const login = async () => {
  console.log(userAccount.value, getInstanceFCC())
  await checkInstance()
  let result = await getInstanceFCC().login({
    userAccount: userAccount.value
  })
  console.log(result)
}
</script>

<template>
<el-form>
  <el-form-item label="token">
    <el-input v-model="token" placeholder="请输入对接token"></el-input>
  </el-form-item>
  <el-form-item label="账号">
    <el-input v-model="userAccount" placeholder="账号"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="login">登录</el-button>
  </el-form-item>
</el-form>
</template>