<script lang="ts" setup name="addMatrix">
const emit = defineEmits<{
  (e: 'add-divce'): void;
  (e: 'del-divice', index: number): void; // 新增事件定义
}>();

const props = defineProps<{
  matrixList: Array<any>
}>()
const addMeeting = () => {
  emit('add-divce');
};
const delDivice = (index: number) => {
  emit('del-divice', index); // 触发新事件
};

</script>

<template>
<el-form>
  <el-form-item :style="{'margin-top': '10px'}">
      <el-button type="primary" @click="addMeeting">添加监控设备</el-button>
  </el-form-item>
  <div class="list-head">
    <span class="span-name">设备名称</span>
    <span class="span-code">设备编号</span>
    <span class="span-id">设备ID</span>
  </div>
  <el-form-item :style="{'margin-top': '10px'}" v-for="(item, index) in props.matrixList" :key="index" class="meet-list">
    <el-input class='divice-name' v-model="item.deviceName" placeholder="设备名称"></el-input>
    <el-input class='divice-code' v-model="item.deviceCode" placeholder="设备编号"></el-input>
    <el-input class='divice-id' v-model="item.deviceId" placeholder="设备ID"></el-input>
    <el-button v-show="index > 1" type="danger" @click="delDivice(index)">删除</el-button>
  </el-form-item>
</el-form>
</template>

<style scoped>
.list-head{
  display: flex;
  align-items: center;
}
.span-name{
  width: 20%;
  margin-right: 1%;
}
.span-code{
  width: 44%;
  margin-right: 1%;
}
.span-id{
  width: 20%
}
.list-head span:last-child{
  margin-right: 0;
}
.meet-list{
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.divice-name {
  width: 20%;
  margin-right: 1%;
}
.divice-code {
  width: 44%;
  margin-right: 1%;
}
.divice-id {
  width: 20%;
  margin-right: 1%;
}
.meet-item:last-child{
  margin-right: 0;
}
</style>