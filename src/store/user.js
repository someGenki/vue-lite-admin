import { getToken, setToken } from '/src/utils/storage'
import constantRoutes from '/src/router/constant-routes'
import asyncRoutes from '/src/router/async-routes'
import { login as _login, getInfo as _getInfo } from '../api/user'
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
  addRoutes: null,
})

// 登录请求后保存信息并动态添加路由 use in view/login
export function login(loginForm) {
  let { username, password } = loginForm
  return _login({ username, password }).then((res) => {
    state.token = res.data.token
    state.roles.push(...res.data.roles)
    state.name = res.data.name || 'Yuan'
    setToken(res.data.token)
    generateRoutes()
    return res.data
  })
}

// 获取用户信息并动态添加路由  use in router/beforeEach()
export function getInfo() {
  return _getInfo().then((res) => {
    state.roles = res.data.roles
    generateRoutes()
  })
}

function generateRoutes() {
  let accessedRoutes
  if (state.roles.includes('admin')) {
    accessedRoutes = asyncRoutes || []
  } else {
    accessedRoutes = filterAsyncRoutes(asyncRoutes, state.roles)
  }
  accessedRoutes.forEach((route) => {
    // https://next.router.vuejs.org/zh/guide/advanced/dynamic-routing.html
    router.addRoute(route)
  })
  state.addRoutes = constantRoutes.concat(accessedRoutes)
  // console.log(router.getRoutes())
  // console.log(state.addRoutes)
}

function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 递归的根据已登录用户的roles来过滤异步路由表来生成专属的路由表
 * @author PanJiaChen
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach((route) => {
    // 防止对象被修改
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}
