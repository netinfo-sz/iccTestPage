# 刷新token
::: warning 提示
<!-- warning -->
使用前提：必须先实例化
:::
### 刷新token示例
临时使用，可以联系融合通信管理员，申请调测账号，正式交付以中台对接token为准

:::preview
demo-preview=../../../components/interface/system/refreshToken.vue
:::

### 使用方法
```typescript
fcc.refreshToken()
```
<!-- **入参说明** -->
#### 入参说明
无

#### 出参说明

| **出参名称** | **数据类型** | **说明**                         |
| -------- | -------- | ------------------------------ |
| status   | number   | 调用接口返回结果的状态码，其含义参考融合通讯中台通用状态码。 |
| msg      | string   | 给开发者的文字提示信息                    |
| data     | string   | 返回的信息                          |

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
