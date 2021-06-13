import { state as userState } from './user'
// 已通过app.config.globalProperties挂载，让vue实例可以访问
// 在模板中 <div>{{ $store.state.user.name }}</div> 快速使用
export default {
  state: {
    user: userState,
  },
  getter: {},
}
