# 检测 MDP

::: info 提示

<!-- warning -->

如果 MDP 有安装，且没打开，则会自动打开 mdp
:::

## 示例
- 有安装mdp就会返回成功，不管是否有启动，如果没启动则会自动拉起
- 没有安装就会返回 data: 0
:::preview
demo-preview=../../../components/interface/system/check-mdp.vue
:::

## 使用方法

```typescript
let result = await fccInstance.checkMdpExist();
// {
//   "status":200,
//   "msg":"调用融合通讯 api 成功。",
//   "data":{
//         "code":200,
//         "data":1 // 1 - 存在，0-不存在
//       }
// }
```

<!-- **入参说明** -->

### 入参说明

无

### 出参说明

| **出参名称** | **数据类型** | **说明**                                                     |
| ------------ | ------------ | ------------------------------------------------------------ |
| status       | number       | 调用接口返回结果的状态码，其含义参考融合通讯中台通用状态码。 |
| msg          | string       | 给开发者的文字提示信息                                       |
| data         | object       | 返回的信息 '{code: 200, data: 1 // 1 - 存在，0-不存在}'|

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
