# 接收IM消息

::: warning 提示

<!-- warning -->

使用前提：要实时接收IM消息就先订阅对应主题

:::

## 接收IM消息示例

:::preview
demo-preview=../../../components/interface/im/receive.vue
:::

## 使用方法

```typescript
// 监听 ‘OnIMRead’事件，当前用户给单个其他用户发送IM消息后
// 如果对方已读，则当前用户会收到此事件
fcc.listen('OnIMRead', data => {
  console.log(data)
})
```
```typescript
// 收到IM消息事件,当前用户收到其他用户或群组发来的IM消息
fcc.listen('OnIMMessage', data => {
  let {
    content:{
      dialogId: "窗口Id"
      messageContent: "消息内容"
      messageId: "消息id"
      messageType: "im消息类型 number" // 1文本，2图片，3文件，4视频，5语音
      receiveObj: "接收方账号"
      receiveType: "接收方类型" // 1个人，2群组
      sendTime: 1648623990822 // im消息时间
      sendUser: "发送方账号"
    },
    fromId: "发送方账号"
    toId: "cp"
    topic: "websocket-im" // im
    type: "消息类型" // msg 普通消息，101 发送成功消息，read 已阅 
  } = data
  
})
```
<!-- **入参说明** -->

### 事件参数说明

| **参数名**  | **数据类型** | **说明**                                      |
| ----------- | ------------ | --------------------------------------------- |
| receiveType       | string   |接收消息的对象类型                        |
| receiveID       | string   |接收消息的对象编号,可能为个人帐号或群组编号                        |
| messageType       | string   |要发送的消息类型: 1-富文本消息 2-短语音3-文件4-视频5-语音 |
| body       | string   |消息主体                        |
