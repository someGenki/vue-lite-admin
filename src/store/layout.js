import {defineStore} from 'pinia'
import {getSetting} from '/src/utils/storage'
// import variables from '/src/styles/vars.module.scss'

const noRecordViewPath = ['/login']

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    // 侧边菜单栏展开的默认宽度
    sUnfoldWidth: getSetting('sUnfoldWidth', 190),
    // 是否展开侧边菜单栏
    unfoldSidebar: getSetting('unfoldSidebar', true),
    // 是否只保持一个子菜单的展开
    menuAccordion: getSetting('menuAccordion', true),
    // 是否固定头部
    fixedHeader: getSetting('fixedHeader', false),
    // 是否显示标签栏
    showTabBar: getSetting('showTabBar', true),
    // 是否显示侧边菜单栏中的Logo
    showLogo: getSetting('showLogo', true),

    // 控制设置面板的显示隐藏
    showSettings: false,
    // 侧边菜单栏折叠后宽度
    sCollapseWidth: 64,
    // 是否为移动端（小屏）
    isMobile: document.body.clientWidth < 768,

    // 路由记录相关属性
    breadcrumbList: [],
    visitedViews: [],
    cachedViews: [],
  }),
  getters: {
    // 响应式：如果是移动端，则不显示折叠后的sidebar
    sidebarWidth: (state) =>
      state.unfoldSidebar === true
        ? state.sUnfoldWidth + 'px'
        : (state.isMobile ? 0 : state.sCollapseWidth) + 'px',
    // 当固定头部时，main-container的上边距值
    mainPaddingTopOnFixed: (state) => {
      if (!state.fixedHeader) return '0'
      else if (state.fixedHeader && state.showTabBar) return 42 + 30 + 'px'
      else return 42 + 'px'
    },
    // 内容区域的左边距,避免覆盖sidebar
    mainPaddingLeft(state) {
      return state.isMobile ? 0 : this.sidebarWidth
    },
    // ==getters 结束分割线==
  },
  actions: {
    // 侧边栏切换
    toggleSidebar(bool) {
      if (bool !== undefined) {
        this.unfoldSidebar = bool
      } else {
        this.unfoldSidebar = !this.unfoldSidebar
      }
    },
    // 设置面板切换
    toggleSettings(bool) {
      if (bool !== undefined) {
        this.showSettings = bool
      } else {
        this.showSettings = !this.showSettings
      }
    },
    // 注册于src/layout/index.vue 监听页面resize
    checkIsMobile() {
      this.isMobile = document.body.clientWidth < 768
    },
    /**
     * 记录每次访问的页面
     * 当前功能：
     * 1. 获取匹配的路由来生成面包屑导航
     * 2. 更新当前激活的路由
     */
    accessRecord(to) {
      const matched = to.matched.filter((item) => item.meta && item.meta.title)
      this.breadcrumbList.length = 0
      this.breadcrumbList.push(...matched)
      this.addVisitedView(to)
      this.cachedVisitedView(to)
    },
    // 记录访问过的页面，用于生成tab-bar
    addVisitedView(view) {
      if (
        view.meta.title &&
        !this.visitedViews.some((v) => v.path === view.path) &&
        !noRecordViewPath.some((v) => view.path.includes(v))
      ) {
        this.visitedViews.push({
          name: view.name,
          path: view.path,
          query: view.query,
          title: view.meta.title,
          fullPath: view.fullPath,
          timeStamp: Date.now(),
        })
      }
    },
    // 根据条件缓存访问过的页面
    cachedVisitedView(view) {
      //  未设置不缓存 且 还没被缓存过 才缓存起来
      if (
        !view.meta.noCache &&
        view.name &&
        !this.cachedViews.includes(view.name)
      ) {
        this.cachedViews.push(view.name)
      }
    },
    // 移除被缓存的页面
    removeCachedView(route) {
      const index = this.cachedViews.indexOf(route.name)
      if (index > -1) {
        this.cachedViews.splice(index, 1)
      }
    },
    // ==actions 结束分割线==
  },
})
