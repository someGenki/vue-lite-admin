import { LAYOUT } from '../CONSTANT'
import Redirect from '/src/views/sys/redirect/index.vue'
import Login from '/src/views/sys/login/index.vue'
import {redirectRoute} from "../helper";

// 这里存放不需要登录，不需要权限都能访问到的路由
export const basicRoutes = [
  redirectRoute,
  {
    path: '/login',
    hidden: true,
    component: Login,
    meta: { noCache: true, title: 'Vue Lite Admin 登录页' },
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
