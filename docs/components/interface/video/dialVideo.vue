<script setup name="dialVideo">
import { reactive,ref } from 'vue'
import {ElMessage} from 'element-plus'
import { checkInstance, getInstanceFCC } from '../../use-fcc'
import { setLog } from '../../use-log'
const token = ref('')
const userAccount = ref('')
const location = reactive({
  locX: '',
  locY: '',
  scale: 1
})
const loading = ref(false)
const dialVideo = async () => {
  setLog({
    name: '开始视频呼叫'
  })
  if (loading.value) {
    setLog({
      name: '视频呼叫结果',
      msg: '请先实例化'
    })
    return
  }
  if (!await checkInstance()) {
    setLog({
      name: '视频呼叫',
      msg: '请先实例化',
      type: 'warning'
    })
    return
  }
  if (!userAccount.value) {
    setLog({
      name: '视频呼叫',
      msg: `参数错误,请输入呼叫账号`,
      type: 'warning'
    })
    return
  }
  loading.value = true
  let result = await getInstanceFCC().dialVideo({
    userAccount: userAccount.value,
    location: location
  })
  setLog({
    name: '视频呼叫结果',
    msg: result
  })
  loading.value = false
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
const dialVideoHangUp = async () => {
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
  <el-form-item label="账号">
    <el-input v-model="userAccount" placeholder="请输入对方账号"></el-input>
  </el-form-item>
  <div class="form-title">{{ 'location' }}</div>
  <el-form-item label="locX" style="margin-left: 15px">
    <el-input v-model="location.locX" placeholder="请输入X轴位置"></el-input>
  </el-form-item>
  <el-form-item label="locY" style="margin-left: 15px">
    <el-input v-model="location.locY" placeholder="请输入Y轴位置"></el-input>
  </el-form-item>
  <el-form-item label="scale" style="margin-left: 15px">
    <el-input v-model="location.scale" placeholder="请输入缩放比率"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="dialVideo" :loading="loading">发起视频点呼</el-button>
    <el-button type="danger" @click="dialVideoHangUp" :loading="loading">发起视频点呼</el-button>
  </el-form-item>
</el-form>
</template>

<style scoped>
.form-title{
  font-size: 16px;
  margin-bottom: 10px;
}
</style>