# 快速上手

## 使用说明

使用中台api前提步骤
需要搭建好融合通讯平台服务（以下会简称中台）、安装融合通讯客户端程序、创建 FCC 实例。

## 使用示例

### 创建中台服务实例

```javascript
<!-- CMD 方式引入，将得到一个全局的 FCC 类 -->
<script src="FCC-SDK.min.js"></script>
或(推荐使用服务端全路径引入，方便后续更新同步)
<script src="http://xxx.xx.x/${connect}/fileServer/FCC-SDK.min.js"></script>
```

### 引入代码库后将得到一个 FCC 类 

```javascript
const fcc = new FCC({
    // 写入一些配置，此处可以配置将使用融合通讯中台的哪些服务，例如话务接报、音视频会议等
    meeting: true, // 是否开启音视频会议接口及事件，默认为false
    phone: true, // 是否开启电话接口及事件，默认为false
    IM：true, // 是否开启IM消息接口及事件，默认为false
    monitor: true, // 是否开启监控接口及事件，默认为false
    pointToPointCall: true  // 是否开启点对点呼叫接口及事件，默认为false
})
```

> 注意：fcc 实例上的所有方法均返回 Promise 对象，若要获取方法返回值或要保证方法执行完毕再执行后续代码则必须使用 await 修饰该方法或使用 then 函数。

 **连接中台服务**
   创建好中台服务实例后需要，主动与融合通讯中台服务建立连接，调用此方法后中台服务会做一些初始化操作。  

   ```javascript
   const connectResult = await fcc.connect({
   path: '/xw'
   })
   ```

 **登录中台服务**
   连接中台服务成功后，调用登录接口。  

   ```javascript
   let loginResult = await fcc.login({
    token: 'token' // 对接的token
   })
   ```

 **调用中台业务接口**
   登录中台成功后，fcc 对象将获得点对点通话、视频会议、电话接报、外呼电话、实时浏览监控、IM即时聊天等功能，上层应用可以调用 fcc 的接口方法使用这些功能。如发起语音点呼：  

   ```javascript
   let result = await fcc.dialVoice({
   userAccount: 'userAccount'
   })
   ```

  **监听中台服务事件**
   上层应用除了可以主动调用 fcc 实例的接口方法，还可以监听 fcc 实例推送来的事件，如监听语音点呼来电事件：  

用于监听和取消监听中台服务的事件，例如：来电振铃事件、对方挂断事件等

```javascript
// 监听中台服务的事件
fcc.listen('eventType', callback)

// 取消监听中台服务的事件
fcc.unListen('eventType', callback)
```

**事件参数说明**

| **入参名称** | **数据类型** | **选取原则** | **说明**         |
| ------------ | ------------ | ------------ | ---------------- |
| eventType    | string       | 必选         | 要监听的事件名称 |
| callback     | function     | 非必选       | 事件回调函数     |

示例：

```javascript
let listenResult = await fcc.listen('OnMemberStatusChange', params => {
  console.log(params)
  // 处理开发者自己的业务逻辑
})
```