---
title: vuepress 搭建个人博客
date: 2022-05-27
tags:
  - vuepress
categories:
  - vuepress
---

::: theorem
1、下载主题<br>
可以直接使用 git clone 克隆一份代码, 或者是直接下载主题代码压缩包。
[theme](https://github.com/vuepress-reco/vuepress-theme-reco-demo/tree/demo/1.x)

2、存储代码<br>
下载后通过 yarn 安装依赖包, 在 github 新建一个远程仓储, 将代码同步到远程仓储。

3、免费服务器拉取生产域名<br>
通过免费服务器域名来展示 [vercel](https://vercel.com)<br>
A 使用 github 注册一个账号, 登录后新建一个项目<br>
B 导入 github 里我们的博客项目<br>
C 以后每次往 github 推送代码, vercel 会自动拉取<br>
DEPLOYMENT 是网站提供的免费项目域名, 可以直接浏览器打开
:::
