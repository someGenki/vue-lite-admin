import router from '/src/router/index.js'
import { useLayoutStore } from '../../store/layout'

/**
 * 刷新当前路由
 */
export default function useRefresh() {
  const route = router.currentRoute.value
  useLayoutStore().removeCachedView(route)
  if (route.path.indexOf('/redirect') > -1) return
  router.replace({ path: '/redirect' + route.fullPath, query: route.query })
}
