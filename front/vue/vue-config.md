---
title: 封装Vue插件
date: 2022-07-11
---

::: warning
**Vue 插件封装**
:::

```
步骤
1. 组件
2. 组件 => 插件
3. 配置入口文件
4. 测试
5. 打包
6. 上传npm官网
7. 测试
8. npm 安装
9. Vue.use() 注册
10. 引入CSS

在src下新建文件夹plugins, 在该文件夹下新建一个index.js作为入口文件, 在main.js中引入,
再通过Vue.use()注册即可全局使用
```

```js
index.js

// 入口文件 => 插件的入口 => 统一管理组件;
// require.context => webpack API(动态引入文件)
// 1.当前路径  2.是否匹配子集文件夹  3.文件格式
const requireComponent = require.context('./', true, /\.vue$/)
//  插件
const install = (Vue) => {
  if (install.installed) return
  install.installed
  requireComponent.keys().forEach((fileName) => {
    // 第i个组件
    const config = requireComponent(fileName)
    // 组件名
    const componentName = config.default.name
    Vue.component(componentName, config.default || config)
  })
  // 这里还可放置全局自定义指令
  Vue.directive('focus', {
    inserted: function (el) {
      el.focus()
    },
  })
}

// 环境检测
if (typeof window !== undefined && window.Vue) {
  install(window.Vue)
}

export default {
  install,
}
```

<img src="/images/article/plugins-structure.png" alt="插件文件结构"></img>

```
打包时在package.json中填写相应的信息
name: 包名
private: 是否私有
license: 开源协议
description: 描述
```

<img src="/images/article/plugins-package.png" alt="package.json"></img>

```
打包：
1. 在scripts定义自己的服务, 同样依赖脚手架服务
   "lib": "vue-cli-service build --target lib --name vue-xxx --dest lib src/plugins/index.js"
   vue-xxx: 包名
   src/plugins/index.js： 组件对外暴露的文件地址
2. 运行npm run lib 进行打包, 会在最外层打包出一个叫lib的文件夹
3. 在package.json里配置入口文件, 路径是相对于package.json的, 置于上面信息下方
   main: "lib/xxxx.umd.min.js"
4. 终端执行 npm login
   输入npm 登录信息
   出现Logged in as 登录名 on https://registry.npmjs.org/, 则登录成功
   成功登录之后执行 npm publish, 将包发布到npm
   如果发布失败可能是包名被当做垃圾文件给打回来了, 重新修改一个包名（避免末尾存在一连串数字）, 重新打包发布
```

```js
全局组件引入的js
不是插件不需要install方法
直接在main.js中引入就可使用

function changeStr(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const requireComponent = require.context('./', false, '.vue$')
requireComponent.keys().forEach((fileName) => {
  const config = requireComponent(fileName)
  const componentName = changeStr(
    fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')
  )
  Vue.component(componentName, config.default || config)
})
```
