<script setup name="GissubScribe">
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
        name: '订阅GIS终端'
      })
      if (loading.value) {
        setLog({
          name: '订阅GIS终端',
          msg: '请先实例化'
        })
        return
      }
      if (!await checkInstance()) {
        setLog({
          name: '订阅GIS终端',
          msg: '请先实例化'
        })
        ElMessage({
          message: '请先实例化',
          type: 'warning'
        })
        return
      }
      loading.vue = true
      let result = await getInstanceFCC().gissubScribe(groupForm.value)
      setLog({
        name: '订阅GIS终端结果',
        msg: result
      })
      loading.vue = false
      if (result.status == 200) {
        ElMessage({
          message: '订阅GIS终端成功',
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
        <el-button type="primary" @click="groupBreakOff" v-loading="loading">订阅GIS终端</el-button>
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