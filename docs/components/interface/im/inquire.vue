<script setup name="Login">
import { ref, reactive } from 'vue'
import {ElMessage} from 'element-plus'
import { checkInstance, getInstanceFCC } from '../../use-fcc'
import { setLog } from '../../use-log'
const token = ref('')
const userAccount = ref('')
const loading = ref(false)
const formRef = ref(null)
const historyFrom = reactive({
  pageNum: 1, // 页码
  pageSize: 10, // 页数
  dialogId: ''// 对话框Id
})
const rules = {
  dialogId: [
    { required: true, message: '请输入对话框Id', trigger: ['blur', 'change'] }
  ]
}
const getImHistoryList = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      if (!await checkInstance()) {
        setLog({
          name: '获取im消息',
          msg: '请先实例化'
        })
        ElMessage({
          message: '请先实例化',
          type: 'warning'
        })
        return
      }
      loading.value = true
      let result = await getInstanceFCC().searchIM(historyFrom)
      setLog({
        name: '获取im消息结果',
        msg: result
      })
      loading.value = false
      if (result.status == 200) {
        ElMessage({
          message: '获取im消息成功',
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
</script>

<template>
<el-form :model="historyFrom" :rules="rules" ref="formRef">
  <el-row>  
    <el-col class="item-col" :span="7">
      <el-form-item label="对话框Id" prop="dialogId">
        <el-input v-model="historyFrom.dialogId" placeholder="对话框Id"></el-input>
      </el-form-item>
    </el-col>
    <el-col class="item-col" :span="7">
      <el-form-item label="页码" prop="pageNum">
        <el-input v-model.number="historyFrom.pageNum" placeholder="页码"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="7">
      <el-form-item label="页数" prop="pageSize">
        <el-input v-model.number="historyFrom.pageSize" placeholder="页数"></el-input>
      </el-form-item>
    </el-col>
  </el-row>
  <el-form-item>
    <el-button type="primary" @click="getImHistoryList" :loading="loading">获取历史消息</el-button>
  </el-form-item>
</el-form>
</template>
<style scoped>
.item-col {
  margin-right: 16px;
}
</style>