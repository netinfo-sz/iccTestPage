<script setup name="TurnMomentMonitoring">
import { ref } from 'vue'
import {ElMessage} from 'element-plus'
import { checkInstance, getInstanceFCC } from '../../use-fcc'
import { setLog } from '../../use-log'
const loading = ref(false)
const showDialog = ref(false)
const divceList = ref(null)
const matrixInfo = ref({
  x: 100,
  y:100,
  w: 1000,
  h: 800,
  r: 2,
  c: 2
})
const showChangeDialog = ref(false)
const chageDivceList = ref(null)
const wallData = ref({"monitorList":[{"resId": "TEST", "resName": "90001"}]})
const enterMatrix = async () => {
  setLog({
    name: '打开矩阵监控墙'
  })
  if (loading.vue) {
    setLog({
      name: '打开矩阵监控墙结果',
      msg: '请先实例化'
    })
    return
  }
  if (!await checkInstance()) {
    setLog({
      name: '打开矩阵监控墙',
      msg: '请先实例化'
    })
    ElMessage({
      message: '请先实例化',
      type: 'warning'
    })
    return
  }
  loading.vue = true
  let result = await getInstanceFCC().turnMomentMonitoring(matrixInfo.value)
  setLog({
    name: '打开矩阵监控墙结果',
    msg: result
  })
  loading.vue = false
  if (result.status == 200) {
    ElMessage({
      message: '打开矩阵监控墙成功',
      type: 'success'
    })
  } else {
    ElMessage({
      message: result.msg,
      type: 'info'
    })
  }
}
// 切换矩阵监控墙
const changeMonitoring = async () => { 
  chageDivceList.value = JSON.stringify(wallData.value)
  showChangeDialog.value = true
} 
const confirmChangeMonitoring = async () => { 
  let result = await getInstanceFCC().changeMonitorWall(JSON.parse(chageDivceList.value))
  setLog({
    name: '切换矩阵监控结果',
    msg: result
  })
  loading.vue = false
  if (result.status == 200) {
    ElMessage({
      message: '切换矩阵监控成功',
      type: 'success'
    })
  } else {
    ElMessage({
      message: result.msg,
      type: 'info'
    })
  }
}
// 关闭矩阵监控墙
const closeMonitoring = async () => {
  let result = await getInstanceFCC().closeMonitorWall()
  setLog({
    name: '关闭矩阵监控墙结果',
    msg: result
  })
  loading.vue = false
  if (result.status == 200) {
    ElMessage({
      message: '关闭矩阵监控墙成功',
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
    <el-button type="primary" @click="enterMatrix" v-loading="loading">打开矩阵监控墙</el-button>
    <el-button type="primary" @click="changeMonitoring" v-loading="loading">切换矩阵监控墙</el-button>
    <el-button type="primary" @click="closeMonitoring" v-loading="loading">关闭矩阵监控墙</el-button>
  </el-form-item>
</el-form>
<el-dialog title="监控设备数据" v-model="showChangeDialog" width="36%" center>
  <el-input v-model="chageDivceList" type="textarea" :rows="5"></el-input>
  <template #footer>
    <el-button type="primary" @click="confirmChangeMonitoring">确定</el-button>
  </template>
</el-dialog>
</template>