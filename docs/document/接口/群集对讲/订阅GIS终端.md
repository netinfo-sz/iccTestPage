# 订阅GIS终端

## 订阅GIS终端示例

:::preview
demo-preview=../../../components/interface/talkback/gissubScribe.vue
:::

## 使用方法

```typescript
// 通过传入groupId  订阅GIS终端
const params = {
  groupId: 'xxx', // 群组id
}
let  result = await fcc.gissubScribe(params)
```
<!-- **入参说明** -->

### 入参说明

| **参数名**  | **数据类型** | **选取原则** | **说明**                                      |
| ----------- | ------------ | ------------ | --------------------------------------------- |
| groupId       | string       | 必选         | 群组id                         |

### 出参说明

| **出参名称** | **数据类型** | **说明**                                                     |
| ------------ | ------------ | ------------------------------------------------------------ |
| status       | number       | 调用接口返回结果的状态码，其含义参考融合通讯中台通用状态码。 |
| msg          | string       | 给开发者的文字提示信息                                       |
| data         | array       | 返回的信息 groupId:组ID, speaker:主讲人ID                    |
