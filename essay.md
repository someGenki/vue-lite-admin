# 这是个随笔记录
简直就是vue-element-admin 改
不需要python依赖!
## 开发步骤

1. 实现动态路由和权限管理
2. 用户登录和信息获取接口
3. 实现 Layout 布局
4. 根据动态路由生成侧边菜单栏

## emm

暂时时不用 Vuex，用简易的仓库来实现数据存储
每个仓库有 state 对象。在组件中使用时，带入有重复的 state 使用`as`重命名
解构 state 的属性用 toRef/toRefs 方法来保存响应式

```js
import { state as userState } from '@/simple-store/user'
```

## 使用到的 element 组件

1. NavMenu 导航菜单 in sidebar
2. Breadcrumb 面包屑 in navbar/Breadcrumb
3. Dropdown 下拉菜单 in navbar/avatarMenu
4. Switch 开关   in Settings
5. Divider 分割线 in Settings
6. Icon 图标
7. Message 消息提示
8. Form 表单
9. Input 输入框
10. Tabs 标签页
11. Tag 标签
12. Layout 布局
13. Tooltip 文字提示
14. Badge 标记
15. Popover 弹出框
## 难点

### 根据动态路由生成侧边菜单

首先是菜单的展示，其次是菜单的点击跳转（使用 el-menu）和折叠菜单文字不隐藏问题 还有折叠动画 wtm

### 动态路由

还有生成 key 的问题，not match 的问题

### 标签栏导航

页面是否要缓存、保存访问过的页面信息、右键弹出自定义菜单、

### hover 有溢出的 div 显示滚动条

### 组件封装的传值如 v-model

### 页面缓存

### 页面刷新


### 简单响应式

### ICON组件
icon-font vs svg
icon-font 要引入字体 单色 等等
svg 支持更好、多色、还能有动画效果 等等许多好处
svg-Sprites 用于复用svg,加载时获取svg文件 注入到body中，之后根据id引用即可

### echarts
安装及快速入门-> https://echarts.apache.org/zh/tutorial.html
使用图标需要明确有什么数据，要画什么图表，图表长什么样，有哪些组件(如图表，坐标轴，图例，提示，功能栏等)，组件能干什么
用option对象描述和定义组件,series data 定义图表/系列的数据.
另一种描述方式：系列数据从 dataset 中取，在series encode 的数值是 dataset.source 的维度 index （即第几列）
### vue3 资料少
