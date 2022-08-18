---
title: vuepress 插件
date: 2022-05-31
tags:
  - vuepress
categories:
  - vuepress
---

::: warning
流程图
:::

```
@flowstart
cond=>condition: Process?
process=>operation: Process
e=>end: End

cond(yes)->process->e
cond(no)->e
@flowend
```

@flowstart
cond=>condition: Process?
process=>operation: Process
e=>end: End

cond(yes)->process->e
cond(no)->e
@flowend

::: warning
音乐播放器
:::

```js
;[
  'meting',
  {
    //metingApi: "https://meting.sigure.xyz/api/music",
    meting: {
      server: 'netease', // 网易
      type: 'playlist', // 读取歌单
      mid: '2227373273',
    },
    aplayer: {
      // 不配置该项的话不会出现全局播放器
      fixed: true, // 吸底模式
      mini: true,
      autoplay: true, // 自动播放
      listFolded: true, // 歌曲栏折叠
      theme: '#f9bcdd', // 颜色
      order: 'random', // 播放顺序为随机
      volume: 0.2, // 初始音量
      lrcType: 0, // 关闭歌词显示
    },
    mobile: {
      cover: false, // 手机端去掉cover图
    },
  },
]
```

```html
<Meting server="netease" type="playlist" mid="2201957752" :lrc-type="3" />
```

<!-- <Meting server="netease" type="playlist" mid="2201957752" :lrc-type="3" /> -->

::: warning
公告插件
:::

```js
;[
  '@vuepress-yard/vuepress-plugin-window',
  {
    title: '公告',
    contentInfo: {
      title: '欢迎来到Pioneer的个人博客',
      needImg: true,
      imgUrl: '/images/app/logo.jpg',
      content: '喜欢可以添加收藏哦~',
      contentStyle: {
        paddingBottom: '4px',
      },
    },
    bottomInfo: {
      btnText: '关于',
      linkTo: '',
    }, // 底部按钮信息
    windowStyle: {
      top: '50%',
      right: '6px',
      transform: 'translateY(-50%)',
    }, // 展示框体的样式
    closeOnce: true,
    hideRouteList: [], // 某些路由下隐藏
  },
]
```

::: warning
动态标题
:::

```js
;[
  'dynamic-title',
  {
    showIcon: '/favicon.ico',
    showText: '(/≧▽≦/)NICE！又好了！',
    hideIcon: '/failure.ico',
    hideText: '(●—●)OMG，崩溃啦！',
    recoverTime: 2000,
  },
]
```
