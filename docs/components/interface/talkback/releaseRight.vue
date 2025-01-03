<script setup name="ReleaseRight">
import { ref } from 'vue'
import {ElMessage} from 'element-plus'
import { checkInstance, getInstanceFCC } from '../../use-fcc'
import { setLog } from '../../use-log'
const groupId = ref('')
const loading = ref(false)
const releaseRight = async () => {
  setLog({
    name: '开始释放话权'
  })
  if (loading.vue) {
    setLog({
      name: '释放话权结果',
      msg: '请先实例化'
    })
    return
  }
  if (!await checkInstance()) {
    setLog({
      name: '释放话权',
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
      name: '释放话权',
      msg: `参数错误,请输入群组ID`
    })
    ElMessage({
      message: '请输入群组ID',
      type: 'warning'
    })
    return
  }
  loading.vue = true
  let result = await getInstanceFCC().releaseRight({
    groupId: groupId.value
  })
  setLog({
    name: '释放话权结果',
    msg: result
  })
  loading.vue = false
  if (result.status == 200) {
    ElMessage({
      message: '释放话权成功',
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
    <el-button type="primary" @click="releaseRight" v-loading="loading">释放话权</el-button>
  </el-form-item>
</el-form>
</template>