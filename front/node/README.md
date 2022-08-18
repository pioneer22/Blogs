---
title: Express
date: 2022-08-15
---

::: warning
**Express**
:::

```js
let express = require('express')
let app = express()

// 静态文件渲染
app.use(express.static(__dirname + '/public/'))

app.get('/', (req, res) => {
  let params = {
    code: 200,
    msg: '',
  }
  res.send(params)

  // 获取参数： req.query

  // 定义状态码
  // res.status(404).send(params)

  // res.set('content-type', 'text/html;charset=utf-8')
})

let port = 3000
app.listen(port, () => {
  console.log(`app start at port ${port}!`)
})
```
