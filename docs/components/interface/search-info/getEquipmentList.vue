<script setup name="GetEquipmentList">
import { ref } from 'vue'
import {ElMessage} from 'element-plus'
import { checkInstance, getInstanceFCC } from '../../use-fcc'
import { setLog } from '../../use-log'
const loading = ref(false)
const getEquipmentList = async () => {
  setLog({
    name: '开始查询监控列表'
  })
  if (loading.vue) {
    setLog({
      name: '查询监控列表结果',
      msg: '请先实例化'
    })
    return
  }
  if (!await checkInstance()) {
    setLog({
      name: '查询监控列表',
      msg: '请先实例化'
    })
    ElMessage({
      message: '请先实例化',
      type: 'warning'
    })
    return
  }
  loading.vue = true
  let result = await getInstanceFCC().getEquipmentList()
  setLog({
    name: '查询监控列表结果',
    msg: result
  })
  loading.vue = false
  if (result.status == 200) {
    ElMessage({
      message: '查询监控列表成功',
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
    <el-button type="primary" @click="getEquipmentList" v-loading="loading">查询监控列表</el-button>
  </el-form-item>
</el-form>
</template>