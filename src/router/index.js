import { createRouter, createWebHashHistory } from 'vue-router'
import { state as userState, getInfo } from '/src/store/user'
import { globalRouteUpdateHook } from '/src/layout/components/useLayout'
import { getToken } from '/src/utils/storage'
import constantRoutes from './constant-routes'
// [官方文档指路]:(https://next.router.vuejs.org/zh/guide/index.html)
// 定义一个公共路径集合，任何用户及匿名者都能访问的到
const PUBLIC_PATH = new Set(['/login', '/404', '/about'])

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
})

/**
 * 官网文档：https://next.router.vuejs.org/zh/guide/advanced/navigation-guards.html
 * 主要参考：https://juejin.cn/post/6844903478880370701
 * RouteLocationNormalized对象：https://next.router.vuejs.org/zh/api/#routelocationnormalized
 *
 * 返回false时 取消当前的导航，也可以返回 "/xxx" 等字符串路径 来进行路由跳转
 * 这可以在这里进行用户权限的跳转判断
 *
 *  vue3中使用 addRoute动态添加路由 应在动态新增后再进行跳转
 *  vue3 addRoute 页面刷新后 路由失效
 *  https://blog.csdn.net/weixin_43835425/article/details/116708448
 */
router.beforeEach(async (to, from) => {
  // 根据是否有 token 判断用户是否登录
  let token = getToken()
  // 如果未登录访问不在公共路径集合里的路径时，跳转 到登录页面
  if (!token && !PUBLIC_PATH.has(to.path))
    return {
      path: '/login',
      // 保存我们所在的位置，以便以后再来
      query: { redirect: to.fullPath },
    }
  // 刷新页面之后，存在内存里的数据将会 丢失 ，需要发起请求来获取相关角色等信息
  // 然后并动态的添加到router上。roles有数据就直接pass
  let roles = userState.roles && userState.roles.length > 0
  if (!roles) {
    await getInfo() // await是不能删除的，因为getInfo是 异步 函数
    return to
  }
})

/**
 *
 * 全局后置钩子 ：> 它们对于分析、更改页面标题、声明页面等辅助功能以及许多其他事情都很有用。
 */
router.afterEach((to) => {
  document.title =
    to.meta.title || import.meta.env.VITE_DEFAULT_TITLE || 'default title'
  globalRouteUpdateHook(to)
})
export default router
