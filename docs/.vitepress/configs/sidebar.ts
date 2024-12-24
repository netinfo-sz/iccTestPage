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
      collapsed: true,
      items: [{
        text: '实例化',
        link: '/document/接口/系统/实例化'
      },{
        text: '设置服务器',
        link: '/document/接口/系统/上下文'
      },{
        text: '检测MDP',
        link: '/document/接口/系统/check-mdp'
      },{
        text: '登录',
        link: '/document/接口/系统/登录'
      }, {
        text: '退出登录',
        link: '/document/接口/系统/退出登录'
      }, {
        text: '刷新token',
        link: '/document/接口/系统/刷新token'
      }]
    }, {
      text: '语音点呼',
      collapsed: true,
      items: [{
        text: '发起语音点呼',
        link: '/document/接口/语音点呼/发起语音点呼'
      }, {
        text: '挂断语音点呼',
        link: '/document/接口/语音点呼/挂断语音点呼'
      }]
    }, {
      text: '视频点呼',
      collapsed: true,
      items: [{
        text: '发起视频点呼',
        link: '/document/接口/视频点呼/发起视频点呼'
      }, {
        text: '挂断视频点呼',
        link: '/document/接口/视频点呼/挂断视频点呼'
      }]
    }, {
      text: '电话',
      collapsed: true,
      items: [{
        text: '电话呼出',
        link: '/document/接口/电话/电话呼出'
      }, {
        text: '电话接听',
        link: '/document/接口/电话/电话接听'
      }, {
        text: '电话拒接',
        link: '/document/接口/电话/电话拒接'
      }, {
        text: '电话挂机',
        link: '/document/接口/电话/电话挂机'
      }, {
        text: '坐席示闲',
        link: '/document/接口/电话/坐席示闲'
      }, {
        text: '坐席示忙',
        link: '/document/接口/电话/坐席示忙'
      }, {
        text: '电话保持',
        link: '/document/接口/电话/电话保持'
      },{
        text: '取消保持',
        link: '/document/接口/电话/取消保持'
      }, {
        text: '电话转移',
        link: '/document/接口/电话/电话转移'
      }, {
        text: '三方通话',
        link: '/document/接口/电话/三方通话'
      }, {
        text: '查询接报队列',
        link: '/document/接口/电话/查询接报队列'
      }, {
        text: '指定接听',
        link: '/document/接口/电话/指定接听'
      }]
    }, {
      text: '音视频会议',
      collapsed: true,
      items: [{
        text: '创建音视频会议',
        link: '/document/接口/音视频会议/创建音视频会议'
      }, {
        text: '会议添加人员',
        link: '/document/接口/音视频会议/会议添加人员'
      }, {
        text: '预约会议',
        link: '/document/接口/音视频会议/预约会议'
      }, {
        text: '主动加入会议',
        link: '/document/接口/音视频会议/主动加入会议'
      }, {
        text: '查询会议列表',
        link: '/document/接口/音视频会议/查询会议列表'
      }, {
        text: '查询参会成员',
        link: '/document/接口/音视频会议/查询参会成员'
      }]
    }, {
      text: '监控',
      collapsed: true,
      items: [{
        text: '打开矩阵监控',
        link: '/document/接口/监控/打开矩阵监控'
      }, {
        text: '打开矩阵监控墙',
        link: '/document/接口/监控/打开矩阵监控墙'
      }, {
        text: '切换矩阵监控墙',
        link: '/document/接口/监控/切换矩阵监控墙'
      }, {
        text: '关闭矩阵监控墙',
        link: '/document/接口/监控/关闭矩阵监控墙'
      }, {
        text: '关闭所有窗口',
        link: '/document/接口/监控/关闭所有窗口'
      }, {
        text: '打开单个监控',
        link: '/document/接口/监控/打开单个监控'
      }, {
        text: '关闭单个监控',
        link: '/document/接口/监控/关闭单个监控'
      }, {
        text: '摄像头云控制',
        link: '/document/接口/监控/摄像头云控制'
      }, {
        text: '监控墙推送',
        link: '/document/接口/监控/监控墙推送'
      }, {
        text: '打开一键监控',
        link: '/document/接口/监控/打开一键监控'
      }]
    }, {
      text: '查询信息',
    },{
      text: '监听事件',
    }]
  },
  {
    text: '状态码',
    link: '/document/其它/状态码'
  }
]