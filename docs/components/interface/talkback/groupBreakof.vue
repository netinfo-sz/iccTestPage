<script setup name="GroupBreakof">
import { ref } from 'vue'
import {ElMessage} from 'element-plus'
import { checkInstance, getInstanceFCC } from '../../use-fcc'
import { setLog } from '../../use-log'
const loading = ref(false)
const groupRef = ref(null)
const groupForm = ref({
  groupId: ''
})
const rules = {
  groupId: [{ required: true, message: '请输入群组ID', trigger: ['blur', 'change'] }]
}
const groupBreakOff = () => {
  groupRef.value.validate(async (valid) => {
    if (valid) {
      setLog({
        name: '强拆群组'
      })
      if (loading.value) {
        setLog({
          name: '强拆群组',
          msg: '请先实例化'
        })
        return
      }
      if (!await checkInstance()) {
        setLog({
          name: '强拆群组',
          msg: '请先实例化'
        })
        ElMessage({
          message: '请先实例化',
          type: 'warning'
        })
        return
      }
      loading.vue = true
      let result = await getInstanceFCC().groupBreakof(groupForm.value)
      setLog({
        name: '强拆群组结果',
        msg: result
      })
      loading.vue = false
      if (result.status == 200) {
        ElMessage({
          message: '强拆群组成功',
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
    <el-col :span="12">
      <el-form-item label="群组ID" prop="groupId">
        <el-input v-model="groupForm.groupId" placeholder="请输入群组ID"></el-input>
      </el-form-item>
    </el-col>
    <el-col class="col-right" :span="8">
      <el-form-item>
        <el-button type="primary" @click="groupBreakOff" v-loading="loading">强拆群组</el-button>
      </el-form-item>
    </el-col>
  </el-row>
</el-form>
</template>
<style scoped>
.col-right {
  margin-left: 20px;
}
</style>