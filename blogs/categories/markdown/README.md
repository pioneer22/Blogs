---
title: Markdown语法
date: 2022-05-27
# tags:
#   - grammar
categories:
  - markdown
---

::: tip
添加摘要写法
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::

::: details 点击查看代码

```js
console.log('这是一个详情块，在 IE / Edge 中不生效')
```

:::

::: tip
Markdown JS 语法
:::

```js
export default {
  name: 'MyComponent',
  // ...
}
```

::: tip
Markdown HTML 语法
:::

```html
<ul>
  <li v-for="todo in todos" :key="todo.id">{{ todo.text }}</li>
</ul>
```

::: tip
Markdown 跳转页面
:::

<!-- 跳转到根部的 README.md -->

[Home](/)

<!-- 跳转到 vue 文件夹的 index.html -->

[vue](/front/vue/)

<!-- 跳转到 /front/vue/index.html 的特定标题位置 -->

[vue footer](/front/vue/#footer)

<!-- 具体文件可以使用 .md 结尾（推荐）也可以是 .html 结尾 -->

[vue - api](/front/vue/api.md)

::: tip
在 Markdown 中使用 Vue
:::
如果需要使用这样的组件或库，你需要在合适的生命周期钩子（mounted, beforeMounted）中动态导入它们

模板语法

```
<span v-for="item in 5">{{item}}</span>
```

::: theorem Theorem
这是一个 Theorem
:::

::: tip
在 Head 中引用脚本与样式
:::

```
module.exports = {
  head: [
    ["link", { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css" }],
    ["script", { src: "scripts/demo.js" }]
  ]
}
```

::: tip
在单独页面中应用样式和脚本
:::

```
<p class="demo" :class="$style.example"></p>

<style module>
.example {
  color: #41b883;
}
</style>

<script>
export default {
  props: ['slot-key'],
  mounted () {
    document.querySelector(`.${this.$style.example}`)
      .textContent = '这个块是被内联的脚本渲染的，样式也采用了内联样式。'
  }
}
</script>
```

<p class="demo" :class="$style.example"></p>

<style module>
.example {
  color: #41b883;
}
</style>

<script>
export default {
  props: ['slot-key'],
  mounted () {
    document.querySelector(`.${this.$style.example}`)
      .textContent = '这个块是被内联的脚本渲染的，样式也采用了内联样式。'
  }
}
</script>
