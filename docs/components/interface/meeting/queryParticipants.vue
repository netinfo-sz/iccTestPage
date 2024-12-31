<script setup name="QueryParticipants">
import { ref } from 'vue'
import {ElMessage} from 'element-plus'
import { checkInstance, getInstanceFCC } from '../../use-fcc'
import { setLog } from '../../use-log'
const meetingSno = ref('')
const loading = ref(false)
const queryParticipants = async () => {
  setLog({
    name: '开始查询参会成员'
  })
  if (loading.vue) {
    setLog({
      name: '查询参会成员结果',
      msg: '请先实例化'
    })
    return
  }
  if (!await checkInstance()) {
    setLog({
      name: '查询参会成员',
      msg: '请先实例化'
    })
    ElMessage({
      message: '请先实例化',
      type: 'warning'
    })
    return
  }
  if (!meetingSno.value) {
    setLog({
      name: '查询参会成员',
      msg: `参数错误,请输入会议流水号`
    })
    ElMessage({
      message: '请输入会议流水号',
      type: 'warning'
    })
    return
  }
  loading.vue = true
  let result = await getInstanceFCC().queryParticipants({
    meetingSno: meetingSno.value
  })
  setLog({
    name: '查询参会成员结果',
    msg: result
  })
  loading.vue = false
  if (result.status == 200) {
    ElMessage({
      message: '查询参会成员成功',
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
  <el-form-item label="会议流水号">
    <el-input v-model="meetingSno" placeholder="请输入测试会议流水号"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="queryParticipants" v-loading="loading">查询参会成员</el-button>
  </el-form-item>
</el-form>
</template>