<script lang="ts" setup name="addNumber">
const emit = defineEmits<{
  (e: 'add-meeting'): void;
  (e: 'cancel-members', index: number): void; // 新增事件定义
}>();

const props = defineProps<{
  meetingList: Array<any>
}>()
const addMeeting = () => {
  emit('add-meeting');
};
const cancelMembers = (index: number) => {
  emit('cancel-members', index); // 触发新事件
};

</script>

<template>
<el-form>
  <el-form-item :style="{'margin-top': '10px'}">
      <el-button type="primary" @click="addMeeting">添加参会人员</el-button>
  </el-form-item>
  <div class="list-head">
    <span>objType</span>
    <span>objId</span>
    <span>objName</span>
    <span>partDev</span>
  </div>
  <el-form-item :style="{'margin-top': '10px'}" v-for="(item, index) in props.meetingList" :key="index" class="meet-list">
    <el-input v-model="item.objType" placeholder="请输入objType" class="meet-item"></el-input>
    <el-input v-model="item.objId" placeholder="请输入objId" class="meet-item"></el-input>
    <el-input v-model="item.objName" placeholder="请输入objName" class="meet-item"></el-input>
    <el-input v-model="item.partDev" placeholder="请输入partDev" class="meet-item"></el-input>
    <el-button v-show="index !== 0" type="danger" @click="cancelMembers(index)">删除</el-button>
  </el-form-item>
</el-form>
</template>

<style scoped>
.list-head{
  display: flex;
  align-items: center;
}
.list-head span {
  width: 20%;
  margin-right: 1%;
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
.meet-item{
    width: 20%;
    margin-right: 1%;
}
.meet-item:last-child{
  margin-right: 0;
}
</style>