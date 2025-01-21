<script setup name="Answer">
import { ref } from 'vue'
import {ElMessage} from 'element-plus'
import { checkInstance, getInstanceFCC } from '../../use-fcc'
import { setLog } from '../../use-log'

const loading = ref(false)
const answer = async () => {
  setLog({
    name: '开始应答'
  })
  if (loading.value) {
    setLog({
      name: '开始应答',
      msg: '应答中...',
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
  loading.value = true
  let result = await getInstanceFCC().answer()
  setLog({
    name: '应答结果',
    msg: result
  })
  loading.value = false
  if (result.status == 200) {
    ElMessage({
      message: '应答成功',
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
    <el-button type="primary" @click="answer" :loading="loading">应答</el-button>
  </el-form-item>
</el-form>
</template>