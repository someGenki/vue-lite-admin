import { computed, reactive, readonly, toRef, watch } from 'vue'
import { getSetting, saveSetting } from '/src/utils/storage'
import { debounce } from '/src/utils/util'
import router from '/src/router'
/* 数据定义和初始区 unfold:展开、collapse:折叠 */
const state = reactive({
  sUnfoldWidth: getSetting('sUnfoldWidth', 'int', 210),
  unfoldSidebar: getSetting('unfoldSidebar', 'bool', true),
  fixedHeader: getSetting('fixedHeader', 'bool', false),
  showTabBar: getSetting('showTabBar', 'bool', true),
  showLogo: getSetting('showLogo', 'bool', true),
  sCollapseWidth: 64, // sidebar折叠后宽度
  showSettings: false, // 是否显示设置面板
  isMobile: document.body.clientWidth < 1001, // 简易响应式设计应用
  themeColor: '#02BF6F',
  breadcrumbList: [],
  visitedViews: [],
  cachedViews: [],
})
// 用一个数组来定义需要保存的local storage 的state.key，watch监听变动来存储
const needSaveToLocalStorage = [
  'unfoldSidebar',
  'sUnfoldWidth',
  'fixedHeader',
  'showLogo',
]
needSaveToLocalStorage.forEach((item) =>
  watch(toRef(state, item), (n) => saveSetting(item, n))
)

// 头像下拉菜单项
const dropdownItems = readonly([
  { title: '个人中心', path: 'profile' },
  { title: '项目地址', path: 'https://github.com/someGenki' },
  { title: '不可点击', path: '/', disabled: true },
  { title: '退出登录', divided: true, handle: () => alert('登出!') },
])

window.addEventListener(
  'resize' /* 监听页面尺寸调整 */,
  debounce(() => (state.isMobile = document.body.clientWidth < 1001), 100)
)

/*  计算属性区 */
const sidebarWidth = computed(() => {
  return state.unfoldSidebar
    ? state.sUnfoldWidth + 'px'
    : // 响应式：如果是移动端，则不显示折叠后的sidebar
      (state.isMobile ? 0 : state.sCollapseWidth) + 'px'
})

/* 方法区 */
const handleSidebarToggle = (bool) => {
  if (bool !== undefined) state.unfoldSidebar = bool
  else state.unfoldSidebar = !state.unfoldSidebar
}

const handleSettingsToggle = (bool) => {
  state.showSettings = bool
}

// 记录访问过的页面，用于生成tab-bar
const noRecordViewPath = ['/login'] //排除不需要显示到tab-bar的页面
const addVisitedView = (view) => {
  if (
    !view.meta.title ||
    state.visitedViews.some((v) => v.path === view.path) ||
    noRecordViewPath.some((v) => view.path.includes(v))
  )
    return
  state.visitedViews.push({
    name: view.name,
    path: view.path,
    query: view.query,
    title: view.meta.title,
    fullPath: view.fullPath,
  })
}

const cachedVisitedView = (view) => {
  if (
    //  未设置不缓存 且 还没被缓存过 才缓存起来
    !view.meta.noCache &&
    view.name &&
    !state.cachedViews.includes(view.name)
  ) {
    state.cachedViews.push(view.name)
  }
}

const removeCachedView = (route) => {
  const index = state.cachedViews.indexOf(route.name)
  index > -1 && state.cachedViews.splice(index, 1)
}

/**
 * 根据操作来删除符合的tab项
 * @param tabItem 被选中要操作tab项，
 * @param operate 要进行的操作
 */
const delTabBarItem = (tabItem, operate = 'self') => {
  const arr = state.visitedViews
  let rest = null // 记录被 关闭/移除 的路由标签
  for (const [i, v] of arr.entries()) {
    if (v.path === tabItem.path) {
      switch (operate) {
        case 'self':
          rest = arr.splice(i, 1)
          break
        case 'all':
          rest = arr.splice(0, arr.length)
          break
        case 'left':
          rest = arr.splice(0, i)
          break
        case 'other':
          rest = arr.splice(0, arr.length, v)
          break
        case 'right':
          rest = arr.splice(i + 1, arr.length)
          break
        default:
          rest = arr.splice(i, 1) //  // 默认 'self' 只删除自身
      }
      break
    }
  }
  // 如果当前的路由被关闭了，应该跳转到最后一页或者首页
  if (rest && rest.some((e) => e.name === router.currentRoute.value.name)) {
    // 尝试获取被删的除view之外最新访问的view，如果它存在则跳转到这个页面，否则跳转到首页（默认）
    const latestView = state.visitedViews.slice(-1)[0]
    latestView ? router.push(latestView.fullPath) : router.push('/')
  }
}

/**
 * 挂载在全局路由跳转的钩子，在 router 中 afterEach 使用
 * 当前功能：
 * 1. 获取匹配的路由来生成面包屑导航
 * 2. 更新当前激活的路由
 */
export const globalRouteUpdateHook = (to, from) => {
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
    dropdownItems,
    delTabBarItem,
    removeCachedView,
    cachedVisitedView,
    handleSidebarToggle,
    handleSettingsToggle,
    globalRouteUpdateHook,
  }
}
