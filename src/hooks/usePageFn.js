import router from '../router'
import { useLayoutStore } from '../store/layout'

export function usePageFn() {
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
  function fullScreen(){

  }

  return {
    refreshPage,
  }
}
