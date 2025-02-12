<script setup name="GetCallRec">
import { ref } from 'vue'
import {ElMessage} from 'element-plus'
import { checkInstance, getInstanceFCC } from '../../use-fcc'
import { setLog } from '../../use-log'
const token = ref('')
const callSno = ref('')
const loading = ref(false)
const getCallRec = async () => {
  setLog({
    name: '开始查询通话截录屏记录'
  })
  if (loading.value) {
    setLog({
      name: '查询通话截录屏记录结果',
      msg: '请先实例化'
    })
    return
  }
  if (!await checkInstance()) {
    setLog({
      name: '查询通话截录屏记录',
      msg: '请先实例化'
  })
    ElMessage({
      message: '请先实例化',
      type: 'warning'
    })
    return
  }
  if (!callSno.value) {
    setLog({
      name: '查询通话记录',
      msg: `参数错误,请输入通话流水号`
    })
    ElMessage({
      message: '请输入通话流水号',
      type: 'warning'
    })
    return
  }
  loading.value = true
  let result = await getInstanceFCC().getCallRec({
    CALL_SNO: callSno.value
  })
  setLog({
    name: '查询通话截录屏记录结果',
    msg: result
  })
  loading.value = false
  if (result.status == 200) {
    ElMessage({
      message: '查询通话截录屏记录成功',
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
  <el-form-item label="通话流水号">
    <el-input v-model="callSno" placeholder="通话流水号"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="getCallRec" :loading="loading">查询通话截录屏记录</el-button>
  </el-form-item>
</el-form>
</template>