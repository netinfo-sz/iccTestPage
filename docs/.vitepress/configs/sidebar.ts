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
      }, 
      // 和打开监控墙重复
      // {
      //   text: '监控墙推送',
      //   link: '/document/接口/监控/监控墙推送'
      // }, 
      {
        text: '打开一键监控',
        link: '/document/接口/监控/打开一键监控'
      }]
    }, {
      text: '查询信息接口',
      collapsed: true,
      items: [{
        text: '获取当前用户状态',
        link: '/document/接口/查询信息/获取当前用户状态'
      }, {
        text: '获取所有用户状态位置数据',
        link: '/document/接口/查询信息/获取所有用户状态位置数据'
      }, {
        text: '查询通话截录屏记录',
        link: '/document/接口/查询信息/查询通话截录屏记录'
      }, {
        text: '查询用户列表',
        link: '/document/接口/查询信息/查询用户列表'
      }, {
        text: '查询监控列表',
        link: '/document/接口/查询信息/查询监控列表'
      }, {
        text: '查询通话记录',
        link: '/document/接口/查询信息/查询通话记录'
      }]

    },{
      text: 'IM消息接口',
      collapsed: true,
      items: [{
        text: '发送IM消息',
        link: '/document/接口/im/发送IM消息'
      }, {
        text: '接收IM消息',
        link: '/document/接口/im/接收IM消息'
      }, {
        text: '查询IM消息记录',
        link: '/document/接口/im/查询IM消息记录'
      }
      // {
      //   text: 'IM消息已阅',
      //   link: '/document/接口/im/IM消息已阅'
      // }
    ]
    }, {
      text: '集群对讲接口',
      collapsed: true,
      items: [
      {
        text: '查询与自己相关的群组和人员',
        link: '/document/接口/群集对讲/查询与自己相关的群组和人员'
      }, {
        text: '订阅群组',
        link: '/document/接口/群集对讲/订阅群组'
      }, {
        text: '取消订阅群组',
        link: '/document/接口/群集对讲/取消订阅群组'
      }, {
        text: '抢话权',
        link: '/document/接口/群集对讲/抢话权'
      }, {
        text: '释放话权',
        link: '/document/接口/群集对讲/释放话权'
      }, {
        text: '强拆群组',
        link: '/document/接口/群集对讲/强拆群组'
      }, {
        text: '添加群组成员',
        link: '/document/接口/群集对讲/添加群组成员'
      }, {
        text: '紧急呼叫',
        link: '/document/接口/群集对讲/紧急呼叫'
      }, {
        text: '订阅GIS终端',
        link: '/document/接口/群集对讲/订阅GIS终端'
      }]
    }]
  },
  {
    text: '监听事件',
    collapsed: true,
    items: [{
      text: '人员状态变化事件',
      link: '/document/事件/人员状态变化事件'
    }, {
      text: '人员位置变化事件',
      link: '/document/事件/人员位置变化事件'
    }, {
      text: '视频点呼来电事件',
      link: '/document/事件/视频点呼来电事件'
    }, {
      text: '视频点呼接通事件',
      link: '/document/事件/视频点呼接通事件'
    }, {
      text: '视频点呼挂机事件',
      link: '/document/事件/视频点呼挂机事件'
    }, {
      text: '打开矩阵监控事件',
      link: '/document/事件/打开矩阵监控事件'
    }, {
      text: '退出矩阵监控事件',
      link: '/document/事件/退出矩阵监控事件'
    }, {
      text: '打开监控事件',
      link: '/document/事件/打开监控事件'
    }, {
      text: '关闭监控事件',
      link: '/document/事件/关闭监控事件'
    }, {
      text: '来电事件',
      link: '/document/事件/来电事件'
    }, {
      text: '来电连接事件',
      link: '/document/事件/来电连接事件'
    }, {
      text: '来电结束事件',
      link: '/document/事件/来电结束事件'
    }, {
      text: '退出会议事件',
      link: '/document/事件/退出会议事件'
    }]
  },
  {
    text: '状态码',
    link: '/document/其它/状态码'
  }
]