---
title: Vue常见面试题
date: 2020-07-07
tags:
  - vue
sidebar: 'false'
# keys:
#   - '123456'
# publish: false
---

::: warning
**为什么会出现 MVVM ？**
:::

```
1. 传统的做法缺乏组织性（可维护性，拓展性差）
2. 类库缺乏业务分层（传统类库在某方面增加了复杂度）
3. 性能不友好（大量的DOM操作）
```

::: warning
**v-model**
:::

```js
通过 Object.defineProperty() 数据劫持
let obj = {};
Object.defineProperty(obj, 'current',{
  get: function(){},
  set: function(val){
    // 设置响应值
  }
})

document.getElementById('current').addEventListener("keyup",function(){
  obj.current = event.target.value;
})
```

::: warning
**data**
:::

```
闭包 => 每一个组件都有自己的私有作用域, 确保各组件数据不会相互干扰。
```

::: warning
**v-if & v-show**
:::

```
v-if: 不满足条件不会渲染dom, 单次判断
v-show: 隐藏dom, 多次切换, (不能用于权限操作)
```

::: warning
**虚拟 DOM**
:::

```
虚拟DOM是什么？
1. vue2.x才有虚拟 DOM。
2. 本质是js对象。=> 跨平台

虚拟DOM如何提升Vue的渲染效率？
1. 局部更新(节点更新)
2. 将直接操作dom的地方拿到两个js对象之中去做比较。
```

::: warning
**应用层**
:::

```
单页与多页的区别和优缺点
单页应用（SPA）, 只有一个主页面的应用
组件 => 页面片段
跳转 => 刷新局部资源
场景 => PC端

优点：
1. 体验好, 快
2. 改动内容不用加载整个页面
3. 前后端分离
4. 效果可以比较炫

缺点：
1. 不利于SEO
2. 初次加载比较慢
3. 页面复杂度很高

多页应用：
整页刷新

优缺点与单页应用相反

v-for优先级 > v-if

Vue-router 与 location.href有什么区别？
location.href: 简单方便, 刷新页面（跳外链）
Vue-router: 实现了按需加载, 减少了dom消耗 （页面内部）。
Vue-router => js原生history封装

```

::: warning
**Vue2.0 响应式**
:::

```js
发布订阅者模式 + 双向数据绑定 = 基本响应式

1. 订阅器模型
let Dep = {
  clientList: {},
  // 添加订阅者
  listen: function(key,fn){
    (this.clientList[key] || (this.clientList[key] = [])).push(fn);
  },

  // 推送方法
  trigger: function(){
    // 数组方法依赖于内部是this数据来执行
    let key = Array.prototype.shift.call(arguments), fns = this.clientList[key];
    if(!fns || fns.length === 0){
      return false;
    }
    for(let i = 0, fn;fn = fns[i++];){
      fn.apply(this,arguments);
    }
  }
}

数据劫持
let dataHijack = function({data,tag,datakey,selector}){
  let value = '', el = document.querySelector(selector);
  Object.defineProperty(data, datakey, {
    get: function(){
      return value;
    },
    set: function(val){
      value = val;
      // 数据发生变化
      Dep.trigger(tag,val)
    }
  });

  // 添加订阅者
  Dep.listen(tag, function(text){
    el.innerHTML = text;
  })
}

```

::: warning
**Vue3.0 响应式--Proxy()**
:::

```js
let proxyObj = {
  net: 'hupu',
  name: 'curry',
}

代理
const proxy = new Proxy(proxyObj, {
  get(target, propName) {
    // 读取proxy什么属性
    return target[propName]
  },

  set(target, propName, value) {
    // 新增或修改proxy什么属性
    target[propName] = value
  },

  deleteProperty(target, propName) {
    // 删除proxy的什么属性
    return delete target[propName]
  },
})
```
