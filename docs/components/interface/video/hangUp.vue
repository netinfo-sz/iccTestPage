<script setup name="HangUp">
import { ref } from 'vue'
import {ElMessage} from 'element-plus'
import { checkInstance, getInstanceFCC } from '../../use-fcc'
import { setLog } from '../../use-log'
const token = ref('')
const loading = ref(false)
const dialVoiceHangUp = async () => {
  setLog({
    name: '挂断视频点呼'
  })
  if (loading.value) {
    setLog({
      name: '挂断视频点呼结果',
      msg: '请先实例化'
    })
    return
  }
  if (!await checkInstance()) {
    setLog({
      name: '挂断视频点呼',
      msg: '请先实例化',
      type: 'warning'
    })
    return
  }
  loading.value = true
  let result = await getInstanceFCC().dialVideoHangUp()
  setLog({
    name: '挂断视频点呼结果',
    msg: result
  })
  loading.value = false
  if (result.status == 200) {
    ElMessage({
      message: '挂断视频点呼成功',
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
    <el-button type="primary" @click="dialVoiceHangUp" :loading="loading">挂断视频点呼</el-button>
  </el-form-item>
</el-form>
</template>