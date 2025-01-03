<script setup name="OpenMonitor">
import { ref, reactive } from 'vue'
import {ElMessage} from 'element-plus'
import { checkInstance, getInstanceFCC } from '../../use-fcc'
import { setLog } from '../../use-log'
const loading = ref(false)
const showDialog = ref(false)
const formData = reactive({
  resId: '08594172957097100101#f549ae3dca014060b2b7cf3d17d03b32',
  name: '设备一',
  x: '480',
  y: '50',
  width: 640,
  height: 640
})
const openMonitor  = async () => {
  showDialog.value = true
}
// 确认打开监控
const confirmOpenMonitor= async () => {
  setLog({
    name: '开始打开监控'
  })
  if (loading.vue) {
    setLog({
      name: '打开监控结果',
      msg: '请先实例化'
    })
    return
  }
  if (!await checkInstance()) {
    setLog({
      name: '打开监控',
      msg: '请先实例化'
    })
    ElMessage({
      message: '请先实例化',
      type: 'warning'
    })
    return
  }
  loading.vue = true
  showDialog.value = false
  let result = await getInstanceFCC().openMonitor(formData)
  setLog({
    name: '打开监控结果',
    msg: result
  })
  loading.vue = false
  if (result.status == 200) {
    ElMessage({
      message: '打开监控成功',
      type: 'success'
    })
  } else {
    ElMessage({
      message: result.msg,
      type: 'info'
    })
  }
}
// 关闭监控
const offMonitoring = async () => { 
  let result = await getInstanceFCC().offMonitoring({
    winId: '0000', // 0000”在主窗口关闭监控， “0301”在矩阵中关闭监控, “0401”在场所中关闭监控 以此类推, 不传默认为”0000”
    resId: formData.resId // 设备编码
  })
  setLog({
    name: '关闭监控结果',
    msg: result
  })
  loading.vue = false
  if (result.status == 200) {
    ElMessage({
      message: '关闭监控成功',
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
    <el-button type="primary" @click="openMonitor" v-loading="loading">打开监控</el-button>
    <el-button type="primary" @click="offMonitoring">关闭监控</el-button>
  </el-form-item>
</el-form>
<el-dialog title="查询会议列表数据" v-model="showDialog" width="36%" center>
  <el-form :model="formData">
    <el-form-item label="设备编码">
      <el-input v-model="formData.resId" placeholder="请输入设备编码"></el-input>
    </el-form-item>
    <el-form-item label="设备名称">
      <el-input v-model="formData.name" placeholder="请输入设备名称"></el-input>
    </el-form-item>
    <el-form-item label="X轴坐标">
      <el-input v-model="formData.x" placeholder="请输入X轴坐标"></el-input>
    </el-form-item>
    <el-form-item label="Y轴坐标">
      <el-input v-model="formData.y" placeholder="请输入Y轴坐标"></el-input>
    </el-form-item>
    <el-form-item label="宽度">
      <el-input v-model="formData.width" placeholder="请输入宽度"></el-input>
    </el-form-item>
    <el-form-item label="高度">
      <el-input v-model="formData.height" placeholder="请输入高度"></el-input>
    </el-form-item>
  </el-form>
  <template #footer>
    <el-button type="primary" @click="confirmOpenMonitor" v-loading="loading">确定</el-button>
  </template>
</el-dialog>
</template>