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
        link: '/document/概述/更新记录'
      },
      {
        text: '准备工作',
        link: '/document/概述/准备'
      }
    ]
  },
  {
    text: '快速上手',
    link: '/document/概述/快速开始'
  },
  // 接口
  {
    text: '接口',
    items: [{
      text: '系统接口',
      items: [{
        text: '实例化',
        link: '/document/接口/系统/实例化'
      },{
        text: '设置服务器',
        link: '/document/接口/系统/上下文'
      },{
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