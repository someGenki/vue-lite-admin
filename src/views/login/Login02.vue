<template>
  <div class="header-container"><h2>Vue Admin Template</h2></div>
  <el-tabs v-model="activeName" :stretch="true">
    <el-tab-pane name="login">
      <template #label>
        <span>
          <i class="el-icon-user-solid" />
          用户登录
        </span>
      </template>
      <el-form ref="loginFormRef" :rules="loginRules" :model="form">
        <el-form-item required size="small" prop="username">
          <el-input
            required
            v-model="form.username"
            prefix-icon="el-icon-user"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item required size="small" prop="password">
          <el-input
            required
            prefix-icon="el-icon-lock"
            v-model="form.password"
            show-password
            placeholder="请输入密码"
          />
        </el-form-item>
        <div class="login-group">
          <div class="login-help">
            <el-checkbox v-model="rememberMe">记住我</el-checkbox>
            <a class="forget-password" href="#">忘记密码？</a>
          </div>
          <el-button
            class="login-button"
            type="primary"
            @click.prevent="handleLogin"
            v-text="'登录'"
          />
        </div>
        <third-party-login />
      </el-form>
    </el-tab-pane>

    <el-tab-pane name="register">
      <template #label>
        <span>
          <i class="el-icon-plus" />
          账号注册
        </span>
      </template>
      注册
    </el-tab-pane>
    <el-tab-pane name="qr-code">
      <template #label>
        <span>
          <i class="el-icon-camera" />
          扫码登录
        </span>
      </template>
      扫码。。。
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { ref } from 'vue'
import useLogin from './useLogin'
import ThirdPartyLogin from './components/ThirdPartyLogin.vue'

export default {
  name: 'Login02',
  components: { ThirdPartyLogin },
  setup() {
    const activeName = ref('login')
    const rememberMe = ref(true)
    return {
      activeName,
      rememberMe /* 未实现 */,
      ...useLogin() /* 表单操作相关逻辑 */,
    }
  },
}
</script>

<style lang="scss" scoped>
$bg-input: #f1f2f3;
$bg-button: #cfd3d7;

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
