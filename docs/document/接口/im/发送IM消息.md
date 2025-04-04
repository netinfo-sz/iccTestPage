# 发送IM消息


## 发送IM消息示例

:::preview
demo-preview=../../../components/interface/im/send.vue
:::

## 使用方法

```typescript
// 给单个用户或群组发送 IM 消息
// 注意：调用此接口成功说明消息已发送成功，但对方不一定已读
// 若需判断对方是否已读可监听“对方已读IM消息事件”（仅对个人消息有效，群组消息无法监听是否已读）
fcc.sendIM({
  msgContent: 'test IM message',
  msgType: 1,
  toUserId: 'xxx'
}).then(res => {
  console.log(res)
})
```

<!-- **入参说明** -->

### 入参说明

| **参数名**  | **数据类型** | **选取原则** | **说明**                                      |
| ----------- | ------------ | ------------ | --------------------------------------------- |
| msgType       | number       | 必选         | 接收消息的对象类型: 1-文字;2-图片;3-文件   |
| toUserId | string       | 必选         | 接收消息的对象编号USER_CODE |
| msgContent | string       | 必选         | 要发送的消息类型为图片或者文件的不传 |
| file | object       | 非必选         | 要发送消息类型为图片或者文件的时候传file对象过来 |

### 出参说明

| **出参名称** | **数据类型** | **说明**                                                     |
| ------------ | ------------ | ------------------------------------------------------------ |
| status       | number       | 调用该接口返回结果的状态码，其含义请参考融合通讯中台通用状态码 |
| msg          | string       | 给开发者的文字提示信息                                        |
| data         | object       | messageId: '该条消息的编号'                             |

<!-- 代码 -->

<!-- ::: code-group

```sh [pnpm]
#查询pnpm版本
pnpm -v
```

```sh [yarn]
#查询yarn版本
yarn -v
```

::: -->
