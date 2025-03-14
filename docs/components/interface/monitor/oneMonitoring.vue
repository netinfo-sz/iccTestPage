<script setup name="TurnMomentMonitoring">
import { ref } from 'vue'
import {ElMessage} from 'element-plus'
import { checkInstance, getInstanceFCC } from '../../use-fcc'
import { setLog } from '../../use-log'
import OpenMonitor from './openMonitor.vue'
const loading = ref(false)
const matrixInfo = ref({
  LONGITUDE: '114.03168', // 经度
  LATITUDE: '22.619469' // 维度
})
const openMonitor = async () => {
  setLog({
    name: '一键打开监控'
  })
  let result = await getInstanceFCC().monitorJudge(matrixInfo.value)
  setLog({
    name: '一键打开结果',
    msg: result
  })
  if (result.status == 200) {
    ElMessage({
      message: '一键打开监控成功',
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
  <div> {{ '一键打开监控' }} </div>
  <el-row>
    <el-col :span="7">
      <el-form-item label="经度">
        <el-input v-model.number="matrixInfo.LONGITUDE" placeholder="经度"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="7">
      <el-form-item label="维度">
        <el-input v-model.number="matrixInfo.LATITUDE" placeholder="维度"></el-input>
      </el-form-item>
    </el-col>
  </el-row>
  <el-form-item>
    <el-button type="primary" @click="openMonitor" v-loading="loading">一键打开监控</el-button>
  </el-form-item>
</el-form>
</template>

<style scoped>
.el-col {
  margin-right: 16px;
}
.change-monitor-wrap {
  padding-top: 10px;
  border-top: 1px dotted #ccc;
}
</style>