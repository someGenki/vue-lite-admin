import router from '../router'
import { useLayoutStore } from '../store/layout'

export function usePageFn() {
  // 刷新当前页面
  function refreshPage() {
    const route = router.currentRoute.value
    useLayoutStore().removeCachedView(route)
    if (route.path.indexOf('/redirect') > -1) return
    router.replace({ path: '/redirect' + route.fullPath, query: route.query })
  }

  // 打印当前页面
  function printPage() {
  }

  // 页面全屏
  function fullScreen() {
    //判断dom元素是否全屏 没有则请求全屏
    if (!document.fullscreenElement)
      document.documentElement.requestFullscreen()
    else if (document.exitFullscreen) document.exitFullscreen() //退出全屏
  }

  return {
    refreshPage,fullScreen
  }
}
