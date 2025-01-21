<script setup name="ConferenceInquiry">
import { ref, reactive } from 'vue'
import {ElMessage} from 'element-plus'
import { checkInstance, getInstanceFCC } from '../../use-fcc'
import { setLog } from '../../use-log'
const loading = ref(false)
const formData = reactive({
  meetingStatus: '0',
  meetingTime: '',
  page: '1',
  pagecount: '10'
})
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始，需要加 1
  const day = String(date.getDate()).padStart(2, '0'); // 日期
  const hours = String(date.getHours()).padStart(2, '0'); // 小时
  const minutes = String(date.getMinutes()).padStart(2, '0'); // 分钟
  const seconds = String(date.getSeconds()).padStart(2, '0'); // 秒钟
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const handleInputPage = (value) => {
  let newValue
  newValue = value.replace(/[^\d]/g,""); //清除"数字"以外的字符
  formData.page = newValue
}
const handleInputCount = (value) => {
  let newValue
  newValue = value.replace(/[^\d]/g,""); //清除"数字"以外的字符
  formData.pagecount = newValue
}
const conferenceInquiryFn = async () => {
  setLog({
    name: '开始查询会议列表'
  })
  if (loading.value) {
    setLog({
      name: '查询会议列表结果',
      msg: '请先实例化'
    })
    return
  }
  if (!await checkInstance()) {
    setLog({
      name: '查询会议列表',
      msg: '请先实例化',
      type: 'warning'
    })
    return
  }
  if (!formData.page) {
    setLog({
      name: '查询会议列表',
      msg: `参数错误,请输入当前页数`,
      type: 'warning'
    })
    return
  }
  if (!formData.pagecount) {
    setLog({
      name: '查询会议列表',
      msg: `参数错误,请输入当前页数显示条数`,
      type: 'warning'
    })
    return
  }
  loading.value = true
  let result = await getInstanceFCC().conferenceInquiry({
    page: formData.page, // 当前页数
    pagecount: formData.pagecount, // 当前页数显示条数
    meetingStatus: formData.meetingStatus, // 会议状态 0:未开始, 1:正在召开 2:已结束
    startTime: formData.meetingTime?formatDate(formData.meetingTime[0]):'', // 开始时间
    endTime: formData.meetingTime?formatDate(formData.meetingTime[1]):'' // 结束时间
  })
  setLog({
    name: '查询会议列表结果',
    msg: result
  })
  loading.value = false
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
<el-form :model="formData">
  <el-form-item label="当前页数">
    <el-input v-model.number="formData.page" placeholder="请输入当前页数" @input="handleInputPage"></el-input>
  </el-form-item>
  <el-form-item label="显示条数">
    <el-input v-model.number="formData.pagecount" placeholder="请输入当前页数显示条数" @input="handleInputCount"></el-input>
  </el-form-item>
  <el-form-item label="会议状态">
    <el-radio-group v-model="formData.meetingStatus">
      <el-radio label="">全部</el-radio>
      <el-radio label="0">未开始</el-radio>
      <el-radio label="1">正在召开</el-radio>
      <el-radio label="2">已结束</el-radio>
    </el-radio-group>
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
    <el-button type="primary" @click="conferenceInquiryFn" :loading="loading">查询会议列表</el-button>
  </el-form-item>
</el-form>
</template>