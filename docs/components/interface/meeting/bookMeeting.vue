<script setup name="BookMeeting">
import { ref, reactive,computed } from 'vue'
import {ElMessage} from 'element-plus'
import { checkInstance, getInstanceFCC } from '../../use-fcc'
import { setLog } from '../../use-log'
const meetingName = ref('会议测试')
const loading = ref(false)
const startMeetingFlag = ref(false)
const startMeetingList = ref(null)
const durationtext = ref('1')
const startTimestr = ref('')
const meetingList = ref([{"objId": "1","objName": "人员","objType": "2","partDev": "4","typeId": "1"}])
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始，需要加 1
  const day = String(date.getDate()).padStart(2, '0'); // 日期
  const hours = String(date.getHours()).padStart(2, '0'); // 小时
  const minutes = String(date.getMinutes()).padStart(2, '0'); // 分钟
  const seconds = String(date.getSeconds()).padStart(2, '0'); // 秒钟
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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
      msg: '请先实例化'
    })
    ElMessage({
      message: '请先实例化',
      type: 'warning'
    })
    return
  }
  loading.vue = true
  let result = await getInstanceFCC().bookMeeting({
    meetingName: meetingName.value,
    memberLists: JSON.parse(startMeetingList.value), // 会议成员
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
const showStartMeetingDia = (type) => {
  startMeetingFlag.value = true
  startMeetingList.value = JSON.stringify(meetingList.value)
}
</script>

<template>
<el-form>
  <el-form-item>
    <el-button type="primary" @click="showStartMeetingDia('1')" v-loading="loading">预约会议</el-button>
  </el-form-item>
</el-form>
<el-dialog title="预约会议数据" v-model="startMeetingFlag" width="36%" center>
  <div>备注:（OBJ_TYPE=1为设备，OBJ_TYPE=2为人员，OBJ_TYPE=3为通讯录）</div>
  <div>members:（要添加的人员设备或者通讯录信息系统接口里获取数据）</div>
  <div>meetingName:（会议名称）</div>
  <div>durationtext: 会议时长单位小时，最长为10小时</div>
  <el-form>
    <el-form-item label="会议名称" :style="{'margin-top': '10px'}">
      <el-input v-model="meetingName" placeholder="请输入会议名称" ></el-input>
    </el-form-item>
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
      <el-input v-model="durationtext" placeholder="请输入会议名称" ></el-input>
    </el-form-item>
    <el-form-item label="会议成员">
      <el-input v-model="startMeetingList" type="textarea" :rows="5"></el-input>
    </el-form-item>
  </el-form>
  <template #footer>
    <el-button type="primary" @click="startMeeting">确定</el-button>
  </template>
</el-dialog>
</template>