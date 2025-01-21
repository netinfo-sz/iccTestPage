<script setup name="JoinMeeting">
import { reactive, ref } from 'vue'
import {ElMessage} from 'element-plus'
import { checkInstance, getInstanceFCC } from '../../use-fcc'
import { setLog } from '../../use-log'
const loading = ref(false)
const formData = reactive({
  PART_DEV: '4', // 是否开摄像头
  ISVIDEO: '1', // 是否开启摄像头
  ISMUTE: '1', // 是否开启麦克风
  meetingCode: '', // 会议号
})
const login = async () => {
  setLog({
    name: '开始加入会议'
  })
  if (loading.value) {
    setLog({
      name: '加入会议结果',
      msg: '请先实例化'
    })
    return
  }
  if (!await checkInstance()) {
    setLog({
      name: '加入会议',
      msg: '请先实例化',
      type: 'warning'
    })
    return
  }
  if (!formData.meetingCode) {
    setLog({
      name: '加入会议',
      msg: `参数错误,请输入会议号`,
      type: 'warning'
    })
    return
  }
  loading.value = true
  let result = await getInstanceFCC().joinMeeting({
    meetingCode: formData.meetingCode,
    PART_DEV: formData.PART_DEV, // 是否开摄像头
    ISVIDEO: formData.ISVIDEO, // 是否开启摄像头
    ISMUTE: formData.ISMUTE, // 是否开启麦克风
    ACCESSCODE: formData.meetingCode, // 会议接入码
  })
  setLog({
    name: '加入会议结果',
    msg: result
  })
  loading.value = false
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
<el-form :model="formData">
  <el-form-item label="入会方式">
    <el-radio-group v-model="formData.PART_DEV">
      <el-radio label="3">电话</el-radio>
      <el-radio label="4">视频</el-radio>
      <el-radio label="6">语音</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="是否开启摄像头">
    <el-switch
      v-model="formData.ISVIDEO"
      active-text="开启"
      active-value="1"
      inactive-value="0"
      inactive-text="不开启">
    </el-switch>
  </el-form-item>
  <el-form-item label="是否打开麦克风">
    <el-switch
      v-model="formData.ISMUTE"
      active-text="打开"
      active-value="1"
      inactive-value="0"
      inactive-text="不打开">
    </el-switch>
  </el-form-item>
  <el-form-item label="会议号">
    <el-input v-model="formData.meetingCode" placeholder="请输入测试会议号"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="login" :loading="loading">加入会议</el-button>
  </el-form-item>
</el-form>
</template>