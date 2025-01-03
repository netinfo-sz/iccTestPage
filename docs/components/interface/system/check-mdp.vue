<script setup name="CheckMdp">
import { ref } from 'vue'
import {ElMessage} from 'element-plus'
import { checkInstance, getInstanceFCC } from '../../use-fcc'
import { setLog } from '../../use-log'
const token = ref('')
const userAccount = ref('')
const loading = ref(false)
const checkMdp = async () => {
  setLog({
    name: '开始检测'
  })

  if (!await checkInstance()) {
    setLog({
      name: '检测',
      msg: '请先实例化'
    })
    ElMessage({
      message: '请先实例化',
      type: 'warning'
    })
    return
  }
  loading.value = true
  let result = await getInstanceFCC().checkMdpExist()
  setLog({
    name: '检测结果',
    msg: result
  })
  loading.value = false
  if (result.status == 200 && result.data && result.data.data == '1') {
    ElMessage({
      message: '已安装',
      type: 'success'
    })
  } else {
    ElMessage({
      message: result.msg || '未安装',
      type: 'info'
    })
  }
}
</script>

<template>
<el-form>
  <el-form-item>
    <el-button type="primary" @click="checkMdp" :loading="loading">检测</el-button>
  </el-form-item>
</el-form>
</template>