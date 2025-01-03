<script setup name="PttemeRgency">
import { ref } from 'vue'
import {ElMessage} from 'element-plus'
import { checkInstance, getInstanceFCC } from '../../use-fcc'
import { setLog } from '../../use-log'
const groupId = ref('')
const loading = ref(false)
const pttemeRgency = async () => {
  setLog({
    name: '开始紧急呼叫'
  })
  if (loading.vue) {
    setLog({
      name: '紧急呼叫结果',
      msg: '请先实例化'
    })
    return
  }
  if (!await checkInstance()) {
    setLog({
      name: '紧急呼叫',
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
      name: '紧急呼叫',
      msg: `参数错误,请输入群组ID`
    })
    ElMessage({
      message: '请输入群组ID',
      type: 'warning'
    })
    return
  }
  loading.vue = true
  let result = await getInstanceFCC().pttemeRgency({
    groupId: groupId.value
  })
  setLog({
    name: '紧急呼叫结果',
    msg: result
  })
  loading.vue = false
  if (result.status == 200) {
    ElMessage({
      message: '紧急呼叫成功',
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
    <el-button type="primary" @click="pttemeRgency" v-loading="loading">紧急呼叫</el-button>
  </el-form-item>
</el-form>
</template>