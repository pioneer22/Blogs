---
title: ES6
date: 2022-08-08
---

::: warning
**var let const**
:::

```
let
1. 不存在变量提升
2. 同一个作用域下不能重复定义一个名称
3. 有着严格的作用域 (var 属于函数作用域, let 属于块级作用域)

const 声明一个只读的常量, 一旦声明, 常量的值就不能改变(一定初始化, 不能只声明不赋值)
```

::: warning
**Set**
:::

```js
数组去重
[...new Set(array)]
```

::: warning
**forEach & map**
:::

```
forEach
1. 没有返回值
2. 不能通过 break 打断
3. 遍历的是 value

map
1. 有返回值(数组), 默认 return 的是 undefined。
2. 接收参数是一个函数 (key, value)。
3. 不能通过 break 打断。
```
