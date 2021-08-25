import { defineStore } from 'pinia'
import { store } from '/src/store'
/**
 * 如何使用pinia作为vue3的状态管理仓库呢？
 * docs: https://pinia.esm.dev/
 * 0. 前提须知：Pinia是模块化的，不像Vuex有根store！！！其次，直接从state解构会失去响应式
 * 1. 引入pinia依赖、app.use(createPinia())、export const useStore=defineStore(...)
 * 2. setup() 中访问 state、getters、actions 可直接 const store=useStore(); store.xxx
 * 3. 批量修改state参考：https://pinia.esm.dev/core-concepts/state.html#mutating-the-state
 */
export const useExampleStore = defineStore('example', {
  // 定义状态
  state: () => ({
    example: 'This is just an example',
  }),
  // 可以认为是store的计算属性;鼓励使用箭头函数
  getters: {
    exampleEnhanced: (state) => state.example + '!',
  },
  // 操作方法，不再有麻烦恶心的Mutation,Action之分，统一在这操作state 不用箭头函数,this指向当前store
  actions: {
    exampleEnhancer() {
      this.example += 'e'
    },
  },
})

// from vben-admin
export function useAppStoreWithOut() {
  return useExampleStore(store)
}

/**
 * 订阅state的改变
 * 1. store.$subscribe((mutation, state) => { ... })
 *  参数的mutation具体可以 import { MutationType } from 'pinia' 查看
 *  他与watch不用的是vue patch执行完后才触发
 * 2. 回调函数的作用：当state发生改变时，将整个state存到localStorage中
 *  例：localStorage.setItem('cart', JSON.stringify(state))
 */

/**
 * 批量修改state参考：https://pinia.esm.dev/core-concepts/state.html#mutating-the-state
 * 订阅actions的触发：https://pinia.esm.dev/core-concepts/actions.html#subscribing-to-actions
 */
