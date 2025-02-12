<script setup name="MonitorWallPush">
import { ref } from 'vue'
import {ElMessage} from 'element-plus'
import { checkInstance, getInstanceFCC } from '../../use-fcc'
import { setLog } from '../../use-log'
const loading = ref(false)
const matrixList = ref({
  winId: "1301",
  monitorList:[{resId: "TEST", resName: "90001"},{resId: "TEST1", resName: "90002"}]
})
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
  let result = await getInstanceFCC().monitorWall(matrixList.value)
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
</script>

<template>
<el-form>
  <el-form-item>
    <el-button type="primary" @click="confirmEnterMatrix" >推送</el-button>
    <el-button type="primary" @click="closeMatrix" v-loading="loading">关闭推送</el-button>
  </el-form-item>
</el-form>
</template>