// 不提前导出会报“ Cannot access 'xxx' before initialization”  参考了vben的做法
export const LAYOUT = () => import('/src/layout/index.vue')

/**
 * 快速简易创建单层路由
 * @param prefix 必须 '/'开头
 * @param raw 原RouteRecordRaw类型对象，不过children只有一个时，可以直接写成对象不用数组包裹
 * @return 最外层以Layout组件包裹的路由RouteRecordRaw对象
 */
export function createLayoutWrapper(prefix, raw) {
  let redirect
  let children = [].concat(raw.children)

  if (Array.isArray(raw.children)) {
    if (raw.children.length === 1) {
      redirect = raw.children[0]
    } else {
      redirect = raw.defaultChild || 'index'
    }
  } else {
    redirect = raw.children.path
  }
  redirect = (prefix + redirect).replace('//', '/')
  return {
    path: prefix,
    meta: raw.meta,
    hidden: raw.hidden,
    component: LAYOUT,
    redirect,
    children,
  }
}
