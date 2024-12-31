<script setup name="CreateConf">
import { ref, reactive,computed } from 'vue'
import {ElMessage} from 'element-plus'
import { checkInstance, getInstanceFCC } from '../../use-fcc'
import { setLog } from '../../use-log'
const meetingName = ref('会议测试')
const loading = ref(false)
const meetingType = ref('3') // 会议类型 1 视频 3 语音
const startMeetingFlag = ref(false)
const startMeetingList = ref(null)
const meetingList = ref([{"objId": "1","objName": "人员","objType": "2","partDev": "4","typeId": "1"}])
const startMeeting = async (type) => {
  setLog({
    name: '开始创建会议'
  })
  if (loading.vue) {
    setLog({
      name: '创建会议结果',
      msg: '请先实例化'
    })
    return
  }
  if (!await checkInstance()) {
    setLog({
      name: '创建会议',
      msg: '请先实例化'
    })
    ElMessage({
      message: '请先实例化',
      type: 'warning'
    })
    return
  }
  loading.vue = true
  let result = await getInstanceFCC().createConf({
    meetingName: meetingName.value,
    members: JSON.parse(startMeetingList.value), // 会议成员
    type: meetingType.value // 会议类型 1 视频 3 语音
  })
  setLog({
    name: '创建会议结果',
    msg: result
  })
  loading.vue = false
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
const showStartMeetingDia = (type) => {
  startMeetingFlag.value = true
  meetingType.value = type
  startMeetingList.value = JSON.stringify(meetingList.value)
}
</script>

<template>
<el-form>
  <el-form-item>
    <el-button type="primary" @click="showStartMeetingDia('3')" v-loading="loading">视频会议</el-button>
    <el-button type="primary" @click="showStartMeetingDia('1')" v-loading="loading">语音会议</el-button>
  </el-form-item>
</el-form>
<el-dialog title="开始会议数据" v-model="startMeetingFlag">
  <div>备注:（OBJ_TYPE=1为设备，OBJ_TYPE=2为人员，OBJ_TYPE=3为通讯录）</div>
  <div>members:（要添加的人员设备或者通讯录信息系统接口里获取数据）</div>
  <div>meetingName:（会议名称）</div>
  <div>type:（会议类型）</div>
  <el-form>
    <el-form-item label="会议名称" :style="{'margin-top': '10px'}">
      <el-input v-model="meetingName" placeholder="请输入会议名称" ></el-input>
    </el-form-item>
    <el-form-item label="会议数据">
      <el-input v-model="startMeetingList" type="textarea" :rows="5"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="startMeeting">确定</el-button>
    </el-form-item>
  </el-form>
</el-dialog>
</template>