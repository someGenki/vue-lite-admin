import { LAYOUT } from './constant'
import nestedRouter from './modules/nested'

/**
 * 异步路由表，由前端控制。 结合用户的roles过滤后添加到router中
 *
 * 在路由中的meta.roles.length<1时，说明不需要权限，任何已登录用户都可访问
 *  一个父级路由只带有 1 个子路由 或者
 *  一个父级路由只带有 1 个子路且这个子路由在只带1个子路由，只会显示最后一个子路由
 *
 *  需要被面包屑和侧边菜单栏显示，则路由和子路由的meta.title是必须的
 *  FIXME:
 *    由于异步路由是创建同步路由后异步添加的，当访问的是这里面的某个路由时，在浏览器刷新时，url不变，↙
 *    但是还没有这还没被加进去，会出现 [Vue Router warn]: No match found for location with path "/test/test1"
 *  https://blog.csdn.net/weixin_43835425/article/details/116708448
 */
export default [
  {
    path: '/test',
    redirect: '/test/test1',
    component: LAYOUT,
    hidden: true,
    children: [
      {
        path: 'test1',
        name: 'Test1',
        component: () => import('/src/views/test/test1.vue'),
        meta: { title: '测试-1' },
      },
    ],
  },
  {
    path: '/permission',
    redirect: '/permission/page',
    component: LAYOUT,
    meta: { title: '权限页面', roles: ['admin', 'editor', 'test'] },
    children: [
      {
        path: 'page',
        component: () => import('/src/views/permission/page.vue'),
        name: 'PagePermission',
        meta: { title: '权限-页面', roles: ['admin'] },
      },
      {
        path: 'test',
        component: () => import('/src/views/permission/test.vue'),
        name: 'TestPermission',
        meta: { title: '权限-测试', roles: ['admin', 'test'] },
      },
    ],
  },
  /* 导入其他模块的路由 */
  nestedRouter,
  // 404页面需要放在最后，确保没有路由被匹配时能正确跳转到404.vue
  {
    path: '/:catchAll(.*)*',
    name: 'NotFound',
    hidden: true,
    component: () => import('/src/views/error-page/404.vue'),
  },
  // 外链路由，主要是生成menu用的
  {
    path: '/ex-link',
    children: [
      {
        path: 'https://github.com/someGenki',
        name: 'ex-link-github',
        meta: { title: 'Github' },
      },
    ],
  },
  {
    path: '/about',
    redirect: '/about/index',
    component: LAYOUT,
    children: [
      {
        path: 'index',
        name: 'about',
        component: () => import('/src/views/about/index.vue'),
        meta: { title: '关于', icon: 'el-icon-place' },
      },
    ],
  },
]
