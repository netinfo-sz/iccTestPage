<script setup name="Callout">
import { ref, reactive } from 'vue'
import {ElMessage} from 'element-plus'
import { checkInstance, getInstanceFCC } from '../../use-fcc'
import { setLog } from '../../use-log'
const token = ref('')
const phoneFormRef = ref(null)
const loading = ref(false)
const phoneForm = reactive({
  phoneNum: ''
})
const rules = {
  phoneNum: [
    { required: true, message: '请输入电话号码', trigger: ['blur', 'change'] }
  ]
}
// 呼叫转移
const transferForm = reactive({
  address: '', // 转移地址，即转移设备类型对应的设备ID，转外线时是对方号码
  devicetype: '5', // 转移设备类型，技能队列为1，坐席为2，IVR为3，系统接入码为4，外部号码为5
  mode: '4' // 转移模式：释放转为0(支持：技能、坐席、IVR、系统接入码、外线)，挂起转为1(支持：IVR)，成功转为2(支持：技能、坐席、接入码、外线)，通话转为3(支持：外线)，三方转为4(支持：外线)
})
const transferRules = {
  address: [
    { required: true, message: '请输入转移号码', trigger: ['blur', 'change'] }
  ]
}
const deviceTypeOptions = [{
  value: '1',
  label: '技能队列'
}, {
  value: '2',
  label: '坐席'
}, {  
  value: '3',
  label: 'IVR'
}, {
  value: '4',
  label: '系统接入码'
}, {
  value: '5', 
  label: '外部号码'
}]
// 转移模式
const modeOptions = [{
  value: '0',
  label: '释放转'
}, {
  value: '1',
  label: '挂起转'
}, {
  value: '2',
  label: '成功转'
}, {
  value: '3',
  label: '通话转'
}, {
  value: '4',
  label: '三方转'
}]
const isHold = ref(true)
const transferFormRef = ref(null)
// 外呼
const callout = () => {
  phoneFormRef.value.validate(async(valid) => {
    if (valid) {
      if (loading.value) {
        setLog({
          name: '呼叫结果',
          msg: '正在呼叫中...',
          type: 'warning'
        })
        return
      }
      if (!await checkInstance()) {
        setLog({
          name: '拨打',
          msg: '请先实例化',
          type: 'warning'
        })
        return
      }
      loading.value = true
      let result = await getInstanceFCC().callout({
        phoneNum: phoneForm.phoneNum
      })
      setLog({
        name: '呼叫结果',
        msg: result
      })
      loading.value = false
      if (result.status == 200) {
        ElMessage({
          message: '呼叫成功',
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
// 挂断
const hangup = async () => {
  let result = await getInstanceFCC().release({
    hangUpCustomer: true
  })
}
// 接听
const answer = async () => {
  let result = await getInstanceFCC().answer()
}
// 静音
const beginMute = async () => {
  let result = await getInstanceFCC().beginMute()
  if (result.data && result.data.retcode + '' === '0') { 
    ElMessage({
      message: '静音成功',
      type: 'success'
    })
  } else {
    ElMessage({
      message: result.data.message,
      type: 'info'
    })
  }
}
// 取消静音
const cancleMute = async () => {
  let result = await getInstanceFCC().cancleMute()
  if (result.data && result.data.retcode + '' === '0') { 
    ElMessage({
      message: '取消静音成功',
      type: 'success'
    })
  }
}
// 切换忙碌
const busy = async () => {
  let result = await getInstanceFCC().seatSayBusy()
}
// 切换空闲
const free = async () => {
  let result = await getInstanceFCC().seatSayFree()
}
// 保持/取消保持
const holdPhone = async () => {
  let result = await getInstanceFCC().hold({
    ishold: isHold.value
  })
  if (result.data && result.data.retcode + '' === '0') {
    isHold.value = !isHold.value
    ElMessage({
      message: '操作成功',
      type: 'success'
    })
  }
 }
// 转移
const transfer = () => {
  transferFormRef.value.validate(async (valid) => {
    if (valid) {
      let result = await getInstanceFCC().transfer(transferForm)
      if (result.data && result.data.retcode + '' === '0') {
        ElMessage({
          message: '转移成功',
          type:'success'
        })
      }
    }
  })

}
// 技能队列
const skillForm = reactive({
  skillId: '', // 技能ID
  callId: '' // 呼叫ID
})
const skillRules = {
  skillId: [{required: true, message: '请输入技能ID', trigger: ['blur', 'change'] }]
}
const skillFormRef = ref(null)
// 查询接报队列
const batchmultiskill = async () => {
  skillFormRef.value.validate(async (valid) => {
    if (valid) {
      let result = await getInstanceFCC().batchmultiskill({
        skillId: skillForm.skillId,
      })
      setLog({
        name: '查询接报队列结果',
        msg: result
      })
      if (result.status == 200) {
        ElMessage({
          message: '查询接报队列成功',
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
// 指定接听
const requestcall = async () => {
  skillFormRef.value.validate(async (valid) => {
    if (valid) {
      let result = await getInstanceFCC().requestcall({
        callId: skillForm.callId,
        skillid: skillForm.skillId
      }) 
      setLog({
        name: '指定接听结果',
        msg: result
      })
      if (result.status == 200) {
        ElMessage({
          message: '指定接听成功',
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
<el-form :model="phoneForm" :rules="rules" ref="phoneFormRef" >
  <el-form-item label="电话号码" prop="phoneNum">
    <el-input v-model="phoneForm.phoneNum" placeholder="请输入电话号码"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="callout">拨打</el-button>
    <el-button type="primary" @click="answer">接听</el-button>
    <el-button type="warning" @click="beginMute">静音</el-button>
    <el-button type="warning" @click="cancleMute">取消静音</el-button>
    <el-button type="warning" @click="busy">切换忙碌</el-button>
    <el-button type="warning" @click="free">切换空闲</el-button>
    <el-button type="danger" @click="hangup">挂断</el-button>
  </el-form-item>
</el-form>
<div class="lable"> {{ '转移功能参数' }} </div>
<el-form :model="transferForm" :rules="transferRules" ref="transferFormRef" label-position="top">
  <el-row>
    <el-col :span="7">
      <el-form-item label="转移号码" prop="address">
        <el-input v-model="transferForm.address" placeholder="请输入转移号码"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="7" class="middles-col">
      <el-form-item label="转移设备类型" prop="devicetype">
        <el-select v-model="transferForm.devicetype">
          <el-option
            v-for="item in deviceTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="7">
      <el-form-item label="转移模式" prop="mode">
        <el-select v-model="transferForm.mode">
          <el-option
            v-for="item in modeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-col>
  </el-row>
  <el-form-item>
    <el-button type="primary" @click="holdPhone">{{ isHold? '保持': '取消保持'}}</el-button>
    <el-button type="primary" @click="transfer">电话转移</el-button>
  </el-form-item>
</el-form>
<div class="lable"> {{ '批量查询技能队列上的所有排队的呼叫' }} </div>
<el-form :model="skillForm" :rules="skillRules" ref="skillFormRef" label-position="top">
  <el-row>
    <el-col :span="11">
      <el-form-item label="技能ID" prop="skillId">
        <el-input v-model="skillForm.skillId" placeholder="请输入技能ID"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="11" class="call-col">
      <el-form-item label="呼叫ID" prop="callId">
        <el-input v-model="skillForm.callId" placeholder="请输入呼叫ID"></el-input>
      </el-form-item>
    </el-col>
  </el-row>
  <el-form-item>
    <el-button type="primary" @click="batchmultiskill">查询接报队列</el-button>
    <el-button type="primary" @click="requestcall">指定接听</el-button>
  </el-form-item>
</el-form>
</template>
<style scoped>
.lable {
  width: 100%;
  padding: 20px 0;
  border-top: 1px solid #eee;
}
.middles-col {
  margin: 0 10px;
}
.call-col {
  margin-left: 20px;
}
</style>