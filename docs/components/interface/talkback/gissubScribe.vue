<script setup name="GissubScribe">
import { ref } from 'vue'
import {ElMessage} from 'element-plus'
import { checkInstance, getInstanceFCC } from '../../use-fcc'
import { setLog } from '../../use-log'
const groupId = ref('')
const loading = ref(false)
const gissubScribe = async () => {
  setLog({
    name: '开始订阅GIS终端'
  })
  if (loading.vue) {
    setLog({
      name: '订阅GIS终端结果',
      msg: '请先实例化'
    })
    return
  }
  if (!await checkInstance()) {
    setLog({
      name: '订阅GIS终端',
      msg: '请先实例化'
    })
    ElMessage({
      message: '请先实例化',
      type: 'warning'
    })
    return
  }
  if (!groupId.value) {
    setLog({
      name: '订阅GIS终端',
      msg: `参数错误,请输入群组ID`
    })
    ElMessage({
      message: '请输入群组ID',
      type: 'warning'
    })
    return
  }
  loading.vue = true
  let result = await getInstanceFCC().gissubScribe({
    groupId: groupId.value
  })
  setLog({
    name: '订阅GIS终端结果',
    msg: result
  })
  loading.vue = false
  if (result.status == 200) {
    ElMessage({
      message: '订阅GIS终端成功',
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
  <el-form-item label="群组ID">
    <el-input v-model="groupId" placeholder="请输入群组ID"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="gissubScribe" v-loading="loading">订阅GIS终端</el-button>
  </el-form-item>
</el-form>
</template>