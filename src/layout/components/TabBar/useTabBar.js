import router from '/src/router'
import useLayout from '../useLayout'
import { toRefs } from 'vue'

export default function useTabBar() {
  const { state, removeCachedView } = useLayout()
  const { visitedViews } = toRefs(state)
  /**
   * 根据操作来删除符合的tab项
   * @param tabItem 被选中要操作tab项，
   * @param operate 要进行的操作
   */
  function delTabBarItem(tabItem, operate = 'self') {
    const arr = visitedViews.value
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
      const latestView = visitedViews.value.slice(-1)[0]
      latestView ? router.push(latestView.fullPath) : router.push('/')
    }
  }

  return { visitedViews, removeCachedView, delTabBarItem }
}
