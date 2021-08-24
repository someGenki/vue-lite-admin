import { login as _login, getInfo as _getInfo } from '/src/api/user'
import { getToken, setToken } from '/src/utils/storage'
import constantRoutes from '/src/router/constantRoutes'
import asyncRoutes from '/src/router/asyncRoutes'
import { reactive } from 'vue'
import router from '/src/router'

export const state = reactive({
  token: getToken(),
  name: '',
  avatar: '',
  // 每次页面刷新之后 动态路由 就没了。
  // 所以再每次刷新后要 重新获取 角色并再次生成动态路由
  roles: [],
  // 存放一级路由的集合
  addRoutes: [],
})

// 登录请求后保存信息并动态添加路由 use in view/login
export async function login({ username, password }) {
  const res = await _login({ username, password })
  state.token = res.data.token
  state.roles.push(...res.data.roles)
  state.name = res.data.name || 'Yuan'
  setToken(res.data.token)
  generateRoutes()
  return res.data
}

// 获取用户信息并动态添加路由  use in router/beforeEach()
export async function getInfo() {
  const res = await _getInfo()
  state.roles.push(...res.data.roles)
  generateRoutes()
}

function generateRoutes() {
  const accessedRoutes = state.roles.includes('admin')
    ? asyncRoutes || [] // 如果是最高权限的admin则直接加入所有异步路由
    : filterAsyncRoutes(asyncRoutes, state.roles)

  accessedRoutes.forEach((route) => {
    // https://next.router.vuejs.org/zh/guide/advanced/dynamic-routing.html
    router.addRoute(route)
  })

  state.addRoutes.length = 0
  state.addRoutes.push(...constantRoutes.concat(accessedRoutes))
}

/**
 * 递归的根据已登录用户的roles来过滤异步路由表来生成专属的路由表
 * @author PanJiaChen
 * @param routes asyncRoutes
 * @param roles 用户所有的角色数组
 */
function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach((route) => {
    // 防止对象被修改
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) tmp.children = filterAsyncRoutes(tmp.children, roles)
      res.push(tmp)
    }
  })

  return res
}

function hasPermission(roles, route) {
  return route.meta && route.meta.roles
    ? roles.some((role) => route.meta.roles.includes(role))
    : true // 当某个路由record没有设置roles属性则默认所有都可以访问，所以返回true
}
