<script setup name="PersonLocationChange">
import { reactive, ref } from 'vue'
import {ElMessage} from 'element-plus'
import { checkInstance, getInstanceFCC } from '../../use-fcc'
import { setLog } from '../../use-log'
const loading = ref(false)
const listenStatusChange = async () => {
  setLog({
    name: '视频点呼挂机事件["OnDialVideoDropped"]监听'
  })
  if (loading.value) {
    setLog({
      name: '视频点呼挂机事件["OnDialVideoDropped"]监听结果',
      msg: '请先实例化'
    })
    return
  }
  if (!await checkInstance()) {
    setLog({
      name: '视频点呼挂机事件["OnDialVideoDropped"]监听',
      msg: '请先实例化',
      type: 'warning'
    })
    return
  }
  loading.value = true
  let result = await getInstanceFCC().listen('OnDialVideoDropped', (data) => {
    // 
  })
  setLog({
    name: '视频点呼挂机事件["OnDialVideoDropped"]监听结果',
    msg: result
  })
  loading.value = false
  if (result.status == 200) {
    ElMessage({
      message: '视频点呼挂机事件["OnDialVideoDropped"]监听成功',
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
<el-form :model="formData">
  <el-form-item>
    <el-button type="primary" @click="listenStatusChange" :loading="loading">视频点呼挂机事件监听</el-button>
  </el-form-item>
</el-form>
</template>