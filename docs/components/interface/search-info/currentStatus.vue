<script setup name="CurrentStatus">
import { ref } from 'vue'
import {ElMessage} from 'element-plus'
import { checkInstance, getInstanceFCC } from '../../use-fcc'
import { setLog } from '../../use-log'
const loading = ref(false)
const showCurrentUserInfo = ref(false)
const userInfo = ref([])
const getState = async () => {
  setLog({
    name: '开始获取当前用户状态'
  })
  if (loading.value) {
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
  loading.value = true
  let result = await getInstanceFCC().getState()
  if (result.status == 200) {
    showCurrentUserInfo.value = true
    userInfo.value = result.data
  }
  setLog({
    name: '获取当前用户状态结果',
    msg: result
  })
  loading.value = false
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
const userSta = (value) => {
  if (value === 1) {
    return '在线'
  } else if (value === 2) {
    return '忙碌'
  } else {
    return '离线'
  }
}
</script>

<template>
<el-form>
  <div class="info-wrap" v-if="showCurrentUserInfo && userInfo.length > 0">
    <div v-for="(value, key) in userInfo[0]" :key="key">
      <span class="user-account">用户账号： {{key}}</span>
      <span>用户当前状态： {{ userSta(+value) }}</span>
    </div>
  </div>
  <el-form-item>
    <el-button type="primary" @click="getState" :loading="loading">获取当前用户状态</el-button>
  </el-form-item>
</el-form>
</template>
<style scoped>
.info-wrap {
  margin-bottom: 10px;
}
.user-account {
  margin-right: 20px;
}
</style>