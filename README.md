# Vuejs3+Vite2+ElementPlus后台管理系统模板

## 简介

一个免费开源的后台管理系统模板。使用最新的主流技术开发，开箱即用（主要还是用于学习参考！），主要向以下两个高star的后台管理系统模板进行学习，并根据需求进行取舍和优化改进。

- [vue-vben-admin](https://github.com/anncwb/vue-vben-admin)  使用了最新的`vue3`
  ,`vite2`,`TypeScript`,`antdv`等主流技术开发 (代码量非常庞大和复杂...)
- [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)
  是一个后台前端解决方案，它基于`vuu2` 和 `element ui`  (作者还没开发出vue3版本)

没有TypeScript，没有Vuex，不支持IE11



目前大四，会的技术和开发经验也不多，项目刚刚起步，非常欢迎提出意见~:heart:

**在线预览地址**： http://fanyibar.top/admin/index.html   👈戳它戳他

其他地址：https://somegenki.github.io/vue-lite-admin/

## 技术

(列出来方便写报告呢！)

- [Vue.js 3](https://v3.cn.vuejs.org/) ： 一套用于构建用户界面的**渐进式框架**
- [Vite 2](https://cn.vitejs.dev/) ：基于`ESM` 的新型前端构建工具，能够显著提升前端开发体验
- [Vue Router 4](https://next.router.vuejs.org/zh/) ：Vue.js 的官方路由。它与 Vue.js
  核心深度集成
- [Pinia](https://pinia.esm.dev/) ：状态管理库，Vuex的替代者  (已成为官方项目)
- [Element Plus](https://element-plus.gitee.io/) ：基于 Vue 3.0 的桌面端组件库
- [axios](https://echarts.apache.org/zh/index.html) ：基于`promise`的HTTP请求库
- [echarts](https://axios-http.com/zh/) ：基于 JavaScript 的开源可视化图表库
- [mockjs](http://mockjs.com/) ：生成随机数据，拦截 Ajax 请求
- [SCSS](https://www.sass.hk/docs/) ：动态样式语言，是强化CSS的辅助工具
- [prettier](https://prettier.io/) ：可配置化的代码格式化工具，支持多种语言
- [stylelint](https://stylelint.io/) : CSS代码检查规范工具

## 特性

- 使最新的前端主流技术栈进行开发
- **没有TypeScript** 让代码更加轻量级也便于快速上手 （对于初学者，代码多了难看下去）
- **没有Vuex** 这个用起来是真的麻烦！在vue3中更没必要加入它（个人看法）
- **详细的代码注释**  注释多多益善，有总比没有好（个人看法）
- **少依赖** 能减少依赖项就尽量减少，能自己实现就自己实现，依赖多了安装都可能出问题
- 常用组件 组件源码内自带详细的使用案例
- 花里胡哨，但又没那么花里胡哨
- Github Action 自动部署
- SVGSprites 插件
- Mock数据
- 权限功能
- 快捷导航

## 功能

### 按钮权限、页面权限、组件权限等

1. 使用v-if+自定义过滤函数
2. 使用v-auth 就是对上面方式的封装
3. 定义权限组件，有权限才展示 

### 待加入 -2022.2.8

- [ ] 核心-路由重置
- [ ] 组件-卡片悬浮遮罩效果
- [ ] 组件-图片预览
- [ ] 功能-Loading
- [ ] 功能-搜索菜单
- [ ] 案例-表格合并示例
- [ ] 功能-tabbar-item固定
- [ ] 页面-多功能表单组件封装
- [ ] 功能-更改动态菜单生成方式
- [ ] 优化-图片懒加载 https://juejin.cn/post/7004460061984555021

## 更新日志

**TODO**

## 启动项目

- 需要node和git

- 获取项目代码

````sh
git clone https://github.com/someGenki/vue-lite-admin.git
# 对于上不了github的用户可以使用fastgit
git clone https://hub.fastgit.org/someGenki/vue-lite-admin.git
````
- 添加上游仓库
````sh
git remote add upstream https://github.com/someGenki/vue-lite-admin.git
````
- Fetch 上游仓库的新的提交并merge更变
````sh
git fetch upstream
git checkout main
git merge upstream/main
````

