import { LAYOUT } from '../CONSTANT'
import Redirect from '/src/views/sys/redirect/index.vue'
import Login from '/src/views/sys/login/index.vue'

// 这里存放不需要登录，不需要权限都能访问到的路由
export const basicRoutes = [
  {
    path: '/redirect',
    component: LAYOUT,
    redirect: '/',
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'redirect',
        component: Redirect,
        meta: { noCache: true },
      },
    ],
  },
  {
    path: '/login',
    hidden: true,
    component: Login,
    meta: { noCache: true, title: 'Vue Admin 登录页' },
  },
  {
    path: '/404',
    component: () => import('/src/views/sys/error-page/404.vue'),
    hidden: true,
  },
  {
    path: '/401',
    component: () => import('/src/views/sys/error-page/401.vue'),
    hidden: true,
  },
]
