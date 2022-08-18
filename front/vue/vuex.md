---
title: Vuex
date: 2022-08-08
---

::: warning
**Vuex**
:::

```js
全局状态管理器
1. 组件状态共享
2. 兄弟组件传值
3. 跨级组件传值
```

```js
手写简易Vuex
利用 Vue.mixin, 将Vuex挂载到组件实例
利用Vue的数据响应式来实现Vuex中state的数据响应式

let Vue
class Store {
  constructor(options = {}) {
    // 利用Vue实现数据响应式, vuex核心
    this.s = new Vue({
      data() {
        return {
          state: options.state || {},
        }
      },
    })

    let getters = options.getters
    this.getters = {}
    Object.keys(getters).forEach((getterName) => {
      Object.defineProperty(this.getters, getterName, {
        get: () => {
          return getters[getterName](this.state)
        },
      })
    })

    let mutations = options.mutations
    this.mutations = {}
    Object.keys(mutations).forEach((mutationName) => {
      this.mutations[mutationName] = (payload) => {
        mutations[mutationName](this.state, payload)
      }
    })

    let actions = options.actions
    this.actions = {}
    Object.keys(actions).forEach((actionName) => {
      this.actions[actionName] = (payload) => {
        let params = {
          state: this.state,
          getters: this.getters,
          commit: this.commit,
          dispatch: this.dispatch,
        }
        actions[actionName](params, payload)
      }
    })
  }

  // 类的访问器
  get state() {
    return this.s.state
  }

  commit = (mutationName, payload) => {
    this.mutations[mutationName](payload)
  }

  dispatch = (actionName, payload) => {
    this.actions[actionName](payload)
  }
}

const install = (_Vue) => {
  Vue = _Vue
  Vue.mixin({
    beforeCreate() {
      if (this.$options && this.$options.store) {
        // 根组件
        this.$store = this.$options.store
      } else {
        // 子组件
        this.$store = this.$parent && this.$parent.$store
      }
    },
  })
}

export default {
  install,
  Store,
}
```
