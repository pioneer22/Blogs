---
title: Vue 原理分析
date: 2022-08-08
---

::: warning
**Vue 侦听器**
:::

```js
export class Observer {
  constructor(value) {
    this.value = value
    if (Array.isArray(value)) {
      // 数组逻辑
    } else {
      this.deal(value)
    }
  }

  deal(obj) {
    Object.keys(obj).forEach((key, i) => {
      property(obj, key)
    })
  }
}

// 让对象的每一个属性变得可观测
function property(obj, key, val) {
  if (arguments.length === 2) {
    val = obj[key]
  }

  if (typeof val === 'object') {
    new Observer(val)
  }

  Object.defineProperty(obj, key, {
    enumerable: true, // 可枚举
    configurable: true, // 可改变
    get() {
      console.log(`${key}获取值${val}`)
      return val
    },
    set(value) {
      if (val === value) return
      val = value
      console.log(`${key}设置值${value}`)
    },
  })
}
```

::: warning
**diff 中 patch**
:::

```js
1. 初始化 patch(container, vnode)
2. 更新 update(vnode, newVnode)

function createElement(vnode){
  let tag = vnode.tag; // 目标元素
  let attrs = vnode.attrs || {}; // 属性
  let children = vnode.children || []; 子节点

  if(!tag) return null;
  // 创建对应dom
  let elem = document.createElement(tag);

  // 给dom添加属性
  for(let attrName in attrs){
    if(attrs.hasOwnProperty(attrName)){
      elem.setAttribute(attrName, attrs[attrName]);
    }
  }

  // 将子元素添加到目标之上
  children.forEach((childVnode)=>{
    elem.appendChild(createElement(childVnode))
  })

  return elem;
}

// 更新
function updateChildren(vnode, newVnode){
  let children = vnode.children || []; // 现有节点
  let newChildren = newVnode.children || []; // 新节点
  children.forEach((childrenVnode, index)=>{
    let newChildrenVnode = newChildren[index];
    // 第一层没有变化
    if(childrenVnode.tag === newChildrenVnode.tag){
      // 通过递归深层次对比
      updateChildren(childrenVnode, newChildrenVnode)
    } else {
      // 两者的tag不一样
      replaceNode(childrenVnode, newChildrenVnode)
    }
  })

}
```
