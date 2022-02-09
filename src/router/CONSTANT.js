// 不提前导出会报“ Cannot access 'xxx' before initialization”  参考了vben的做法
export const LAYOUT = () => import('/src/layout/index.vue')

/**
 * 快速简易创建单层路由,其被 Layout 组件包裹
 * @example
 *  createLayoutWrapper({
 *     path: '/profile',
 *     children: {
 *       path: 'index',
 *       name: 'Profile',
 *       component: () => import('/src/views/demo/profile/index.vue'),
 *       meta: { title: '个人中心' },
 *     },
 *   }),
 * 当访问/profile时，跳转到/profile/index，且该页面被Layout包裹，标题为'个人中心'
 *
 * @param raw RouteRecordRaw 类型对象，不过children只有一个时，可以直接写成对象形式不用数组包裹
 * @param defaultChild 该路由默认要重定向到的子路由
 * @return RouteLocationRaw  最外层以Layout组件包裹的路由RouteRecordRaw对象
 */
export function createLayoutWrapper(raw, defaultChild = 'index') {
  const children = [].concat(raw.children)
  const redirect = children.length === 1 ? children[0].path : defaultChild
  return {
    ...raw,
    redirect: raw.path + '/' + redirect,
    component: LAYOUT,
    children,
  }
}
