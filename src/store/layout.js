import { defineStore } from 'pinia'
import { getSetting } from '/src/utils/storage'

const noRecordViewPath = ['/login']

// TODO 监听key的变动
export const useLayoutStore = defineStore('layout', {
  state: () => ({
    sUnfoldWidth: getSetting('sUnfoldWidth', 'int', 180),
    unfoldSidebar: getSetting('unfoldSidebar', 'bool', true),
    fixedHeader: getSetting('fixedHeader', 'bool', false),
    showTabBar: getSetting('showTabBar', 'bool', true),
    showLogo: getSetting('showLogo', 'bool', true),
    sCollapseWidth: 64, // sidebar折叠后宽度
    showSettings: false, // 是否显示设置面板
    isMobile: document.body.clientWidth < 768,
    themeColor: '#02BF6F',
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
    //  // 当固定头部时，main-container的上边距值
    mainPaddingTopOnFixed: (state) => {
      if (!state.fixedHeader) return '0'
      else if (state.fixedHeader && state.showTabBar) return 42 + 34 + 'px'
      else return 42 + 'px'
    },
    elMenuStyle: (state) => ({
      text: '#dcdcdc',
      background: '#304156',
      activeText: state.themeColor,
    }),
  },
  actions: {
    // 侧边栏切换
    toggleSidebar(bool) {
      console.log('!!11')
      if (bool !== undefined) this.unfoldSidebar = bool
      else this.unfoldSidebar = !this.unfoldSidebar
    },
    // 设置面板切换
    toggleSettings(bool) {
      if (bool !== undefined) this.showSettings = bool
      else this.showSettings = !this.showSettings
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
      // cachedVisitedView(to)
    },
    // 记录访问过的页面，用于生成tab-bar
    addVisitedView(view) {
      if (
        view.meta.title &&
        !this.visitedViews.some((v) => v.path === view.path) &&
        !noRecordViewPath.some((v) => view.path.includes(v))
      )
        this.visitedViews.push({
          name: view.name,
          path: view.path,
          query: view.query,
          title: view.meta.title,
          fullPath: view.fullPath,
        })
    },
    // 根据条件缓存访问过的页面
    cachedVisitedView(view) {
      //  未设置不缓存 且 还没被缓存过 才缓存起来
      if (
        view.name &&
        !view.meta.noCache &&
        !this.cachedViews.includes(view.name)
      )
        this.cachedViews.push(view.name)
    },
    // 移除被缓存的页面
    removeCachedView(route) {
      const index = this.cachedViews.indexOf(route.name)
      index > -1 && this.cachedViews.splice(index, 1)
    },
    //     actions结束分割线
  },
})
