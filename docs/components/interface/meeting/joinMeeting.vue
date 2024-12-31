<script setup name="JoinMeeting">
import { ref } from 'vue'
import {ElMessage} from 'element-plus'
import { checkInstance, getInstanceFCC } from '../../use-fcc'
import { setLog } from '../../use-log'
const meetingCode = ref('')
const loading = ref(false)
const login = async () => {
  setLog({
    name: '开始加入会议'
  })
  if (loading.vue) {
    setLog({
      name: '加入会议结果',
      msg: '请先实例化'
    })
    return
  }
  if (!await checkInstance()) {
    setLog({
      name: '加入会议',
      msg: '请先实例化'
    })
    ElMessage({
      message: '请先实例化',
      type: 'warning'
    })
    return
  }
  if (!meetingCode.value) {
    setLog({
      name: '加入会议',
      msg: `参数错误,请输入会议号`
    })
    ElMessage({
      message: '请输入会议号码',
      type: 'warning'
    })
    return
  }
  loading.vue = true
  let result = await getInstanceFCC().joinMeeting({
    meetingCode: meetingCode.value,
    PART_DEV: '4', // 是否开摄像头
    ISVIDEO: '1', // 是否开启摄像头
    ISMUTE: '1', // 是否开启麦克风
    ACCESSCODE: meetingCode.value, // 会议接入码
  })
  setLog({
    name: '加入会议结果',
    msg: result
  })
  loading.vue = false
  if (result.status == 200) {
    ElMessage({
      message: '加入会议成功',
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
  <el-form-item label="会议号">
    <el-input v-model="meetingCode" placeholder="请输入测试会议号"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="login" v-loading="loading">加入会议</el-button>
  </el-form-item>
</el-form>
</template>