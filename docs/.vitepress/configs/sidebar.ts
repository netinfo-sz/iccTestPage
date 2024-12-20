/* configs/nav.ts */
import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = [
  {
    text: '概述',
    items: [
      {
        text: '前言',
        link: '/document/概述/前言'
      },
      {
        text: '更新日志',
        link: '/document/概述/版本'
      },
      {
        text: '使用前必读',
        link: '/document/概述/准备'
      }
    ]
  },
  {
    text: '快速上手',
    link: ''
  },
  // 接口
  {
    text: '接口',
    items: [{
      text: '系统接口',
      items: [{
        text: '登录',
        link: '/document/接口/系统/登录'
      }]
    }]
  },
  {
    text: '状态码',
    link: '/document/其它/状态码'
  }
]