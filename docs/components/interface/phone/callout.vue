<script setup name="Callout">
import { ref } from 'vue'
import {ElMessage} from 'element-plus'
import { checkInstance, getInstanceFCC } from '../../use-fcc'
import { setLog } from '../../use-log'
const token = ref('')
const phoneNum = ref('')
const loading = ref(false)
const callout = async () => {
  setLog({
    name: '开始呼叫'
  })
  if (loading.value) {
    setLog({
      name: '呼叫结果',
      msg: '正在呼叫中...',
      type: 'warning'
    })
    return
  }
  if (!await checkInstance()) {
    setLog({
      name: '呼叫',
      msg: '请先实例化',
      type: 'warning'
    })
    return
  }
  if (!phoneNum.value) {
    setLog({
      name: '呼叫',
      msg: `参数错误,请输入号码`,
      type: 'warning'
    })
    return
  }
  loading.value = true
  let result = await getInstanceFCC().callout(
    token.value ? {token: token.value} : {
    phoneNum: phoneNum.value
  })
  setLog({
    name: '呼叫结果',
    msg: result
  })
  loading.value = false
  if (result.status == 200) {
    ElMessage({
      message: '呼叫成功',
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
  <el-form-item label="号码">
    <el-input v-model="phoneNum" placeholder="请输入电话号码"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="callout" :loading="loading">呼叫</el-button>
  </el-form-item>
</el-form>
</template>