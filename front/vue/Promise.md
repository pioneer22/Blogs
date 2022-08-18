---
title: Promise
date: 2022-08-08
---

::: warning
**Promise**
:::

```js
为什么会有Promise?
回调地狱(业务逻辑复杂)

三个状态
pending, fulfilled, rejected

function myPromise(executor) {
  let self = this
  self.value = null // 成功
  self.reason = null // 失败
  self.status = 'pending' // 状态

  // 缓存方法
  self.onFulfilledCallbacks = []
  self.onRejectedCallbacks = []

  function resolve(value) {
    let self = this
    if (self.status == 'pending') {
      self.value = value
      self.status = 'fulfilled'
      // 取出方法并执行
      self.onFulfilledCallbacks.forEach((fn) => fn(self.value))
    }
  }

  function reject(reason) {
    let self = this
    if (self.status == 'pending') {
      self.reason = reason
      self.status = 'rejected'
      self.onRejectedCallbacks.forEach((fn) => fn(self.reason))
    }
  }

  try {
    executor(resolve, reject)
  } catch (err) {
    reject(err)
  }
}

myPromise.prototype.then = function (onFulfilled, onRejected) {
  onFulfilled =
    typeof onFulfilled === 'function'
      ? onFulfilled
      : function (data) {
          resolve(data)
        }
  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : function (err) {
          throw err
        }
  let self = this
  if (self.status === 'pending') {
    return new myPromise((resolve, reject) => {
      self.onFulfilledCallbacks.push(() => {
        let x = onFulfilled(self.value)
        x instanceof myPromise ? x.then(resolve, reject) : resolve(x)
      })

      self.onRejectedCallbacks.push(() => {
        let x = onRejected(self.reason)
        x instanceof myPromise ? x.then(resolve, reject) : reject(x)
      })
    })
  }

  if (self.status === 'fulfilled') {
    try {
      let x = onFulfilled(self.value)
      x instanceof myPromise ? x.then(resolve, reject) : resolve(x)
    } catch (err) {
      reject(err)
    }
  }

  if (self.status === 'rejected') {
    try {
      let x = onRejected(self.reason)
      x instanceof myPromise ? x.then(resolve, reject) : resolve(x)
    } catch (err) {
      reject(err)
    }
  }
}

myPromise.prototype.catch = function (fn) {
  return this.then(null, fn)
}

// 调用
let promise = new myPromise((resolve, reject) => {
  if (true) {
    setTimeout(() => {
      resolve('success')
    }, 1000)
  } else {
    let err = new Error('Error')
    reject(err)
  }
})

promise
  .then((first) => {
    console.log('first:', first)
    return new myPromise((y, n) => {
      y(first)
    })
  })
  .then((second) => {
    console.log('second:', second)
  })
  .catch((rejected) => {
    console.log('Error:', rejected.message)
  })
```
