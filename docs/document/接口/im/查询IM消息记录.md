# 查询IM消息记录

<!-- ## 查询IM消息记录示例

:::preview
demo-preview=../../../components/interface/im/inquire.vue
::: -->

## 使用方法

```typescript
// 查询当前登录用户与某个其他用户或某个群组的消息记录
fcc.searchIM({
  page: 1,
  pagecount: 20,
  SEND_USER: '239',
  QUERY_TYPE = '1'
}).then(res => {
  console.log(res)
})
```

<!-- **入参说明** -->

### 入参说明

| **参数名**  | **数据类型** | **选取原则** | **说明**                                      |
| ----------- | ------------ | ------------ | --------------------------------------------- |
| page       | number       | 必选         | 页数                        |
| pagecount | number       | 必选         | 每页条数 |
| SEND_USER | string       | 必选         | QUERY_TYPE为1时（取对方的USER_CODE）QUERY_TYPE为2必选 |
| QUERY_TYPE | string       | 必选         | 消息类型1是点对点，2是群组消息 |

### 出参说明

| **出参名称** | **数据类型** | **说明**                                                     |
| ------------ | ------------ | ------------------------------------------------------------ |
| status       | number       | 调用接口返回结果的状态码，其含义参考融合通讯中台通用状态码。 |
| msg          | string       | 给开发者的文字提示信息                                       |
| data         | array       | 返回的信息                                                   |

