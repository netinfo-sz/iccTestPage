<script setup name="GetState">
import { ref } from 'vue'
import {ElMessage} from 'element-plus'
import { checkInstance, getInstanceFCC } from '../../use-fcc'
import { setLog } from '../../use-log'
const token = ref('')
const userAccount = ref('')
const loading = ref(false)
const getState = async () => {
  setLog({
    name: '开始获取当前用户状态'
  })
  if (loading.vue) {
    setLog({
      name: '获取当前用户状态结果',
      msg: '请先实例化'
    })
    return
  }
  if (!await checkInstance()) {
    setLog({
      name: '获取当前用户状态',
      msg: '请先实例化'
    })
    ElMessage({
      message: '请先实例化',
      type: 'warning'
    })
    return
  }
  loading.vue = true
  let result = await getInstanceFCC().getState()
  console.log('==========result======',result)
  setLog({
    name: '获取当前用户状态结果',
    msg: result
  })
  loading.vue = false
  if (result.status == 200) {
    ElMessage({
      message: '获取当前用户状态成功',
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
  <el-form-item>
    <el-button type="primary" @click="getState" v-loading="loading">获取当前用户状态</el-button>
  </el-form-item>
</el-form>
</template>