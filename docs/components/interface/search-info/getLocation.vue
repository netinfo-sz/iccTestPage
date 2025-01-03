<script setup name="GetLocation">
import { ref } from 'vue'
import {ElMessage} from 'element-plus'
import { checkInstance, getInstanceFCC } from '../../use-fcc'
import { setLog } from '../../use-log'
const token = ref('')
const userAccount = ref('')
const loading = ref(false)
const getLocation = async () => {
  setLog({
    name: '开始获取所有用户状态位置数据'
  })
  if (loading.value) {
    setLog({
      name: '获取所有用户状态位置数据结果',
      msg: '请先实例化'
    })
    return
  }
  if (!await checkInstance()) {
    setLog({
      name: '获取所有用户状态位置数据',
      msg: '请先实例化'
    })
    ElMessage({
      message: '请先实例化',
      type: 'warning'
    })
    return
  }
  loading.value = true
  let result = await getInstanceFCC().getLocation()
  setLog({
    name: '获取所有用户状态位置数据结果',
    msg: result
  })
  loading.value = false
  if (result.status == 200) {
    ElMessage({
      message: '获取所有用户状态位置数据成功',
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
    <el-button type="primary" @click="getLocation" :loading="loading">获取所有用户状态位置数据</el-button>
  </el-form-item>
</el-form>
</template>