<script setup name="GetGroupList">
import { ref } from 'vue'
import {ElMessage} from 'element-plus'
import { checkInstance, getInstanceFCC } from '../../use-fcc'
import { setLog } from '../../use-log'
const loading = ref(false)
const getGroupList = async () => {
  setLog({
    name: '开始查询与自己相关的群组和人员'
  })
  if (loading.vue) {
    setLog({
      name: '查询自己相关群组结果',
      msg: '请先实例化'
    })
    return
  }
  if (!await checkInstance()) {
    setLog({
      name: '查询自己相关群组',
      msg: '请先实例化'
    })
    ElMessage({
      message: '请先实例化',
      type: 'warning'
    })
    return
  }
  loading.vue = true
  let result = await getInstanceFCC().getGroupList()
  setLog({
    name: '查询自己相关群组结果',
    msg: result
  })
  loading.vue = false
  if (result.status == 200) {
    ElMessage({
      message: '查询自己相关群组成功',
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
    <el-button type="primary" @click="getGroupList" v-loading="loading">查询与自己相关的群组和人员</el-button>
  </el-form-item>
</el-form>
</template>