<script setup name="CreateConf">
import { ref, reactive,computed } from 'vue'
import {ElMessage} from 'element-plus'
import { checkInstance, getInstanceFCC } from '../../use-fcc'
import { setLog } from '../../use-log'
import addNumber from './addNumber.vue'
const meetingName = ref('会议测试')
const loading = ref(false)
const meetingType = ref('3') // 会议类型 1 视频 3 语音
const meetingList = ref([{"objId": "","objName": "","objType": "","partDev": "","typeId": ""}])
const handleAddMeeting = () => {
  meetingList.value.push(
    {"objId": "","objName": "","objType": "","partDev": "","typeId": ""}
  )
}
const handleCancelMembers = (index) => {
  meetingList.value.splice(index, 1)
}
const startMeeting = async (type) => {
  setLog({
    name: '开始创建会议'
  })
  if (loading.value) {
    setLog({
      name: '创建会议结果',
      msg: '请先实例化'
    })
    return
  }
  if (!await checkInstance()) {
    setLog({
      name: '创建会议',
      msg: '请先实例化',
      type: 'warning'
    })
    return
  }
  if (!meetingName.value) {
    setLog({
      name: '创建会议',
      msg: `参数错误,请输入会议名称`,
      type: 'warning'
    })
    return
  }
  loading.value = true
  let result = await getInstanceFCC().createConf({
    meetingName: meetingName.value,
    members: JSON.parse(JSON.stringify(meetingList.value)), // 会议成员
    type: meetingType.value // 会议类型 1 视频 3 语音
  })
  setLog({
    name: '创建会议结果',
    msg: result
  })
  loading.value = false
  if (result.status == 200) {
    ElMessage({
      message: '创建会议成功',
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
  <el-form-item label="会议名称" :style="{'margin-top': '10px'}">
    <el-input v-model="meetingName" placeholder="请输入会议名称" ></el-input>
  </el-form-item>
  <el-form-item label="会议类型" :style="{'margin-top': '10px'}">
    <el-radio-group v-model="meetingType">
      <el-radio label="1">语音会议</el-radio>
      <el-radio label="3">视频会议</el-radio>
    </el-radio-group>
  </el-form-item>
  <addNumber :meetingList="meetingList" @add-meeting="handleAddMeeting" @cancel-members="handleCancelMembers" />
  <el-form-item>
    <el-button type="primary" @click="startMeeting" :loading="loading">创建会议</el-button>
  </el-form-item>
</el-form>
</template>

<style scoped>
.meet-list{
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.meet-item{
    width: 24.25%;
    margin-right: 1%;
}
.meet-item:last-child{
  margin-right: 0;
}
</style>