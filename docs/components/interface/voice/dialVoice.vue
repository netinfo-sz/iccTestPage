<script setup name="DialVoice">
import { ref } from 'vue'
import {ElMessage} from 'element-plus'
import { checkInstance, getInstanceFCC } from '../../use-fcc'
import { setLog } from '../../use-log'
const token = ref('')
const userAccount = ref('')
const loading = ref(false)
const dialVoice = async () => {
  setLog({
    name: '开始语音呼叫'
  })
  if (loading.value) {
    setLog({
      name: '语音呼叫结果',
      msg: '请先实例化'
    })
    return
  }
  if (!await checkInstance()) {
    setLog({
      name: '语音呼叫',
      msg: '请先实例化'
    })
    ElMessage({
      message: '请先实例化',
      type: 'warning'
    })
    return
  }
  if (!userAccount.value) {
    setLog({
      name: '语音呼叫',
      msg: `参数错误,请输入呼叫账号`
    })
    ElMessage({
      message: '请输入呼叫账号',
      type: 'warning'
    })
    return
  }
  loading.value = true
  let result = await getInstanceFCC().dialVoice({
    userAccount: userAccount.value
  })
  setLog({
    name: '语音呼叫结果',
    msg: result
  })
  loading.value = false
  if (result.status == 200) {
    ElMessage({
      message: '语音呼叫成功',
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
  <el-form-item label="账号">
    <el-input v-model="userAccount" placeholder="请输入测试账号"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="dialVoice" :loading="loading">发起语音点呼</el-button>
  </el-form-item>
</el-form>
</template>