
// import Demo from 'vitepress-theme-demoblock/dist/client/components/Demo.vue'
// import DemoBlock from 'vitepress-theme-demoblock/dist/client/components/DemoBlock.vue'
import xwButton from '../../components/xw-button.vue'
import { ElementPlusContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 如果只想导入css变量
import 'element-plus/theme-chalk/dark/css-vars.css'
import locale from 'element-plus/es/locale/lang/zh-cn'

export function useComponents(app) {
  // app.component('Demo', Demo)
  // app.component('DemoBlock', DemoBlock)
  app.component('xwButton', xwButton)
  app.component('demo-preview', ElementPlusContainer)

  app.use(ElementPlus, {
    locale // 语言设置
  })
}
