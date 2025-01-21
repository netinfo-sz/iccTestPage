<script setup name="addMeeting">
import { ref, reactive,computed } from 'vue'
import {ElMessage} from 'element-plus'
import { checkInstance, getInstanceFCC } from '../../use-fcc'
import { setLog } from '../../use-log'
import addNumber from './addNumber.vue'
const meetingInfo = reactive({
  MEETING_SNO: '',
  MEETING_ID: '',
})
const loading = ref(false)
const meetingList = ref([{"objId": "","objName": "","objType": "","partDev": "","typeId": ""}])
const handleAddMeeting = () => {
  meetingList.value.push(
    {"objId": "","objName": "","objType": "","partDev": "","typeId": ""}
  )
}
const handleCancelMembers = (index) => {
  meetingList.value.splice(index, 1)
}
const addMembers = async (type) => {
  setLog({
    name: '开始添加人员'
  })
  if (loading.value) {
    setLog({
      name: '创建添加人员',
      msg: '请先实例化'
    })
    return
  }
  if (!await checkInstance()) {
    setLog({
      name: '添加人员',
      msg: '请先实例化',
      type: 'warning'
    })
    return
  }
  if (!meetingInfo.MEETING_SNO) {
    setLog({
      name: '添加人员',
      msg: `参数错误,请输入会议流水号`,
      type: 'warning'
    })
    return
  }
  if (!meetingInfo.MEETING_ID) {
    setLog({
      name: '添加人员',
      msg: `参数错误,请输入会议id`,
      type: 'warning'
    })
    return
  }
  loading.value = true
  let result = await getInstanceFCC().addMeetingMembers({
    meetingInfo: meetingInfo,
    members: JSON.parse(JSON.stringify(meetingList.value)), // 会议成员
  })
  setLog({
    name: '添加人员结果',
    msg: result
  })
  loading.value = false
  if (result.status == 200) {
    ElMessage({
      message: '添加人员成功',
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
  <div class="form-title">{{ 'meetingInfo' }}</div>
  <el-form-item label="会议流水号" :style="{'margin-top': '10px', 'margin-left': '15px'}">
    <el-input v-model="meetingInfo.MEETING_SNO" placeholder="请输入会议流水号" ></el-input>
  </el-form-item>
  <el-form-item label="会议id" :style="{'margin-top': '10px', 'margin-left': '15px'}">
    <el-input v-model="meetingInfo.MEETING_ID" placeholder="请输入会议id" ></el-input>
  </el-form-item>
  <addNumber :meetingList="meetingList" @add-meeting="handleAddMeeting" @cancel-members="handleCancelMembers" />
  <el-form-item>
    <el-button type="primary" @click="addMembers" :loading="loading">添加人员</el-button>
  </el-form-item>
</el-form>
</template>

<style scoped>
.form-title{
  font-size: 16px;
  margin-bottom: 10px;
}
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