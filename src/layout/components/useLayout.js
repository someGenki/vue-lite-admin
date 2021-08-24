import { computed, reactive, toRef, watch } from 'vue'
import { getSetting, saveSetting } from '/src/utils/storage'
import { debounce } from '/src/utils/util'

// ===数据定义和初始化区=== 暂时没抽离先写一堆 unfold:展开、collapse:折叠...
const state = reactive({
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
})

// 用一个数组来定义需要保存的local storage 的state.key，watch监听变动来存储
!['unfoldSidebar', 'sUnfoldWidth', 'fixedHeader', 'showLogo'].forEach((item) =>
  watch(toRef(state, item), (newVal) => saveSetting(item, newVal))
)

//排除不需要显示到tab-bar的页面
const noRecordViewPath = ['/login']

// 监听页面尺寸调整 动态改变state.isMobile的值判断是否是移动设备
window.addEventListener(
  'resize',
  debounce(() => (state.isMobile = document.body.clientWidth < 768), 100)
)

/*  ===计算属性区=== */
const sidebarWidth = computed(() => {
  return state.unfoldSidebar
    ? state.sUnfoldWidth + 'px'
    : // 响应式：如果是移动端，则不显示折叠后的sidebar
      (state.isMobile ? 0 : state.sCollapseWidth) + 'px'
})

/* ===方法区=== */
const handleSidebarToggle = (bool) => {
  if (bool !== undefined) state.unfoldSidebar = bool
  else state.unfoldSidebar = !state.unfoldSidebar
}

const handleSettingsToggle = (bool) => {
  state.showSettings = bool
}

// 记录访问过的页面，用于生成tab-bar
const addVisitedView = (view) => {
  if (
    !view.meta.title ||
    state.visitedViews.some((v) => v.path === view.path) ||
    noRecordViewPath.some((v) => view.path.includes(v))
  )
    return // 没有标题或者已访问过或者不满足记录条件则不记录该页面
  state.visitedViews.push({
    name: view.name,
    path: view.path,
    query: view.query,
    title: view.meta.title,
    fullPath: view.fullPath,
  })
}

// 根据条件缓存访问过的页面
const cachedVisitedView = (view) => {
  //  未设置不缓存 且 还没被缓存过 才缓存起来
  if (
    !view.meta.noCache &&
    view.name &&
    !state.cachedViews.includes(view.name)
  ) {
    state.cachedViews.push(view.name)
  }
}
// 移除被缓存的页面
const removeCachedView = (route) => {
  const index = state.cachedViews.indexOf(route.name)
  index > -1 && state.cachedViews.splice(index, 1)
}

/**
 * 挂载在全局路由跳转的钩子，在 router 中 afterEach 使用
 * 当前功能：
 * 1. 获取匹配的路由来生成面包屑导航
 * 2. 更新当前激活的路由
 */
export const globalRouteUpdateHook = (to) => {
  const matched = to.matched.filter((item) => item.meta && item.meta.title)
  state.breadcrumbList.length = 0
  state.breadcrumbList.push(...matched)
  addVisitedView(to)
  cachedVisitedView(to)
}

export default function useLayout() {
  return {
    state,
    sidebarWidth,
    removeCachedView,
    cachedVisitedView,
    handleSidebarToggle,
    handleSettingsToggle,
  }
}
