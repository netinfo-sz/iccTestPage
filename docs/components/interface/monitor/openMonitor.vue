<script setup name="OpenMonitor">
import { ref, reactive } from 'vue'
import {ElMessage} from 'element-plus'
import { checkInstance, getInstanceFCC } from '../../use-fcc'
import { setLog } from '../../use-log'
const loading = ref(false)
const deviceInfo = reactive({
  resId: '08594172957097100101#f549ae3dca014060b2b7cf3d17d03b32',
  name: '设备一',
  x: '480',
  y: '50',
  width: 640,
  height: 640
})
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
  let result = await getInstanceFCC().openMonitor(deviceInfo)
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
    resId: deviceInfo.resId // 设备编码
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
<el-form :model="deviceInfo">
  <div>监控设备信息</div>
  <div>
    <el-row>
      <el-col :span="7">
        <el-form-item label="X轴偏移量:">
          <el-input v-model="deviceInfo.x" placeholder="X轴偏移量"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="7">
        <el-form-item label="Y轴偏移量:">
          <el-input v-model="deviceInfo.y" placeholder="Y轴偏移量"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="7">
        <el-form-item label="宽度:">
          <el-input v-model.number="deviceInfo.width" placeholder="宽度"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="7">
        <el-form-item label="高度:">
          <el-input v-model.number="deviceInfo.height" placeholder="高度"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="7">
        <el-form-item label="设备编码:">
          <el-input v-model="deviceInfo.resId" placeholder="设备编码"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="7">
        <el-form-item label="设备名称:">
          <el-input v-model="deviceInfo.name" placeholder="设备名称"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </div>
  <el-form-item>
    <el-button type="primary" @click="confirmOpenMonitor" v-loading="loading">打开监控</el-button>
    <el-button type="primary" @click="offMonitoring">关闭监控</el-button>
  </el-form-item>
</el-form>
</template>
<style scoped>
.el-col {
  margin-right: 16px;
}
</style>