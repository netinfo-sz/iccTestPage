<script setup name="dialVideo">
import { ref } from 'vue'
import {ElMessage} from 'element-plus'
import { checkInstance, getInstanceFCC } from '../../use-fcc'
import { setLog } from '../../use-log'
const token = ref('')
const userAccount = ref('')
const loading = ref(false)
const dialVideo = async () => {
  setLog({
    name: '开始视频呼叫'
  })
  if (loading.vue) {
    setLog({
      name: '视频呼叫结果',
      msg: '请先实例化'
    })
    return
  }
  if (!await checkInstance()) {
    setLog({
      name: '视频呼叫',
      msg: '请先实例化'
    })
    ElMessage({
      message: '请先实例化',
      type: 'warning'
    })
    return
  }
  if (!userAccount.value) {
    setLog({
      name: '视频呼叫',
      msg: `参数错误,请输入对接信息`
    })
    ElMessage({
      message: '请输入对接信息',
      type: 'warning'
    })
    return
  }
  loading.vue = true
  let result = await getInstanceFCC().dialVideo({
    userAccount: userAccount.value
  })
  setLog({
    name: '视频呼叫结果',
    msg: result
  })
  loading.vue = false
  if (result.status == 200) {
    ElMessage({
      message: '视频呼叫成功',
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
    <el-input v-model="userAccount" placeholder="请输入测试账号"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="dialVideo" v-loading="loading">发起视频点呼</el-button>
  </el-form-item>
</el-form>
</template>