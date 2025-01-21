<script setup name="BookMeeting">
import { ref, reactive,computed } from 'vue'
import {ElMessage} from 'element-plus'
import { checkInstance, getInstanceFCC } from '../../use-fcc'
import { setLog } from '../../use-log'
import addNumber from './addNumber.vue'
const meetingName = ref('会议测试')
const loading = ref(false)
const startMeetingList = ref(null)
const durationtext = ref('1')
const startTimestr = ref('')
const meetingList = ref([{"objId": "","objName": "","objType": "","partDev": "","typeId": ""}])
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始，需要加 1
  const day = String(date.getDate()).padStart(2, '0'); // 日期
  const hours = String(date.getHours()).padStart(2, '0'); // 小时
  const minutes = String(date.getMinutes()).padStart(2, '0'); // 分钟
  const seconds = String(date.getSeconds()).padStart(2, '0'); // 秒钟
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
const handleInput = (value) => {
  let newValue
  newValue = value.replace(/[^\d]/g,""); //清除"数字"以外的字符
  durationtext.value = newValue
  if (value - 0 > 10) {
    durationtext.value = 10
  }
}
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
    name: '开始预约会议'
  })
  if (loading.vue) {
    setLog({
      name: '预约会议结果',
      msg: '请先实例化'
    })
    return
  }
  if (!await checkInstance()) {
    setLog({
      name: '预约会议',
      msg: '请先实例化',
      type: 'warning'
    })
    return
  }
  if (!meetingName.value) {
    setLog({
      name: '预约会议',
      msg: `参数错误,请输入会议名称`,
      type: 'warning'
    })
    return
  }
  if (!startTimestr.value) {
    setLog({
      name: '预约会议',
      msg: `参数错误,请选择开始时间`,
      type: 'warning'
    })
    return
  }
  if (!durationtext.value) {
    setLog({
      name: '预约会议',
      msg: `参数错误,请输入会议时长`,
      type: 'warning'
    })
    return
  }
  loading.vue = true
  let result = await getInstanceFCC().bookMeeting({
    meetingName: meetingName.value,
    memberLists: JSON.parse(JSON.stringify(meetingList.value)), // 会议成员
    durationtext: durationtext.value, // 会议时长
    startTimestr: formatDate(startTimestr.value) // 开始时间
  })
  setLog({
    name: '预约会议结果',
    msg: result
  })
  loading.vue = false
  if (result.status == 200) {
    ElMessage({
      message: '预约会议成功',
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
    <addNumber :meetingList="meetingList" @add-meeting="handleAddMeeting" @cancel-members="handleCancelMembers" />
    <el-form-item label="开始时间" :style="{'margin-top': '10px'}">
      <el-date-picker   
        :style="{'width': '100%'}"
        v-model="startTimestr" 
        type="datetime"
        placeholder="请选择会议开始时间"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item label="会议时长" :style="{'margin-top': '10px'}">
      <el-input v-model="durationtext" placeholder="请输入会议时长" @input="handleInput"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="startMeeting" :loading="loading">预约会议</el-button>
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