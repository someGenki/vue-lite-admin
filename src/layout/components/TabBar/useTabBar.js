import { toRefs } from 'vue'
import router from '/src/router'
import { useLayoutStore } from '/src/store/layout'

export default function useTabBar() {
  const { visitedViews } = toRefs(useLayoutStore())

  /**
   * 根据操作来删除符合的tab项
   * @param tabItem 被选中要操作tab项，
   * @param operate 要进行的操作
   */
  function delTabBarItem(tabItem, operate = 'self') {
    const arr = visitedViews.value
    for (let i = 0, len = arr.length; i < len; i++) {
      const item = arr[i]
      if (item.timeStamp === tabItem.timeStamp) {
        switch (operate) {
          case 'self':
            arr.splice(i, 1)
            // 删除tab item是当前路由时，尝试跳转到附近的tab item
            if (router.currentRoute.value.fullPath === item.fullPath) {
              const nearTab = arr[i - 1] || arr[i]
              nearTab ? router.push(nearTab.fullPath) : router.push('/')
            }
            break
          case 'all':
            arr.splice(0, len)
            router.push('/')
            break
          case 'left':
            arr.splice(0, i)
            break
          case 'other':
            arr.splice(0, arr.length, item)
            break
          case 'right':
            arr.splice(i + 1, len)
            break
          default:
            break
        }
        break
      }
    }
  }

  return { visitedViews, delTabBarItem }
}
