<template>
  <div class="login-container">
    <login01 v-if="pageNo === '1'" />
    <login02 v-else-if="pageNo === '2'" />
    <login01 v-else />
  </div>
</template>

<script>
import Login01 from './Login01.vue'
import Login02 from './Login02.vue'
import { useRoute } from 'vue-router'
// https://element-plus.gitee.io/#/zh-CN/component/form
export default {
  name: 'login',
  components: { Login01, Login02 },
  setup() {
    // 测试用，根据page参数来显示对应的登录页
    const pageNo = useRoute().query.page
    return { pageNo }
  },
}
</script>

<style lang="scss" scoped>
$bg-input: #f1f2f3;
$bg-button: #cfd3d7;
.login-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  min-height: 100vh;
  padding-top: 20px;
}

.login-button {
  width: 100%;
  margin-top: 10px;
}
.login-help {
  display: flex;
  justify-content: space-between;
}
.forget-password {
  font-size: 0.9rem;
  color: $primary-text-color;
}
</style>
