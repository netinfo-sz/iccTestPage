import DefaultTheme from 'vitepress/theme'
import './style/index.css'
import { useComponents } from './useComponents'
import Layout from "../../components/Layout.vue";
import { h } from 'vue'
import { useData } from 'vitepress'
import MNavLinks from './components/MNavLinks.vue'
import "vitepress-markdown-timeline/dist/theme/index.css";
export default {
  extends: DefaultTheme,
  // Layout,
  // Layout: () => {
  //   const props: Record<string, any> = {}
  //   // 获取 frontmatter
  //   const { frontmatter } = useData()

  //   /* 添加自定义 class */
  //   if (frontmatter.value?.layoutClass) {
  //     props.class = frontmatter.value.layoutClass
  //   }

  //   return h(Layout, props)
  // },
  Layout: () => {
    const props: Record<string, any> = {}
    // 获取 frontmatter
    const { frontmatter } = useData()

    /* 添加自定义 class */
    if (frontmatter.value?.layoutClass) {
      props.class = frontmatter.value.layoutClass
    }

    return h(Layout, props)
  },
  // ...DefaultTheme, //或者这样写也可
  enhanceApp({ app, router, siteData }) {
    // 注册组件
    app.component('MNavLinks' , MNavLinks)
    // 如果不是完全自定义主题,需要执行主题的默认行为
    // DefaultTheme.enhanceApp({ app, router, siteData })
    // 如果不是完全自定义主题,需要执行主题的默认行为
    DefaultTheme.enhanceApp({ app, router, siteData })
    useComponents(app)
  }
}