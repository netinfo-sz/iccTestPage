<script setup name="Login">
import { ref } from 'vue'
import {ElMessage} from 'element-plus'
import { checkInstance, getInstanceFCC } from '../../use-fcc'
import { setLog } from '../../use-log'
const loading = ref(false)
const initListen = async () => {
  if (loading.value) {
    setLog({
      name: '订阅结果',
      msg: '请先实例化'
    })
    return
  }
  if (!await checkInstance()) {
    setLog({
      name: '订阅IM消息',
      msg: '请先实例化'
    })
    ElMessage({
      message: '请先实例化',
      type: 'warning'
    })
    return
  }
  loading.value = true
  let result = await getInstanceFCC().listen('OnIMRead', (data) => {
    // 业务逻辑
  })
  setLog({
    name: '订阅OnIMRead消息结果',
    msg: result
  })
  loading.value = false
  if (result.status == 200) {
    ElMessage({
      message: '订阅OnIMRead消息成功',
      type: 'success'
    })
  } else {
    ElMessage({
      message: result.msg,
      type: 'info'
    })
  }
  let result1 = await getInstanceFCC().listen('OnIMMessage', (data) => {
    // 业务逻辑
  })
  setLog({
    name: '订阅OnIMMessage消息成功结果',
    msg: result1
  })
  loading.value = false
  if (result1.status == 200) {
    ElMessage({
      message: '订阅OnIMMessage消息成功',
      type: 'success'
    })
  } else {
    ElMessage({
      message: result1.msg,
      type: 'info'
    })
  }
}
</script>

<template>
<el-form>
  <el-form-item>
    <el-button type="primary" @click="initListen" :loading="loading">订阅IM消息</el-button>
  </el-form-item>
</el-form>
</template>