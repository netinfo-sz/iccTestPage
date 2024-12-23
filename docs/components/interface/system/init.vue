<script setup name="Init">

import { ref, reactive } from 'vue'
import {ElMessage} from 'element-plus'
import { checkInstance, getInstanceFCC, setInstance } from '../../use-fcc'
import { setLog } from '../../use-log'


const loading = ref(false)
const ruleForm = reactive({
  meeting: true,
  phone: true,
  IM: true,
  monitor: true,
  pointToPointCall: true,
  connect: '/'
})
const init = async () => {
  setLog({
    name: '开始实例化',
    msg: JSON.stringify(ruleForm)
  })
  setInstance(new globalThis.FCC(ruleForm))
}
</script>

<template>
<el-form label-width="120">
  <el-form-item label="会议权限">
    <el-switch v-model="ruleForm.meeting" />
  </el-form-item>
  <el-form-item label="电话权限">
    <el-switch v-model="ruleForm.phone" />
  </el-form-item>
  <el-form-item label="IM权限">
    <el-switch v-model="ruleForm.IM" />
  </el-form-item>
  <el-form-item label="监控权限">
    <el-switch v-model="ruleForm.monitor" />
  </el-form-item>
  <el-form-item label="点呼权限">
    <el-switch v-model="ruleForm.pointToPointCall" />
  </el-form-item>
  <el-form-item label="中台服务地址">
    <el-input v-model="ruleForm.connect" />
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="init" v-loading="loading">实例化</el-button>
  </el-form-item>
</el-form>
</template>