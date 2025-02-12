<script setup name="GetCallRecord">
import { reactive, ref } from 'vue'
import {ElMessage} from 'element-plus'
import { checkInstance, getInstanceFCC } from '../../use-fcc'
import { setLog } from '../../use-log'
const token = ref('')
const extSysAccount = ref('')
const loading = ref(false)
const callForm = reactive({
  extSysAccount: '', // 用户账号
  timeBegin: null, // 开始时间
  timeEnd: null, // 结束时间
  mediaType: '', // 媒体类型 5 电话 8 视频呼叫9 语音
  pageSize: '', // 每页大小
  pageNum: '' // 页数
})
const disabledDate = (time) => {
  return time.getTime() > Date.now()
}
const getCallRecord = async () => {
  setLog({
    name: '开始查询通话记录'
  })
  if (loading.value) {
    setLog({
      name: '查询通话记录结果',
      msg: '请先实例化'
    })
    return
  }
  if (!await checkInstance()) {
    setLog({
      name: '查询通话记录',
      msg: '请先实例化'
    })
    ElMessage({
      message: '请先实例化',
      type: 'warning'
    })
    return
  }
  if (!callForm.extSysAccount) {
    setLog({
      name: '查询通话记录',
      msg: `参数错误,请输入用户账号`
    })
    ElMessage({
      message: '请输入用户账号',
      type: 'warning'
    })
    return
  }
  loading.value = true
  let result = await getInstanceFCC().getCallRecord(callForm)
  setLog({
    name: '查询通话记录结果',
    msg: result
  })
  loading.value = false
  if (result.status == 200) {
    ElMessage({
      message: '查询通话记录成功',
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
<el-form :model="callForm" >
  <el-row>
    <el-col :span="11" class="col-left">
      <el-form-item label="账号">
        <el-input v-model="callForm.extSysAccount" placeholder="请输入账号"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="11">
      <el-form-item label="呼叫类型">
        <el-select v-model="callForm.mediaType" placeholder="呼叫类型">
          <el-option label="电话" value="5"></el-option>
          <el-option label="视频" value="8"></el-option>
          <el-option label="语音" value="9"></el-option>
        </el-select>
      </el-form-item>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="11" class="col-left">
      <el-form-item label="开始时间">
        <el-date-picker
          v-model="callForm.timeBegin"
          type="datetime"
          placeholder="选择日期时间"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
        >
        </el-date-picker>
      </el-form-item>
    </el-col>
    <el-col :span="11">
      <el-form-item label="结束时间">
        <el-date-picker
          v-model="callForm.timeEnd"
          type="datetime"
          placeholder="选择日期时间"
          :disabled-date="disabledDate"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
        >
        </el-date-picker>
      </el-form-item>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="11" class="col-left">
      <el-form-item label="页码">
        <el-input v-model.number="callForm.pageSize" placeholder="请输入页码"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="11">
      <el-form-item label="页数">
        <el-input v-model.number="callForm.pageNum" placeholder="请输入页数"></el-input>
      </el-form-item>
    </el-col>
  </el-row>
  <el-form-item>
    <el-button type="primary" @click="getCallRecord" :loading="loading">查询通话记录</el-button>
  </el-form-item>
</el-form>
</template>
<style scoped>
.col-left {
  margin-right: 20px;
}
</style>