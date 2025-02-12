<script setup name="Login">
import { ref, reactive } from 'vue'
import {ElMessage} from 'element-plus'
import { checkInstance, getInstanceFCC } from '../../use-fcc'
import { setLog } from '../../use-log'
const token = ref('')
const userAccount = ref('')
const imForm = ref({
  msgContent: '', // 消息内容
  msgType: 1, // 消息类型 1:文本 2:图片 3:文件
  toUserId: '', // 接收消息的对象编号USER_CODE
  dialogId: '', // 对话框窗口id
})
const loading = ref(false)
const formRef = ref(null)
const sendMsg = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      if (loading.value) {
        setLog({
          name: '发送结果',
          msg: '请先实例化'
        })
        return
      }
      if (!await checkInstance()) {
        setLog({
          name: '发送',
          msg: '请先实例化'
        })
        ElMessage({
          message: '请先实例化',
          type: 'warning'
        })
        return
      }
      loading.value = true
      let result = await getInstanceFCC().sendIM(imForm.value)
      setLog({
        name: '发送结果',
        msg: result
      })
      loading.value = false
      if (result.status == 200) {
        ElMessage({
          message: '发送成功',
          type: 'success'
        })
      } else {
        ElMessage({
          message: result.msg,
          type: 'info'
        })
      }
    }
  })
}
const rules = {
  msgContent: [
    { required: true, message: '请输入消息内容', trigger: ['blur', 'change'] }
  ],
  toUserId: [
    { required: true, message: '请输入接收人账号', trigger: ['blur', 'change'] }
  ],
  dialogId: [ { required: true, message: '请输入对话框Id', trigger: ['blur', 'change'] } ]
}
const getIMList = async () => {
  let result = await getInstanceFCC().getIMDialogList()
  setLog({
    name: '获取对话框列表',
    msg: result
  })
  if (result.status == 200) {
    ElMessage({
      message: '获取对话框列表成功',
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
<el-form :model="imForm" :rules="rules" ref="formRef">
  <el-row>
    <el-col :span="24">
      <el-form-item label="消息内容" prop="msgContent">
        <el-input v-model="imForm.msgContent" placeholder="请输入消息内容"></el-input>
      </el-form-item>
    </el-col>
  </el-row>
  <el-row class="base-row">
    <el-col :span="11">
      <el-form-item label="接收人账号" prop="toUserId">
        <el-input v-model="imForm.toUserId" placeholder="请输入接收人账号"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="11">
      <el-form-item label="对话框Id" prop="dialogId">
        <el-input v-model="imForm.dialogId" placeholder="请输入对话框Id"></el-input>
      </el-form-item>
    </el-col>
  </el-row>
  <el-form-item>
    <el-button type="primary" @click="getIMList">获取对话框列表</el-button>
    <el-button type="primary" @click="sendMsg" :loading="loading">发送</el-button>
  </el-form-item>
</el-form>
</template>
<style scoped>
.base-row {
  justify-content: space-between;
}
</style>