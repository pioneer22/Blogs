---
title: 优雅写法及性能优化
date: 2022-07-11
---

::: warning
**render**
:::

```
render() 与 template 异同点 => 都是类编译器
使用类编译器的优点
  1. 高复用性
  2. 使模板更加简洁明了
  3. 集中化处理

Vue的渲染过程
template => render() h => 原生JS的createElement() => 创建真实元素 => 生成虚拟DOM => 真实DOM

如果想拿到render 中第二个参数context的值, 需要设置 functional: true, 来说明函数式组件
```

```html
例：
<script>
  export default {
    name: 'button',
    props: {
      type: {
        type: String,
        default: 'normal',
      },
      text: {
        type: String,
        default: 'normal',
      },
    },
    render(h) {
      return h('button', {
        // v-bind:class
        class: {
          btn: true,
          'btn-success': this.type === 'success',
          'btn-error': this.type === 'error',
          'btn-warning': this.type === 'warning',
          normal: !this.type,
        },
        // dom属性
        domProps: {
          innerText: this.text || '默认按钮',
        },
        // v-on 绑定方法
        on: {},
      })
    },
  }
</script>
<style lang="scss" scoped>
  .btn {
    padding: 4px 6px;
    border-radius: 10px;
    color: #fff;
    border: 1px solid #ccc;
  }
  .btn-success {
    background: #00ff00;
  }
  .btn-error {
    background: #ff0000;
  }
  .btn-warning {
    background: #ffff00;
  }
  .normal {
    background: #000000;
  }
</style>
```

::: warning
**自定义指令**
:::

```
bind:  只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作。
inserted: 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）。
update: 被绑定元素所在的模板更新时调用，而不论绑定值是否变化。通过比较更新前后的绑定值，
        可以忽略不必要的模板更新。
componentUpdated: 被绑定元素所在模板完成一次更新周期时调用。
unbind: 只调用一次， 指令与元素解绑时调用。
```

```js
例：
Vue.directive('directive-name', {
  inserted(el, binding) {
    let value = binding.value
    if (value) {
      // 没有权限删掉当前
      // el.parentNode && el.parentNode.removechild(el)
    } else {
      throw new Error('v-directive-name指令需要一个Key')
    }
  },
})
```

::: warning
**性能优化**
:::

```
Performance 中查询 Observer
可以通过Object.freeze()优化, 冻结无需改变的数据, 避免框架继续遍历其属性, 完成响应式

每个文件html元素都需要被一个元素标签包裹,使标签增多
Vue2.0
代码片段: 虚拟的元素, 框架作为代码片段来蒙骗框架, 页面成为注释
使用vue-fragment这个插件库来优化
路由根组件, 切换时, 由于本身是代码片段,  所以无法使用parent.removeChild, insertBefore方法
可以使用在子组件内部, 路由根组件有问题
```

```
1. 首屏卡顿 -> 懒加载
2. 常用组件切换时卡顿 -> 缓存 [常用组件]
3. keep-alive include 随着用户使用时间, 不关闭浏览器会卡
4. 动态缓存
```

::: warning
**盘活数据**
:::

```
属性名固定不利于维护
框架为我们封装了this.$options, Vue中$$是属于框架底层的属性, 不要乱动, $是我们可以使用的
组件内的data, 避免直接覆盖$data, 而是为其覆盖属性值
Object.assign(this.$data, this.$options.data()) // 覆盖属性而不是直接改变对象指向, 可用于清空数据

实现恢复
备份数据, 深拷贝
this.temp = JSON.parse(JSON.stringify(this.$data));
恢复
Object.assign(this.$data,JSON.parse(JSON.stringify(this.temp)));

页面动态添加属性, 如果出现js变更, 页面不更新, 大多数可以通过与$set来解决
```

```js
// 打包优化
npm install uglifyjs-webpack-plugin --save-dev

// vue.config.js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let isProduction = process.env.NODE_ENV;

configureWebpack: config => {
    // 生产环境相关配置
    if (isProduction === 'production') {
      // 代码压缩
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            // 生产环境自动删除console
            warnings: false,
            compress: {
              // warnings: false, // 若打包错误，注释本行
              drop_debugger: true,
              drop_console: true,
              pure_funcs: ['console.log']
            },
            sourceMap: false,
            parallel: true
          }
        })
      )
    }
  }
```
