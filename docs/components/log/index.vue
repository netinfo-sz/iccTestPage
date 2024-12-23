<script lang="ts" setup>
import {ref} from 'vue'
import {setLogEvent} from '../use-log'
const drawer = ref(false)
const logs = ref([]) as any

function logChange(data) {
  logs.value.unshift(data)
}
// 设置监听
setLogEvent(logChange)
const formatMsg = (msg) => {
  if (!msg) {
    return msg
  }
  return typeof msg === 'object' ? JSON.stringify(msg) : msg
}
</script>

<template>

  <!-- 逻辑处理 -->
  <!-- 按钮 -->
  <el-button class="log-big-box" @click="drawer = true" type="danger">操作日志</el-button>
  <!-- 日志弹框 -->
  <el-drawer
    v-model="drawer"
    title="操作日志"
    :close-on-click-modal="false"
    :modal="false"
    modal-class="log-modal"
  >
    <div class="log-box">
      <div class="log-item" v-for="(item, index) in logs.slice(0,100)" :key="item.time + '-' + item.name + '_' + index">
        <span class="log-item-time">{{item.time}}</span>
        <span class="log-item-name">【{{item.name}}】</span>
        <span class="log-item-msg">{{formatMsg(item.msg)}}</span>
        <div class="split"></div>
      </div>
    </div>
  </el-drawer>
</template>

<style scoped>
.log-big-box{
  position: fixed;
  bottom: 20px;
  right: 20px;
}
.log-box{
  border-top: 1px solid var(--vp-c-text-3);
  height: 100%;
  overflow-y: auto;
  padding: 10px;
}
.log-item{
  white-space: wrap;
  word-break: break-all;
}
.split{
  border-top: 1px dotted var(--vp-c-text-3);
  margin: 10px 0;
}
</style>

<style>
.log-modal{
  width: 30vw;
  inset: auto !important;
  right: 0 !important;
  top: 0 !important;
  height: 100vh;
}
.log-modal .el-drawer {
  width: 100% !important;
}
.log-modal .el-drawer__body{
  padding: 0;
}
</style>