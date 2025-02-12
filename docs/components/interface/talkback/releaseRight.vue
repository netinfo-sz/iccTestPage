<script setup name="ReleaseRight">
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
const releaseRight = () => {
  groupRef.value.validate(async (valid) => {
    if (valid) {
      setLog({
        name: '释放话权'
      })
      if (loading.value) {
        setLog({
          name: '释放话权',
          msg: '请先实例化'
        })
        return
      }
      if (!await checkInstance()) {
        setLog({
          name: '释放话权',
          msg: '请先实例化'
        })
        ElMessage({
          message: '请先实例化',
          type: 'warning'
        })
        return
      }
      loading.vue = true
      let result = await getInstanceFCC().releaseRight(groupForm.value)
      setLog({
        name: '释放话权结果',
        msg: result
      })
      loading.vue = false
      if (result.status == 200) {
        ElMessage({
          message: '释放话权成功',
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
        <el-button type="primary" @click="releaseRight" v-loading="loading">释放话权</el-button>
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