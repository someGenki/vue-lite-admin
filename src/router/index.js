import { createRouter, createWebHashHistory } from 'vue-router'
import { getToken } from '/src/utils/storage'
import constantRoutes from './modules/constant'
import { basicRoutes } from './modules/basic'
import { useUserStore } from '/src/store/user'
import { useLayoutStore } from '/src/store/layout'

// [vue-router官方文档指路]:(https://next.router.vuejs.org/zh/guide/index.html)

// 定义一个公共路径集合，任何用户及匿名者都能访问的到
const PUBLIC_PATH = new Set()

// 添加路由白名单
!(function fillPublicPath() {
  // 当前只处理一级，多层级就自己递归下
  basicRoutes.forEach((item) => PUBLIC_PATH.add(item.path))
})()

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
  strict: true, // 禁止尾随斜杠
})

/**
 * 前置路由首位钩子
 * 官网文档：https://next.router.vuejs.org/zh/guide/advanced/navigation-guards.html
 * 主要参考：https://juejin.cn/post/6844903478880370701
 * 参数类型:RouteLocationNormalized对象：https://next.router.vuejs.org/zh/api/#routelocationnormalized
 *
 * vue3中使用 addRoute 动态添加路由。并应在动态新增后再进行跳转
 * 刷新页面后，动态添加的路由将会丢失，需要重新加载
 *  https://blog.csdn.net/weixin_43835425/article/details/116708448
 */
router.beforeEach(async (to) => {
  // 根据是否有 token 判断用户是否登录
  let token = getToken()
  // 如果[未登录]且要访问不在公共路径集合里的路径时，跳转到登录页面并记录之前的页面用于重新访问
  if (!token && !PUBLIC_PATH.has(to.path))
    return { path: '/login', query: { redirect: to.fullPath } }
  const userStore = useUserStore()
  // 如果已登录但因为刷新后导致保存在内存中的数据(登录信息，动态添加的路由等)丢失，
  // 需要再次发起请求重新获取用户信息，并动态添加路由
  if (userStore.hasUserInfo === false) {
    await userStore.getUserInfo()
    return to
  }
})

/**
 * 全局后置钩子 ：它们对于分析、更改页面标题、声明页面等辅助功能以及许多其他事情都很有用。
 */
router.afterEach((to) => {
  document.title =
    to.meta.title || import.meta.env.VITE_DEFAULT_TITLE || 'default title'

  // 记录访问过的页面
  useLayoutStore().accessRecord(to)
})

export default router
