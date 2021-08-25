import { LAYOUT } from '../constant.js'

// from vue-element-admin (include views)
export default {
  path: '/nested',
  component: LAYOUT,
  redirect: '/nested/menu1/menu1-1',
  name: 'Nested',
  meta: { title: '嵌套路由' },
  children: [
    {
      path: 'menu1',
      component: () => import('/src/views/nested/menu1/index.vue'),
      name: 'Menu1',
      meta: { title: 'Menu 1' },
      redirect: '/nested/menu1/menu1-1',
      children: [
        {
          path: 'menu1-1',
          component: () => import('/src/views/nested/menu1/menu1-1/index.vue'),
          name: 'Menu1-1',
          meta: { title: 'Menu 1-1' },
        },
        {
          path: 'menu1-2',
          component: () => import('/src/views/nested/menu1/menu1-2/index.vue'),
          name: 'Menu1-2',
          redirect: '/nested/menu1/menu1-2/menu1-2-1',
          meta: { title: 'Menu 1-2' },
          children: [
            {
              path: 'menu1-2-1',
              component: () =>
                import('/src/views/nested/menu1/menu1-2/menu1-2-1/index.vue'),
              name: 'Menu1-2-1',
              meta: { title: 'Menu 1-2-1' },
            },
            {
              path: 'menu1-2-2',
              component: () =>
                import('/src/views/nested/menu1/menu1-2/menu1-2-2/index.vue'),
              name: 'Menu1-2-2',
              meta: { title: 'Menu 1-2-2' },
            },
          ],
        },
        {
          path: 'menu1-3',
          component: () => import('/src/views/nested/menu1/menu1-3/index.vue'),
          name: 'Menu1-3',
          meta: { title: 'Menu 1-3' },
        },
      ],
    },
    {
      path: 'menu2',
      name: 'Menu2',
      component: () => import('/src/views/nested/menu2/index.vue'),
      meta: { title: 'Menu 2' },
    },
  ],
}
