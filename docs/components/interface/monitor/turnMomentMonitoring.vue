<script setup name="TurnMomentMonitoring">
import { ref } from 'vue'
import {ElMessage} from 'element-plus'
import { checkInstance, getInstanceFCC } from '../../use-fcc'
import { setLog } from '../../use-log'
const loading = ref(false)
const matrixInfo = ref({
  x: 100,
  y:100,
  w: 1000,
  h: 800,
  r: 2,
  c: 2
})
const wallData = ref({"monitorList":[{"resId": "TEST", "resName": "90001"}]})
const wallList = ref([{
  "resId": "TEST",
  "resName": "90001"
}])
const enterMatrix = async () => {
  setLog({
    name: '打开矩阵监控墙'
  })
  if (loading.vue) {
    setLog({
      name: '打开矩阵监控墙结果',
      msg: '请先实例化'
    })
    return
  }
  if (!await checkInstance()) {
    setLog({
      name: '打开矩阵监控墙',
      msg: '请先实例化'
    })
    ElMessage({
      message: '请先实例化',
      type: 'warning'
    })
    return
  }
  loading.vue = true
  console.log('=========heheh========', matrixInfo.value)
  let result = await getInstanceFCC().turnMomentMonitoring(matrixInfo.value)
  setLog({
    name: '打开矩阵监控墙结果',
    msg: result
  })
  loading.vue = false
  if (result.status == 200) {
    ElMessage({
      message: '打开矩阵监控墙成功',
      type: 'success'
    })
  } else {
    ElMessage({
      message: result.msg,
      type: 'info'
    })
  }
}
// 添加设备
const addDivice = () => {
  wallList.value.push({
    "resId": "",
    "resName": ""
  })
}
// 删除设备
const delDivice = (index) => {
  wallList.value.splice(index, 1)
}
const confirmChangeMonitoring = async () => { 
  let result = await getInstanceFCC().changeMonitorWall({
    monitorList: wallList.value
  })
  setLog({
    name: '切换矩阵监控结果',
    msg: result
  })
  loading.vue = false
  if (result.status == 200) {
    ElMessage({
      message: '切换矩阵监控成功',
      type: 'success'
    })
  } else {
    ElMessage({
      message: result.msg,
      type: 'info'
    })
  }
}
// 关闭矩阵监控墙
const closeMonitoring = async () => {
  let result = await getInstanceFCC().closeMonitorWall()
  setLog({
    name: '关闭矩阵监控墙结果',
    msg: result
  })
  loading.vue = false
  if (result.status == 200) {
    ElMessage({
      message: '关闭矩阵监控墙成功',
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
  <div> {{ '矩阵监控墙信息' }} </div>
  <el-row>
    <el-col :span="7">
      <el-form-item label="x轴偏移量">
        <el-input v-model.number="matrixInfo.x" placeholder="x轴偏移量"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="7">
      <el-form-item label="y轴偏移量">
        <el-input v-model.number="matrixInfo.y" placeholder="y轴偏移量"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="7"> 
      <el-form-item label="监控墙宽度">
        <el-input v-model.number="matrixInfo.w" placeholder="监控墙宽度"></el-input>
      </el-form-item>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="7">
      <el-form-item label="监控墙高度">
        <el-input v-model.number="matrixInfo.h" placeholder="监控墙高度"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="7">
      <el-form-item label="监控墙横向数">
        <el-input v-model.number="matrixInfo.r" placeholder="监控墙横向数"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="7"> 
      <el-form-item label="监控墙纵向数">
        <el-input v-model.number="matrixInfo.c" placeholder="监控墙纵向数"></el-input>
      </el-form-item>
    </el-col>
  </el-row>
  <el-form-item>
    <el-button type="primary" @click="enterMatrix" v-loading="loading">打开矩阵监控墙</el-button>
  </el-form-item>
  <div class="change-monitor-wrap">
    <div>切换矩阵监设备数据(切换监控墙前请先打开监控墙)</div>
    <el-row v-for="(item, index) in wallList" :key="index">
      <el-col :span="8">
        <el-form-item label="设备编号">
          <el-input v-model="item.resId" placeholder="设备编号"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="设备名称">
          <el-input v-model="item.resName" placeholder="设备名称"></el-input>
        </el-form-item>
      </el-col>
      <el-button type="primary" @click="addDivice(index)" v-if="index === 0"> {{ '添加' }} </el-button>
      <el-button type="danger" @click="delDivice(index)" v-if="index > 0"> {{ '删除' }} </el-button>
    </el-row>
  </div>
  <el-form-item>
    <el-button type="primary" @click="confirmChangeMonitoring" v-loading="loading">切换矩阵监控墙</el-button>
    <el-button type="primary" @click="closeMonitoring" v-loading="loading">关闭矩阵监控墙</el-button>
  </el-form-item>
</el-form>
</template>

<style scoped>
.el-col {
  margin-right: 16px;
}
.change-monitor-wrap {
  padding-top: 10px;
  border-top: 1px dotted #ccc;
}
</style>