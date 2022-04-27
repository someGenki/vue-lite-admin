import router from '/src/router'
import { defineStore } from 'pinia'
import { getToken, setToken } from '/src/utils/storage'
import { login as _login, getInfo as _getInfo } from '/src/api/user'
import { asyncRoutes } from '/src/router/modules/async'
import { constRoutes } from '/src/router/modules/const'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken(),
    name: '',
    avatar: '',
    /**
     * 项目只记录用户的角色，比如 admin,test之类的。
     *  声明该组件/元素需要该角色才会出现。
     * 如果还有`operateCode`&`menuCode`再说
     */
    roles: [],
    addRoutes: [],
  }),
  getters: {
    // 根据roles是否不为空判断是否有用户信息
    hasUserInfo: (state) => state.roles && state.roles.length > 0,
    hadLogin: (state) => !!state.token,
  },
  actions: {
    async login({ username, password }) {
      const res = await _login({ username, password })
      setToken(res.data.token)
      this.token = res.data.token
      this.roles.push(...res.data.roles)
      this.name = res.data.name || 'Yuan'
      this.addRoutes = this.generateRoutes()
    },

    async getUserInfo() {
      const res = await _getInfo()
      this.roles.push(...res.data.roles)
      this.addRoutes = this.generateRoutes()
    },

    generateRoutes() {
      const accessedRoutes = this.roles.includes('admin')
        ? asyncRoutes || [] // 是最高权限的admin则直接加入所有异步路由
        : filterAsyncRoutes(asyncRoutes, this.roles)
      // 将动态生成的可以访问路由加入 vue router 中
      accessedRoutes.forEach((route) => router.addRoute(route))
      // 记录所有路由，它与router.getRoutes有所不同！
      return constRoutes.concat(accessedRoutes)
    },

    changeRoles(roles) {
      this.roles.length = 0
      this.roles.push(...roles)
      this.addRoutes = this.generateRoutes()
    },
  },
})

/**
 * 递归的根据已登录用户的roles来过滤异步路由表来生成专属的路由表
 * @author PanJiaChen
 * @param routes asyncRoutes
 * @param roles 用户所有的角色数组
 */
function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach((route) => {
    const tmp = { ...route } // 防止对象被修改
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

// 比较当前roles和路由需要的role是否有交集
function hasPermission(roles, route) {
  return route.meta && route.meta.roles
    ? roles.some((role) => route.meta.roles.includes(role))
    : true // 当某个路由record没有设置roles属性则默认所有都可以访问，所以返回true
}
