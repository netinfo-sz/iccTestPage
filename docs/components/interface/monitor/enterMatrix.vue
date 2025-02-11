<script setup name="EnterMatrix">
import { ref } from 'vue'
import {ElMessage} from 'element-plus'
import { checkInstance, getInstanceFCC } from '../../use-fcc'
import { setLog } from '../../use-log'
import matrixDeviceList from './matrixList.vue'
const loading = ref(false)
const matrixList = ref([{
  deviceCode: "08594172951682810101#f549ae3dca014060b2b7cf3d17d03b32",
  deviceId: "912910",
  deviceName: "办公A区西北"
}, {
  deviceCode: "08594172957097100101#f549ae3dca014060b2b7cf3d17d03b32",
  deviceId: "912909",
  deviceName: "走廊西-东向"
}])
const confirmEnterMatrix = async () => {
  setLog({
    name: '开始打开矩阵监控'
  })
  if (loading.vue) {
    setLog({
      name: '打开矩阵监控结果',
      msg: '请先实例化'
    })
    return
  }
  if (!await checkInstance()) {
    setLog({
      name: '打开矩阵监控',
      msg: '请先实例化'
    })
    ElMessage({
      message: '请先实例化',
      type: 'warning'
    })
    return
  }
  loading.vue = true
  let result = await getInstanceFCC().enterMatrix(matrixList.value)
  setLog({
    name: '打开矩阵监控结果',
    msg: result
  })
  loading.vue = false
  if (result.status == 200) {
    ElMessage({
      message: '打开矩阵监控成功',
      type: 'success'
    })
  } else {
    ElMessage({
      message: result.msg,
      type: 'info'
    })
  }
}
const closeMatrix = async () => {
  let result = await getInstanceFCC().closeAllWindows()
  setLog({
    name: '关闭窗口结果',
    msg: result
  })
  loading.vue = false
  if (result.status == 200) {
    ElMessage({
      message: '关闭窗口成功',
      type: 'success'
    })
  } else {
    ElMessage({
      message: result.msg,
      type: 'info'
    })
  }
}
const addMeeting = () => {
  matrixList.value.push({
    deviceCode: '',
    deviceId: '',
    deviceName: ''
  })
}
const delDivice = (index) => {
  matrixList.value.splice(index, 1)
}
</script>

<template>
<el-form>
  <matrixDeviceList :matrixList="matrixList" @add-divce="addMeeting" @del-divice="delDivice"></matrixDeviceList>
  <el-form-item>
    <el-button type="primary" @click="confirmEnterMatrix" >打开矩阵监控</el-button>
    <el-button type="primary" @click="closeMatrix" v-loading="loading">关闭矩阵监控</el-button>
  </el-form-item>
</el-form>
</template>