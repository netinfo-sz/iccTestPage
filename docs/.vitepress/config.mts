import { defineConfig } from 'vitepress'
import { nav, sidebar } from './configs'
// https://vitepress.dev/reference/site-config
import { componentPreview, containerPreview } from '@vitepress-demo-preview/plugin'
import timeline from "vitepress-markdown-timeline"

export default defineConfig({
  // cleanUrls:true, //开启纯净链接
  title: "融合通信中台JS-API",
  description: "desription",
  lang: 'zh-CN', //语言，可选 en-US
  base: '/',
  head: [
    // 加载本地 JavaScript 文件
    ['script', { src: '/libs/FCC-SDK.min.js' }],
    ['link',{ rel: 'icon', href: '/images/logo.png'}], // 网页icon
    
  ],
  outDir: './.vitepress/dist', // 输出目录
  lastUpdated: true, //首次配置不会立即生效，需git提交后爬取时间戳
  // 站点地图
  // sitemap: {
  //   hostname: 'https://localhost.com',
  // },
  //appearance:true, //默认浅色且开启切换
  srcExclude: [
    "**/(README).md",
    "(.vitepress|public|images|.guthub|components|snippets)/**/*.md",
  ],
  markdown: {
    lineNumbers: true,
    defaultHighlightLang: "js",
    config: (md) => {
      // md.use(demoblockPlugin, {
      //   customClass: 'demoblock-custom'
      // })
      md.use(timeline)
      md.use(componentPreview)
      md.use(containerPreview)
    }
    // 使用 Vue 代码高亮
    // config: (md) => {
    //   md.use(require('markdown-it-vue'))
    // }
  },
  vite: {
    plugins: [
      // demoblockVitePlugin()
    ],
    resolve: {
      alias: {
        // 确保能找到.vue文件
        '@': '/'
      }
    },
    server: {
      proxy: {
        '/iccServer': {
          target: 'http://172.16.7.97:82/iccServer',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace('/iccServer', ''),
          ws: true
        }
      }
    }
  },
  //启用深色模式
  themeConfig: {
    logo: '/images/logo.png', // 标题旁边icon
    footer: { 
      // message: 'Released under the MIT License.', 
      // copyright: 'Copyright © 2019-2023 present Evan You', 
      // 自动更新时间
      copyright: `Copyright © 2019-${new Date().getFullYear()} XW`, 
    }, 
    // siteTitle: false, //标题隐藏
    // https://vitepress.dev/reference/default-theme-config
    nav,
    sidebar,

    //社交链接
    // socialLinks: [ 
    //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }, 
    //   { icon: 'twitter', link: 'https://twitter.com/' }, 
    //   { icon: 'discord', link: 'https://chat.vitejs.dev/' },  
    // ],
    outline: "deep",
    outlineTitle: "大纲",
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
    darkModeSwitchTitle: "切换暗色主题",
    lightModeSwitchTitle: "切换亮色主题",
    darkModeSwitchLabel: "切换主题",
    sidebarMenuLabel: "融合通信中台JS-API文档",
    returnToTopLabel: "回到顶部",
    langMenuLabel: "切换语言",
    lastUpdatedText: "更新时间",
    externalLinkIcon: true,
    // 搜索
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
          },
          modal: {
            displayDetails: "显示详情",
            noResultsText: "未找到相关结果",
            resetButtonTitle: "清除",
            footer: {
              closeText: "关闭",
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    },
    //上次更新时间
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short', // 可选值full、long、medium、short
        timeStyle: 'medium' // 可选值full、long、medium、short
      },
    },
  }
})
