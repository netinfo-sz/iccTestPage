<script setup name="GetCallRecord">
import { ref } from 'vue'
import {ElMessage} from 'element-plus'
import { checkInstance, getInstanceFCC } from '../../use-fcc'
import { setLog } from '../../use-log'
const token = ref('')
const extSysAccount = ref('')
const loading = ref(false)
const getCallRecord = async () => {
  setLog({
    name: '开始查询通话记录'
  })
  if (loading.value) {
    setLog({
      name: '查询通话记录结果',
      msg: '请先实例化'
    })
    return
  }
  if (!await checkInstance()) {
    setLog({
      name: '查询通话记录',
      msg: '请先实例化'
    })
    ElMessage({
      message: '请先实例化',
      type: 'warning'
    })
    return
  }
  if (!extSysAccount.value) {
    setLog({
      name: '查询通话记录',
      msg: `参数错误,请输入用户账号`
    })
    ElMessage({
      message: '请输入用户账号',
      type: 'warning'
    })
    return
  }
  loading.value = true
  let result = await getInstanceFCC().getCallRecord()
  setLog({
    name: '查询通话记录结果',
    msg: result
  })
  loading.value = false
  if (result.status == 200) {
    ElMessage({
      message: '查询通话记录成功',
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
      <el-input v-model="extSysAccount" placeholder="请输入测试账号"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="getCallRecord" :loading="loading">查询通话记录</el-button>
  </el-form-item>
</el-form>
</template>