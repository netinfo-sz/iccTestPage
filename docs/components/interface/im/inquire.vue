<script setup name="Login">
import { ref } from 'vue'
import {ElMessage} from 'element-plus'
import { checkInstance, getInstanceFCC } from '../../use-fcc'
import { setLog } from '../../use-log'
const token = ref('')
const userAccount = ref('')
const loading = ref(false)
const login = async () => {
  setLog({
    name: '开始登录'
  })
  if (loading.vue) {
    setLog({
      name: '登录结果',
      msg: '请先实例化'
    })
    return
  }
  if (!await checkInstance()) {
    setLog({
      name: '登录',
      msg: '请先实例化'
    })
    ElMessage({
      message: '请先实例化',
      type: 'warning'
    })
    return
  }
  if (!userAccount.value && !token.value) {
    setLog({
      name: '登录',
      msg: `参数错误,请输入对接信息`
    })
    ElMessage({
      message: '请输入对接信息',
      type: 'warning'
    })
    return
  }
  loading.vue = true
  let result = await getInstanceFCC().login(
    token.value ? {token: token.value} : {
    userAccount: userAccount.value
  })
  setLog({
    name: '登录结果',
    msg: result
  })
  loading.vue = false
  if (result.status == 200) {
    ElMessage({
      message: '登录成功',
      type: 'success'
    })
  } else {
    ElMessage({
      message: result.msg,
      type: 'info'
    })
  }
}
</script>

<template>
<el-form>
  <el-form-item label="token">
    <el-input v-model="token" placeholder="请输入对接token"></el-input>
  </el-form-item>
  <el-form-item label="或">

  </el-form-item>
  <el-form-item label="账号">
    <el-input v-model="userAccount" placeholder="请输入测试账号"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="login" v-loading="loading">登录</el-button>
  </el-form-item>
</el-form>
</template>