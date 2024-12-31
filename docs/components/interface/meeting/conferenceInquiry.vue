<script setup name="ConferenceInquiry">
import { ref, reactive } from 'vue'
import {ElMessage} from 'element-plus'
import { checkInstance, getInstanceFCC } from '../../use-fcc'
import { setLog } from '../../use-log'
const loading = ref(false)
const showDialog = ref(false)
const formData = reactive({
  meetingStatus: '0',
  meetingTime: '',
})
const showConferenceDiaolog = async () => { 
  showDialog.value = true
}
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始，需要加 1
  const day = String(date.getDate()).padStart(2, '0'); // 日期
  const hours = String(date.getHours()).padStart(2, '0'); // 小时
  const minutes = String(date.getMinutes()).padStart(2, '0'); // 分钟
  const seconds = String(date.getSeconds()).padStart(2, '0'); // 秒钟
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
const conferenceInquiryFn = async () => {
  console.log(formData)
  setLog({
    name: '开始查询会议列表'
  })
  if (loading.vue) {
    setLog({
      name: '查询会议列表结果',
      msg: '请先实例化'
    })
    return
  }
  if (!await checkInstance()) {
    setLog({
      name: '查询会议列表',
      msg: '请先实例化'
    })
    ElMessage({
      message: '请先实例化',
      type: 'warning'
    })
    return
  }
  loading.vue = true
  let result = await getInstanceFCC().conferenceInquiry({
    page: '1', // 当前页数
    pagecount: '10', // 当前页数显示条数
    meetingStatus: formData.meetingStatus, // 会议状态 0:未开始, 1:正在召开 2:已结束
    startTime: formData.meetingTime?formatDate(formData.meetingTime[0]):'', // 开始时间
    endTime: formData.meetingTime?formatDate(formData.meetingTime[1]):'' // 结束时间
  })
  setLog({
    name: '查询会议列表结果',
    msg: result
  })
  loading.vue = false
  if (result.status == 200) {
    ElMessage({
      message: '查询会议列表成功',
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
    <el-button type="primary" @click="showConferenceDiaolog" v-loading="loading">查询会议列表</el-button>
  </el-form-item>
</el-form>
<el-dialog title="查询会议列表数据" v-model="showDialog">
  <el-form :model="formData">
    <el-form-item label="会议状态">
      <el-select v-model="formData.meetingStatus">
        <el-option label="未开始" value="0" />
        <el-option label="正在召开" value="1" />
        <el-option label="已结束" value="2" />
      </el-select>
    </el-form-item>
    <el-form-item label="会议时间">
      <el-date-picker  
        v-model="formData.meetingTime"
        type="datetimerange"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="conferenceInquiryFn" v-loading="loading">确定</el-button>
    </el-form-item>
  </el-form>
</el-dialog>
</template>