<script setup name="Init">

import { ref, reactive } from 'vue'
import {ElMessage} from 'element-plus'
import { checkInstance, getInstanceFCC, setInstance } from '../../use-fcc'
import { setLog } from '../../use-log'


const loading = ref(false)
const path = ref('/')
const init = async () => {
  setLog({
    name: '设置中台服务端',
    msg: path.value
  })
  let result = await getInstanceFCC().connect({path: path.value})
  setLog({
    name: '设置中台服务端结果',
    msg: result
  })
}
</script>

<template>
<el-form label-width="120">
  <el-form-item label="地址">
    <el-input v-model="path" />
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="init" v-loading="loading">设置</el-button>
  </el-form-item>
</el-form>
</template>