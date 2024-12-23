# 实例化

::: warning 提示
<!-- warning -->
所有api执行的前提是要实例化，且整个项目只实例化一次，实例化的对象可以暴露内存或全局对象，防止劫持影响
:::


## 实例化示例

:::preview

demo-preview=../../../components/interface/system/init.vue

:::

## 使用方法

```typescript
// 只需要传递一个参数即可，初始测试可以开放临时账号，后续以token对接为准
let result = await new FCC({
  // 写入一些配置，此处可以配置将使用融合通讯中台的哪些服务，例如话务接报、音视频会议等
  meeting: true, // 是否开启音视频会议接口及事件，默认为false
  phone: true, // 是否开启电话接口及事件，默认为false
  IM：true, // 是否开启IM消息接口及事件，默认为false
  monitor: true, // 是否开启监控接口及事件，默认为false
  pointToPointCall: true,  // 是否开启点对点呼叫接口及事件，默认为false
  connect: '/', // 设置连接中台服务地址
})

// vue.prototype.$fcc = result
// setFccInterface(result)
```
<!-- **入参说明** -->
### 入参说明

| **参数名** | **数据类型** | **选取原则** |**说明** |
| ---------- | ------------ | ------------ | ------------------ |
| meeting      | boolean       | 可选         | 是否开启音视频会议接口及事件，默认为false |
| phone      | boolean       | 可选         | 是否开启电话接口及事件，默认为false |
| IM      | boolean       | 可选         | 是否开启IM消息接口及事件，默认为false |
| monitor      | boolean       | 可选         | 是否开启监控接口及事件，默认为false |
| pointToPointCall      | boolean       | 可选         | 是否开启点对点呼叫接口及事件，默认为false |
| connect      | string       | 可选         | 设置连接中台服务地址，默认'/'，根路径, 这里设置了值，connect方法可以不需要调用 |

### 出参说明

| **出参名称** | **数据类型** | **说明**                         |
| -------- | -------- | ------------------------------ |
| fccInface   | object   | 通信实例化对象 |
