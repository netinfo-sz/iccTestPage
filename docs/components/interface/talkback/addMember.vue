<script setup name="AddMember">
import { ref } from 'vue'
import {ElMessage} from 'element-plus'
import { checkInstance, getInstanceFCC } from '../../use-fcc'
import { setLog } from '../../use-log'
const loading = ref(false)
const groupRef = ref(null)
const groupForm = ref({
  groupId: '',
  dcId: '', // 调度号
  userId: '' // 人员ID
})
const rules = {
  groupId: [{ required: true, message: '请输入群组ID', trigger: ['blur', 'change'] }],
  dcId: [{ required: true, message: '请输入调度号', trigger: ['blur', 'change'] }],
  userId: [{ required: true, message: '请输入人员ID', trigger: ['blur', 'change'] }]
}
const addMember = () => {
  groupRef.value.validate(async (valid) => {
    if (valid) {
      setLog({
        name: '添加组成员'
      })
      if (loading.value) {
        setLog({
          name: '添加组成员',
          msg: '请先实例化'
        })
        return
      }
      if (!await checkInstance()) {
        setLog({
          name: '添加组成员',
          msg: '请先实例化'
        })
        ElMessage({
          message: '请先实例化',
          type: 'warning'
        })
        return
      }
      loading.vue = true
      let result = await getInstanceFCC().tempUserJoinGroup(groupForm.value)
      setLog({
        name: '添加组成员结果',
        msg: result
      })
      loading.vue = false
      if (result.status == 200) {
        ElMessage({
          message: '添加组成员成功',
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
<el-form :model="groupForm" ref="groupRef" :rules="rules">
  <el-row>
    <el-col :span="7">
      <el-form-item label="群组ID" prop="groupId">
        <el-input v-model="groupForm.groupId" placeholder="请输入群组ID"></el-input>
      </el-form-item>
    </el-col>
    <el-col class="col-right" :span="7">
      <el-form-item label="调度号" prop="dcId">
        <el-input v-model="groupForm.dcId" placeholder="请输入调度号"></el-input>
      </el-form-item>
    </el-col>
    <el-col class="col-right" :span="7">
      <el-form-item label="人员id" prop="userId">
        <el-input v-model="groupForm.userId" placeholder="请输入人员id"></el-input>
      </el-form-item>
    </el-col>
  </el-row>
  <el-form-item>
    <el-button type="primary" @click="addMember" v-loading="loading">添加组成员</el-button>
  </el-form-item>
</el-form>
</template>
<style scoped>
.col-right {
  margin-left: 20px;
}
</style>