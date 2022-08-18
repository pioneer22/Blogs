---
title: 常见题
date: 2022-06-21
---

::: warning
**在浏览器输入 URL 并回车后发生了什么？**
:::

```
https://www.hupu.com
url: IP的映射
https: 传输协议（HTTP和TCP之间加了一层TSL或者SSL的安全层）
www: 服务器
hupu.com: 域名

1. 第一次输入 url
2. DNS 域名系统, 拿到真实的 IP 地址
3. 建立连接（TCP 三次握手）
4. 拿到数据, 渲染页面
5. 断开连接（TCP 四次挥手）
第二次访问, 将域名解析的IP地址存在本地 => 读取浏览器缓存
```

::: warning
**从哪些点做性能优化？**
:::

```
A. 加载
  1. 减少HTTP请求（精灵图, 合并文件）
  2. 减少文件大小（资源压缩, 代码压缩, 图片压缩）
  3. CDN（第三方库, 大文件, 大图）
  4. SSR服务端渲染, 预渲染
  5. 懒加载
  6. 分包
B. 减少DOM操作, 避免回流, 文档碎片
```

::: warning
**this**
:::

```
this指向上一个调用者
箭头函数没有作用域, 没有this

改变this指向call, apply, bind
bind 只改变, 不调用
call, bind, 改变后调用一次
```

::: warning
**闭包**
:::

```
方法里返回一个方法。

1. 避免变量被污染
2. 私有化
3. 保存变量, 常驻内存 => 慎用闭包

闭包存在的意义？
1. 延长变量的生命周期
2. 创建私有环境

应用场景： 防抖, 节流, 库的封装(保证变量的私有性)
```

::: warning
**new**
:::

```
let obj1 = Object.create(null);
let obj2 = {};
第一种只保存值
第二种上会有原型 使用循环第二种会循环原型链上的方法, 效率会差一些

function Fn(){}
let fn1 = new Fn()

1.创建一个对象
let obj = new Object(); //Object => 基类
2.设置它的原型链
obj.__proto__ = Fn.prototype;
3.改变this指向
let result = Fn.call(obj);
4.判断返回值类型
if(typeof result === "object"){
  fn1 = result;
}else{
  fn1 = obj;
}

普通函数的返回值默认是undefined, 构造函数的返回值默认是新创建的对象
```

::: warning
**封装库的实现**
:::

```js
let $ = (jQuery = (function (window) {
  // DOM 存储
  function Query(dom, selector) {
    let i,
      len = dom ? dom.length : 0
    for (i = 0; i < len; i++) this[i] = dom[i]
    this.length = len
    this.selector = selector || ''
    return this
  }

  // 生成jQuery对象
  function Z(elements, selector) {
    return Query.call(this, elements, selector)
  }

  // 根据具体的DOM查找
  function qsa(element, selector) {
    return element.querySelectorAll(selector)
  }

  Z.prototype = {
    each(callback) {
      // 类数组
      ;[].forEach.call(this, function (el, index) {
        callback.call(el, index, el)
      })
    },

    find(selector) {
      let doms = []
      this.each(function (index, el) {
        let childs = this.querySelectorAll(selector)
        doms.push(...childs)
      })
      return new Z(doms, selector)
    },

    eq(i) {
      let doms = []
      this.each(function (index, el) {
        if (i === index) {
          doms.push(this)
        }
      })
      return new Z(doms, this.selector)
    },

    remove() {
      this.each(function (index, el) {
        this.remove()
      })
    },
  }

  // 全局方法
  function isFunction(value) {
    return typeof value === 'function'
  }

  function $(nodeSelector) {
    let doms = qsa(document, nodeSelector)
    return new Z(doms, nodeSelector)
  }

  $.isFunction = isFunction

  return $
})(window))
```

::: warning
**原型与原型链**
:::

```
原型： prototype
原型链： __proto__  =>  [[prototype]]
从当前实例属性去查找, 如果找到了就返回, 否则就顺着原型链一层一层往上找, 直到找到 null 为止, 如果找到 null 都没找到, 报错
利用 hasOwnProperty 判断是否存在属性
```
