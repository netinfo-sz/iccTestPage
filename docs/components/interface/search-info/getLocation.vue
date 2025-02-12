<script setup name="GetLocation">
import { ref } from 'vue'
import {ElMessage} from 'element-plus'
import { checkInstance, getInstanceFCC } from '../../use-fcc'
import { setLog } from '../../use-log'
const loading = ref(false)
const userLocationList = ref([])
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
  if (result.data.code == 200) {
    userLocationList.value = result.data.data
  }
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
  <div class="info-wrap" v-if="userLocationList.length > 0">
    <ul>
      <li v-for="item in userLocationList" :key="item.userId">
        <span class="user-account">用户账号： {{item.extSysAccount}}</span>
        <span>用户状态： {{ userSta(+item.natsStat) }}</span>
      </li>
    </ul>
  </div>
  <el-form-item>
    <el-button type="primary" @click="getLocation" :loading="loading">获取所有用户状态位置数据</el-button>
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