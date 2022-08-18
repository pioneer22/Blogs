---
title: Axios
date: 2022-08-10
---

::: warning
**Axios**
:::

```js
// service.js
import axios from 'axios'
import vue from '../main.js'
function getTokenByLocal() {
  let token = sessionStorage.getItem('token')
  return token
}

const service = axios.create({
  baseURL: '/api',
  timeout: 5000,
})

// 请求拦截
service.interceptors.request.use(
  (config) => {
    if (getTokenByLocal()) {
      config.headers['token'] = getTokenByLocal()
    } else {
      vue.$router.push('/login')
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    let res = response.data
    switch (res.code) {
      case 500:
        break
      default:
        break
    }
    return Promise.resolve(res)
  },
  (error) => {
    return Promise.reject(error)
  }
)
```

```js
// common.js
import service from './service'

// 耦合度低，复用性高
export function requestOfPost(url, data) {
  return service.post(url, data)
}

export function requestOfGet(url, data) {
  return service.get(url, data)
}

...
```

```js
// url.js
const url = {
  // 登录
  login: '/login',
  ...
}

export default url;
```

```js
// url.js
const url = {
  // 登录
  login: '/login',
  ...
}

export default url;
```

```js
// api.js
import { requestOfPost, requestOfGet } from './common'

export function postRequest({ url, data }) {
  return new Promise((resolve, reject) => {
    requestOfPost(url, data)
      .then((res) => resolve(res))
      .catch((error) => reject(error))
  })
}

export function getRequest({ url, data }) {
  return new Promise((resolve, reject) => {
    requestOfGet(url, data)
      .then((res) => resolve(res))
      .catch((error) => reject(error))
  })
}

...
```

```js
// 调用
import url from '@/request/url'
import { postRequest } from '@/request/api'

postRequest({ url: url.login, data: {} }).then((res) => {})
```
